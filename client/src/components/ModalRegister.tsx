import { UserIcon } from 'lucide-react'
import { Button, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { EmailIcon, PassportIcon, PasswordIcon, PhoneIcon } from '@/icons'
import { useUIStore } from '@/store/ui.store'
import { register_service_client } from '@/services/auth.service'
import { toast } from 'react-toastify'
import { useForm } from '@/hooks'
import { ZodError, ZodIssue, z } from 'zod'
import { InputForm } from '.'
import { useState } from 'react'
import { i18n } from '@/i18n'

const registerSchema = z.object({
  names: z
    .string()
    .min(3, { message: 'Nombre muy corto' })
    .regex(/^[a-zA-Z ]/, 'Solo letras'),
  dni: z
    .string()
    .min(8, { message: 'Deberia tener 8 digitos' })
    .regex(/^[0-9]{8}$/, 'Solo numeros y 8 digitos'),
  address: z.string().min(3, { message: 'Dirección muy corta' }),
  phone: z
    .string()
    .min(9, { message: 'Deberia tener 9 digitos' })
    .regex(/^[0-9]{9}$/, 'Solo numeros y 9 digitos'),
  email: z.string().email({ message: 'Email invalido' }),
  password: z
    .string()
    .min(8, { message: 'Contraseña debe tener como minimo 8 caracteres' })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Debe contener al menos una mayúscula, una minúscula y un número'
    ),
})

export const ModalRegister = () => {
  const { openModalRegister, changeModalRegister, changeModalCode, language } = useUIStore()
  const { values, handleChange, resetInput } = useForm()
  const [errors, setErrors] = useState<ZodIssue[]>([])

  const onSubmit = async () => {
    const registerUser = {
      names: values.names,
      dni: values.dni,
      address: values.address,
      phone: values.phone,
      email: values.email,
      password: values.password,
    }

    try {
      const parse = registerSchema.parse(registerUser)
      console.log(parse)
      const data = await register_service_client(registerUser)
      localStorage.setItem('email_register', data.email)
      resetInput()
      changeModalRegister(false)
      changeModalCode(true)
      toast.success('Registro exitoso')
    } catch (error) {
      toast.error('Error al registrarse, verifique si los datos son correctos')
      if (typeof error !== 'string' && error instanceof ZodError) {
        setErrors(error.issues)
      }
    }
  }

  return (
    <Modal
      isOpen={openModalRegister}
      onOpenChange={() => changeModalRegister(!openModalRegister)}
      placement='top-center'
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>{i18n[language].modal_register.title}</ModalHeader>
            <ModalBody>
              <InputForm
                label={i18n[language].modal_register.names}
                name='names'
                value={values.names}
                handleChange={handleChange}
                EndContent={<UserIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />}
                isValid={errors.some((error) => error.path[0] === 'names')}
                errorMessage={errors.filter((error) => error.path[0] === 'names').map((error) => error.message)[0]}
              />
              <InputForm
                label={i18n[language].modal_register.dni}
                name='dni'
                value={values.dni}
                handleChange={handleChange}
                type='number'
                EndContent={<PassportIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />}
                isValid={errors.some((error) => error.path[0] === 'dni')}
                errorMessage={errors.filter((error) => error.path[0] === 'dni').map((error) => error.message)[0]}
              />
              <InputForm
                label={i18n[language].modal_register.address}
                name='address'
                value={values.address}
                handleChange={handleChange}
                EndContent={<PassportIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />}
                isValid={errors.some((error) => error.path[0] === 'address')}
                errorMessage={errors.filter((error) => error.path[0] === 'address').map((error) => error.message)[0]}
              />
              <InputForm
                EndContent={<PhoneIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />}
                label={i18n[language].modal_register.phone}
                name='phone'
                value={values.phone}
                type='number'
                handleChange={handleChange}
                isValid={errors.some((error) => error.path[0] === 'phone')}
                errorMessage={errors.filter((error) => error.path[0] === 'phone').map((error) => error.message)[0]}
              />
              <Divider />
              <InputForm
                EndContent={<EmailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />}
                label={i18n[language].modal_register.email}
                type='email'
                name='email'
                value={values.email}
                handleChange={handleChange}
                isValid={errors.some((error) => error.path[0] === 'email')}
                errorMessage={errors.filter((error) => error.path[0] === 'email').map((error) => error.message)[0]}
              />
              <InputForm
                EndContent={<PasswordIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />}
                label={i18n[language].modal_register.password}
                type='password'
                name='password'
                value={values.password}
                handleChange={handleChange}
                isValid={errors.some((error) => error.path[0] === 'password')}
                errorMessage={errors.filter((error) => error.path[0] === 'password').map((error) => error.message)[0]}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color='danger'
                variant='flat'
                onPress={onClose}
              >
                {i18n[language].modal_register.button_close}
              </Button>
              <Button
                color='primary'
                onClick={onSubmit}
              >
                {i18n[language].modal_register.button_register}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
