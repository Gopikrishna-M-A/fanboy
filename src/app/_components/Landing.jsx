'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Landing = ({ teams }) => {
  return (
    <div className="pb-20">
      {/* Banner Section */}
      <div className="relative h-52 bg-gray-300">
        <Image layout="fill" src="/images/banner/bg.webp" alt="Banner" className="object-cover" />
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
                <Image layout="fill" src={`/images/team/${index + 1}.png`} alt={team.name} className="object-cover rounded-full" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* International Section */}
      <div className="mt-8 px-4">
        <Link href="/products/category/international" className="block relative h-40 rounded-lg overflow-hidden">
          <Image layout="fill" src="/images/banner/cat.jpg" alt="International Jerseys" className="object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">International Jerseys</span>
          </div>
        </Link>
      </div>

      {/* Clubs Section */}
      <div className="mt-8 px-4">
        <Link href="/products/category/clubs" className="block relative h-40 rounded-lg overflow-hidden">
          <Image layout="fill" src="/images/banner/cat.jpg" alt="Club Jerseys" className="object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">Club Jerseys</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Landing