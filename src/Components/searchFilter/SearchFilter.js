import React, { useState, useEffect } from 'react';
import { Search } from 'react-feather';

const SearchFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('all');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterOption(value);
    onFilter(value);
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition duration-150 ease-in-out"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
        <span className="text-sm font-medium text-gray-700">Filter by age:</span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setFilterOption('all');
              onFilter('all');
            }}
            className={`px-3 py-1 text-xs sm:text-sm rounded-full transition-colors ${filterOption === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            All
          </button>
          <button
            onClick={() => {
              setFilterOption('young');
              onFilter('young');
            }}
            className={`px-3 py-1 text-xs sm:text-sm rounded-full transition-colors ${filterOption === 'young' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Under 18
          </button>
          <button
            onClick={() => {
              setFilterOption('adult');
              onFilter('adult');
            }}
            className={`px-3 py-1 text-xs sm:text-sm rounded-full transition-colors ${filterOption === 'adult' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            18-60
          </button>
          <button
            onClick={() => {
              setFilterOption('senior');
              onFilter('senior');
            }}
            className={`px-3 py-1 text-xs sm:text-sm rounded-full transition-colors ${filterOption === 'senior' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Over 60
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;