'use client'
import React from 'react';
import ProductCard from '@/components/ProductCard';
import axios from 'axios';
import { useQuery } from "@tanstack/react-query"

import {
  ProductGridSkeleton,
} from "@/components/SkeletonComponents"


const fetchJerseysByTeam = async (teamId) => {
  try {
    const { data } = await axios.get(`/api/jerseys?teamId=${teamId}`)
    return data
  } catch (error) {
    console.error("Error fetching jerseys:", error.message)
    throw new Error("Failed to fetch jerseys. Please try again later.")
  }
}

const fetchJerseysByCategory = async (category) => {
  try {
    const { data } = await axios.get(`/api/jerseys?category=${category}`)
    return data
  } catch (error) {
    console.error("Error fetching jerseys:", error.message)
    throw new Error("Failed to fetch jerseys. Please try again later.")
  }
}

const fetchAllJerseys = async () => {
  try {
    const { data } = await axios.get(`/api/jerseys`)
    return data
  } catch (error) {
    console.error("Error fetching jerseys:", error.message)
    throw new Error("Failed to fetch jerseys. Please try again later.")
  }
}

const useJerseys = (queryKey, queryParam) => {
  return useQuery({
    queryKey: [queryKey, queryParam],
    queryFn: async () => {
      switch (queryKey) {
        case 'team':
          return await fetchJerseysByTeam(queryParam);
        case 'category':
          return await fetchJerseysByCategory(queryParam);
        default:
          return await fetchAllJerseys();
      }
    }
  });
};

const ProductsDisplay = ({ queryKey, queryParam }) => {
  const { data: jerseys, isLoading, isError } = useJerseys(queryKey, queryParam);

  if (isError) throw new Error("Failed to fetch jerseys. Please try again later.")
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 md:px-20 md:py-10">
      <main className="flex-grow p-4  pb-32">
      {isLoading ? (
        <ProductGridSkeleton />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {jerseys?.map((jersey) => (
            <ProductCard key={jersey._id} jersey={jersey} />
          ))}
        </div>
      )}
      </main>
    </div>
  );
};

export default ProductsDisplay;