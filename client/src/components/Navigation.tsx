import { initial_user, useAuthStore } from '@/store/auth.store'
import { useUIStore } from '@/store/ui.store'
import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { i18n } from '@/i18n'

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuth, user, setUser, changeIsAuth } = useAuthStore()
  const { changeModalRegister, changeModalLogin, language } = useUIStore()
  const navigation = useNavigate()
  const path = window.location.pathname

  return (
    <Navbar
      shouldHideOnScroll
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent
        className='sm:hidden'
        justify='start'
      >
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
      </NavbarContent>

      <NavbarBrand>
        <Image
          src='/icon_hotel.png'
          alt='logo waynapicchu hotel'
          className='sepia brightness-0  h-10'
        />
        <p className='font-bold text-inherit'>{i18n[language].navbar.brand}</p>
      </NavbarBrand>

      <NavbarContent
        className='hidden sm:flex gap-4'
        justify='center'
      >
        <NavbarItem
          isActive={path === '/'}
          className='cursor-pointer'
        >
          <Link
            onClick={() => {
              navigation('/')
            }}
            color={`${path === '/' ? 'primary' : 'foreground'}`}
          >
            {i18n[language].navbar.home}
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive={path === '/sobre-nosotros'}
          className='cursor-pointer'
        >
          <Link
            onClick={() => {
              navigation('/sobre-nosotros')
            }}
            color={`${path === '/sobre-nosotros' ? 'primary' : 'foreground'}`}
          >
            {i18n[language].navbar.about}
          </Link>
        </NavbarItem>
        {isAuth && (
          <NavbarItem
            className='cursor-pointer'
            isActive={path === '/reservacion'}
          >
            <Link
              onClick={() => {
                navigation('/reservacion')
              }}
              color={`${path === '/reservacion' ? 'primary' : 'foreground'}`}
            >
              {i18n[language].navbar.reservation}
            </Link>
          </NavbarItem>
        )}
        <NavbarItem
          className='cursor-pointer'
          isActive={path === '/contacto'}
        >
          <Link
            onClick={() => {
              navigation('/contacto')
            }}
            color={`${path === '/contacto' ? 'primary' : 'foreground'}`}
          >
            {i18n[language].navbar.contact}
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        {isAuth ? (
          <Dropdown>
            <DropdownTrigger>
              <Avatar
                as={'button'}
                isBordered
                color='warning'
                name={user.name}
                className='cursor-pointer'
              />
            </DropdownTrigger>
            <DropdownMenu aria-label='Profile Actions'>
              <DropdownItem
                key='exit'
                className='text-danger'
                color='danger'
                onClick={() => {
                  sessionStorage.removeItem('auth-storage')
                  setUser(initial_user)
                  changeIsAuth(false)
                  navigation('/')
                }}
              >
                {i18n[language].navbar.exit}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem className='hidden lg:flex cursor-pointer'>
              <Link onClick={() => changeModalLogin(true)}>{i18n[language].navbar.signin}</Link>
            </NavbarItem>
            <Divider
              orientation='vertical'
              className='h-8 hidden	 lg:flex'
            />
            <NavbarItem>
              <Button
                color='primary'
                variant='flat'
                className='hidden lg:flex'
                onClick={() => changeModalRegister(true)}
              >
                {i18n[language].navbar.signup}
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        <NavbarItem isActive={path === '/'}>
          <Link
            onClick={() => {
              navigation('/')
              setIsMenuOpen(false)
            }}
            color={`${path === '/' ? 'primary' : 'foreground'}`}
          >
            {i18n[language].navbar.home}
          </Link>
        </NavbarItem>
        <NavbarItem isActive={path === '/sobre-nosotros'}>
          <Link
            onClick={() => {
              navigation('/sobre-nosotros')
              setIsMenuOpen(false)
            }}
            color={`${path === '/sobre-nosotros' ? 'primary' : 'foreground'}`}
          >
            {i18n[language].navbar.about}
          </Link>
        </NavbarItem>
        {isAuth && (
          <NavbarItem isActive={path === '/reservacion'}>
            <Link
              onClick={() => {
                navigation('/reservacion')
                setIsMenuOpen(false)
              }}
              color={`${path === '/reservacion' ? 'primary' : 'foreground'}`}
            >
              {i18n[language].navbar.reservation}
            </Link>
          </NavbarItem>
        )}
        <NavbarItem isActive={path === '/contacto'}>
          <Link
            onClick={() => {
              navigation('/contacto')
              setIsMenuOpen(false)
            }}
            color={`${path === '/contacto' ? 'primary' : 'foreground'}`}
          >
            {i18n[language].navbar.contact}
          </Link>
        </NavbarItem>
        <Divider
          orientation='horizontal'
          className='h-8 hidden	 lg:flex'
        />
        <NavbarItem className=''>
          <Link
            color='secondary'
            onClick={() => {
              changeModalLogin(true)
              setIsMenuOpen(false)
            }}
          >
            {i18n[language].navbar.signin}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color='secondary'
            onClick={() => {
              changeModalRegister(true)
              setIsMenuOpen(false)
            }}
          >
            {i18n[language].navbar.signup}
          </Link>
        </NavbarItem>
      </NavbarMenu>
    </Navbar>
  )
}
