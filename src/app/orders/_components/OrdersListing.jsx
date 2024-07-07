'use client'
import React, { useEffect } from 'react';
import { useState } from 'react';
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, Search, Filter } from 'lucide-react';
import OrderItem from "./OrderItem"
import axios from 'axios';

const OrdersListing = () => {
  const [orders,setOrders] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [loading,setLoading] = useState(false)

  const getOrders = async () => {
    setLoading(true)
    try {
        const res = await axios.get('/api/orders');
        const data = res.data;
        setOrders(data)
    } catch (error) {
      console.error("Error fetching orders:", error.message);
      throw error;
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
      getOrders()
  },[])

  const filteredOrders = orders?.filter(order => 
    order.orderNumber.includes(searchTerm) ||
    order.jerseys.some(j => j.jersey.toLowerCase().includes(searchTerm.toLowerCase()))
);




  return (
    <div className="max-w-md mx-auto p-4 bg-gray-50 min-h-screen">
      <CardHeader className='p-0 py-2'>
        <CardTitle className="text-2xl font-bold">My Orders</CardTitle>
      </CardHeader>
      <div className="mb-4 flex space-x-2">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search orders..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-200px)]">
        {filteredOrders?.map(order => (
          <OrderItem key={order._id} order={order} />
        ))}
      </ScrollArea>
      {/* <div className="mt-4 text-center">
        <Button variant="ghost" className="text-blue-600">
          Load More <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div> */}
    </div>
  );
};

export default OrdersListing;







