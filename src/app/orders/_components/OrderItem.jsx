"use client"
import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const formatTime = (dateString) => {
  const options = { 
    day: '2-digit', 
    month: 'short', 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  };
  return new Date(dateString).toLocaleString('en-US', options);
};

const OrderItem = ({ order }) => {
  const lastStatus = order.orderStatus[order.orderStatus.length - 1]
  return (
    <Card className='mb-4'>
      <CardContent className='pt-6'>
        <div className='flex justify-between items-center mb-2'>
          <span className='font-semibold'>#{order.orderNumber}</span>
          <Badge
            variant={
              order.orderStatus.some((status) => status.status === "Cancelled")
                ? "destructive"
                : "outline"
            }>
            {lastStatus.status}
          </Badge>
        </div>
        <p className='text-sm text-gray-600 mb-2'>
          {formatDate(order.orderDate)}
        </p>
        <div className='flex items-center'>
          <div className='flex flex-col gap-2'>
            {order.jerseys.map((jersey, i) => (
              <div className='flex gap-1 items-center'>
                <img
                  src={jersey.jersey.images[0]}
                  alt={"product image"}
                  className='w-16 h-16 object-contain rounded mr-4'
                />
                <div>
                  <p className='font-medium'>{jersey.jersey.name}</p>
                  <p className='text-sm text-gray-600'>
                    Variant: {jersey.jersey.variant}
                  </p>
                  <p className='text-sm text-gray-600'>
                    Quantity: {jersey.quantity}
                  </p>
                  <p className='text-sm text-gray-600'>Size: {jersey.size}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='mt-4 flex flex-col gap-2'>
          <span className='font-bold text-right text-xl'>₹{order.total.toFixed(2)}</span>
          <div className=''>  
            <p className='text-sm text-gray-600'>{lastStatus.desc}</p>
            <span className="text-xs text-gray-300">updated {formatTime(lastStatus.timestamp)}</span>  
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default OrderItem
