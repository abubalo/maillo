import { NavLink } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { StarIcon, StarSolidIcon } from "../shared/Icons";
import { Email } from "../types";

interface EmailListProps extends Email {
  onSelect: (id: string | number) => void;
  onStar: (id: string | number) => void;
}

const EmailList: React.FC<EmailListProps> = ({
  id,
  subject,
  sender,
  preview,
  timestamp,
  isUnread,
  unStared,
  isSelected,
  onSelect,
  onStar,
  link,
}) => {
  const handleCheckboxChange = () => {
    onSelect(id);
  };

  const handleStarEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onStar(id);
  };

  const [searchParams] = useSearchParams();
  const activeLink = searchParams.get("view");

  const links = ["inbox", "drafts", "spam", "sent", "bin"]

  // console.log(links[activeLink]);
  // console.log(activeLink);

  return (
    <NavLink
      to={`/${link}`}
      className={({ isActive }) =>
        `flex items-center space-x-4 p-3 border-b cursor-pointer border-gray-300 dark:border-neutral-800 ${
          isUnread ? "font-bold bg-neutral-50 dark:bg-neutral-800/30" : ""
        } ${isActive ? "text-blue-600" : ""}`
      }
    >
      <div className="flex items-center space-x-2">
        <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              checked={isSelected}
              onChange={handleCheckboxChange}
            />
          </label>
        </div>
        <div onClick={handleStarEmail}>
          {unStared ? <StarSolidIcon /> : <StarIcon />}
        </div>
      </div>
      <div className="w-1/4 truncate">{sender}</div>
      <div className="w-1/2">
        <div className="truncate">{subject}</div>
        <div className="text-sm text-gray-600 truncate">{preview}</div>
      </div>
      <div className="w-1/4 text-right text-sm text-gray-500">{timestamp}</div>
    </NavLink>
  );
};

export default EmailList;
