'use client'
import React from 'react'
import ProductCard from '@/components/ProductCard'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Landing = ({teams}) => {
  // Mock data for categories and products
  const jerseys = [
    { _id: 1, image: '/images/product/1.png', name: 'Wireless Earbuds', category: 'Electronics', reviews: 120, mrp: 99.99, discountedPrice: 79.99 },
    { _id: 2, image: '/images/product/2.png', name: 'Smart Watch', category: 'Electronics', reviews: 85, mrp: 199.99, discountedPrice: 159.99 },
    // Add more products as needed
  ]

  return (
    <div className="pb-20"> {/* Add bottom padding to account for footer navigation */}

      {/* Banner Section */}
      <div className="relative h-52 bg-gray-300">
        <Image layout='fill' src="/images/banner/bg.webp" alt="Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <Link href='/products'><Button variant="secondary">SHOP NOW</Button></Link>
        </div>
      </div>

      {/* Shop by Category Section */}
      <div className="mt-6 px-4">
        <h2 className="text-xl font-semibold mb-3">Shop by Team</h2>
        <div className="flex overflow-x-auto pb-2 hide-scrollbar">
          {teams.map((team, index) => (
            <div key={index} className="flex-shrink-0 mr-3">
              <Link href={`/products/team/${team._id}`} className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center relative">
               <Image layout='fill' src={`/images/team/${index + 1}.png`} alt="Banner" className="w-full h-full object-cover" />
                {/* <span className="text-sm text-center">{team.name}</span> */}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Curated for You Section */}
      <div className="mt-8 px-4">
        <h2 className="text-xl font-semibold mb-3">Curated for You</h2>
        <div className="overflow-x-auto hide-scrollbar">
          <div className="flex">
            {jerseys.map(jersey => (
              <div key={jersey.id} className="flex-shrink-0 mr-4">
                <ProductCard jersey={jersey} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing