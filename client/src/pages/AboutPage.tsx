import { LargeBanner } from '@/components'
import { Card, CardBody, Image, Spacer } from '@nextui-org/react'

const AboutPage = () => {
	return (
		<main>
			<LargeBanner title='Sobre Nosotros' />
			<Spacer y={10} />
			<section className='grid grid-cols-4 px-14 lg:px-[100px] xl:px-[300px] gap-10 relative'>
				<div className='col-span-4 lg:col-span-3'>
					<Image
						src='https://waynapicchuhotel.com.pe/wp-content/uploads/2021/01/Mesa-de-trabajo-2-4.png'
						alt='Macchu picchu'
						isZoomed
						isBlurred
					/>
					<article>
						<Spacer y={4} />
						<p className='text-gray-500'>
							Somos una empresa con mas de 8 años en la ciudad del CUSCO,
							trabajamos en una larga cadena hoteles con prestigio a nivel
							nacional poniendo a tu disposición nuestra experiencia laboral en
							Waynappichu Hotel.
						</p>
						<Spacer y={4} />
						<ul className='pl-4 space-y-2'>
							<li>
								<b>Ubicación estratégica</b>
							</li>
							<li>
								<b>Seguridad Garantizada</b>
							</li>
							<li>
								<b>Habitaciones Cómodas</b>
							</li>
							<li>
								<b>Garantizamos el mejor precio</b>
							</li>
						</ul>
					</article>
					<Spacer y={4} />
					<article>
						<h4 className='text-4xl text-[#F0A000] font-semibold '>
							¿Quiénes Somos?
						</h4>
						<Spacer y={4} />
						<p className='text-gray-500'>
							Somos la mejor alternativa para su viaje de negocios y placer.
							Estamos ubicados en el distrito de Wánchaq Av. Garcilaso 216-A
							(Costado de la Caja Tacna), uno de los distritos más seguros de
							Cusco, tenemos una amplia experiencia en el rubro de hotelería ya
							que estamos mas de 8 años en la ciudad brindándote una experiencia
							única e inolvidable.
						</p>
					</article>
					<Spacer y={4} />
					<section className='grid grid-cols-2 gap-4'>
						<article>
							<Image
								isZoomed
								isBlurred
								src='https://waynapicchuhotel.com.pe/wp-content/uploads/2021/01/Mesa-de-trabajo-8-4.png'
								alt='Our mission'
							/>
							<Spacer y={4} />
							<div>
								<h4 className='text-3xl text-[#F0A000] font-semibold '>
									Nuestra Misión
								</h4>
								<Spacer y={4} />
								<p className='text-gray-500'>
									Ser líderes en el sector de 2 estrellas, logrando dar un
									servicio personalizado ayudando a revalorar la cultura local
									de los destinos en los que vayamos a operar..
								</p>
							</div>
						</article>
						<article>
							<Image
								isZoomed
								isBlurred
								src='https://waynapicchuhotel.com.pe/wp-content/uploads/2021/01/2c28387d4661a3d9ba8166e7ca029a02.jpg'
								alt='Our vision'
							/>
							<Spacer y={4} />
							<div>
								<h4 className='text-3xl text-[#F0A000] font-semibold '>
									Nuestra visión
								</h4>
								<Spacer y={4} />
								<p className='text-gray-500'>
									Ser una empresa que contribuye al desarrollo cultural y
									turístico del país, teniendo siempre como meta la calidad de
									nuestros servicios gracias a nuestro valioso equipo humano.
								</p>
							</div>
						</article>
					</section>
				</div>
				<div className='col-span-4 lg:col-span-1 relative lg:-top-32 bg-white px-2 py-8 rounded-md'>
					<article>
						<h4 className='text-3xl text-[#F0A000] font-semibold'>
							Nuestras Cualidades
						</h4>
						<Spacer y={8} />
						<ul className='space-y-2'>
							<li>
								<b>Responsables</b>
							</li>
							<li>
								<b>Eficientes</b>
							</li>
							<li>
								<b>Detallistas</b>
							</li>
							<li>
								<b>Apasionados</b>
							</li>
						</ul>
						<Spacer y={2} />
						<Image
							isZoomed
							isBlurred
							src='https://waynapicchuhotel.com.pe/wp-content/uploads/2021/01/Mesa-de-trabajo-1302-copia-2-3.png'
							alt='Our qualities'
						/>
					</article>
					<Spacer y={6} />
					<article>
						<Card className='bg-black text-white '>
							<CardBody>
								<h4 className='text-3xl font-semibold'>Nuestro Equipo</h4>
								<Spacer y={2} />
								<p>
									El equipo de <b>Waynapicchu Hotel</b> está formado por
									profesionales con amplia experiencia en el sector, que dan
									preferencia a un trato personalizado, un valor añadido y una
									de las razones principales por las cuales muchos de nuestros
									clientes vuelven a solicitar nuestros servicios en sus
									visitas. Agradecemos cualquier sugerencia, que será
									inmediatamente atendida por nuestra dirección, para la
									constante y mejora de la calidad del hotel
								</p>
							</CardBody>
						</Card>
					</article>
				</div>
			</section>
			<Spacer y={16} />
		</main>
	)
}

export default AboutPage
