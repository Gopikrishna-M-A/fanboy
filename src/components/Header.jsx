"use client"
import Link from "next/link"
import React from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/useAuth"
import { signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart"
import Image from "next/image"

const Header = () => {
  const { user } = useAuth()
  const { cart } = useCart()
  return (
    <header className='fixed top-0 left-0 right-0 bg-green-500 shadow-md z-50'>
      <div className='container mx-auto px-4 flex justify-between items-center'>
        <div className="">
          <Link href='/' className='cursor-pointer flex  items-center'>
            <Avatar className='h-16 w-16'>
              <AvatarImage src='/images/logo-w.png' alt='Logo' />
              <AvatarFallback>FJ</AvatarFallback>
            </Avatar>
            {/* <div className='text-2xl font-bold'>Fanboy Jerseys</div> */}
           <Image
            src='/images/text.png'
            width='130'
            height='100'
            alt='logo text'
           />
          </Link>
        </div>
        <div className='hidden md:block'>
          {user ? (
            <div className='flex items-center gap-5 '>
              <Link
                href='/orders'
                className='text-white hover:font-bold transition-all ease-in-out'>
                <div>Orders</div>
              </Link>
              <Link href='/cart' className='relative text-white cursor-pointer'>
                <ShoppingCart size={24} />
                {cart?.items?.length && (
                  <Badge
                    variant='destructive'
                    className='absolute -top-2 -right-2 '>
                    {cart.items.length}
                  </Badge>
                )}
              </Link>
              <Link href='/profile'>
                <Avatar className='h-10 w-10'>
                  <AvatarImage src={user.image} alt='Logo' />
                  <AvatarFallback>FJ</AvatarFallback>
                </Avatar>
              </Link>
            </div>
          ) : (
            <div className='flex items-center gap-4'>
              <Button variant='outline' size='sm' onClick={() => signIn()}>
                Sign In
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
