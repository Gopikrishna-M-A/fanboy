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
  const { cartTotalQuantity } = useCart()
  return (
    <header className='absolute top-0 left-0 right-0 z-50 bg-white py-4 md:px-4'>
      <div className='container mx-auto px-2 md:px-0 flex justify-between items-center md:max-w-7xl '>
        <div className="">
          <Link href='/' className='cursor-pointer flex gap-2 items-center'>
            <Avatar size={12} className='bg-green-500'>
              <AvatarImage src='/images/logo-w.png' alt='Logo' />
              <AvatarFallback>FJ</AvatarFallback>
            </Avatar>
            {/* <div className='text-2xl font-bold'>Fanboy Jerseys</div> */}
           <Image
            src='/images/text.png'
            width='100'
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
                className='text-sm text-gray-500 hover:text-gray-700'>
                <div>Orders</div>
              </Link>
              <Link href='/cart' className='relative  cursor-pointer'>
                <div className="p-2 text-gray-500 border rounded-full">
                <ShoppingCart size={14} />
                </div>
                {cartTotalQuantity > 0 && (
                  <Badge
                    variant='destructive'
                    className='absolute -top-2 -right-2 '>
                    {cartTotalQuantity}
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
