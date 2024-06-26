import React from "react";

type SearchProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
};

const Search: React.FC<SearchProps> = ({ searchQuery, onSearchChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="relative max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search emails"
        value={searchQuery}
        onChange={handleInputChange}
        className="w-full pl-10 pr-4 py-2 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition duration-150 ease-in-out placeholder:text-black dark:placeholder:text-slate-500"
      />
    </div>
  );
};

export default Search;