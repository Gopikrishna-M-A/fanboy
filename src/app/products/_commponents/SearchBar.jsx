import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative mb-10 md:max-w-[600px]">
      <input
        type="text"
        placeholder="Search jerseys..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    </div>
  );
};

export default SearchBar;