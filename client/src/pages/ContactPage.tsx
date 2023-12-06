import { LargeBanner } from '@/components'
import { Button, Divider, Spacer, Textarea } from '@nextui-org/react'
import { i18n } from '@/i18n'
import { useUIStore } from '@/store/ui.store'

const ContactPage = () => {
  const { language } = useUIStore()

  return (
    <main>
      <LargeBanner title={i18n[language].contact.title} />
      <section className='bg-large-hero-pattern2 bg-[rgba(0,0,0,.8)] bg-blend-darken h-[600px] bg-fixed bg-cover'>
        <div className='px-14 lg:px-[300px] py-14 pt-28 text-white flex items-center flex-col lg:items-start'>
          <span className='uppercase text-xs text-primary'>{i18n[language].contact.section_1.title}</span>
          <h3 className='text-3xl font-semibold'>{i18n[language].contact.section_1.subtitle}</h3>
          <Spacer y={4} />
          <Divider className='bg-primary h-2 w-10' />
          <Spacer y={4} />
          <div className='max-w-sm flex flex-col'>
            <p>{i18n[language].contact.section_1.description}</p>
            <Spacer y={2} />
            <Textarea className='text-black' />
            <Spacer y={2} />
            <Button
              variant='solid'
              color='primary'
              className='w-fit place-self-end'
            >
              {i18n[language].contact.section_1.button}
            </Button>
          </div>
        </div>
      </section>
      <section className='flex items-center justify-center py-20'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52192.78059778759!2d-71.97382553581707!3d-13.520143567564515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x916dd60a7f10cc9f%3A0x5c6d50732218ad5!2sHotel%20Waynapicchu!5e0!3m2!1ses-419!2spe!4v1697082103444!5m2!1ses-419!2spe'
          width='800'
          height='450'
          loading='lazy'
        ></iframe>
      </section>
    </main>
  )
}

export default ContactPage
