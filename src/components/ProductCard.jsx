'use client'
import Link from 'next/link'
import Image from 'next/image'

const ProductCard = ({ jersey }) => {
  return (
    <Link prefetch href={`/products/${jersey?._id}`} className="block w-full sm:w-64 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg overflow-hidden">
      <div className="aspect-w-1 aspect-h-1 w-full relative">
        <Image 
          src={jersey?.images[0]} 
          width={200}
          height={200} 
          className="w-full h-full object-cover"
          alt={jersey?.name}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">{jersey?.name}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{jersey?.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">{jersey?.category}</span>
          {/* {jersey?.price && (
            <span className="text-sm font-bold text-blue-600">₹{jersey.price}</span>
          )} */}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard