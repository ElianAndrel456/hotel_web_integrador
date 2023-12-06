import { ActionDropDown, ActionModal, InputForm, TableData, TopContent } from '@/components'
import { useConstants } from '@/constants'
import { COLUMNS_ROOMS } from '@/constants/data'
import { useForm, useModal } from '@/hooks'
import { createRoomService, deleteRoomService, getAllRooms, updateRoomService } from '@/services/rooms.services'
import { useRoomStore } from '@/store/room.store'
import { Chip, Select, SelectItem, Spacer } from '@nextui-org/react'
import { DotIcon } from 'lucide-react'
import React, { useEffect, useMemo } from 'react'
import { toast } from 'react-toastify'
import { z } from 'zod'

const createRoomSchema = z.object({
  categoryRoom: z.enum(['PLATA', 'ORO', 'DIAMANTE']),
  numberRoom: z.string(),
  price: z.number().min(0),
  state: z.enum(['DISPONIBLE', 'RESERVADO', 'MANTENIMIENTO']),
  typeRoom: z.enum(['INDIVIDUAL', 'DOBLE', 'SUITE']),
})

type RoomCategory = 'PLATA' | 'ORO' | 'DIAMANTE'
type RoomType = 'INDIVIDUAL' | 'DOBLE' | 'SUITE'
type RoomState = 'DISPONIBLE' | 'RESERVADO' | 'MANTENIMIENTO'

export interface IRooms {
  id: string
  numberRoom: string
  categoryRoom: RoomCategory
  typeRoom: RoomType
  state: RoomState
  price: number
}

