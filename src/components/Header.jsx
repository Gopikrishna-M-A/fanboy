"use client"
import React from "react"
import { ShoppingBag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/cart"

const Header = () => {
  const router = useRouter()
  const { cart } = useCart()
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div 
          className="text-2xl font-bold cursor-pointer" 
          onClick={() => router.push('/')}
        >
          FJ
        </div>
        <div 
          className="relative cursor-pointer" 
          onClick={() => router.push('/cart')}
        >
          <ShoppingBag size={24} />
          {cart?.items?.length > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 animate-pulse"
            >
              {cart?.items?.length}
            </Badge>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header