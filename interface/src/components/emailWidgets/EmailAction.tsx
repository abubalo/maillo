import Tooltip from "../ui/tooltip/Tooltip";
import {
  ArchiveIcon,
  DeleteIcon,
  GoBackIcon,
  SpamIcon,
} from "../shared/Icons";
import { MdMarkAsUnread } from "react-icons/md";
import { useEmailStoreState } from "../../stores/stateStores";
import { Email } from "../../types";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const EmailActions: React.FC<{ email: Email }> = ({ email }) => {
  const navigate = useNavigate();
  

  const handleGoBack = () =>{
    navigate(-1)
  }
  const {
    onArchive,
    onMarkAsRead,
    onMarkAsSpam,
    onDeleteEmails,
  } = useEmailStoreState();


  return (
    <div className="top-0 flex items-center justify-between p-4 stciky rounded-tl-md rounded-tr-md bg-neutral-500/40">
      <div className="flex items-center gap-6 text-lg">
        <TooltipButton text="Back to Inbox" onClick={handleGoBack}>
          <GoBackIcon />
        </TooltipButton>
        <TooltipButton text="Archive" onClick={()=> onArchive([email.id])}>
          <ArchiveIcon />
        </TooltipButton>
        <TooltipButton text="Report Spam" onClick={()=> onMarkAsSpam([email.id])}>
          <SpamIcon />
        </TooltipButton>
        <TooltipButton text="Delete" onClick={()=> onDeleteEmails([email.id])}>
          <DeleteIcon />
        </TooltipButton>
        <TooltipButton text="Mark as Read" onClick={()=> onMarkAsRead(email.id)}>
          <MdMarkAsUnread />
        </TooltipButton>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold opacity-70">1-10 of 67</span>
        <TooltipButton text="Newer" >
          <IoIosArrowBack />
        </TooltipButton>
        <TooltipButton text="Older">
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
}> = ({ text, onClick, children }) => (
  <Tooltip text={text}>
    <button onClick={onClick}>{children}</button>
  </Tooltip>
);

export default EmailActions;
