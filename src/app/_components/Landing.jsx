"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {JerseyCardGrid} from "./JerseyCard"
import ProductCard from "@/components/ProductCard"
import { FaInstagram, FaWhatsapp } from "react-icons/fa"
import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import { ProductGridSkeleton, TeamGridSkeleton } from "@/components/SkeletonComponents"

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
const fetchJerseys = async () => {
  try {
    const { data } = await axios.get('/api/jerseys');
    return data;
  } catch (error) {
    console.error('Error fetching jerseys:', error.message);
    throw new Error('Failed to fetch jerseys. Please try again later.');
  }
};

const fetchTeams = async () => {
  try {
    const { data } = await axios.get('/api/teams');
    return data;
  } catch (error) {
    console.error('Error fetching teams:', error.message);
    throw new Error('Failed to fetch teams. Please try again later.');
  }
};

const Landing = () => {
  const { data: jerseys, isLoading: jerseysLoading, error: jerseysError } = useQuery({
    queryKey: ['jerseys'],
    queryFn: fetchJerseys,
  })
  const { data: teams, isLoading: teamsLoading, error: teamsError } = useQuery({
    queryKey: ['teams'],
    queryFn: fetchTeams,
  }) 


  if (jerseysError)  throw new Error('Failed to fetch jerseys. Please try again later.');
  if (teamsError) throw new Error('Failed to fetch teams. Please try again later.');



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


      {/* Shop by Category Section */}

      <div className='mt-6 md:mx-auto max-w-screen-xl md:px-4 md:pb-6 md:pt-16 lg:px-8 lg:pt-10'>
        {teamsLoading ? (
          <TeamGridSkeleton />
        ) : (
          <div className='flex overflow-x-auto pb-2 hide-scrollbar md:grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 md:gap-3 md:overflow-hidden'>
            {teams?.map((team, index) => (
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
        )}
      </div>
      


    {!jerseysLoading && <div className='mt-6 md:mx-auto md:max-w-screen-xl md:px-4 md:pb-6 md:pt-16  lg:pt-10 '>
      <JerseyCardGrid cards={cardsData} />
      </div>}
     

      <div className='px-4 md:mx-auto max-w-screen-xl md:px-4 md:pb-6 md:pt-16 lg:px-8 lg:pt-10'>


      <div className='px-4 md:mx-auto max-w-screen-xl md:px-4 md:pb-6 md:pt-16 lg:px-8 lg:pt-10'>
        {jerseysLoading ? (
          <ProductGridSkeleton />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {jerseys?.map((jersey) => (
              <ProductCard key={jersey._id} jersey={jersey} />
            ))}
          </div>
        )}
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
