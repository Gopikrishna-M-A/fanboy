import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/options"
import { NextResponse } from "next/server"
import {
  getCouponByCode,
  getCouponsByUser,
  applyCouponToCart,
  removeCouponFromCart,
  createCoupon,
  updateCoupon,
  deleteCoupon
} from '@/services/couponServices'

export async function GET(request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")

  try {
    if (code) {
      const coupon = await getCouponByCode(code)
      return NextResponse.json(coupon)
    } else {
      const coupons = await getCouponsByUser(session.user.email)
      return NextResponse.json(coupons)
    }
  } catch (error) {
    console.error("Failed to fetch coupons:", error)
    return NextResponse.json({ error: "Failed to fetch coupons" }, { status: 500 })
  }
}

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  
  const { couponCode } = await request.json()
  console.log("couponCode route ##",couponCode);
  
  
  try {
    const result = await applyCouponToCart(session.user.id, couponCode)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Failed to apply coupon:", error)
    return NextResponse.json({ error: error.message, details: error.stack }, { status: 400 })
  }
}

export async function DELETE(request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const result = await removeCouponFromCart(session.user.id)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Failed to remove coupon from cart:", error)
    return NextResponse.json({ error: "Failed to remove coupon from cart" }, { status: 500 })
  }
}

// Admin routes for managing coupons
export async function PUT(request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, ...updateData } = await request.json()

  try {
    const updatedCoupon = await updateCoupon(id, updateData)
    return NextResponse.json(updatedCoupon)
  } catch (error) {
    console.error("Failed to update coupon:", error)
    return NextResponse.json({ error: "Failed to update coupon" }, { status: 500 })
  }
}

export async function PATCH(request) {
//   const session = await getServerSession(authOptions)
//   if (!session || !session.user.isAdmin) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//   }

  const couponData = await request.json()

  try {
    const newCoupon = await createCoupon(couponData)
    return NextResponse.json(newCoupon)
  } catch (error) {
    console.error("Failed to create coupon:", error)
    return NextResponse.json({ error: "Failed to create coupon" }, { status: 500 })
  }
}