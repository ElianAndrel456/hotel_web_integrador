export const COLUMNS_CLIENT = [
  {
    key: 'dni',
    label: 'DNI',
  },
  {
    key: 'names',
    label: 'NOMBRES',
  },
  {
    key: 'address',
    label: 'DIRECCION',
  },
  {
    key: 'phone',
    label: 'TELEFONO',
  },
  {
    key: 'email',
    label: 'CORREO ELECTRONICO',
  },
  {
    key: 'actions',
    label: 'ACCIONES',
  },
]
export const COLUMNS_SERVICES = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'name',
    label: 'NOMBRE',
  },
  {
    key: 'description',
    label: 'DESCRIPCION',
  },
  {
    key: 'price',
    label: 'PRECIO',
  },
  {
    key: 'available',
    label: 'DISPONIBILIDAD',
  },
  {
    key: 'actions',
    label: 'ACCIONES',
  },
]

export const DATA_OF_SERVICES = [
  {
    id: 1,
    name: 'Corte de cabello',
    description: 'Corte de cabello para caballero',
    price: 25,
  },
  {
    id: 2,
    name: 'Corte de cabello',
    description: 'Corte de cabello para dama ',
    price: 30,
  },
  {
    id: 3,
    name: 'Servicio de taxi',
    description: 'Servicio de taxi',
    price: 50,
  },
  {
    id: 4,
    name: 'Corte de cabello',
    description: 'Corte de cabello para caballero',
    price: 25,
  },
]

export const COLUMNS_ROOMS = [
  { key: 'id', label: 'ID' },
  {
    key: 'numberRoom',
    label: 'NUMERO DE HABITACION',
  },
  {
    key: 'categoryRoom',
    label: 'CATEGORIA',
  },
  {
    key: 'typeRoom',
    label: 'TIPO DE HABITACION',
  },
  {
    key: 'price',
    label: 'PRECIO X NOCHE',
  },
  {
    key: 'state',
    label: 'ESTADO',
  },
  {
    key: 'actions',
    label: 'ACCIONES',
  },
]

export const COLUMNS_RESERVATIONS = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'client',
    label: 'CLIENTE',
  },
  {
    key: 'room',
    label: 'HABITACION',
  },
  {
    key: 'dateReserved',
    label: 'FECHA DE RESERVA',
  },
  {
    key: 'dateEntry',
    label: 'FECHA DE ENTRADA',
  },
  {
    key: 'dateDeparture',
    label: 'FECHA DE SALIDA',
  },
  {
    key: 'aditionalServices',
    label: 'SERVICIOS ADICIONALES',
  },
  {
    key: 'state',
    label: 'ESTADO',
  },
  {
    key: 'total',
    label: 'TOTAL',
  },
  {
    key: 'actions',
    label: 'ACCIONES',
  },
]

export const COLUMNS_RESERVATIONS_CLIENT = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'room',
    label: 'HABITACION',
  },
  {
    key: 'dateReserved',
    label: 'FECHA DE RESERVA',
  },
  {
    key: 'dateEntry',
    label: 'FECHA DE ENTRADA',
  },
  {
    key: 'dateDeparture',
    label: 'FECHA DE SALIDA',
  },
  {
    key: 'state',
    label: 'ESTADO',
  },
  {
    key: 'total',
    label: 'TOTAL',
  },
  {
    key: 'actions',
    label: 'ACCIONES',
  },
]

export const URL_API = import.meta.env.PROD ? '' : 'http://localhost:8080'
