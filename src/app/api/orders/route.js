// app/api/orders/route.js
import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/options"
import {
  getOrderHistory,
} from "@/services/orderService"



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

