import { LargeBanner } from '@/components'
import { Card, CardBody, Image, Spacer } from '@nextui-org/react'
import { i18n } from '@/i18n'
import { useUIStore } from '@/store/ui.store'

const AboutPage = () => {
  const { language } = useUIStore()
  return (
    <main>
      <LargeBanner title={i18n[language].about.title} />
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
            <p className='text-gray-500'>{i18n[language].about.article_1.description}</p>
            <Spacer y={4} />
            <ul className='pl-4 space-y-2'>
              {i18n[language].about.article_1.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <Spacer y={4} />
          <article>
            <h4 className='text-4xl text-[#F0A000] font-semibold '>{i18n[language].about.article_2.title}</h4>
            <Spacer y={4} />
            <p className='text-gray-500'>{i18n[language].about.article_2.description}</p>
          </article>
          <Spacer y={4} />
          <section className='grid lg:grid-cols-2 gap-4'>
            <article>
              <Image
                isZoomed
                isBlurred
                src='https://waynapicchuhotel.com.pe/wp-content/uploads/2021/01/Mesa-de-trabajo-8-4.png'
                alt='Our mission'
              />
              <Spacer y={4} />
              <div>
                <h4 className='text-3xl text-[#F0A000] font-semibold '>{i18n[language].about.article_3.title}</h4>
                <Spacer y={4} />
                <p className='text-gray-500'>{i18n[language].about.article_3.description}</p>
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
                <h4 className='text-3xl text-[#F0A000] font-semibold'>{i18n[language].about.article_4.title}</h4>
                <Spacer y={4} />
                <p className='text-gray-500'>{i18n[language].about.article_4.description}</p>
              </div>
            </article>
          </section>
        </div>
        <div className='col-span-4 lg:col-span-1 relative lg:-top-32 bg-white px-2 py-8 rounded-md'>
          <article>
            <h4 className='text-3xl text-[#F0A000] font-semibold'>{i18n[language].about.article_5.title}</h4>
            <Spacer y={8} />
            <ul className='space-y-2'>
              {i18n[language].about.article_5.cualities.map((item) => (
                <li key={item}>{item}</li>
              ))}
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
                <h4 className='text-3xl font-semibold'>{i18n[language].about.article_6.title}</h4>
                <Spacer y={2} />
                <p>{i18n[language].about.article_6.description}</p>
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
