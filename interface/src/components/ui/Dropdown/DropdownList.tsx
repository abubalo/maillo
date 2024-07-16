import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import DropdownItem from "./DropdownItem";

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  onSelect: (value: string) => void;
  className?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const DropdownList: React.FC<Props> = ({ options, onSelect, className, isOpen, setIsOpen }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [setIsOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowDown":
          setHighlightedIndex((prev) =>
            prev === null || prev === options.length - 1 ? 0 : prev + 1
          );
          break;
        case "ArrowUp":
          setHighlightedIndex((prev) =>
            prev === null || prev === 0 ? options.length - 1 : prev - 1
          );
          break;
        case "Enter":
          if (highlightedIndex !== null) {
            handleSelect(options[highlightedIndex].value, highlightedIndex);
          }
          break;
        case "Escape":
          setIsOpen(false);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, highlightedIndex, options, setIsOpen]);

  const handleSelect = (value: string, index: number) => {
    setSelectedIndex(index);
    setIsOpen(false);
    onSelect?.(value);
  };

  return (
    <ul
      role="listbox"
      className={twMerge(
        "absolute left-0 w-full mt-1 overflow-auto rounded-md shadow-lg max-h-60 focus:outline-none",
        className
      )}
      ref={containerRef}
    >
      <DropdownItem
        options={options}
        handleSelect={handleSelect}
        setHighlightedIndex={setHighlightedIndex}
        highlightedIndex={highlightedIndex}
        selectedIndex={selectedIndex}
      />
    </ul>
  );
};

export default DropdownList;