const RoomsPage = () => {
  const { rooms, createRoomStore, deleteRoomStore, updateRoomStore, setRoomsStore } = useRoomStore()
  const { openModal, handleModal, isSavingData, setIsSavingData } = useModal()
  const { values, handleChange, resetInput, setValues } = useForm()
  const [columnKeySelected, setColumnKeySelected] = React.useState<null | string>(null)
  const { ROOMS_CATEGORY, ROOM_STATE, ROOM_TYPE } = useConstants()

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      const rooms = await getAllRooms()
      setRoomsStore(rooms)
    })()
  }, [setRoomsStore])

  const onOpenModalCreate = () => {
    resetInput()
    setColumnKeySelected(null)
    setIsSavingData(true)
    handleModal('create', true)
  }

  const onOpenModalEdit = React.useCallback(
    (id: string) => {
      setIsSavingData(false)
      setColumnKeySelected(id)
      const room = rooms.find((r) => r.id === id)
      if (!room) return
      setValues({
        categoryRoom: room.categoryRoom,
        numberRoom: room.numberRoom,
        state: room.state,
        typeRoom: room.typeRoom,
        price: room.price.toString(),
      })

      handleModal('create', true)
    },
    [setIsSavingData, rooms, setValues, handleModal]
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
      const parse = createRoomSchema.parse({
        categoryRoom: values.categoryRoom as RoomCategory,
        numberRoom: values.numberRoom,
        price: parseFloat(values.price),
        state: values.state as RoomState,
        typeRoom: values.typeRoom as RoomType,
      })
      console.log(parse)
      const res = await createRoomService({
        categoryRoom: values.categoryRoom as RoomCategory,
        numberRoom: values.numberRoom,
        price: parseFloat(values.price),
        state: values.state as RoomState,
        typeRoom: values.typeRoom as RoomType,
      })
      createRoomStore(res!)
      toast('Se creo la habitacion correctamente')
      handleModal('create', false)
    } catch (error) {
      console.log(error)
      toast('Rellena correctamente los campos', {
        type: 'error',
      })
    }
  }
  const onEdit = async () => {
    try {
      if (!columnKeySelected) return

      const updateRoom = await updateRoomService({
        id: columnKeySelected,
        categoryRoom: values.categoryRoom as RoomCategory,
        typeRoom: values.typeRoom as RoomType,
        numberRoom: values.numberRoom,
        state: values.state as RoomState,
        price: parseFloat(values.price),
      })

      updateRoomStore({
        id: updateRoom.id,
        categoryRoom: updateRoom.categoryRoom,
        state: updateRoom.state,
        numberRoom: updateRoom.numberRoom,
        price: updateRoom.price,
        typeRoom: updateRoom.typeRoom,
      })

      toast('Se edito la habitacion correctamente')

      handleModal('create', false)
    } catch (error) {
      toast('Rellena Correctamente los campos', {
        type: 'error',
      })
      console.log(error)
    }
  }

  const onDelete = () => {
    try {
      if (!columnKeySelected) throw new Error('No se selecciono una habitacion')
      deleteRoomService(columnKeySelected)
      deleteRoomStore(columnKeySelected)
      setColumnKeySelected(null)
      toast('Se elimino la habitacion correctamente')
      handleModal('delete', false)
    } catch (error) {
      if (error instanceof Error)
        toast(error.message, {
          type: 'error',
        })
      else
        toast('Ocurrio un error al eliminar', {
          type: 'error',
        })
    }
  }

  const renderRooms = useMemo(() => {
    return rooms.filter((room) => {
      if (values.filter && values.filter.length > 0) {
        return room.numberRoom.includes(values.filter)
      }
      return room
    })
  }, [rooms, values.filter])

  const renderCell = React.useCallback(
    (item: IRooms, columnKey: React.Key) => {
      const cellValue = item[columnKey as keyof IRooms]

      switch (columnKey) {
        case 'id':
          return <p>{cellValue.toString().slice(0, 7)}</p>
        case 'numberRoom':
          return <p>{cellValue}</p>
        case 'categoryRoom':
          return <p>{cellValue}</p>
        case 'typeRoom':
          return <p>{cellValue}</p>
        case 'price':
          return <p>{'S/.' + cellValue}</p>
        case 'state':
          return (
            <Chip
              size='md'
              variant='shadow'
              startContent={<DotIcon />}
              radius='sm'
              color={cellValue === 'DISPONIBLE' ? 'success' : cellValue === 'MANTENIMIENTO' ? 'warning' : 'danger'}
            >
              {cellValue}
            </Chip>
          )
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
      <h1 className='text-5xl font-bold'>Habitaciones</h1>
      <Spacer y={8} />
      <TableData
        ariaLabel='Table of services'
        topContent={
          <TopContent
            filter={values.filter}
            handleChange={handleChange}
            onOpenModalCreate={onOpenModalCreate}
            buttonText='Agregar una habitacion'
            placeholder='Buscar por número de habitacion'
          />
        }
        columns={COLUMNS_ROOMS}
        items={renderRooms}
        renderCell={renderCell}
      />
      <ActionModal
        title={isSavingData ? 'Agregar una habitacion' : 'Editar una habitacion'}
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
            name='numberRoom'
            value={values.numberRoom}
            handleChange={handleChange}
            label='Numero de habitacion'
            autoFocus
            type='number'
          />
          <Select
            label='Categoria'
            name='categoryRoom'
            value={values.categoryRoom}
            onChange={handleChange}
            defaultSelectedKeys={values.categoryRoom && [values.categoryRoom]}
          >
            {ROOMS_CATEGORY.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
              >
                {item.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            name='typeRoom'
            value={values.typeRoom}
            onChange={handleChange}
            label='Tipo de habitacion'
            defaultSelectedKeys={values.typeRoom && [values.typeRoom]}
          >
            {ROOM_TYPE.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
              >
                {item.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            label='Estado'
            value={values.state}
            name='state'
            onChange={handleChange}
            defaultSelectedKeys={values.state && [values.state]}
          >
            {ROOM_STATE.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
              >
                {item.label}
              </SelectItem>
            ))}
          </Select>
          <InputForm
            name='price'
            value={values.price}
            handleChange={handleChange}
            label='Precio por noche'
            type='number'
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
        <p>¿Esta seguro que desea eliminar el servicio adicional?</p>
      </ActionModal>
    </>
  )
}

export default RoomsPage
