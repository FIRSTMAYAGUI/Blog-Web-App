"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { buttonVariants, Button } from '../ui/button'
import { ThemeToggle } from './theme-toggle'
import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { toast } from "sonner"
import { SearchInput } from './SearchInput'
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/create', label: 'Create' },
]

export function Navbar() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  async function handleSignOut() {
    await authClient.signOut()
    toast.success("Logged out successfully")
    router.push("/")
  }

  return (
    <nav className='w-full flex px-5 lg:px-10 xl:px-20 py-5 items-center justify-between gap-4 top-0 left-0 right-0 fixed bg-background z-50'>
      <div className='flex items-center gap-4 sm:gap-8'>
        {/* Mobile/tablet menu button — visible lg and below */}
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-72">
            <SheetHeader>
              <SheetTitle>
                <span className='text-blue-500 font-bold text-2xl'>U</span>Blog
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-1 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-medium py-2.5 px-2 rounded-md hover:bg-muted transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/">
          <h1 className='text-3xl font-bold'>
            <span className='text-blue-500 text-4xl'>U</span>Blog
          </h1>
        </Link>

        {/* Desktop nav links — hidden lg and below */}
        <div className='hidden lg:flex items-center gap-6'>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className='flex items-center gap-2'>
        <SearchInput />
        <ThemeToggle />

        <AuthLoading>
          <div className='w-32 h-9 bg-muted animate-pulse rounded-md' />
        </AuthLoading>

        <Authenticated>
          <Button variant='secondary' onClick={handleSignOut}>
            Logout
          </Button>
        </Authenticated>

        <Unauthenticated>
          <Link className={buttonVariants({ variant: 'secondary' })} href="/auth/login">
            Login
          </Link>
          <Link className={buttonVariants()} href="/auth/sign-up">
            Sign up
          </Link>
        </Unauthenticated>
      </div>
    </nav>
  )
}