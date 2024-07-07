'use client'
import React, { useState } from 'react';
import ProductCard from '@/components/ProductCard'


const ProductsDisplay = ({ jerseys }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJerseys = jerseys.filter(jersey =>
    jersey.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <main className="flex-grow overflow-y-auto p-4">
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