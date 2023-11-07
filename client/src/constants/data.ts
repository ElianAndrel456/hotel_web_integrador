export const COLUMNS_CLIENT = [
	{
		key: 'number_of_document',
		label: 'DNI',
	},
	{
		key: 'type_of_document',
		label: 'TIPO DE DOCUMENTO',
	},
	{
		key: 'name',
		label: 'NOMBRE',
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
		key: 'category',
		label: 'CATEGORIA',
	},
	{
		key: 'floor',
		label: 'PISO',
	},
	{
		key: 'status',
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
		key: 'checkIn',
		label: 'FECHA DE RESERVA',
	},
	{
		key: 'checkOut',
		label: 'FECHA DE SALIDA',
	},
	{
		key: 'aditional_services',
		label: 'SERVICIOS ADICIONALES',
	},
	{
		key: 'status',
		label: 'ESTADO',
	},
	{
		key: 'actions',
		label: 'ACCIONES',
	},
]

export const RESERVED_DATA = [
	{
		dateIn: '2021-10-10',
		dateOut: '2021-10-15',
		numberPeople: 2,
		reservationState: '0',
		total: 100,
		room: '2dae1b4f-8fbd-4f99-bb63-323b54e7de7d',
		client: '6e4bc89e-ccd4-44f5-9e02-c964cd515339',
		manager: 'd24eac17-bb69-43cd-bba5-dc003da857e8',
		additionalServices: [
			'27bfc1d1-2c84-466d-b4cf-2fa59ff69d70',
			'614d338a-eaed-4904-b59e-4b136f4644e3',
		],
	},
]

export const URL_API = import.meta.env.PROD ? '' : 'http://localhost:8080'
