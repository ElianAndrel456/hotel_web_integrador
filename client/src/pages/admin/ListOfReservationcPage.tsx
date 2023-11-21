import { ActionDropDown, ActionModal, InputForm, TableData, TopContent } from '@/components'
import { useConstants } from '@/constants'
import { COLUMNS_RESERVATIONS } from '@/constants/data'
import { useForm, useModal } from '@/hooks'
import { createReservation, deleteResevation } from '@/services/reserved_room.service'
import { useServiceStore } from '@/store/aditionalService.store'
import { useAuthStore } from '@/store/auth.store'
import { useClientStore } from '@/store/client.store'
import { useReservationStore } from '@/store/reservation.store'
import { useRoomStore } from '@/store/room.store'
import { Input, Select, SelectItem, Spacer } from '@nextui-org/react'
import React, { useMemo } from 'react'
import { toast } from 'react-toastify'
import { IClients } from './ClientPage'
import { IRooms } from './RoomsPage'

type IReservationState = 'PENDIENTE' | 'CONFIRMADO' | 'CANCELADO' | 'FINALIZADO'
export interface IReservation {
  id: string
  dateReserved: string
  dateEntry: string
  dateDeparture: string
  state: IReservationState
  total: number
  client: {
    id: IClients['id']
  }
  room: {
    id: IRooms['id']
  }
  services?: string[]
}

