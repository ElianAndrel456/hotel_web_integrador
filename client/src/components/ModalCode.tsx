import { useUIStore } from '@/store/ui.store'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { InputForm } from '.'
import { useForm } from '@/hooks'
import { code_verify_service } from '@/services/auth.service'
import { toast } from 'react-toastify'
import { i18n } from '@/i18n'

export const ModalCode = () => {
  const { openModalCode, changeModalCode, changeModalLogin, language } = useUIStore()
  const { values, handleChange, resetInput } = useForm()

  const onSubmit = async () => {
    try {
      await code_verify_service(values.code)

      resetInput()
      changeModalCode(false)
      changeModalLogin(true)
      toast.success('Cuenta verificada')
    } catch (error) {
      console.log(error)
      toast.error('Error al verificar el codigo')
    }
  }

  return (
    <Modal
      isOpen={openModalCode}
      onOpenChange={() => changeModalCode(!openModalCode)}
      placement='top-center'
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>{i18n[language].modal_code.title}</ModalHeader>
            <ModalBody>
              <p className='text-sm text-gray-600'>{i18n[language].modal_code.message}</p>
              <InputForm
                label={i18n[language].modal_code.label_code}
                name='code'
                value={values.code}
                handleChange={handleChange}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color='danger'
                variant='flat'
                onPress={onClose}
              >
                {i18n[language].modal_code.button_close}
              </Button>
              <Button
                color='primary'
                onClick={onSubmit}
              >
                {i18n[language].modal_code.button_verify}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
