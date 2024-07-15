import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshIcon } from "../shared/Icons";
import { useEmailStoreState } from "../../stores/stateStores";
import Tooltip from "../ui/tooltip/Tooltip";
import Button from "../ui/button/Button";

type Props = {
  onSelectAll: () => void;
  allSelected: boolean;
};

const EmailOptions: React.FC<Props> = ({ allSelected }) => {
  const {
    handleSelectAll,
    handleDeleteAllEmail,
    handleMarkAllAsRead,
    handleMarkAllAsUnread,
  } = useEmailStoreState();
  const [rotateRefresh, setRotateRefresh] = useState(false);

  const handleRotateRefresh = () => {
    setRotateRefresh(!rotateRefresh);
  };

  return (
    <div className="flex items-center justify-between p-4 pt-8 pb-6 border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/70 dark:from-inherit lg:static lg:w-auto lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/50">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className="w-5 h-5 text-blue-600 form-checkbox"
          checked={allSelected}
          onChange={handleSelectAll}
        />
        <Tooltip text="Refresh">
          <motion.button
            type="button"
            onClick={handleRotateRefresh}
            animate={{ rotate: rotateRefresh ? 180 : 0 }}
            transition={{ duration: 0.1, ease: "linear" }}
            onAnimationComplete={() => setRotateRefresh(false)}
            className="text-xl"
          >
            <RefreshIcon />
          </motion.button>
        </Tooltip>
      </div>

      <AnimatePresence>
        {allSelected ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex w-64 gap-3 "
          >
            <Button type="button" className="" onClick={handleMarkAllAsRead}>
              Mark As Read
            </Button>
            <Button type="button" className="" onClick={handleMarkAllAsUnread}>
              Mark As Unread
            </Button>
            <Button type="button" className="" onClick={handleDeleteAllEmail}>
              Delete All
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default EmailOptions;
