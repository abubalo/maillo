import { Link, useLocation } from "react-router-dom";
import {
  LabelIconOutline,
  LabelIconSolid,
  StarIcon,
  StarSolidIcon,
} from "../shared/Icons";
import { Email } from "./../../types";
import { format, isThisYear, isToday } from "date-fns";
import { useEmailStoreState } from "../../stores/stateStores";
import EmailListOptions from "./EmailListOptions";
import { useState } from "react";
import { motion } from "framer-motion";
// import Attachments from "./Attachment";

const EmailList: React.FC<Email> = ({
  id,
  subject,
  sender,
  preview,
  timestamp,
  isUnread,
  isStarred,
  isSelected,
  labels,
  isDeleted,
  // attachments,
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
  const { onStarEmail, onSelectEmails, onMarkAsRead } = useEmailStoreState();

  const handleCheckboxChange = () => {
    onSelectEmails([id]);
  };

  const handleStar = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onStarEmail(id);
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
      onClick={() => onMarkAsRead(id)}
    >
      <div className="z-20 flex items-center space-x-2 pointer-events-auto">
        <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 cursor-pointer"
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
        <div onClick={handleStar} className="cursor-pointer">
          {labels.length > 0 && labels.includes("Important") ? (
            <LabelIconSolid className="text-yellow-500" />
          ) : (
            <LabelIconOutline />
          )}
        </div>
      </div>

      <div className="w-1/4 truncate">{sender}</div>
      <div className="w-1/2">
        <div className="truncate">{subject}</div>
        <div className="text-sm font-semibold text-gray-600 truncate">
          {preview}
        </div>
        {/* <div>
          {attachments && attachments.length > 0 &&
          attachments ? (
            <Attachments
              attachments={attachments}
              className="mt-2 text-sm rounded-full"
            />
          ) : null}
        </div> */}
      </div>
      <div className="relative flex items-center justify-center w-1/5 h-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-30 flex items-center justify-center bg-inherit"
        >
          {isHovered && <EmailListOptions {...{ id, isUnread, isDeleted }} />}
        </motion.div>
        <div
          className={`absolute inset-0 z-20 text-sm font-semibold text-center text-gray-500 ${
            isHovered ? "hidden" : "block"
          }`}
        >
          <span aria-label="timestamp">{formatDate(timestamp)}</span>
        </div>
      </div>
      <Link
        to={fullLink}
        className="absolute inset-0 z-10 pointer-events-auto"
      />
    </motion.div>
  );
};

export default EmailList;
