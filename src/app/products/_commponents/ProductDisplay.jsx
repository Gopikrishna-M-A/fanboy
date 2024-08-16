'use client'
import React, { useMemo, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import axios from 'axios';
import { useQuery } from "@tanstack/react-query"
import {
  ProductGridSkeleton,
} from "@/components/SkeletonComponents"
import SearchBar from './SearchBar';


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
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    team: '',
    variant: '',
    priceRange: [0, 2000],
  });

  const filteredJerseys = useMemo(() => {
    if (!jerseys) return [];
    return jerseys.filter(jersey => {
      const matchesSearch = (
        jersey.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jersey.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jersey.team.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesCategory = !filters.category || jersey.category === filters.category;
      const matchesTeam = !filters.team || jersey.team.name.toLowerCase().includes(filters.team.toLowerCase());
      const matchesVariant = !filters.variant || jersey.variant === filters.variant;
      const matchesPrice = jersey.price >= filters.priceRange[0] && jersey.price <= filters.priceRange[1];
      
      return matchesSearch && matchesCategory && matchesTeam && matchesVariant && matchesPrice;
    });
  }, [jerseys, searchTerm, filters]);

  if (isError) throw new Error("Failed to fetch jerseys. Please try again later.")
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 md:px-20 md:py-10">
      <main className="flex-grow p-4 pb-32">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {isLoading ? (
        <ProductGridSkeleton />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {filteredJerseys?.map((jersey) => (
            <ProductCard key={jersey._id} jersey={jersey} />
          ))}
        </div>
      )}
      </main>
    </div>
  );
};

export default ProductsDisplay;