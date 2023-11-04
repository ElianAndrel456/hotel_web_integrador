import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/react'

interface IActionModalProps {
	openModal: boolean
	setOpenModal: () => void
	title: string
	children: React.ReactNode
	button: {
		color: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
		onPress: () => void
		text: string
	}
}

export const ActionModal = ({
	openModal,
	setOpenModal,
	title,
	children,
	button,
}: IActionModalProps) => {
	return (
		<Modal
			isOpen={openModal}
			onOpenChange={setOpenModal}
			placement='top-center'
			backdrop='blur'
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader>{title}</ModalHeader>
						<ModalBody>{children}</ModalBody>
						<ModalFooter>
							<Button
								color='warning'
								variant='flat'
								onPress={onClose}
							>
								Cerrar
							</Button>
							<Button
								color={button.color}
								onPress={button.onPress}
							>
								{button.text}
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}
