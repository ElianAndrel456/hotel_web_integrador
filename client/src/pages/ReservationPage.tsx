import { LargeBanner } from '@/components'
import { useForm } from '@/hooks'
import { getAllServices } from '@/services/aditional_services.service'
import { getAllRooms } from '@/services/rooms.services'
import { useServiceStore } from '@/store/aditionalService.store'
import { useReservationStore } from '@/store/reservation.store'
import { useRoomStore } from '@/store/room.store'
import { Button, Input, Select, SelectItem, Spacer, Tab, Tabs } from '@nextui-org/react'
import React from 'react'
const ReservationPage = () => {
  const [selected, setSelected] = React.useState<string | number | bigint>('reservas')
  const { rooms, setRoomsStore } = useRoomStore()
  const { services, setServicesStore } = useServiceStore()
  const { handleChange, values } = useForm()
  const { setReservationStore } = useReservationStore()

  const roomsAvalibles = React.useMemo(() => rooms.filter((room) => room.state === 'DISPONIBLE'), [rooms])

  React.useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async function () {
      const rooms = await getAllRooms()
      const services = await getAllServices()
      setRoomsStore(rooms)
      setServicesStore(services)
    })()
  }, [setRoomsStore, setServicesStore])

  const total = React.useMemo(() => {
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
    const pdf = await fetch('http://localhost:8080/api/test')
    const blob = await pdf.blob()
    const url = window.URL.createObjectURL(blob)
    window.open(url)
  }

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
            </div>
          </Tab>
          <Tab
            key={'reservar'}
            title={'Reservas Habitacion'}
          >
            <p className='min-h-[400px]'>Reservas</p>
          </Tab>
        </Tabs>
        <Spacer y={6} />
      </section>
    </main>
  )
}

export default ReservationPage
