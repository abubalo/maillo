import { useState } from "react";
import { FiMenu, FiSend, FiFileText, FiTrash2 } from "react-icons/fi";
import SidebarItem from "./SidebarItem";
import { motion, AnimatePresence } from "framer-motion";
import { InboxIcon, SpamIcon, WriteIcon } from "../../shared/Icons";
import Button from "../button/Button";

type Props = {
  onComposeEmail: () => void;
};

const Sidebar: React.FC<Props> = ({ onComposeEmail }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleComposeEmail = () => {
    onComposeEmail();
  };

  return (
    <AnimatePresence>
      <motion.div
        className={`h-screen p-4 overflow-clip transition-all duration-300 ${
          isCollapsed ? "w-24 box-border" : "w-80"
        }`}
      >
        <div className="flex items-center justify-start space-x-2">
          <button
            onClick={toggleSidebar}
            className="p-1 border rounded-md focus:outline-none border-neutral-500 text-slate-300"
          >
            <FiMenu size={20} />
          </button>
          <h1
            className={`text-xl font-bold italic ${
              isCollapsed ? "hidden" : "block"
            }`}
          >
            Maillo
          </h1>
        </div>
        <nav className="mt-8">
          <div>
            <Button
              type="button"
              className="font-semibold bg-white rounded-full dark:text-black"
              onClick={handleComposeEmail}
            >
              <span className="flex items-center gap-4 font-semibold">
                <WriteIcon /> <span>Compose</span>
              </span>
            </Button>
          </div>
          <SidebarItem
            icon={<InboxIcon />}
            text="Inbox"
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={<FiSend />}
            text="Sent"
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={<FiFileText />}
            text="Drafts"
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={<SpamIcon />}
            text="Spam"
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={<FiTrash2 />}
            text="Bin"
            isCollapsed={isCollapsed}
          />
        </nav>
      </motion.div>
    </AnimatePresence>
  );
};

export default Sidebar;
