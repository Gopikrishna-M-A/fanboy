"use client"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
const ProductCard = ({ jersey }) => {
  return (
    <Link
      prefetch
      href={`/products/${jersey?._id}`}
      className='block w-full sm:w-64 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg overflow-hidden relative'>
      <div className='aspect-w-1 aspect-h-1 w-full relative h-52 md:h-60'>
        <Image
          src={jersey?.images[0]}
          width={200}
          height={200}
          className={`w-full h-full object-cover p-1 rounded-lg ${
            jersey.stock === 0 && "grayscale"
          }`}
          alt={jersey?.name}
        />
        {jersey.stock === 0 && (
          <div className='absolute  left-0 right-0 top-1/2 bg-neutral-900 bg-opacity-90 py-2 text-center'>
            <span className='text-white font-bold text-sm md:text-base uppercase tracking-wider'>
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <div className='p-4'>
        <div className='font-semibold md:text-lg truncate text-gray-700 uppercase'>
          {jersey?.team?.name}
        </div>
        <div className='font-semibold text-xs md:text-sm truncate text-gray-500'>
          {jersey?.name}
        </div>
        {/* <div className='text-sm flex justify-between items-start mt-1'>
          <div className='text-gray-500 capitalize'>
            {jersey?.category}
          </div>
        </div> */}
        <div className='flex flex-col justify-between items-start mt-1 md:flex-row'>
          <div className="flex justify-between md:justify-normal items-center w-full">
            <span className='font-bold'>₹{jersey.price}</span>
            <span className='text-gray-500 line-through ml-2 text-xs'>
              ₹{jersey.mrp}
            </span>
          </div>
          <span className='bg-green-100 text-green-800 font-bold text-xs px-1.5 py-0.5 rounded ml-auto text-nowrap'>
            {Math.round(((jersey.mrp - jersey.price) / jersey.mrp) * 100)}% Off
          </span>
        </div>
      </div>

      <div className='text-gray-400 flex flex-col uppercase absolute top-5 right-3 '>
            <Badge variant="secondary">{jersey.variant}</Badge>
          </div>
    </Link>
  )
}

export default ProductCard
