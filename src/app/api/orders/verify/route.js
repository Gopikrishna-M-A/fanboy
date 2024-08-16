// app/api/orders/route.js
import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/options"
import {
  verifyOrder,
} from "@/services/orderService"

// app/api/orders/verify/route.js
export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const orderData = await request.json()
    // console.log("verify route data",orderData);
    const verifiedOrder = await verifyOrder({...orderData,customer:session.user.id})
    return NextResponse.json({ order: verifiedOrder })
  } catch (error) {
    console.error("Failed to verify order:", error)
    return NextResponse.json(
      { error: "Failed to verify order" },
      { status: 500 }
    )
  }
}