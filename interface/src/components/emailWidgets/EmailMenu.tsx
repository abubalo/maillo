import EmailList from "./EmailList";
import EmailOptions from "./EmailOptions";
import { useEmailStoreState } from "../../stores/stateStores";
import { Email } from "../../types";
import EmptyItem from "../shared/EmptyItem";
import { useLocation } from "react-router-dom";

type Props = {
  emails: Email[];
  allSelected: boolean;
};
const EmailMenu: React.FC<Props> = ({ emails, allSelected }) => {
  const { hash } = useLocation();
  const folderName = hash.split("#").pop() as string;

  const { handleSelectAll } = useEmailStoreState();

  const folderMessages: { [key: string]: string } = {
    inbox: "Your inbox is empty.",
    spam: "No spam here, enjoy your day!",
    sent: "You haven’t sent any emails yet.",
    starred: "You haven’t starred any emails yet.",
    drafts: "No drafts saved.",
    bin: "Your bin is empty.",
  };

  const message = folderMessages[folderName.toLowerCase()] || "No items found";

  return (
    <section className="overflow-hidden border border-gray-300 rounded-tl-lg rounded-tr-lg dark:border-neutral-800">
      <EmailOptions onSelectAll={handleSelectAll} allSelected={allSelected} />
      <div className="">
        {emails.length > 0 ? (
          emails.map((email) => <EmailList key={email.id} {...email} />)
        ) : (
          <EmptyItem message={message} />
        )}
      </div>
    </section>
  );
};

export default EmailMenu;
