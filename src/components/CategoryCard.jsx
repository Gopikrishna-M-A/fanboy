"use client"
import Link from "next/link"
import Image from "next/image"

const CategoryCard = ({ jersey }) => {
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
        className={'w-full h-full object-cover p-1 rounded-lg'}
        alt={jersey?.name}
      />
      {/* {jersey.stock === 0 && (
        <div className='absolute  left-0 right-0 top-1/2 bg-neutral-900 bg-opacity-90 py-2 text-center'>
          <span className='text-white font-bold text-sm md:text-base uppercase tracking-wider'>
            Out of Stock
          </span>
        </div>
      )} */}
    </div>
    <div className='p-4'>
      <div className='font-semibold md:text-lg truncate text-gray-700 uppercase'>
        {jersey?.team?.name}
      </div>
      <div className='font-semibold text-xs md:text-sm truncate text-gray-500'>
        {jersey?.name}
      </div>
    </div>
  </Link>
  )
}

export default CategoryCard