import maillo from "../../../../public/logo/maillo-logo.png";
import { useState } from "react";
import { FiMenu, FiSend, FiFileText, FiTrash2 } from "react-icons/fi";
import SidebarItem from "./SidebarItem";
import { motion, AnimatePresence } from "framer-motion";
import { InboxIcon, SpamIcon, StarIcon, WriteIcon } from "../../shared/Icons";
import Button from "../button/Button";
import { useDialogStore } from "../../../stores/stateStores";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const Sidebar: React.FC = () => {
  const { openComposeEmail } = useDialogStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleComposeEmail = () => {
    openComposeEmail();
  };

  return (
    <AnimatePresence>
      <motion.aside
        className={`h-screen sticky top-0 p-4 overflow-clip transition-all duration-300 ${
          isCollapsed ? "w-24 box-border" : "w-80"
        }`}
      >
        <div className="flex items-center justify-start space-x-2">
          <button
            onClick={toggleSidebar}
            className="p-2 border rounded-md focus:outline-none border-neutral-500 text-slate-300"
          >
            <FiMenu size={16} />
          </button>
          <img
            className={` font-bold italic ${isCollapsed ? "hidden" : "block"}`}
            src={maillo}
          />
        </div>
        <nav className="mt-8">
          <Button
            type="button"
            className={`flex items-center gap-6 my-4 p-4 font-semibold bg-white rounded-full hover:bg-white/90 transition-colors dark:text-black  ${
              isCollapsed ? "p-2 text-sm" : ""
            }`}
            onClick={handleComposeEmail}
          >
            <WriteIcon size={24} />
            <span className={isCollapsed ? "hidden" : "block"}>Compose</span>
          </Button>

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
            icon={<StarIcon />}
            text="Starred"
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
        <Link
          to="https://github.com/abubalo/maillo"
          target="_blank"
          className="absolute flex items-center gap-2 m-4 bottom-6"
        >
          <FaGithub size={24} />{" "}
          <span className={isCollapsed ? "hidden" : "block text-sm"}>
            View the source code
          </span>
        </Link>
      </motion.aside>
    </AnimatePresence>
  );
};

export default Sidebar;
