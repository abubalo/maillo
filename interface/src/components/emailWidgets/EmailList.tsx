import { Link, useLocation } from "react-router-dom";
import { StarIcon, StarSolidIcon } from "../shared/Icons";
import { Email } from "./../../types";
import { format, isThisYear, isToday } from "date-fns";
import { useEmailStoreState } from "../../stores/stateStores";
import EmailListOptions from "./EmailListOptions";
import { useState } from "react";
import { motion } from "framer-motion";

const EmailList: React.FC<Email> = ({
  id,
  subject,
  sender,
  preview,
  timestamp,
  isUnread,
  isStarred,
  isSelected,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);

    if (isToday(date)) {
      return format(date, "hh:mm a");
    } else if (isThisYear(date)) {
      return format(date, "MMM d");
    } else {
      return format(date, "MMM d, yyyy");
    }
  };

  const { hash } = useLocation();
  const { handleStarEmail, handleSelectEmail } = useEmailStoreState();

  const handleCheckboxChange = () => {
    handleSelectEmail(id);
  };

  const handleStar = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleStarEmail(id);
  };

  const fullLink = `/home/${hash}/${id}`;

  return (
    <motion.div
      layout
      className={`relative flex items-center space-x-4 px-4 py-2 border-b cursor-pointer border-gray-300 dark:border-neutral-800 ${
        isUnread
          ? "font-bold bg-neutral-50 dark:bg-neutral-800/40"
          : "font-medium"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="z-20 flex items-center space-x-2 pointer-events-auto">
        <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="w-5 h-5 text-blue-600 cursor-pointer"
              checked={isSelected}
              onChange={handleCheckboxChange}
            />
          </label>
        </div>
        <div onClick={handleStar} className="cursor-pointer">
          {isStarred ? (
            <StarSolidIcon className="text-yellow-500" />
          ) : (
            <StarIcon />
          )}
        </div>
      </div>

      <div className="w-1/4 truncate">{sender}</div>
      <div className="w-1/2">
        <div className="truncate">{subject}</div>
        <div className="text-sm font-semibold text-gray-600 truncate">
          {preview}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="relative flex items-center justify-center w-1/5 h-full"
      >
        <div
          className={`absolute inset-0 z-30 text-sm font-semibold text-center text-gray-500 ${
            isHovered ? 'hidden' : 'block'
          }`}
        >
          <span aria-label="timestamp">{formatDate(timestamp)}</span>
        </div>
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          {isHovered && <EmailListOptions id={id} isUnread={isUnread} />}
        </div>
      </motion.div>
      <Link
        to={fullLink}
        className="absolute inset-0 z-10 pointer-events-auto"
      />
    </motion.div>
  );
};

export default EmailList;
