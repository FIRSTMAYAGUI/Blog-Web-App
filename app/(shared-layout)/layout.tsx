import { Navbar } from '@/components/custom/navbar'
import React from 'react'

function SharedLayout({children} : {children: React.ReactNode;}) {
  return (
    <>
        <Navbar/>
        {children}
    </>
  )
}

export default SharedLayout