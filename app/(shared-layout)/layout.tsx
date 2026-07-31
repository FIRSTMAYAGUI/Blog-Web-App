import { Navbar } from '@/components/custom/navbar'
import { Toaster } from '@/components/ui/sonner';
import React from 'react'

function SharedLayout({children} : {children: React.ReactNode;}) {
  return (
    <>
      <Navbar/>
      <Toaster/>
      <div className='mt-12'>
        {children}
      </div>
    </>
  )
}

export default SharedLayout