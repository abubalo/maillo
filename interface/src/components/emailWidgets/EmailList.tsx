import { Link, useLocation } from "react-router-dom";
import { StarIcon, StarSolidIcon } from "../shared/Icons";
import { Email } from "./../../types";

interface EmailListProps extends Email {
  onSelect: (id: string | number) => void;
  onStar: (id: string | number) => void;
  onDelete: (id: string | number) => void;
}

const EmailList: React.FC<EmailListProps> = ({
  id,
  subject,
  sender,
  preview,
  timestamp,
  isUnread,
  isStarred,
  isSelected,
  onSelect,
  onStar,
  detailUrl,
  onDelete,
  onMarkAsRead,
  onMarkAsUnread,
  onArchiveEmail,
  onMarkAsSpam,
}) => {
  const { hash } = useLocation();

  const handleCheckboxChange = () => {
    onSelect(id);
  };

  const handleStarEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onStar(id);
  };

  const fullLink = `/home/${hash}/${detailUrl}`;

  const truncateText =(length = 10) =>{
// Ten words not characters
preview.split(" ")
  }

  return (
    <Link
      to={`${fullLink}`}
      className={`flex items-center space-x-4 p-3 border-b cursor-pointer border-gray-300 dark:border-neutral-800 ${
        isUnread
          ? "font-bold bg-neutral-50 dark:bg-neutral-800/40"
          : "font-semibold"
      } `}
    >

      <div>
        
      </div>
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
        <div onClick={handleStarEmail}>
          {isStarred ? <StarSolidIcon className="text-yellow-500"/> : <StarIcon />}
        </div>
      </div>
      <div className="w-1/4 truncate">{sender}</div>
      <div className="w-1/2">
        <div className="truncate">{subject}</div>
        <div className="text-sm text-gray-600 truncate">{preview}</div>
      </div>
      <div className="w-1/4 text-sm text-right text-gray-500">{timestamp}</div>
    </Link>
  );
};

export default EmailList;
