import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type Props = {
  icon: ReactNode;
  text: string;
  isCollapsed: boolean;
  className?: string;
};

const SidebarItem = ({ icon, text, isCollapsed, className }: Props) => {
  return (
    <Link
      to={`#${text.toLowerCase()}`}
      className={twMerge(
        "flex items-center transition-all duration-300 rounded-md hover:bg-neutral-800/50",
        className
      )}
    >
      <span className="p-4 text-xl">{icon}</span>
      <motion.span
        initial={false}
        animate={{ opacity: isCollapsed ? 0 : 1, width: isCollapsed ? 0 : 'auto' }}
        transition={{ duration: 0.1, ease: "linear" }}
        className="flex overflow-hidden font-semibold whitespace-nowrap"
      >
        {text}
      </motion.span>
    </Link>
  );
};

export default SidebarItem;
