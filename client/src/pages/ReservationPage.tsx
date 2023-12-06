import { ActionDropDown, LargeBanner, TableData } from '@/components'
import { COLUMNS_RESERVATIONS_CLIENT } from '@/constants/data'
import { useForm } from '@/hooks'
import { getAllServices } from '@/services/aditional_services.service'
import { payToMercadoPago } from '@/services/mercadopago.service'
import { getAllReservations } from '@/services/reserved_room.service'
import { getAllRooms } from '@/services/rooms.services'
import { useServiceStore } from '@/store/aditionalService.store'
import { useAuthStore } from '@/store/auth.store'
import { useReservationStore } from '@/store/reservation.store'
import { useRoomStore } from '@/store/room.store'
import { Button, Divider, Input, Select, SelectItem, Spacer, Tab, Tabs } from '@nextui-org/react'
import { Key, useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

const ReservationPage = () => {
  const [selected, setSelected] = useState<string | number | bigint>('reservas')
  const { rooms, setRoomsStore } = useRoomStore()
  const { user } = useAuthStore()
  const { services, setServicesStore } = useServiceStore()
  const { handleChange, values } = useForm()
  const { setReservationStore, reservations } = useReservationStore()
  const roomsAvalibles = useMemo(() => rooms.filter((room) => room.state === 'DISPONIBLE'), [rooms])

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async function () {
      const rooms = await getAllRooms()
      const services = await getAllServices()
      const reservations = await getAllReservations()
      setRoomsStore(rooms)
      setServicesStore(services)
      if (reservations === undefined) return setReservationStore([])
      else {
        const reservationsClient = reservations.filter((item) => item.client.id === user.id)
        setReservationStore(reservationsClient)
      }
    })()
  }, [setReservationStore, setRoomsStore, setServicesStore, user.id])

  const total = useMemo(() => {
    let amount = 0
    const days = Math.floor(
      (new Date(values.dateDeparture).getTime() - new Date(values.dateEntry).getTime()) / (1000 * 60 * 60 * 24)
    )

    if (values.room) {
      const room = rooms.find((r) => r.id === values.room)
      amount += room ? room.price : 0
    }
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

  const onSubmit = async () => {
    const data = {
      dateEntry: values.dateEntry,
      dateDeparture: values.dateDeparture,
      client: {
        id: user.id,
      },
      room: {
        id: values.room,
      },
      services: (values.services && values.services.split(',').map((id) => ({ id }))) || [],
    }
    try {
      const init_point = await payToMercadoPago(data)

      console.log(init_point)
      if (init_point) window.location.href = init_point
      else throw new Error('No se pudo realizar el pago')
    } catch (error) {
      console.log(error)
      toast.error('No se pudo realizar el pago, intente mas tarde')
    }
  }

  const reservedsRender = useMemo(() => {
    return reservations.map((item) => ({
      id: item.id,
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
  }, [reservations, rooms])

  const renderCell = useCallback(
    (
      item: {
        id: string
        room: string
        dateEntry: string
        dateDeparture: string
        dateReserved: string
      },
      columnKey: Key
    ) => {
      const cellValue = item[columnKey as keyof typeof item]

      switch (columnKey) {
        case 'id':
          return <p>{cellValue.toString().slice(0, 7)}</p>
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
                actionEdit={() => {
                  /* onOpenModalEdit(item.id */
                }}
                actionDelete={() => {
                  /* onOpenModalDelete(item.id) */
                }}
              />
            </div>
          )

        default:
          return cellValue
      }
    },
    []
  )

  return (
    <main>
      <LargeBanner title='Reservaciones' />
      <Spacer y={10} />
      <section className='px-12 lg:px-[300px]'>
        <Tabs
          variant='light'
          aria-label='Tabs variants'
          key={'tabs-reservas'}
          selectedKey={selected as string}
          onSelectionChange={(key) => setSelected(key)}
        >
          <Tab
            key={'reservas'}
            title={'Has una Reservas'}
          >
            <section className='flex gap-6 flex-col lg:flex-row'>
              <div className='space-y-4'>
                <Select
                  label='Elige tu Habitacion'
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
                  variant='flat'
                  type='date'
                  placeholder='Fecha de llegada'
                  label='Fecha de llegada'
                />
                <Input
                  name='dateDeparture'
                  value={values.dateDeparture || ''}
                  onChange={handleChange}
                  variant='flat'
                  type='date'
                  placeholder='Fecha de llegada'
                  label='Fecha de salida'
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

                <Input
                  placeholder='Total S/.0.00'
                  label='Total'
                  value={'S./' + total.toString()}
                  isDisabled
                />
                <Button
                  variant='bordered'
                  color='primary'
                  onClick={onSubmit}
                >
                  Reservar Habitacion
                </Button>

                <p className='text-gray-400  text-sm'>
                  Tus reservas pendientes estaran disponible hasta las 11:30 UTC, pasado el tiempo seran canceladas.
                </p>
              </div>
              <Divider
                orientation='vertical'
                className='h-[400px]'
              />
              <div>
                <h3 className='font-semibold text-lg mb-2'>Informacion de Habitacion</h3>
                {values.room && (
                  <div>
                    <img
                      className='w-[400px] h-[300px] object-cover border rounded-lg shadow-lg mb-2'
                      src={
                        rooms.find((item) => item.id === values.room)?.categoryRoom === 'DIAMANTE'
                          ? '/diamante.jpg'
                          : rooms.find((item) => item.id === values.room)?.categoryRoom === 'ORO'
                          ? '/doble.jpg'
                          : '/individual.jpg'
                      }
                      alt='image room'
                    />
                    <p>Numero de Habitacion: {rooms.find((item) => item.id === values.room)?.numberRoom}</p>
                    <p>Tipo: {rooms.find((item) => item.id === values.room)?.typeRoom}</p>
                    <p>
                      Numero de Personas{' '}
                      {rooms.find((item) => item.id === values.room)?.typeRoom === 'SUITE'
                        ? '4'
                        : rooms.find((item) => item.id === values.room)?.typeRoom === 'DOBLE'
                        ? '2'
                        : '1'}
                    </p>
                    {values.dateEntry && values.dateDeparture && (
                      <p>
                        Numero de dias:{' '}
                        {Math.floor(
                          (new Date(values.dateDeparture).getTime() - new Date(values.dateEntry).getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}
                      </p>
                    )}
                  </div>
                )}
                {}
              </div>
            </section>
          </Tab>
          <Tab
            key={'reservar'}
            title={'Reservas Habitacion'}
          >
            <TableData
              emptyContent='No hay reservas registradas'
              ariaLabel='ListResevation Table Client'
              columns={COLUMNS_RESERVATIONS_CLIENT}
              items={reservedsRender}
              renderCell={renderCell}
            />
            <Spacer y={60} />
          </Tab>
        </Tabs>
        <Spacer y={6} />
      </section>
    </main>
  )
}

export default ReservationPage
