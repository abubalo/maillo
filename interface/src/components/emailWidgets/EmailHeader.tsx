import Search from "../ui/search/Search";
import Sort from "../ui/sort/Sort";
import Avatar from "../profile/Avatar";
import { HelpIcon, SettingsIcon } from "../shared/Icons";

const EmailHeader = () => {
  return (
    <div className="w-full flex items-center justify-between p-2 md:p-4">
      <Search />
      <div className="flex items-center gap-8">
        <div className="flex gap-3 text-2xl">
          <HelpIcon />
          <SettingsIcon />
        </div>
        <Avatar
          src={
            "https://plus.unsplash.com/premium_photo-1664298528358-790433ba0815?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
      </div>
    </div>
  );
};

export default EmailHeader;
