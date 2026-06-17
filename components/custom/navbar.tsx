"use client"

import Link from 'next/link'
import React from 'react'
import { buttonVariants, Button } from '../ui/button'
import { ThemeToggle } from './theme-toggle'
import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { toast } from "sonner"

export function Navbar() {
  const router = useRouter()

  async function handleSignOut() {
    await authClient.signOut()
    toast.success("Logged out successfully")
    router.push("/")
  }

  return (
    <nav className='w-full flex py-5 items-center justify-between'>
      <div className='flex items-center gap-8'>
        <Link href="/">
          <h1 className='text-3xl font-bold'>
            Blog<span className='text-blue-500'>Pro</span>
          </h1>
        </Link>

        <div className='flex items-center gap-6'>
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/create">Create</Link>
        </div>
      </div>

      <div className='flex items-center gap-2'>
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