'use client'
import React, { useState } from 'react';
import ProductCard from '@/components/ProductCard'


const ProductsDisplay = ({ jerseys }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJerseys = jerseys.filter(jersey =>
    jersey.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 md:px-20 md:py-10">
      <main className="flex-grow p-4  pb-32">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {jerseys.map(jersey => (
            <ProductCard key={jersey._id} jersey={jersey} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductsDisplay;