'use client'
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
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart"
import Image from "next/image"

const ProductDetails = ({ jerseyData }) => {
  // console.log("jerseyData",jerseyData);
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedVariant, setSelectedVariant] = useState(jerseyData.variant)
  const { addToCart } = useCart()

  const jersey = jerseyData.variants[selectedVariant] || jerseyData

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

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant)
    setSelectedSize("")  // Reset size when changing variant
  }

  return (
    <div className='max-w-4xl mx-auto p-4 space-y-6 mb-32'>
      <Card>
        <CardContent className='p-6'>
          <div className='relative aspect-square mb-4'>
          <div className="aspect-w-1 aspect-h-1 w-full relative">
               <Image 
          src={jersey.images[currentImageIndex]} 
          width={200}
          height={200}
          className="w-full h-full object-cover"
          alt={jersey?.name}
        />
        </div>
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
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <Button 
                    key={size} 
                    variant={selectedSize === size ? 'default' : 'outline'}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Variant
              </label>
              <div className="flex gap-2">
                {Object.keys(jerseyData.variants).map((variant) => (
                  <Button 
                    key={variant} 
                    variant={selectedVariant === variant ? 'default' : 'outline'}
                    onClick={() => handleVariantChange(variant)}
                    className='uppercase'
                  >
                    {variant}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <Button 
            className='w-full' 
            size='lg' 
            onClick={() => addToCart(jersey._id, 1,selectedSize)}
            disabled={!selectedSize}
          >
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
                      <span className='text-lg font-semibold uppercase'>{jersey.category}</span>
                    </div>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <Users className='h-6 w-6 text-green-500' />
                    <div className="flex flex-col">
                      <span className='text-sm font-medium text-gray-500'>Team</span>
                      <span className='text-lg font-semibold uppercase'>
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
                      <span className='text-lg font-semibold uppercase'>{jersey.variant}</span>
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
              {/* <div className='mt-6'>
                <h3 className='text-lg font-semibold mb-2'>Description</h3>
                <span className='text-gray-700'>{jersey.description}</span>
              </div> */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='sizeChart' className='mt-4 flex flex-col gap-4'>
          <Card>
            <CardHeader>FIRSTCOPY & MASTER VERSION</CardHeader>
            <CardContent className='p-4'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Size</TableHead>
                    <TableHead>Width (inches)</TableHead>
                    <TableHead>Width (cm)</TableHead>
                    <TableHead>Length (inches)</TableHead>
                    <TableHead>Length (cm)</TableHead>
                    <TableHead>Sleeve (inches)</TableHead>
                    <TableHead>Sleeve (cm)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>S</TableCell>
                    <TableCell>38</TableCell>
                    <TableCell>97</TableCell>
                    <TableCell>26</TableCell>
                    <TableCell>68</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>20</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>M</TableCell>
                    <TableCell>40</TableCell>
                    <TableCell>102</TableCell>
                    <TableCell>27</TableCell>
                    <TableCell>69</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>21</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>L</TableCell>
                    <TableCell>42</TableCell>
                    <TableCell>107</TableCell>
                    <TableCell>28</TableCell>
                    <TableCell>71</TableCell>
                    <TableCell>9</TableCell>
                    <TableCell>22</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>XL</TableCell>
                    <TableCell>44</TableCell>
                    <TableCell>112</TableCell>
                    <TableCell>28</TableCell>
                    <TableCell>72</TableCell>
                    <TableCell>9</TableCell>
                    <TableCell>23</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>XXL</TableCell>
                    <TableCell>46</TableCell>
                    <TableCell>117</TableCell>
                    <TableCell>29</TableCell>
                    <TableCell>73</TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>25</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>PLAYER VERSION</CardHeader>
            <CardContent className='p-4'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Size</TableHead>
                    <TableHead>Width (inches)</TableHead>
                    <TableHead>Width (cm)</TableHead>
                    <TableHead>Length (inches)</TableHead>
                    <TableHead>Length (cm)</TableHead>
                    <TableHead>Sleeve (inches)</TableHead>
                    <TableHead>Sleeve (cm)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>S</TableCell>
                    <TableCell>38</TableCell>
                    <TableCell>97</TableCell>
                    <TableCell>26</TableCell>
                    <TableCell>68</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>20</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>M</TableCell>
                    <TableCell>40</TableCell>
                    <TableCell>102</TableCell>
                    <TableCell>27</TableCell>
                    <TableCell>69</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>21</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>L</TableCell>
                    <TableCell>42</TableCell>
                    <TableCell>107</TableCell>
                    <TableCell>28</TableCell>
                    <TableCell>71</TableCell>
                    <TableCell>9</TableCell>
                    <TableCell>22</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>XL</TableCell>
                    <TableCell>44</TableCell>
                    <TableCell>112</TableCell>
                    <TableCell>28</TableCell>
                    <TableCell>72</TableCell>
                    <TableCell>9</TableCell>
                    <TableCell>23</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>XXL</TableCell>
                    <TableCell>46</TableCell>
                    <TableCell>117</TableCell>
                    <TableCell>29</TableCell>
                    <TableCell>73</TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>25</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
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
