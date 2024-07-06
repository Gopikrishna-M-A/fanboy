import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryCard = ({ src, alt, text }) => (
  <Link href={`/products/category/${alt}`} className="relative w-full h-64 overflow-hidden rounded-lg">
    <Image
      src={src}
      alt={alt}
      layout="fill"
      objectFit="cover"
      className="transition-transform duration-300 hover:scale-110"
    />
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <h2 className="text-white text-4xl font-bold">{text}</h2>
    </div>
  </Link>
);

const CategoryListing = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CategoryCard
          src="/images/banner/cat.jpg"
          alt="international"
          text="International"
        />
        <CategoryCard
          src="/images/banner/cat.jpg"
          alt="clubs"
          text="Clubs"
        />
      </div>
    </div>
  );
};

export default CategoryListing;