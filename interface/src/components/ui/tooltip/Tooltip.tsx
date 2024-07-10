import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, position = 'bottom' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/3 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/3 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/3 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/3 ml-2',
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
            className={`absolute z-10 ${positionClasses[position]}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-gray-800 text-white text-sm rounded-md py-1 px-2 whitespace-nowrap">
              {text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;