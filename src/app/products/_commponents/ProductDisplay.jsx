'use client'
import React, { useMemo, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import axios from 'axios';
import { useQuery } from "@tanstack/react-query"
import {
  ProductGridSkeleton,
} from "@/components/SkeletonComponents"
import { Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";


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
  const [sortOption, setSortOption] = useState('');

  const filteredAndSortedJerseys = useMemo(() => {
    if (!jerseys) return [];
    
    let filtered = jerseys.filter(jersey => {
      const matchesSearch = (
        jersey.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jersey.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jersey.team.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return matchesSearch;
    });

    switch (sortOption) {
      case 'price-low-high':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high-low':
        return filtered.sort((a, b) => b.price - a.price);
      case 'home':
        return filtered.filter(jersey => jersey.name.toLowerCase().includes('home'));
      case 'away':
        return filtered.filter(jersey => jersey.name.toLowerCase().includes('away'));
      default:
        return filtered;
    }
  }, [jerseys, searchTerm, sortOption]);

  if (isError) throw new Error("Failed to fetch jerseys. Please try again later.")
  
  return (
    <div className="flex flex-col min-h-screen md:px-20 md:py-10">
      <main className="flex-grow p-4 pb-32">
      <div className='mb-4 flex space-x-2'>
          <div className='relative flex-grow'>
            <Search className='absolute left-2 top-2.5 h-4 w-4 text-gray-500' />
            <Input
              type='text'
              className='pl-8'
              placeholder="Search jerseys..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='icon'>
                <Filter className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='mr-4'>
              <DropdownMenuLabel>Sort & Filter</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSortOption('price-low-high')}>
                Price: Low to High
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption('price-high-low')}>
                Price: High to Low
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption('home')}>
                Home Jerseys
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption('away')}>
                Away Jerseys
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      {isLoading ? (
        <ProductGridSkeleton />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {filteredAndSortedJerseys?.map((jersey) => (
            <ProductCard key={jersey._id} jersey={jersey} />
          ))}
        </div>
      )}
      </main>
    </div>
  );
};

export default ProductsDisplay;