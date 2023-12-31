import { Button, Image, Spacer, useDisclosure } from '@nextui-org/react'
import { ActionModal, CardRoom } from '@/components'
import { useScrollY } from '@/hooks'
import { ArrowDownCircleIcon } from '@/icons'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/auth.store'
import { useUIStore } from '@/store/ui.store'
import { useConstants } from '@/constants'
import { i18n } from '@/i18n'
import { useState } from 'react'

const HomePage = () => {
  const [openCategoryModal, setOpenCategoryModal] = useState<number>(0)
  const { onOpenChange, isOpen, onOpen } = useDisclosure()
  const { language } = useUIStore()
  const { isAuth } = useAuthStore()
  const { changeModalLogin } = useUIStore()
  const { scroll } = useScrollY()
  const { CARDS_INFORMATION } = useConstants()

  return (
    <>
      <main>
        <header className='text-white bg-hero-pattern bg-[rgba(0,0,0,0.5)] bg-blend-darken bg-no-repeat bg-cover bg-fixed min-h-screen w-full gap-4 flex relative justify-center items-center flex-col'>
          <motion.h1
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: -100, opacity: 0 }}
            className='text-4xl text-center lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[white] to-[#F0A000]'
          >
            {i18n[language].home.title}
          </motion.h1>
          <Spacer y={2} />
          <motion.p
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: -100, opacity: 0 }}
            transition={{ delay: 0.2 }}
            className=' text-sm lg:text-medium font-semibold text-gray-400 max-w-lg text-center'
          >
            {i18n[language].home.subtitle}
          </motion.p>
          {!isAuth && (
            <motion.p
              animate={{ x: 0, opacity: 1 }}
              initial={{ x: -100, opacity: 0 }}
              transition={{ delay: 0.2 }}
              className='font-semibold mt-10 text-white max-w-lg text-center'
            >
              <Button
                variant='bordered'
                className=' text-white tracking-widest uppercase underline-offset-4 underline text-sm lg:text-2xl'
                onClick={() => {
                  if (!isAuth) changeModalLogin(true)
                }}
              >
                {i18n[language].home.button}
              </Button>
            </motion.p>
          )}
          <a
            href='#reservation'
            className='absolute bottom-20'
          >
            {scroll > 200 ? '' : <ArrowDownCircleIcon className='text-4xl animate-bounce' />}
          </a>
        </header>
        <section className='py-16 px-12 lg:px-[300px]'>
          <div className='w-full grid gap-8 grid-cols-1 lg:grid-cols-2 items-center'>
            <div
              data-aos='fade-right'
              className='text-center space-y-8'
            >
              <h3 className='text-5xl text-[#F0A000] font-bold '>{i18n[language].home.title_section}</h3>
              <p className=''>{i18n[language].home.subtitle_section}</p>
            </div>
            <div data-aos='zoom-in'>
              <Image
                isZoomed
                isBlurred
                src='https://waynapicchuhotel.com.pe/wp-content/uploads/2021/01/Mesa-de-trabajo-1307-1.png'
                alt='secondary_image'
              />
            </div>
          </div>
        </section>
        <section
          id='reservation'
          className='py-16 px-12 lg:px-[300px]'
        >
          <h3 className='text-5xl text-[#F0A000] font-bold text-center'>{i18n[language].home.title_section2}</h3>
          <Spacer y={20} />
          <div className='flex w-full gap-8 justify-around flex-wrap'>
            {CARDS_INFORMATION.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <CardRoom
                  key={index}
                  title={card.title}
                  img_url={card.img_url}
                  openModalDitails={() => {
                    onOpen()
                    setOpenCategoryModal(index)
                  }}
                  reservation_url={card.reservation_url}
                  children={card.children}
                />
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <ActionModal
        title=''
        openModal={isOpen}
        setOpenModal={onOpenChange}
      >
        {openCategoryModal === 0 ? (
          <section>plata</section>
        ) : openCategoryModal === 1 ? (
          <section>diamante</section>
        ) : (
          <section>oro</section>
        )}
      </ActionModal>
    </>
  )
}

export default HomePage
