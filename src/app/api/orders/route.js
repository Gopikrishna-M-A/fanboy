// app/api/orders/route.js
import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/options"
import {
  createOrder,
  getOrderHistory,
} from "@/services/orderService"

// POST: Create a new order
export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const orderData = await request.json()
    const order = await createOrder(orderData)
    return NextResponse.json(order)
  } catch (error) {
    console.error("Failed to create order:", error)
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    )
  }
}

export async function GET(request) {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
    const orderHistory = await getOrderHistory(session.user.id)
    return NextResponse.json(orderHistory)
  } catch (error) {
    console.error("Failed to fetch order history:", error)
    return NextResponse.json(
      { error: "Failed to fetch order history" },
      { status: 500 }
    )
  }
}

