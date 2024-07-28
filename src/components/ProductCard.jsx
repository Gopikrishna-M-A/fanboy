"use client"
import Link from "next/link"
import Image from "next/image"

const ProductCard = ({ jersey }) => {
  return (
    <Link
      prefetch
      href={`/products/${jersey?._id}`}
      className='block w-full sm:w-64 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg overflow-hidden'>
      <div className='aspect-w-1 aspect-h-1 w-full relative h-52 md:h-60'>
        <Image
          src={jersey?.images[0]}
          width={200}
          height={200}
          className='w-full h-full object-cover p-1 rounded-lg'
          alt={jersey?.name}
        />
      </div>
      <div className='p-4'>
        <div className='font-semibold md:text-lg truncate text-gray-700'>
          {jersey?.team?.name}
        </div>
        <div className='font-semibold text-xs md:text-sm truncate text-gray-500'>
          {jersey?.name}
        </div>
        {/* <p className="text-sm text-gray-600 mb-2 line-clamp-2">{jersey?.description}</p> */}
        {/* <div className="text-xs font-normal text-gray-600 flex gap-3">Grab yours for just <span className='text-gray-800 font-medium'>₹{jersey.price}</span></div> */}
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
