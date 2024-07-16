import React from "react";

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  handleSelect: (value: string, index: number) => void;
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  className?: string;
  selectedIndex: number | null;
  highlightedIndex: number | null;
};
const DropdownItem: React.FC<Props> = ({
  options,
  selectedIndex,
  highlightedIndex,
  handleSelect,
  setHighlightedIndex,
}) => {
  return (
    <>
      {options.map((option, index) => (
        <li
          key={option.value}
          role="option"
          aria-selected={selectedIndex === index}
          className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${
            highlightedIndex === index
              ? "text-white bg-indigo-600"
              : "text-gray-900"
          }`}
          onClick={() => handleSelect(option.value, index)}
          onMouseEnter={() => setHighlightedIndex(index)}
          onMouseLeave={() => setHighlightedIndex(null)}
        >
          <span
            className={`block truncate ${
              selectedIndex === index ? "font-semibold" : "font-normal"
            }`}
          >
            {option.label}
          </span>
        </li>
      ))}
    </>
  );
};

export default DropdownItem;
