'use client'
import { Star } from 'lucide-react'
import Link from 'next/link'

const ProductCard = ({jersey}) => {
  return (
    <Link href={`/products/${jersey?._id}`} className="flex flex-col w-40 bg-white shadow-md rounded-lg overflow-hidden m-2">
      <img src={jersey.images[0]} alt={jersey?.name} className="w-full h-40 object-contain" />
      <div className="p-2">
        <h3 className="font-semibold text-sm truncate">{jersey?.name}</h3>
        <p className="text-xs text-gray-500">{jersey?.category}</p>
        {/* <div className="flex items-center mt-1">
          <Star size={12} className="text-yellow-400 fill-current" />
          <span className="text-xs ml-1">{4.9} (136)</span>
        </div> */}
        <div className="">
          {/* <span className="text-sm font-bold">₹{jersey?.discountedPrice}</span>
          <span className="text-xs text-gray-500 line-through ml-2">₹{jersey?.mrp}</span> */}
          <span className="text-xs text-gray-300 line-clamp-2">{jersey?.description}</span>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard