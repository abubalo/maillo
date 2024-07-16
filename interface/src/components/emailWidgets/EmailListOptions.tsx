import { useEmailStoreState } from "../../stores/stateStores";
import {
  ArchiveIcon,
  DeleteIcon,
  SnoozeIcon,
  MakrUnreadIcon,
  MarkReadIcon,
} from "../shared/Icons";
import ToolTip from "../ui/tooltip/Tooltip";

type Props = {
  id: string;
  isUnread: boolean;
};

const EmailListOptions: React.FC<Props> = ({ id, isUnread }) => {
  const {
    handleArchiveEmail,
    handleDeleteEmail,
    handleMarkAsRead,
    handleMarkAsUnread,
  } = useEmailStoreState();

  const handleClick = (e: React.MouseEvent, action: (id: string) => void) => {
    e.preventDefault();
    e.stopPropagation();
    action(id);
  };

  return (
    <div className="flex items-center justify-center space-x-1 text-lg text-black bg-white border rounded-md w-max h-max dark:bg-black dark:text-white">
      <button
        type="button"
        onClick={(e) => handleClick(e, handleArchiveEmail)}
        className="p-2 text-lg"
        aria-label="Archive"
      >
        <ToolTip text="Archive">
          <ArchiveIcon size={20} />
        </ToolTip>
      </button>
      <button
        type="button"
        onClick={(e) => handleClick(e, handleDeleteEmail)}
        className="p-2 text-lg"
        aria-label="Delete"
      >
        <ToolTip text="Delete">
          <DeleteIcon size={20} />
        </ToolTip>
      </button>
      <button
        type="button"
        onClick={(e) =>
          handleClick(e, isUnread ? handleMarkAsRead : handleMarkAsUnread)
        }
        className="p-2 text-lg"
        aria-label={isUnread ? "Mark as Read" : "Mark as Unread"}
      >
        <ToolTip text={isUnread ? "Mark as Read" : "Mark as Unread"}>
          {isUnread ? <MakrUnreadIcon size={20} /> : <MarkReadIcon size={20} />}
        </ToolTip>
      </button>
      <button type="button" aria-label="Snooze" className="p-2 text-lg">
        <ToolTip text="Snooze">
          <SnoozeIcon size={20} />
        </ToolTip>
      </button>
    </div>
  );
};

export default EmailListOptions;
