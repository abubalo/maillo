import React, { useEffect, useRef, useState } from "react";
import { SearchOptions } from "../../shared/Icons";
import ToolTip from "../tooltip/Tooltip";
import AdvanceSearchOption from "./AdvanceSearchOption";

type SearchProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
};

const Search: React.FC<SearchProps> = ({ searchQuery, onSearchChange }) => {
  const [showAdvanceOptions, setShowAdvanceOptions] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowAdvanceOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search emails"
          value={searchQuery}
          onChange={handleInputChange}
          className="w-full py-2 pl-10 pr-12 text-sm transition duration-150 ease-in-out bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder:text-gray-500 dark:focus-within:bg-gray-200"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {showAdvanceOptions ? null : (
            <ToolTip text="Show options">
              <button
                type="button"
                className="p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                onClick={() => setShowAdvanceOptions(true)}
              >
                <SearchOptions className="w-5 h-5" />
              </button>
            </ToolTip>
          )}
        </div>
      </div>
      <AdvanceSearchOption showAdvanceOptions={showAdvanceOptions} />
    </div>
  );
};

export default Search;
