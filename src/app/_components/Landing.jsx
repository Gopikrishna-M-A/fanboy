"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import {JerseyCardGrid} from "./JerseyCard"
import ProductCard from "@/components/ProductCard"

const Landing = ({ teams, jerseys, clubs, international }) => {
  const [activeSlide, setActiveSlide] = useState(0)
  const cardsData = [
    {
      imageUrl: "/images/banner/cat.jpg",
      title: "International",
      subtitle: "Explore national team jerseys"
    },
    {
      imageUrl: "/images/banner/cat.jpg",
      title: "Clubs",
      subtitle: "Find your favorite club jerseys"
    },
    // Add more card data as needed
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % jerseys.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [jerseys.length])

  return (
    <div className='pb-20'>
      {/* Banner Section */}
      <div className='relative h-52 md:h-96 bg-gray-300'>
        <Image
          layout='fill'
          src='/images/banner/bg.webp'
          alt='Banner'
          className='object-cover'
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

      {/* International Section */}
      {/* <div className='mt-8 px-4'>
        <Link
          prefetch
          href='/products/category/international'
          className='block relative h-40 rounded-lg overflow-hidden'>
          <Image
            layout='fill'
            src='/images/banner/cat.jpg'
            alt='International Jerseys'
            className='object-cover'
          />
          <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
            <span className='text-white text-4xl font-bold uppercase'>
              International
            </span>
          </div>
        </Link>
      </div> */}

    
      <div className='mt-6 md:hidden'>
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
                  href='#'
                  className='text-gray-500 transition hover:opacity-75'>
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href='#'
                  className='text-gray-500 transition hover:opacity-75'>
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href='#'
                  className='text-gray-500 transition hover:opacity-75'>
                  Cookies
                </Link>
              </li>
            </ul>

            <ul className='mt-8 flex justify-center gap-6 sm:mt-0 lg:justify-end'>
              <li>
                <Link
                  href='#'
                  rel='noreferrer'
                  target='_blank'
                  className='text-gray-700 transition hover:opacity-75'>
                  <span className='sr-only'>Facebook</span>

                  <svg
                    className='h-6 w-6'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                    aria-hidden='true'>
                    <path
                      fillRule='evenodd'
                      d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                      clipRule='evenodd'
                    />
                  </svg>
                </Link>
              </li>

              <li>
                <a
                  href='#'
                  rel='noreferrer'
                  target='_blank'
                  className='text-gray-700 transition hover:opacity-75'>
                  <span className='sr-only'>Instagram</span>

                  <svg
                    className='h-6 w-6'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                    aria-hidden='true'>
                    <path
                      fillRule='evenodd'
                      d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
                      clipRule='evenodd'
                    />
                  </svg>
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
