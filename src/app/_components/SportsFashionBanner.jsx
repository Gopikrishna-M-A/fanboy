import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SportsFashionBanner = () => {
  return (
    <div className="relative h-[200px] md:h-[500px] w-full rounded-lg overflow-hidden">
      <Image
        src="/images/banner/f.png"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        alt="Where Fan Meets Fashion"
        className='rounded-lg'
        // priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-green-800/70 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 lg:p-24 flex flex-col items-start">
        <h2 className="hidden md:block text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-t from-gray-300 via-gray-200 to-gray-50">
          Elevate Your Game
        </h2>
        <p className="hidden md:block text-xl md:text-2xl text-white mb-6 max-w-2xl drop-shadow-lg  text-transparent bg-clip-text bg-gradient-to-t from-gray-300 via-gray-200 to-gray-50">
          Discover performance gear that matches your passion. Style meets function in every piece.
        </p>
        <Link href="/products" prefetch>
          <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-2 text-sm px-3 md:py-4 md:px-8 md:text-xl uppercase tracking-wider rounded-full transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 shadow-lg">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SportsFashionBanner;