'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react';

const Landing = ({ teams,jerseys }) => {

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % jerseys.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [jerseys.length]);

  return (
    <div className="pb-20">
      {/* Banner Section */}
      <div className="relative h-52 bg-gray-300">
        <Image layout="fill" src="/images/banner/bg.webp" alt="Banner" className="object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <Link prefetch href='/products'><Button variant="secondary">SHOP NOW</Button></Link>
        </div>
      </div>

  {/* <div className="relative h-96 bg-gray-300 overflow-hidden">
        {jerseys.map((product, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image layout="fill" src={product.images[0]} alt={product.name} className="object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white text-center">
              <div className="text-3xl font-bold mb-4">
                <h1>{product.name}</h1>
              </div>
              <Link href={`/products/${product._id}`}>
                <Button variant="secondary" className="flex items-center">
                  <ShoppingCart className="mr-2" />
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div> */}

      {/* Shop by Category Section */}
      <div className="mt-6 px-4">
        <h2 className="text-xl font-semibold mb-3">Shop by Team</h2>
        <div className="flex overflow-x-auto pb-2 hide-scrollbar">
          {teams.map((team, index) => (
            <div key={index} className="flex-shrink-0 mr-3">
              <Link prefetch href={`/products/team/${team._id}`} className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center relative">
                <Image layout="fill" src={team.logo} alt={team.name} className="object-cover rounded-full" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* International Section */}
      <div className="mt-8 px-4">
        <Link prefetch href="/products/category/international" className="block relative h-40 rounded-lg overflow-hidden">
          <Image layout="fill" src="/images/banner/cat.jpg" alt="International Jerseys" className="object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-4xl font-bold uppercase">International</span>
          </div>
        </Link>
      </div>

      {/* Clubs Section */}
      <div className="mt-8 px-4">
        <Link prefetch href="/products/category/club" className="block relative h-40 rounded-lg overflow-hidden">
          <Image layout="fill" src="/images/banner/cat.jpg" alt="Club Jerseys" className="object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-4xl  font-bold uppercase">Clubs</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Landing
