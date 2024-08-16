"use client"

import React, { useEffect, useState } from "react"
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
import { CircleHelp, Loader2, ShoppingCart, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CartItemSkeleton } from "@/components/SkeletonComponents"

const Cart = ({ setCurrent }) => {
  const { cart, cartTotalPrice, applyCoupon, removeCoupon, error, isLoading } =
    useCart()
  const [couponCode, setCouponCode] = useState("")
  const [couponLoading, setCouponLoading] = useState(false)
  // const [couponError, setCouponError] = useState('')
  const hasOutOfStockItems = cart?.items?.some(
    (item) => item?.jersey?.stock === 0
  )

  useEffect(() => {
    if (cart?.appliedCoupon) {
      removeCoupon()
    }
  }, [cartTotalPrice])

  const handleApplyCoupon = async () => {
    try {
      setCouponLoading(true)
      await applyCoupon(couponCode)
      setCouponCode("")
      // setCouponError('')
    } catch (error) {
      // setCouponError(error.message)
    } finally {
      setCouponLoading(false)
    }
  }

  const handleRemoveCoupon = async () => {
    try {
      await removeCoupon()
      // setCouponError('')
    } catch (error) {
      // setCouponError(error.message)
    }
  }

  return (
    <div>
      <Card className='mb-4 max-w-md mx-auto'>
        <CardHeader>
          <CardTitle className='text-xl font-bold flex items-center gap-1'>
            <ShoppingCart className='mr-2' />
            <span>Your Cart</span>
            <span className='text-sm text-gray-400'>
              ({cart?.items?.length || 0})
            </span>
          </CardTitle>
          {hasOutOfStockItems && (
            <Alert variant='destructive' className='mt-2 max-w-md mx-auto'>
              <AlertDescription>
                Some items in your cart are out of stock. Please remove them to
                proceed with checkout.
              </AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <>
              <CartItemSkeleton />
            </>
          ) : (
            cart?.items?.map((cartItem, index) => (
              <div key={cartItem?._id} className='rounded-3xl bg-white'>
                <CartItem
                  index={index === cart?.items?.length - 1}
                  cartItem={cartItem}
                />
              </div>
            ))
          )}

          <div className='mt-4'>
            <div className='flex items-center gap-2'>
              <Input
                type='text'
                placeholder='Enter coupon code'
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              {couponLoading ? (
                <Button disabled>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Applying
                </Button>
              ) : (
                <Button onClick={handleApplyCoupon} disabled={!couponCode}>
                  Apply
                </Button>
              )}
            </div>
            {error && (
              <Alert variant='destructive' className='mt-2'>
                <AlertDescription>{error?.message}</AlertDescription>
              </Alert>
            )}
            {cart?.appliedCoupon && (
              <div className='mt-2 flex items-center justify-between bg-green-100 p-2 rounded'>
                <span className='flex items-center'>
                  <Tag className='mr-2 h-4 w-4' />
                  Coupon applied: {cart?.appliedCoupon?.code}
                </span>
                <Button variant='ghost' size='sm' onClick={handleRemoveCoupon}>
                  Remove
                </Button>
              </div>
            )}
          </div>

          <PriceDetails
            subtotal={cartTotalPrice}
            discount={cart?.discountAmount || 0}
            total={cartTotalPrice - (cart?.discountAmount || 0)}
          />
        </CardContent>
        <CardFooter className='flex justify-between items-center'>
          <div className='text-lg font-bold'>
            Total: ₹{(cartTotalPrice - (cart?.discountAmount || 0)).toFixed(2)}
          </div>
          <Button onClick={() => setCurrent(1)} disabled={hasOutOfStockItems}>
            {hasOutOfStockItems ? "Items Out of Stock" : "Checkout"}
          </Button>
        </CardFooter>
      </Card>

      <div className='flex justify-end items-end w-full'>
        <Link href={"mailto:fanboysale@gmail.com"}>
          <Button className='py-1 px-4 text-sm' variant='outline'>
            <CircleHelp className='mr-2 h-4 w-4' /> Need Help?
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Cart
