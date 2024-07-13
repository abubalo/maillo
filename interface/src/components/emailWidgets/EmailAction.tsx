import Tooltip from "../ui/tooltip/Tooltip";
import {
  ArchiveIcon,
  DeleteIcon,
  SpamIcon,
} from "../shared/Icons";
import { MdMarkAsUnread } from "react-icons/md";
import { useEmailStoreState } from "../../stores/stateStores";
import { Email } from "../../types";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const EmailActions: React.FC<{ email: Email }> = ({ email }) => {
  const {
    handleArchiveEmail,
    handleMarkAsRead,
    handleMarkAsSpamEmail,
    handleDeleteEmail,
    handleStarEmail,
    handleReply,
  } = useEmailStoreState();

  const onStar = () => handleStarEmail(email.id);
  const onArchive = () => handleArchiveEmail(email.id);
  const onDelete = () => handleDeleteEmail(email.id);
  const onMarkAsRead = () => handleMarkAsRead(email.id);
  const onMarkAsSpam = () => handleMarkAsSpamEmail(email.id);
  const onReply = () => handleReply();

  return (
    <div className="flex items-center justify-between p-4 rounded-tl-md rounded-tr-md bg-neutral-500/40">
      <div className="flex items-center gap-3 text-lg">
        <TooltipButton text="Archive" onClick={onArchive}>
          <ArchiveIcon />
        </TooltipButton>
        <TooltipButton text="Report Spam" onClick={onMarkAsSpam}>
          <SpamIcon />
        </TooltipButton>
        <TooltipButton text="Delete" onClick={onDelete}>
          <DeleteIcon />
        </TooltipButton>
        <TooltipButton text="Mark as Read" onClick={onMarkAsRead}>
          <MdMarkAsUnread />
        </TooltipButton>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold opacity-70">2 of 28</span>
        <TooltipButton text="Newer" position="left">
          <IoIosArrowBack />
        </TooltipButton>
        <TooltipButton text="Older" position="left">
          <IoIosArrowForward />
        </TooltipButton>
      </div>
    </div>
  );
};

const TooltipButton: React.FC<{
  text: string;
  onClick?: () => void;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}> = ({ text, onClick, children, position = "top" }) => (
  <Tooltip text={text} position={position}>
    <button onClick={onClick}>{children}</button>
  </Tooltip>
);

export default EmailActions;
