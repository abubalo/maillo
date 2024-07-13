import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  position = "bottom",
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/3 transform -translate-x-1/3 mb-1",
    bottom: "top-full left-1/3 transform -translate-x-1/3 mt-1",
    left: "right-full top-1/3 transform -translate-y-1/3 mr-1",
    right: "left-full top-1/3 transform -translate-y-1/3 ml-1",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={twMerge(
              `absolute z-10 ${positionClasses[position]} aspect-square`,
              className
            )}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className={twMerge("px-2 py-1 text-sm text-white bg-gray-800 rounded-md whitespace-nowrap")}>
              {text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
