'use client'

import { Button } from '@heroui/button'
import { Link } from '@heroui/link'
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem
} from '@heroui/navbar'
import { ThemeSwitcher } from '../../custom/theme-switcher'
import { ROUTES } from '@/constants/routes'
import { WEBSITE_NAVIGATION } from '@/data/website-navigation'
import { usePathname } from 'next/navigation'

export const AcmeLogo = () => {
  return (
    <svg fill='none' height='36' viewBox='0 0 32 32' width='36'>
      <path
        clipRule='evenodd'
        d='M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z'
        fill='currentColor'
        fillRule='evenodd'
      />
    </svg>
  )
}

export default function Header() {
  const pathname = usePathname()

  return (
    <Navbar disableAnimation isBordered>
      <NavbarContent className='sm:hidden' justify='start'>
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className='pr-3' justify='center'>
        <NavbarBrand>
          <AcmeLogo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden gap-4 sm:flex' justify='center'>
        {WEBSITE_NAVIGATION.map((item, index) => (
          <NavbarItem key={index} isActive={item.href === pathname}>
            <Link color={item.href === pathname ? 'primary' : 'foreground'} href={item.href}>
              {item.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify='end'>
        <NavbarItem className='hidden lg:flex'>
          <Link href={ROUTES.DASHBOARD}>Login</Link>
        </NavbarItem>
        <NavbarItem className='hidden lg:flex'>
          <Button as={Link} color='primary' className='text-foreground' href='#' variant='flat'>
            Sign Up
          </Button>
        </NavbarItem>
        <NavbarItem className='flex'>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {WEBSITE_NAVIGATION.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className='w-full'
              color={index === WEBSITE_NAVIGATION.length - 1 ? 'danger' : 'foreground'}
              href={item.href}
              size='lg'
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
