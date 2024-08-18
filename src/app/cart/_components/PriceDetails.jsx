import React, { useEffect, useState } from "react"
import { useCart } from "@/contexts/cart"
import axios from "axios"

const PriceDetails = () => {
  const { cart, cartTotalPrice } = useCart()

  const subtotal = cartTotalPrice
  const discount = cart?.discountAmount || 0
  const total = subtotal - discount

  const [coupon, setCoupon] = useState("loading...")

  console.log("cart", cart)

  useEffect(() => {
    const getCoupon = async () => {
      try {
        const res = await axios.get("/api/coupons")
        setCoupon(res.data[0].code)
      } catch (error) {
        console.error(error)
      }
    }
    getCoupon()
  }, [cart?.appliedCoupon])

  return (
    <div className='mt-4 space-y-2'>
      <div className='flex justify-between'>
        <span>Subtotal:</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>
      {discount > 0 && (
        <div className='flex justify-between text-green-600'>
          <span>Discount:</span>
          <span>-₹{discount.toFixed(2)}</span>
        </div>
      )}
      <div className='flex justify-between font-bold'>
        <span>Total:</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
      {cart?.appliedCoupon && (
        <div className='text-sm text-gray-600 mt-2'>
          Applied Coupon: {coupon}
        </div>
      )}
    </div>
  )
}

export default PriceDetails
