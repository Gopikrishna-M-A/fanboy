"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"
const notFound = () => {
  return (
    <div class='grid h-screen place-content-center bg-white px-4'>
      <div class='text-center'>
        <h1 class='text-9xl font-black text-gray-200'>404</h1>

        <p class='text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Uh-oh!
        </p>

        <p class='mt-4 text-gray-500'>We can't find that page.</p>

        <Link href='/'>
          <Button className='mt-2'> Go Back Home</Button>
        </Link>
      </div>
    </div>
  )
}

export default notFound
