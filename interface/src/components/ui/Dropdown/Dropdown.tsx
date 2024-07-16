import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  onSelect?: (value: string) => void;
  label?: string;
  children?: React.ReactNode;
  className?: string;
};

const Dropdown: React.FC<Props> = ({ label = "", children, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div ref={containerRef} className="relative">
      <button
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={twMerge(
          "px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500",
          className
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {label}
      </button>
  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {isOpen && React.cloneElement(children as React.ReactElement<any>, { isOpen, setIsOpen })}
    </div>
  );
};

export default Dropdown;
