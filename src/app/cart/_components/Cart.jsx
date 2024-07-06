"use client"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import CartItem from "./CartItem"
import PriceDetails from "./PriceDetails"
import { useCart } from "@/contexts/cart"
import { CircleHelp, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Cart = ({ setCurrent }) => {
  const { cart, cartTotalPrice } = useCart()

  return (
    <div>
      <Card className='mb-4'>
        <CardHeader>
          <CardTitle className='text-xl font-bold flex items-center gap-1'>
              <ShoppingCart className='mr-2' />
              <span>Your Cart</span>
              <span className='text-sm text-gray-400'>
              ({cart?.items?.length || 0})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {cart?.items?.map((cartItem, index) => (
            <div className='rounded-3xl bg-white'>
              <CartItem
                index={index == cart?.jerseys?.length - 1 ? true : false}
                key={cartItem._id}
                cartItem={cartItem}
              />
            </div>
          ))}
        </CardContent>
        <CardFooter className='flex justify-between items-center'>
          <div className='text-lg font-bold'>
            Total: ₹{cartTotalPrice.toFixed(2)}
          </div>
          <Button onClick={()=>setCurrent(1)}>
            Checkout
          </Button>
        </CardFooter>
      </Card>
      <div className='flex justify-end items-end w-full'>
        <Link href={"mailto:fanboysale@gmail.com"}>
          <Button className='py-1 px-4 text-sm' variant='outline'>
            {" "}
            <CircleHelp className='mr-2 h-4 w-4' /> Need Help?
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Cart
