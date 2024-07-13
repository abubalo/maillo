import { useState, useRef, useEffect } from "react";

type Option = {
  label: string;
  value: string;
};

type Props = {
  options?: Option[];
  onSelect?: (value: string) => void;
  label: string;
  children: React.ReactNode;
};

const Dropdown: React.FC<Props> = ({
  options = [],
  onSelect,
  label,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
  }, []);

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
  }, [isOpen, highlightedIndex, options]);

  const handleSelect = (value: string, index: number) => {
    setSelectedIndex(index);
    setIsOpen(false);
    onSelect?.(value);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {label}
      </button>
      {isOpen && (
        <ul
          role="listbox"
          className="absolute left-0 w-full mt-1 overflow-auto rounded-md shadow-lg max-h-60 focus:outline-none"
        >
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
              {React.isValidElement(children) &&
                React.cloneElement(children, { option })}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
