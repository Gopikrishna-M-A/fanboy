"use client"
import Link from "next/link"
import Image from "next/image"

const ProductCard = ({ jersey }) => {
  return (
    <Link
      prefetch
      href={`/products/${jersey?._id}`}
      className='block w-full sm:w-64 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg overflow-hidden relative'
    >
      <div className='aspect-w-1 aspect-h-1 w-full relative h-52 md:h-60'>
        <Image
          src={jersey?.images[0]}
          width={200}
          height={200}
          className={`w-full h-full object-cover p-1 rounded-lg ${jersey.stock === 0 && 'grayscale'}`}
          alt={jersey?.name}
        />
        {jersey.stock === 0 && (
          <div className="absolute  left-0 right-0 top-1/2 bg-neutral-900 bg-opacity-90 py-2 text-center">
          <span className="text-white font-bold text-sm md:text-base uppercase tracking-wider">
            Out of Stock
          </span>
        </div>
        )}
      </div>
      <div className='p-4'>
        <div className='font-semibold md:text-lg truncate text-gray-700'>
          {jersey?.team?.name}
        </div>
        <div className='font-semibold text-xs md:text-sm truncate text-gray-500'>
          {jersey?.name}
        </div>
        <div className='flex justify-between items-start'>
          <div className='text-xs md:text-sm text-gray-500 md:text-gray-500'>
            {jersey?.category}
          </div>
          <div className='text-xs font-light text-gray-400 flex flex-col '>
            <span>From</span>{" "}
            <span className='text-gray-800 font-medium'>₹{jersey.price}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard