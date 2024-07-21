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
  isDeleted: boolean;
};

const EmailListOptions: React.FC<Props> = ({ id, isUnread, isDeleted }) => {
  const {
    onArchive,
    onDeleteEmails,
    onMarkAsRead,
    onMarkAsUnread,
    onPermanentDelete,
  } = useEmailStoreState();

  const handleClick = (
    e: React.MouseEvent,
    action: ((ids: string[]) => void) | ((id: string) => void),
    id: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (action.length === 1) {
      (action as (id: string) => void)(id);
    } else {
      (action as (ids: string[]) => void)([id]);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-1 text-lg rounded-md w-max dark:bg-inherit dark:text-white">
      <button
        type="button"
        onClick={(e) => handleClick(e, onArchive, id)}
        className="p-2 text-lg"
        aria-label="Archive"
      >
        <ToolTip text="Archive">
          <ArchiveIcon size={20} />
        </ToolTip>
      </button>
      <button
        type="button"
        onClick={(e) => {
          alert("isDeleted:", isDeleted);
          handleClick(e, isDeleted ? onPermanentDelete : onDeleteEmails, id);
        }}
        className="p-2 text-lg"
        aria-label="Delete"
      >
        {isDeleted ? (
          <ToolTip text="Delete Permanently">
            <DeleteIcon size={20} />
          </ToolTip>
        ) : (
          <ToolTip text="Delete">
            <DeleteIcon size={20} />
          </ToolTip>
        )}
      </button>
      <button
        type="button"
        onClick={(e) =>
          handleClick(e, isUnread ? onMarkAsRead : onMarkAsUnread, id)
        }
        className="p-2 text-lg"
        aria-label={isUnread ? "Mark as Read" : "Mark as Unread"}
      >
        <ToolTip text={isUnread ? "Mark as Read" : "Mark as Unread"}>
          {isUnread ? <MarkReadIcon size={20} /> : <MakrUnreadIcon size={20} />}
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