export const ListOfReservationcPage = () => {
  const { openModal, handleModal, isSavingData, setIsSavingData } = useModal()
  const { values, handleChange, resetInput, setValues } = useForm()
  const { RESERVATION_STATE } = useConstants()
  const [columnKeySelected, setColumnKeySelected] = React.useState<null | string>(null)
  const { user } = useAuthStore()
  const { rooms } = useRoomStore()
  const { clients } = useClientStore()
  const { services } = useServiceStore()
  const { reservations, createReservationStore, deleteReservationStore, updateReservationStore } = useReservationStore()

  const roomsAvalibles = React.useMemo(() => rooms.filter((room) => room.state === 'DISPONIBLE'), [rooms])

  const total = React.useMemo(() => {
    let amount = 0
    const days = Math.floor(
      (new Date(values.dateDeparture).getTime() - new Date(values.dateEntry).getTime()) / (1000 * 60 * 60 * 24)
    )

    if (values.room) {
      const room = rooms.find((r) => r.id === values.room)
      amount += room ? room.price : 0
    }
    console.log(days)
    amount *= days == 0 ? 1 : days

    if (values.services) {
      const inputServiceID = values.services.split(',')
      for (let index = 0; index < inputServiceID.length; index++) {
        const element = inputServiceID[index]
        const service = services.find((s) => s.id === element)
        if (!service || !days) continue
        amount += service.price
      }
    }
    return amount ? amount : 0
  }, [rooms, services, values.dateDeparture, values.dateEntry, values.room, values.services])

  const onOpenModalCreate = () => {
    resetInput()
    handleModal('create', true)
    setColumnKeySelected(null)
    setIsSavingData(true)
  }
  const onOpenModalEdit = React.useCallback(
    (id: string) => {
      setIsSavingData(false)
      setColumnKeySelected(id)
      const service = services.find((service) => service.id === id)
      if (!service) return
      setValues({
        name: service.name,
        description: service.description,
        price: service.price.toString(),
      })
      handleModal('create', true)
    },
    [handleModal, services, setIsSavingData, setValues]
  )

  const onOpenModalDelete = React.useCallback(
    (id: string) => {
      handleModal('delete', true)
      setColumnKeySelected(id)
    },
    [handleModal]
  )

  const onCreate = async () => {
    try {
      const findClient = clients.find((c) => c.dni === values.client)
      if (!findClient) throw new Error('No se encontro el cliente')

      const res = await createReservation({
        dateReserved: new Date().toISOString(),
        dateEntry: values.dateEntry,
        dateDeparture: values.dateDeparture,
        state: values.state as IReservationState,
        total: total,
        room: {
          id: values.room,
        },
        client: {
          id: findClient.id,
        },

        /* 				services: values.services
					? values.services.split(',').map((s) => ({ id: s }))
					: [], */
      })
      createReservationStore({
        ...res,
        aditionalServices: res.aditionalServices.map((s: { name: string }) => s.name).join(', '),
        room: res.room.roomNumber + ' ' + res.room.categoryRoom,
        client: res.client.name + ' ' + res.client.lastname,
        manager: res.manager.name + ' ' + res.manager.lastName,
      })
      toast('Se creo la reservacion correctamente')
      handleModal('create', false)
    } catch (error) {
      toast('Ocurrio un error al crear', {
        type: 'error',
      })
    }
  }
  const onEdit = async () => {
    try {
      if (!columnKeySelected) return
      /*    const update_service = {
        name: values.name,
        description: values.description,
        price: parseFloat(values.price),
      } */
      /* 	await update(columnKeySelected, update_service)

			updateReservationStore(columnKeySelected, {
				id: columnKeySelected,
				...update_service,
			}) */

      toast('Se edito la reservacion')

      handleModal('create', false)
    } catch (error) {
      toast('Ocurrio un error al editar el servicio adicional', {
        type: 'error',
      })
      console.log(error)
    }
  }

  const onDelete = () => {
    try {
      if (!columnKeySelected) return
      deleteResevation(columnKeySelected)
      deleteReservationStore(columnKeySelected)
      setColumnKeySelected(null)
      toast('Se elimino la reservacion correctamente')
      handleModal('delete', false)
    } catch (error) {
      toast('Ocurrio un error al eliminar', {
        type: 'error',
      })
      console.log(error)
    }
  }

  const reservedsRender = useMemo(() => {
    return reservations.map((item) => ({
      id: item.id,
      client: item.client ? clients.find((c) => c.id === item.client.id)!.names : '-',
      room: item.room
        ? rooms.find((r) => r.id === item.room.id)!.numberRoom +
          ' ' +
          rooms.find((r) => r.id === item.room.id)!.typeRoom
        : '-',
      dateEntry: new Date(item.dateEntry).toLocaleDateString(),
      dateDeparture: new Date(item.dateDeparture).toLocaleDateString(),
      dateReserved: new Date(item.dateReserved).toLocaleDateString(),
      state: item.state,
      total: item.total,
    }))
  }, [clients, reservations, rooms])

  const renderCell = React.useCallback(
    (
      item: {
        id: string
        client: string
        room: string
        dateEntry: string
        dateDeparture: string
        dateReserved: string
      },
      columnKey: React.Key
    ) => {
      const cellValue = item[columnKey as keyof typeof item]

      switch (columnKey) {
        case 'id':
          return <p>{cellValue.toString().slice(0, 7)}</p>
        case 'client':
          return <p>{cellValue}</p>
        case 'room':
          return <p>{cellValue}</p>
        case 'dateEntry':
          return <p>{cellValue}</p>
        case 'dateDeparture':
          return <p>{cellValue}</p>
        case 'dateReserved':
          return <p>{cellValue}</p>
        case 'aditionalServices':
          return <p>{cellValue}</p>
        case 'services':
          return <p>{cellValue}</p>
        case 'total':
          return <p>S/.{cellValue}</p>
        case 'actions':
          return (
            <div className='relative flex justify-end items-center gap-2'>
              <ActionDropDown
                ariaLabel='Dropdown of services actions'
                actionEdit={() => onOpenModalEdit(item.id)}
                actionDelete={() => onOpenModalDelete(item.id)}
              />
            </div>
          )

        default:
          return cellValue
      }
    },
    [onOpenModalDelete, onOpenModalEdit]
  )

  return (
    <>
      <h1 className='text-5xl font-bold'>Reservaciones</h1>
      <Spacer y={8} />
      <TableData
        ariaLabel='Table of services'
        topContent={
          <TopContent
            filter={values.filter}
            handleChange={handleChange}
            onOpenModalCreate={onOpenModalCreate}
            buttonText='Agregar una reservación'
            placeholder='Buscar por cliente'
          />
        }
        columns={COLUMNS_RESERVATIONS}
        items={reservedsRender}
        renderCell={renderCell}
      />
      <ActionModal
        title={isSavingData ? 'Agregar una reservación' : 'Editar una reservación'}
        openModal={openModal.create}
        setOpenModal={() => {
          handleModal('create', false)
        }}
        button={{
          color: 'primary',
          onPress: () => {
            isSavingData ? onCreate() : onEdit()
          },
          text: isSavingData ? 'Guardar' : 'Editar',
        }}
      >
        <>
          <InputForm
            label='DNI del Cliente'
            name='client'
            value={values.client}
            handleChange={handleChange}
            autoFocus
          />

          <Select
            label='Habitacion NN-CAT-PS'
            onChange={handleChange}
            value={values.room}
            name='room'
          >
            {roomsAvalibles.map((item) => (
              <SelectItem
                key={item.id}
                value={item.id}
              >
                {item.numberRoom + ' - ' + item.categoryRoom + ' - ' + item.typeRoom + ' - S/.' + item.price}
              </SelectItem>
            ))}
          </Select>
          <Input
            name='dateEntry'
            value={values.dateEntry || ''}
            onChange={handleChange}
            label='Fecha de llegada:'
            type='date'
            labelPlacement='outside-left'
          />
          <Input
            name='dateDeparture'
            value={values.dateDeparture || ''}
            onChange={handleChange}
            label='Fecha de salida:'
            type='date'
            labelPlacement='outside-left'
          />
          <Select
            label='Servicios adicionales'
            selectionMode='multiple'
            name='services'
            value={values.services}
            onChange={handleChange}
          >
            {services
              .filter((item) => item.available === true)
              .map((item) => (
                <SelectItem key={item.id}>{item.name + ' - S./' + item.price}</SelectItem>
              ))}
          </Select>
          {isSavingData ? (
            ''
          ) : (
            <Select
              label='Estado de reservacion'
              name='state'
              value={values.state}
              onChange={handleChange}
            >
              {RESERVATION_STATE.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </SelectItem>
              ))}
            </Select>
          )}

          <Input
            placeholder='Total S/.0.00'
            label='Total'
            value={'S./' + total.toString()}
            isDisabled
          />
        </>
      </ActionModal>
      <ActionModal
        title={'Eliminar un servicio adicional'}
        openModal={openModal.delete}
        setOpenModal={() => {
          handleModal('delete', false)
        }}
        button={{
          color: 'danger',
          onPress: () => {
            onDelete()
          },
          text: 'Eliminar',
        }}
      >
        <p>¿Esta seguro que desea eliminar la reservacion?</p>
      </ActionModal>
    </>
  )
}
