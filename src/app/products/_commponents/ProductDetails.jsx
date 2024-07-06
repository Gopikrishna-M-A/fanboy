"use client"
import React, { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Shirt,
  Users,
  Flag,
  Package,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart"

const ProductDetails = ({ jersey }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState(jersey.size)
  const [selectedVariant, setSelectedVariant] = useState(jersey.variant)
  const { addToCart } = useCart()

  console.log("jersey",jersey);
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % jersey.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + jersey.images.length) % jersey.images.length
    )
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className='max-w-4xl mx-auto p-4 space-y-6 mb-32'>
      <Card>
        <CardContent className='p-6'>
          <div className='relative aspect-square mb-4'>
            <img
              src={
                jersey.images[currentImageIndex] || "/api/placeholder/400/400"
              }
              alt={jersey.name}
              className='w-full h-full object-cover rounded-lg'
            />
            <Button
              variant='outline'
              size='icon'
              className='absolute left-2 top-1/2 -translate-y-1/2'
              onClick={prevImage}>
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              className='absolute right-2 top-1/2 -translate-y-1/2'
              onClick={nextImage}>
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>

          <h1 className='text-2xl font-bold mb-2'>{jersey.name}</h1>
          <span className='text-gray-600 mb-4'>{jersey.description}</span>

          <div className='flex justify-between items-center mb-4'>
            <div>
              <span className='text-2xl font-bold'>₹{jersey.price}</span>
              <span className='text-gray-500 line-through ml-2'>
                ₹{jersey.mrp}
              </span>
            </div>
            <span className='bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded'>
              {Math.round(((jersey.mrp - jersey.price) / jersey.mrp) * 100)}%
              OFF
            </span>
          </div>

          <div className='space-y-4 mb-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Size
              </label>
              <div className="flex gap-2">
                <Button variant='outline'>S</Button>
                <Button variant='outline'>M</Button>
                <Button variant='outline'>L</Button>
                <Button variant='outline'>XL</Button>
                <Button variant='outline'>XXL</Button>
              </div>
              {/* <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select size' />
                </SelectTrigger>
                <SelectContent>
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Variant
              </label>
              <div className="flex gap-2">
                <Button variant='outline'>First Copy</Button>
                <Button variant='outline'>Player</Button>
                <Button variant='outline'>Master</Button>
              </div>
              {/* <Select
                value={selectedVariant}
                onValueChange={setSelectedVariant}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select variant' />
                </SelectTrigger>
                <SelectContent>
                  {["firstCopy", "master", "player"].map((variant) => (
                    <SelectItem key={variant} value={variant}>
                      {variant}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}
            </div>
          </div>

          <Button className='w-full' size='lg' onClick={()=>addToCart(jersey._id,1)}>
            <ShoppingCart className='mr-2 h-4 w-4' /> Add to Cart
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue='details' className='w-full'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='details'>Details</TabsTrigger>
          <TabsTrigger value='sizeChart'>Size Chart</TabsTrigger>
          <TabsTrigger value='reviews'>Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value='details' className='mt-4'>
          <Card>
            <CardContent className='p-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <div className='flex items-center space-x-3'>
                    <Shirt className='h-6 w-6 text-blue-500'/>
                    <div className="flex flex-col">
                      <span className='text-sm font-medium text-gray-500'>
                        Category
                      </span>
                      <span className='text-lg font-semibold'>{jersey.category}</span>
                    </div>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <Users className='h-6 w-6 text-green-500' />
                    <div className="flex flex-col">
                      <span className='text-sm font-medium text-gray-500'>Team</span>
                      <span className='text-lg font-semibold'>
                        {jersey.team.name}
                      </span>
                    </div>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <Flag className='h-6 w-6 text-red-500' />
                    <div className="flex flex-col">
                      <span className='text-sm font-medium text-gray-500'>
                        Variant
                      </span>
                      <span className='text-lg font-semibold'>{jersey.variant}</span>
                    </div>
                  </div>
                </div>
                <div className='space-y-4'>
                  <div className='flex items-center space-x-3'>
                    <Package className='h-6 w-6 text-purple-500' />
                    <div>
                      <span className='text-sm font-medium text-gray-500'>Stock</span>
                      <div className='text-lg font-semibold'>
                        {jersey.stock} available
                        <Badge variant='outline' className='ml-2'>
                          {jersey.stock > 10 ? "In Stock" : "Low Stock"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <Calendar className='h-6 w-6 text-yellow-500' />
                    <div className="flex flex-col">
                      <span className='text-sm font-medium text-gray-500'>
                        Added on
                      </span>
                      <span className='text-lg font-semibold'>
                        {formatDate(jersey.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-6'>
                <h3 className='text-lg font-semibold mb-2'>Description</h3>
                <span className='text-gray-700'>{jersey.description}</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='sizeChart' className='mt-4'>
          <Card>
            <CardContent className='p-4'>
              <img
                src={jersey.sizeChart || "/api/placeholder/400/300"}
                alt='Size Chart'
                className='w-full h-auto'
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='reviews' className='mt-4'>
          <Card>
            <CardContent className='p-4'>
              <span>Reviews coming soon!</span>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ProductDetails
