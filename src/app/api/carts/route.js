import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/options"
import { NextResponse } from "next/server"
import {
  getCartByUserId,
  upsertCartItem,
  removeFromCart,
  clearCart
} from '@/services/cartService'

export async function GET(request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const cart = await getCartByUserId(session.user.id)
    return NextResponse.json(cart)
  } catch (error) {
    console.error("Failed to fetch cart:", error)
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 })
  }
}

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { jerseyId, quantity, size } = await request.json()

  try {
    const cart = await upsertCartItem(session.user.id, jerseyId, quantity, size)
    return NextResponse.json(cart)
  } catch (error) {
    console.error("Failed to add/update item in cart:", error)
    return NextResponse.json({ error: "Failed to add/update item in cart" }, { status: 500 })
  }
}

export async function DELETE(request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const jerseyId = searchParams.get("id")
  const size = searchParams.get("size")

  try {
    if (jerseyId) {
      const cart = await removeFromCart(session.user.id, jerseyId, size)
      return NextResponse.json(cart)
    } else {
      const result = await clearCart(session.user.id)
      return NextResponse.json({ message: "Cart cleared successfully", result })
    }
  } catch (error) {
    console.error("Failed to remove from cart:", error)
    return NextResponse.json({ error: "Failed to remove from cart" }, { status: 500 })
  }
}