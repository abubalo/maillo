import { Link, useLocation } from "react-router-dom";
import { StarIcon, StarSolidIcon } from "../shared/Icons";
import { Email } from "./../../types";
import { format } from "date-fns";
import { useEmailStoreState } from "../../stores/stateStores";

const EmailList: React.FC<Email> = ({
  id,
  subject,
  sender,
  preview,
  timestamp,
  isUnread,
  isStarred,
  isSelected,
  detailUrl,
}) => {
  const formatDate = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "MMM d, yyyy h:mm a");
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

  const fullLink = `/home/${hash}/${detailUrl}`;

  return (
    <Link
      to={`${fullLink}`}
      className={`flex items-center space-x-4 p-3 border-b cursor-pointer border-gray-300 dark:border-neutral-800 ${
        isUnread
          ? "font-bold bg-neutral-50 dark:bg-neutral-800/40"
          : "font-semibold"
      } `}
    >
      <div></div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="w-5 h-5 text-blue-600 form-checkbox"
              checked={isSelected}
              onChange={handleCheckboxChange}
            />
          </label>
        </div>
        <div onClick={handleStar}>
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
        <div className="text-sm text-gray-600 truncate">{preview}</div>
      </div>
      <div className="w-1/4 text-sm text-right text-gray-500">
        {formatDate(timestamp)}
      </div>
    </Link>
  );
};

export default EmailList;
