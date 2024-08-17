"use client"
import { useState } from "react"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Filter } from "lucide-react"
import OrderItem from "./OrderItem"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { OrderItemSkeleton } from "@/components/SkeletonComponents"

const fetchOrders = async () => {
  try {
    const { data } = await axios.get("/api/orders")
    return data
  } catch (error) {
    console.error("Error fetching orders:", error.message)
    throw new Error("Failed to fetch orders. Please try again later.")
  }
}

const OrdersListing = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => fetchOrders(),
  })
  console.log(orders);
  

  const [searchTerm, setSearchTerm] = useState("")
  const filteredOrders = orders?.filter((order) =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.jerseys.some((j) =>
      j.jersey.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className='mx-auto p-4 pb-20 min-h-screen md:px-20 md:py-10'>
      <div className=''>
        <CardHeader className='p-0 py-2'>
          <CardTitle className='text-2xl font-bold'>My Orders</CardTitle>
        </CardHeader>
        <div className='mb-4 flex space-x-2 '>
          <div className='relative flex-grow'>
            <Search className='absolute left-2 top-2.5 h-4 w-4 text-gray-500' />
            <Input
              type='text'
              placeholder='Search orders...'
              className='pl-8'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* <Button variant='outline' size='icon'>
            <Filter className='h-4 w-4' />
          </Button> */}
        </div>
        {/* <ScrollArea className="h-[calc(100vh-200px)] md:hidden">
        {filteredOrders?.map(order => (
          <OrderItem key={order._id} order={order} />
        ))}
      </ScrollArea> */}

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 '>
          {isLoading ? (
            <>
              <OrderItemSkeleton />
              <OrderItemSkeleton />
              <OrderItemSkeleton />
            </>
          ) : (
            filteredOrders?.map((order) => (
              <OrderItem key={order._id} order={order} />
            ))
          )}
        </div>
        {/* <div className="mt-4 text-center">
        <Button variant="ghost" >
          Load More <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div> */}
      </div>
    </div>
  )
}

export default OrdersListing
