'use client'
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}


const OrderItem = ({ order }) => (
  <Card className='mb-4'>
    <CardContent className='pt-6'>
      <div className='flex justify-between items-center mb-2'>
        <span className='font-semibold'>#{order.orderNumber}</span>
        <Badge variant={order.orderStatus[order.orderStatus.length-1].status === "Delivered" ? "success" : "warning"}>
          {order.orderStatus[order.orderStatus.length-1].status}
        </Badge>
      </div>
      <p className='text-sm text-gray-600 mb-2'>{formatDate(order.orderDate)}</p>
      <div className='flex items-start'>
        <img
          src={order.jerseys[0].jersey.images[0]}
          alt={'product image'}
          className='w-16 h-16 object-contain rounded mr-4'
        />
        <div className='flex flex-col gap-2'>
       {order.jerseys.map((jersey,i)=>(
         <div>
         <p className='font-medium'>{jersey.jersey.name}</p>
         <p className='text-sm text-gray-600'>Variant: {jersey.jersey.variant}</p>
         <p className='text-sm text-gray-600'>Quantity: {jersey.quantity}</p>
         <p className='text-sm text-gray-600'>Size: {jersey.size}</p>
       </div>
       ))}
       </div>
      </div>
      <div className='mt-4 flex justify-between items-center'>
        <span className='font-bold'>₹{order.total.toFixed(2)}</span>
        <Button variant='outline' size='sm'>
          View Details
        </Button>
      </div>
    </CardContent>
  </Card>
)

export default OrderItem
