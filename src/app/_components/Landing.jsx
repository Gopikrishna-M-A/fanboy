"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import {JerseyCardGrid} from "./JerseyCard"
import ProductCard from "@/components/ProductCard"
import { FaInstagram, FaWhatsapp } from "react-icons/fa"
import CategoryCard from "@/components/CategoryCard"

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

const Landing = ({ teams, jerseys, clubs, international }) => {
  const [activeSlide, setActiveSlide] = useState(0)


  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % jerseys.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [jerseys.length])

  return (
    <div className='md:pb-20 bg-gray-100 '>
      {/* Banner Section */}
      <div className='relative h-52 md:h-96 bg-gray-300'>
        <Image
          layout='fill'
          src='/images/banner/1.jpg'
          alt='Banner'
          className='object-cover object-[center_50%]'
          />
        <div className='absolute inset-0 bg-green-900 bg-opacity-40 flex items-center justify-center w-screen '>
          <Link prefetch href='/products' className="w-1/3 md:w-1/4 mx-auto">
            <Button variant='secondary' className='w-full py-7 rounded-sm bg-opacity-85 bg-green-500 text-green-950 focus:bg-green-400 text-clip font-extrabold'>SHOP NOW</Button>
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
      <div className='mt-6 md:mx-auto max-w-screen-xl md:px-4 md:pb-6 md:pt-16 lg:px-8 lg:pt-10'>
        {/* <h2 className='hidden md:block text-xl pl-4 px-4 font-semibold mb-3'>Shop by Team</h2> */}
        <div className='flex overflow-x-auto pb-2 hide-scrollbar md:grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 md:gap-3 md:overflow-hidden'>
          {teams.map((team, index) => (
            <div key={index} className={`flex-shrink-0 mr-3 ${index == 0 && 'ml-4'} md:ml-0`}>
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
      {/* <h2 className='hidden md:block text-xl px-4 font-semibold mb-3 '>Shop by Category</h2> */}
      <JerseyCardGrid cards={cardsData} />
      </div>

      {/* <div className='hidden md:block md:mx-auto max-w-screen-xl md:px-4 md:pb-6 md:pt-16 lg:px-8 lg:pt-10'>
      <h2 className='text-xl font-semibold mb-3'>Clubs</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {clubs.map((jersey)=>(
         <CategoryCard jersey={jersey}/>
        ))}
      </div>
      <h2 className='text-xl mt-4 font-semibold mb-3'>International</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {international.map((jersey)=>(
         <CategoryCard jersey={jersey}/>
        ))}
      </div>
      </div> */}

      <div className='px-4 md:mx-auto max-w-screen-xl md:px-4 md:pb-6 md:pt-16 lg:px-8 lg:pt-10'>

      {/* <h2 className='hidden md:block text-xl mt-4 font-semibold mb-3'>All</h2> */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {jerseys.map((jersey)=>(
         <ProductCard jersey={jersey}/>
        ))}
      </div>

      </div>

      <div className="py-10 w-full"/>

     

      {/* Footer Section */}
      <footer className='bg-white pb-20 md:hidden '>
        <div className='mx-auto max-w-screen-xl px-4 pb-8 sm:px-6 lg:px-8 lg:pt-24'>
          <div className='mt-16 border-t border-gray-100 pt-5 sm:flex sm:items-center sm:justify-between lg:mt-24'>
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


            <div className="flex justify-between items-center mt-2">
               <div className="w-32 h-14 p-5 relative ml-2">
               <Image
            src='/images/text.png'
            layout="fill"
            objectFit="contain"
            alt='logo text'
           />
               </div>
              <ul className='flex justify-center gap-6 sm:mt-0 lg:justify-end'>
              <li>
                <Link
                  href='https://wa.me/9446931531'
                  target='_blank'
                  className='text-gray-700 transition hover:opacity-75'>
                  <span className='sr-only'>WhatsApp</span>

                  <FaWhatsapp className='h-6 w-6 text-green-500' />
                </Link>
              </li>

              <li>
                <a
                  href='https://www.instagram.com/fnbyjrsy'
                  target='_blank'
                  className='text-gray-700 transition hover:opacity-75'>
                  <span className='sr-only'>Instagram</span>
                  <FaInstagram className='h-6 w-6 text-green-500' />
                </a>
              </li>

            </ul>
            </div>

            
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing
