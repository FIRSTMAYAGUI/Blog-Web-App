import Link from 'next/link'
import React from 'react'
import { buttonVariants } from '../ui/button'

export function Navbar() {
  return (
    <nav className='w-full flex py-5 items-center justify-between'>
      <div className='flex items-center gap-8'>
        <Link href="/">
          <h1 className='text-3xl font-bold'>
            Blog<span className='text-blue-500'>Pro</span>
          </h1>
        </Link>

        <div className='flex items-center gap-2'>
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/create">Create</Link>
        </div>
      </div>

      <div className='flex items-center gap-2'>
        <Link className={buttonVariants()} href="/auth/sign-up">Sign up</Link>
        <Link className={buttonVariants({variant: 'secondary'})} href="/auth/login">Login</Link>
      </div>
    </nav>
  )
}
