"use client"
import { useState } from "react"
import { Button } from '@/components/ui/button'
import Cart from "./Cart"
import CheckoutDetailsPage from "./CheckoutDetailsPage"
import Payment from "./Payment"
import { useCart } from "@/contexts/cart"
import Link from "next/link"
import { CircleHelp } from 'lucide-react'

const CartPage = () => {
  const [current, setCurrent] = useState(0)
  const { cart } = useCart()
  const steps = [
    {
      title: "Cart",
      content: <Cart setCurrent={setCurrent} />,
    },
    {
      title: "Address",
      content: <CheckoutDetailsPage setCurrent={setCurrent} />,
    },
    {
      title: "Payment",
      content: <Payment setCurrent={setCurrent} />,
    },
  ]


  return (
    <div className='px-2 py-2 flex flex-col gap-2 items-center '>
      <div className='w-full'>
        <div className='min-w-full'>{steps[current].content}</div>
      </div>
    </div>
  )
}

export default CartPage
