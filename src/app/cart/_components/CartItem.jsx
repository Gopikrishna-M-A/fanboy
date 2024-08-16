import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart"

const CartItem = ({ cartItem, index }) => {
  const [quantity, setQuantity] = useState(cartItem.quantity)
  const { updateCart, removeFromCart } = useCart()
  const isOutOfStock = cartItem.jersey.stock === 0

  const handleCartUpdate = (newQuantity) => {
    setQuantity(newQuantity)
    updateCart({
      jerseyId: cartItem.jersey._id,
      quantity: newQuantity,
      size: cartItem.size,
    })
  }

  const handleRemove = () => {
    removeFromCart({
      jerseyId: cartItem.jersey._id,
      size: cartItem.size,
    })
  }

  return (
    <div className={`flex flex-col justify-between px-2 py-2 gap-3 `}>
      <div className='flex gap-3 '>
        <div className='min-w-24 min-h-24 w-24 h-24 flex justify-center items-center p-1 overflow-hidden relative'>
          <Image
            width={70}
            height={70}
            src={cartItem?.jersey?.images && cartItem?.jersey?.images[0]}
          />
          {isOutOfStock && (
            <div className='absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center'>
              <span className='text-white font-bold text-xs text-center px-1 py-0.5 rounded uppercase'>
                Out of <br /> Stock
              </span>
            </div>
          )}
        </div>
        <div className='flex-grow '>
          <div level={4}>{cartItem.jersey.name}</div>
          <p className='text-gray-300 uppercase'>{cartItem?.jersey?.variant}</p>
          <p className='text-gray-300 '>Size {cartItem?.size}</p>
          <div className='text-right w-full'>
            <div level={5}>₹{cartItem?.jersey?.price?.toFixed(2)}</div>
          </div>
        </div>
      </div>
      <Separator />
      <div className='flex justify-end items-center'>
        {/* <Button className='py-1 px-4 text-sm' variant="outline" >Add to wishlist</Button> */}
        <div className='flex gap-5 items-center'>
          <Trash
            className='cursor-pointer rounded-md shadow-sm w-6 h-6 hover:rotate-180 transition-all ease-in-out p-1'
            onClick={handleRemove}
          />
          <div className='bg-gray-100 w-24 h-9 rounded-full p-1 flex items-center justify-between'>
            <button
              onClick={() => handleCartUpdate(Math.max(1, quantity - 1))}
              disabled={isOutOfStock}
              className='w-7 h-7 bg-white rounded-full flex items-center justify-center'>
              -
            </button>
            <div>{quantity}</div>
            <button
              onClick={() => handleCartUpdate(quantity + 1)}
              disabled={isOutOfStock}
              className='w-7 h-7 bg-white rounded-full flex items-center justify-center'>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
