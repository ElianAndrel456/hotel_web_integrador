import { useDisclosure } from '@nextui-org/react'

export const useModal = () => {
	const {
		isOpen: isOpenLogin,
		onOpen: onOpenLogin,
		onOpenChange: onOpenChangeLogin,
	} = useDisclosure()
	const {
		isOpen: isOpenRegister,
		onOpen: onOpenRegister,
		onOpenChange: onOpenChangeRegister,
	} = useDisclosure()

	return {
		isOpenLogin,
		onOpenLogin,
		onOpenChangeLogin,
		isOpenRegister,
		onOpenRegister,
		onOpenChangeRegister,
	}
}
