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

const EmailOptions: FC<Props> = ({ onSelectAll, allSelected }) => {
  const {handleSelectAll, handleDeleteAllEmail, handleMarkAllAsRead, handleMarkAllUnread,} = useEmailStoreState()
  const [rotateRefresh, setRotateRefresh] = useState(false);

  const handleRotateRefresh = () => {
    setRotateRefresh(!rotateRefresh);
  };

  return (
    <div className="flex items-center justify-between p-4 border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/70 dark:from-inherit lg:static lg:w-auto lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/50">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-600"
          checked={allSelected}
          onChange={onSelectAll}
        />
        {/* <span className="ml-2">Select All</span> */}
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
            className="w-64 flex gap-3 "
          >
            <Button type="button" className="flex">
              <span>Mark As Read</span>  
            </Button>
            <Button type="button" className="flex wrap">Delete All</Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default EmailOptions;
