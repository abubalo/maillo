import Search from "../ui/search/Search";
import Avatar from "../profile/Avatar";
import { HelpIcon, SettingsIcon } from "../shared/Icons";
import Tooltip from "../ui/tooltip/Tooltip";

type Props = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
};
const EmailHeader: React.FC<Props> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="flex items-center justify-between w-full p-2 md:p-4">
      <Search {...{ searchQuery, onSearchChange }} />
      <div className="flex items-center gap-8">
        <div className="flex gap-3 text-2xl">
          <button type="button">
            <Tooltip text="Help">
              <HelpIcon />
            </Tooltip>
          </button>
          <button type="button" className="">
            <Tooltip text="Settings">
              <SettingsIcon />
            </Tooltip>
          </button>
        </div>
        <Avatar
          src={
            "https://plus.unsplash.com/premium_photo-1664298528358-790433ba0815?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt=""
        />
      </div>
    </div>
  );
};

export default EmailHeader;
