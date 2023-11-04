import { useState } from 'react'

interface IUseModal {
	modal: {
		create: boolean
		delete: boolean
		edit: boolean
	}
}

export const useModal = () => {
	const [openModal, setOpenModal] = useState<IUseModal['modal']>({
		create: false,
		delete: false,
		edit: false,
	})
	const [isSavingData, setIsSavingData] = useState<boolean>(true)

	const handleModal = (modal: 'create' | 'delete' | 'edit', value: boolean) => {
		setOpenModal((prev) => ({
			...prev,
			[modal]: value,
		}))
	}

	return {
		openModal,
		setOpenModal,
		handleModal,
		isSavingData,
		setIsSavingData,
	}
}
