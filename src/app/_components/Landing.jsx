"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import {JerseyCardGrid} from "./JerseyCard"
import ProductCard from "@/components/ProductCard"
import { FaInstagram, FaWhatsapp } from "react-icons/fa"

const Landing = ({ teams, jerseys, clubs, international }) => {
  const [activeSlide, setActiveSlide] = useState(0)
  const cardsData = [
    {
      imageUrl: "/images/banner/cat.jpg",
      title: "Clubs",
      subtitle: "Find your favorite club jerseys",
      path:'club'
    },
    {
      imageUrl: "/images/international.png",
      title: "International",
      subtitle: "Explore national team jerseys",
      path:'international'
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % jerseys.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [jerseys.length])

  return (
    <div className='pb-20 bg-gray-100'>
      {/* Banner Section */}
      <div className='relative h-52 md:h-96 bg-gray-300'>
        <Image
          layout='fill'
          src='/images/bg.jpg'
          alt='Banner'
          className='object-cover object-[center_60%]'
          />
        <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
          <Link prefetch href='/products'>
            <Button variant='secondary'>SHOP NOW</Button>
          </Link>
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
      <div className='mt-6 pl-4 md:mx-auto max-w-screen-xl md:px-4 md:pb-6 md:pt-16 lg:px-8 lg:pt-10'>
        <h2 className='text-xl px-4 pl-0 font-semibold mb-3'>Shop by Team</h2>
        <div className='flex overflow-x-auto pb-2 hide-scrollbar '>
          {teams.map((team, index) => (
            <div key={index} className='flex-shrink-0 mr-3'>
              <Link
                prefetch
                href={`/products/team/${team._id}`}
                className='w-20 h-20 md:w-40 md:h-40 bg-gray-200 rounded-full md:rounded-sm md:p-10 flex items-center justify-center relative shadow-md'>
                <Image
                  layout='fill'
                  src={team.logo}
                  alt={team.name}
                  className='object-cover rounded-full md:rounded-sm'
                />
              </Link>
            </div>
          ))}
        </div>
      </div>


    
      <div className='mt-6 md:mx-auto md:max-w-screen-xl md:px-4 md:pb-6 md:pt-16  lg:pt-10 '>
      <h2 className='text-xl px-4 font-semibold mb-3'>Shop by Category</h2>
      <JerseyCardGrid cards={cardsData} />
      </div>

      <div className='hidden md:block md:mx-auto max-w-screen-xl md:px-4 md:pb-6 md:pt-16 lg:px-8 lg:pt-10'>
      <h2 className='text-xl font-semibold mb-3'>Clubs</h2>
      <div className="flex gap-5 flex-wrap">
        {clubs.map((jersey)=>(
         <ProductCard jersey={jersey}/>
        ))}
      </div>
      <h2 className='text-xl mt-4 font-semibold mb-3'>International</h2>
      <div className="flex gap-5 flex-wrap">
        {international.map((jersey)=>(
         <ProductCard jersey={jersey}/>
        ))}
      </div>
      </div>

      {/* Footer Section */}
      <footer className='bg-white md:hidden'>
        <div className='mx-auto max-w-screen-xl px-4 pb-8 pt-4 sm:px-6 lg:px-8 lg:pt-24'>
          <div className='mt-16 border-t border-gray-100 pt-8 sm:flex sm:items-center sm:justify-between lg:mt-24'>
            <ul className='flex flex-wrap justify-center gap-4 text-xs lg:justify-end'>
              <li>
                <Link
                  href='/terms-and-conditions'
                  className='text-gray-500 transition hover:opacity-75'>
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href='/privacy-policy'
                  className='text-gray-500 transition hover:opacity-75'>
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href='/shipping-and-delivery-policy'
                  className='text-gray-500 transition hover:opacity-75'>
                  Shipping
                </Link>
              </li>

              <li>
                <Link
                  href='/cancellation-and-refund-policy'
                  className='text-gray-500 transition hover:opacity-75'>
                  Refund
                </Link>
              </li>

              <li>
                <Link
                  href='/contact'
                  className='text-gray-500 transition hover:opacity-75'>
                  Contact
                </Link>
              </li>
            </ul>

            <ul className='mt-8 flex justify-center gap-6 sm:mt-0 lg:justify-end'>
              <li>
                <Link
                  href='https://wa.me/9446931531'
                  target='_blank'
                  className='text-gray-700 transition hover:opacity-75'>
                  <span className='sr-only'>WhatsApp</span>

                  <FaWhatsapp className='h-6 w-6' />
                </Link>
              </li>

              <li>
                <a
                  href='https://www.instagram.com/fnbyjrsy'
                  target='_blank'
                  className='text-gray-700 transition hover:opacity-75'>
                  <span className='sr-only'>Instagram</span>
                  <FaInstagram className='h-6 w-6' />
                </a>
              </li>

            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing
