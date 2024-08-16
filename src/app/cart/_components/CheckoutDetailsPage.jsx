"use client"
import React, { useState, useEffect } from "react"
import axios from "axios"
import { CreditCard, MapPin, Package, Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/hooks/useAuth"
import { useSession } from "next-auth/react"

const CheckoutDetailsPage = ({setCurrent}) => {
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
  })
  const { user } = useAuth()
  const { data: session } = useSession()

  useEffect(() => {
    // Set default values if user address exists
    if (user && user.address) {
      setFormData({
        street: user.address.street || "",
        city: user.address.city || "",
        state: user.address.state || "",
        zipcode: user.address.zipcode || "",
        phone: user.address.phone || "",
      })
    }
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("formData",formData);
    try {
      const response = await axios.patch("/api/users", { address: formData })

      if (response.status === 200) {
        console.log("Address updated successfully")
        session.user.address = formData
        setCurrent(2)
        // Here you can add further actions like showing a success message or redirecting
      } else {
        console.error("Failed to update address")
        // Handle error cases
      }
    } catch (error) {
      console.error("Error updating address:", error)
      // Handle network errors or other exceptions
    }
  }

  return (
    <div className='max-w-md mx-auto min-h-screen'>
      <form onSubmit={handleSubmit}>
        <Card className='mb-4'>
          <CardHeader>
            <CardTitle className='text-xl font-bold flex items-center'>
              <Package className='mr-2' /> Shipping Address
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
          <div className='space-y-2'>
                <Label htmlFor='phone' className='text-sm font-medium'>
                  <Phone className='h-4 w-4 inline mr-2' />
                  Phone
                </Label>
                <Input
                  id='phone'
                  name='phone'
                  value={formData?.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            <div className='space-y-2'>
              <Label htmlFor='street' className='text-sm font-medium'>
                <MapPin className='h-4 w-4 inline mr-2' />
                Street Address
              </Label>
              <Textarea
                id='street'
                name='street'
                value={formData?.street}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='city' className='text-sm font-medium'>
                  City
                </Label>
                <Input
                  id='city'
                  name='city'
                  value={formData?.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='state' className='text-sm font-medium'>
                  State
                </Label>
                <Input
                  id='state'
                  name='state'
                  value={formData?.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='zipcode' className='text-sm font-medium'>
                Zipcode
              </Label>
              <Input
                id='zipcode'
                name='zipcode'
                value={formData?.zipcode}
                onChange={handleInputChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type='submit' className='w-full'>
              Update Address
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default CheckoutDetailsPage
