import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  text: string;
  children: React.ReactNode;
  className?: string;
  offset?: number;
};

const ToolTip: React.FC<Props> = ({
  text,
  children,
  className = "",
  offset = 8,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [tooltipPlacement, setTooltipPlacement] = useState<"top" | "bottom" | "left" | "right">("bottom");

  useEffect(() => {
    const handleScroll = () => {
      if (isVisible) setIsVisible(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  const showTooltip = () => {
    setIsVisible(true);
    updateTooltipPosition();
  };
  const hideTooltip = () => setIsVisible(false);

  const updateTooltipPosition = () => {
    if (!tooltipRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = 0;
    let left = 0;
    let placement: "top" | "bottom" | "left" | "right" = "bottom";

    // Check if there's enough space below
    if (containerRect.bottom + tooltipRect.height + offset <= viewportHeight) {
      top = containerRect.height + offset;
      left = (containerRect.width - tooltipRect.width) / 2;
      placement = "bottom";
    }
    // Check if there's enough space above
    else if (containerRect.top - tooltipRect.height - offset >= 0) {
      top = -tooltipRect.height - offset;
      left = (containerRect.width - tooltipRect.width) / 2;
      placement = "top";
    }
    // Check if there's enough space to the right
    else if (containerRect.right + tooltipRect.width + offset <= viewportWidth) {
      top = (containerRect.height - tooltipRect.height) / 2;
      left = containerRect.width + offset;
      placement = "right";
    }
    // Default to left if no other position works
    else {
      top = (containerRect.height - tooltipRect.height) / 2;
      left = -tooltipRect.width - offset;
      placement = "left";
    }

    // Adjust for viewport boundaries
    if (containerRect.left + left < 0) {
      left = -containerRect.left + 10;
    } else if (containerRect.left + left + tooltipRect.width > viewportWidth) {
      left = viewportWidth - containerRect.left - tooltipRect.width - 10;
    }

    if (containerRect.top + top < 0) {
      top = -containerRect.top + 10;
    } else if (containerRect.top + top + tooltipRect.height > viewportHeight) {
      top = viewportHeight - containerRect.top - tooltipRect.height - 10;
    }

    setTooltipPosition({ top, left });
    setTooltipPlacement(placement);
  };

  return (
    <AnimatePresence>
      <div
        className={`relative inline-block ${className}`}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        ref={containerRef}
      >
        {children}
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            ref={tooltipRef}
            className={`
            absolute z-10 px-3 py-2 text-sm font-medium text-white text-nowrap bg-gray-900 rounded-lg shadow-sm 
            transition-opacity duration-300 tooltip pointer-events-none select-none
          `}
            style={{
              left: tooltipPosition.left,
              // top: tooltipPosition.top,
            }}
            data-placement={tooltipPlacement}
          >
            {text}
            <div className="tooltip-arrow" />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default ToolTip;