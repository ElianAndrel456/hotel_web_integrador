import { PasswordIcon, UserIcon } from '@/icons'
import { useAuthStore } from '@/store/auth.store'
import { useUIStore } from '@/store/ui.store'
import {
  Button,
  Checkbox,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { login_service } from '@/services/auth.service'
import { toast } from 'react-toastify'
import { i18n } from '@/i18n'

export const ModalLogin = () => {
  const navigate = useNavigate()
  const { openModalLogin, changeModalLogin, changeModalRegister, language } = useUIStore()
  const { changeIsAuth, setUser } = useAuthStore()
  const [inputUser, setInputUser] = useState('')
  const [inputPassword, setInputPassword] = useState('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const userAccount = {
      email: inputUser,
      password: inputPassword,
    }

    try {
      login_service(userAccount)
        .then((res) => {
          if (!res) throw new Error('Error al iniciar sesión')
          setUser(res)
          changeModalLogin(false)
          changeIsAuth(true)
          if (res && res.rol === 'ADMINISTRADOR') {
            navigate('/admin')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (error) {
      toast.error('Error al iniciar sesión, verifique sus credenciales')
    }
  }

  return (
    <Modal
      isOpen={openModalLogin}
      onOpenChange={() => {
        changeModalLogin(!openModalLogin)
      }}
      placement='top-center'
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>{i18n[language].modal_login.title}</ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                endContent={<UserIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />}
                label={i18n[language].modal_login.email}
                variant='bordered'
                type='email'
                value={inputUser}
                onChange={(e) => setInputUser(e.target.value)}
              />
              <Input
                endContent={<PasswordIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />}
                label={i18n[language].modal_login.password}
                placeholder='Ingresa tu contraseña'
                type='password'
                variant='bordered'
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
              />
              <div className='flex py-2 px-1 justify-between'>
                <Checkbox
                  classNames={{
                    label: 'text-small',
                  }}
                >
                  {i18n[language].modal_login.check_remember}
                </Checkbox>
                <Link
                  color='primary'
                  size='sm'
                  onClick={() => {
                    changeModalLogin(false)
                    changeModalRegister(true)
                  }}
                >
                  {i18n[language].modal_login.link_register}
                </Link>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color='danger'
                variant='flat'
                onPress={onClose}
              >
                {i18n[language].modal_login.button_close}
              </Button>
              <Button
                color='primary'
                onClick={onSubmit}
              >
                {i18n[language].modal_login.button_login}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
