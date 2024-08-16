"use client"
import React, { useEffect, useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Shirt,
  Users,
  Flag,
  Package,
  Calendar,
  Loader2,
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
import { useRouter } from "next/navigation"
import { signIn, useSession } from "next-auth/react"
import { useQueryClient, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { ProductDetailsSkeleton } from "@/components/SkeletonComponents"

const fetchJersey = async (id) => {
  try {
    const { data } = await axios.get(`/api/jerseys?id=${id}`)
    return data
  } catch (error) {
    console.error("Error fetching jerseys:", error.message)
    throw new Error("Failed to fetch jersey. Please try again later.")
  }
}


const ProductDetails = ({ id }) => {

  const {
    data: jerseyData,
    isLoading: jerseyLoading,
    error: jerseyError,
  } = useQuery({
    queryKey: ["jersey", id],
    queryFn: () => fetchJersey(id),
  })

  const queryClient = useQueryClient()
  const router = useRouter()
  const { data: session } = useSession()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState("S")
  const { addToCart, isLoading } = useCart()
  const [cartButtonClicked, setCartButtonClicked] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(null)

  useEffect(() => {
    if (jerseyData && jerseyData.variant) {
      setSelectedVariant(jerseyData.variant)
    }
  }, [jerseyData])

  if (jerseyError) throw new Error("Failed to fetch jersey. Please try again later.")
  if (jerseyLoading) return <ProductDetailsSkeleton/>

  
  const user = session?.user
  const cartQueryKey = user ? ['cart', user.id] : ['cart', 'anonymous']
  // const currentVariant = jerseyData.variant
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
    setCartButtonClicked(false)
  }

  const handleAddToCart = () => {
    if (user) {
      if (cartButtonClicked) {
        router.push("/cart")
      } else {
        setCartButtonClicked(true)
        const newItem = { 
          jerseyId: jersey._id, 
          quantity: 1, 
          size: selectedSize,
          price: jersey.price  // Include the price
        }
        addToCart(newItem, {
          onMutate: async (newItem) => {
            await queryClient.cancelQueries({ queryKey: cartQueryKey })
            const previousCart = queryClient.getQueryData(cartQueryKey)
            queryClient.setQueryData(cartQueryKey, (old) => ({
              ...old,
              items: [...(old?.items || []), {
                jersey: { _id: newItem.jerseyId, price: newItem.price },
                quantity: newItem.quantity,
                size: newItem.size
              }],
            }))
            return { previousCart }
          },
          onError: (err, newItem, context) => {
            queryClient.setQueryData(cartQueryKey, context.previousCart)
            setCartButtonClicked(false)
          },
          onSettled: () => {
            queryClient.invalidateQueries({ queryKey: cartQueryKey })
          },
        })
      }
    } else {
      signIn()
    }
  }

  return (
    <div className='max-w-7xl mx-auto p-4 space-y-6 mb-32'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <Card className='lg:sticky lg:top-4'>
          <CardContent className='p-6'>
            <div className='relative aspect-square mb-4'>
              <div className='aspect-w-1 aspect-h-1 h-full w-full relative'>
                <Image
                  src={jersey.images[currentImageIndex]}
                  width={400}
                  height={400}
                  className='w-full h-full object-contain object-center'
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
          </CardContent>
        </Card>

        <div className='space-y-6'>
          <Card>
            <CardContent className='p-6'>
              <h1 className='text-3xl font-bold mb-2'>{jersey.name}</h1>
              <p className='text-gray-600 mb-4'>{jersey.description}</p>

              <div className='flex justify-between items-center mb-4'>
                <div>
                  <span className='text-2xl font-bold'>₹{jersey.price}</span>
                  <span className='text-gray-500 line-through ml-2'>
                    ₹{jersey.mrp}
                  </span>
                </div>
                <span className='bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded'>
                  {Math.round(((jersey.mrp - jersey.price) / jersey.mrp) * 100)}
                  % OFF
                </span>
              </div>

              <div className='space-y-4 mb-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Size
                  </label>
                  <div className='flex gap-2'>
                    {["S", "M", "L", "XL", "XXL"].map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        onClick={() => {
                          setSelectedSize(size)
                          setCartButtonClicked(false)
                          }}>
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Variant
                  </label>
                  <div className='flex gap-2'>
                    {Object.keys(jerseyData.variants).map((variant) => (
                      <Button
                        key={variant}
                        variant={
                          selectedVariant === variant ? "default" : "outline"
                        }
                        onClick={() => handleVariantChange(variant)}
                        className='uppercase'>
                        {variant}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
 
              {jersey?.stock === 0 ?  <Button className='w-full' variant='destructive'>
                  Out Of Stock
                </Button> : isLoading ? (
                <Button className='w-full' disabled>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Please wait
                </Button>
              ) : (
                <Button
                  className={`w-full ${
                    cartButtonClicked &&
                    "bg-green-400 hover:bg-green-500 focus:bg-green-600"
                  }`}
                  size='lg'
                  onClick={handleAddToCart}
                  disabled={!selectedSize || jersey.stock < 1}>
                  <ShoppingCart className='mr-2 h-4 w-4' />{" "}
                  {cartButtonClicked ? "Go to cart" : "Add to Cart"}
                </Button>
              )}

              {}
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <div className='flex items-center space-x-3'>
                    <Shirt className='h-6 w-6 text-blue-500' />
                    <div className='flex flex-col'>
                      <span className='text-sm font-medium text-gray-500'>
                        Category
                      </span>
                      <span className='text-lg capitalize'>
                        {jersey.category}
                      </span>
                    </div>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <Users className='h-6 w-6 text-green-500' />
                    <div className='flex flex-col'>
                      <span className='text-sm font-medium text-gray-500'>
                        Team
                      </span>
                      <span className='capitalize'>{jersey.team.name}</span>
                    </div>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <Flag className='h-6 w-6 text-red-500' />
                    <div className='flex flex-col'>
                      <span className='text-sm font-medium text-gray-500'>
                        Variant
                      </span>
                      <span className='uppercase'>{jersey.variant}</span>
                    </div>
                  </div>
                </div>
                <div className='space-y-4'>
                  <div className='flex items-center space-x-3'>
                    <Package className='h-6 w-6 text-purple-500' />
                    <div>
                      <span className='text-sm font-medium text-gray-500'>
                        Stock
                      </span>
                      <div className=''>
                        {jersey.stock} available
                        <Badge variant='outline' className='ml-2'>
                          {jersey.stock > 10 ? "In Stock" : "Low Stock"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <Calendar className='h-6 w-6 text-yellow-500' />
                    <div className='flex flex-col'>
                      <span className='text-sm font-medium text-gray-500'>
                        Added on
                      </span>
                      <span className=''>{formatDate(jersey.updatedAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue='sizeChart' className='w-full'>
        <TabsList className='grid w-full grid-cols-1'>
          <TabsTrigger value='sizeChart'>Size Chart</TabsTrigger>
        </TabsList>
        <TabsContent value='details' className='mt-4'>
          <Card>
            <CardContent className='p-6'>
              <h3 className='text-lg font-semibold mb-2'>Description</h3>
              <p className='text-gray-700'>{jersey.description}</p>
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
                    <TableHead>Length (inches)</TableHead>
                    <TableHead>Sleeve (inches)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>S</TableCell>
                    <TableCell>38</TableCell>
                    <TableCell>26</TableCell>
                    <TableCell>8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>M</TableCell>
                    <TableCell>40</TableCell>
                    <TableCell>27</TableCell>
                    <TableCell>8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>L</TableCell>
                    <TableCell>42</TableCell>
                    <TableCell>28</TableCell>
                    <TableCell>9</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>XL</TableCell>
                    <TableCell>44</TableCell>
                    <TableCell>28</TableCell>
                    <TableCell>9</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>XXL</TableCell>
                    <TableCell>46</TableCell>
                    <TableCell>29</TableCell>
                    <TableCell>10</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>PLAYERS QUALITY VERSION</CardHeader>
            <CardContent className='p-4'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Size</TableHead>
                    <TableHead>Chest (inches)</TableHead>
                    <TableHead>Length (inches)</TableHead>
                    <TableHead>Shoulder (inches)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>S</TableCell>
                    <TableCell>35-36</TableCell>
                    <TableCell>25-26</TableCell>
                    <TableCell>15.5 - 16</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>M</TableCell>
                    <TableCell>37-38</TableCell>
                    <TableCell>26-27</TableCell>
                    <TableCell>16 - 16.5</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>L</TableCell>
                    <TableCell>39-40</TableCell>
                    <TableCell>27-28</TableCell>
                    <TableCell>16.5 - 17</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>XL</TableCell>
                    <TableCell>41-42</TableCell>
                    <TableCell>28-29</TableCell>
                    <TableCell>17 - 17.5</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>XXL</TableCell>
                    <TableCell>43-44</TableCell>
                    <TableCell>29-30</TableCell>
                    <TableCell>17.5 - 18</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        {/* <TabsContent value='reviews' className='mt-4'>
          <Card>
            <CardContent className='p-4'>
              <span>Reviews coming soon!</span>
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  )
}

export default ProductDetails
