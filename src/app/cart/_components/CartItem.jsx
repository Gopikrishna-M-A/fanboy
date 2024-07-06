import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart"

const CartItem = ({ cartItem, index }) => {


  const { addToCart, removeFromCart } = useCart()

//   const removeCartItem = async () => {
//     removeFromCart(cartItem.product._id, user._id)
//   }

  return (
    <div
      className={`flex flex-col justify-between px-2 py-2 gap-3`}>
      <div className='flex gap-3'>
        <div className='bg-gray-100 min-w-24 min-h-24 w-24 h-24 rounded-3xl flex justify-center items-center p-1 overflow-hidden'>
          {/* <Image
            preview={false}
            width={70}
            height={70}
            src={cartItem.jersey.images[0]}
          /> */}
        </div>
        <div className='flex-grow '>
          <div level={4}>{cartItem.jersey.name}</div>
          <p className='text-gray-300 '>{cartItem.jersey.team.name}</p>
          <div className='text-right w-full'>
            <div level={5}>₹{cartItem.jersey.price.toFixed(2)}</div>
          </div>
        </div>
      </div>
      <Separator/>
      <div className='flex justify-end items-center'>
        {/* <Button className='py-1 px-4 text-sm' variant="outline" >Add to wishlist</Button> */}
        <div className='flex gap-5 items-center'>
        <Trash onClick={()=>removeFromCart(cartItem.jersey._id)}/>
          <div className='bg-gray-100 w-24 h-9 rounded-full p-1 flex items-center justify-between'>
            <div
              onClick={() => {
                if (cartItem.quantity > 1) {
                  addToCart(
                    cartItem.jersey._id,
                    - 1
                  )
                }
              }}
              className='w-7 h-7 bg-white rounded-full flex items-center justify-center'>
              -
            </div>
            <div>{cartItem.quantity}</div>
            <div
              onClick={() => {
                addToCart(
                  cartItem.jersey._id,
                  1
                )
              }}
              className='w-7 h-7 bg-white rounded-full flex items-center justify-center'>
              +
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
