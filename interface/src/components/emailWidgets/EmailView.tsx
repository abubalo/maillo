import Inbox from "../Inbox";
import Drafts from "../Drafts";
import Spam from "../Spam";
import Sent from "../Sent";
import Bin from "../Bin";
import Stars from "../Stars";
import { useEmailStoreState } from "../../stores/stateStores";
import { useEffect, useMemo } from "react";
import { filterEmails } from "../../utils/filterEmails";
import NotFound from "../errors/NotFound";

type Props = {
  hash: string;
};

const EmailView: React.FC<Props> = ({ hash }) => {
  const { emails, searchQuery } = useEmailStoreState();

  const capitalizeFirstLetter = (text: string) => {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  useEffect(() => {
    const previousTitle = document.title;
    document.title = capitalizeFirstLetter(hash) || "Maillo";
    return () => {
      document.title = previousTitle;
    };
  }, [hash]);


  const filteredEmails = useMemo(
    () => filterEmails(emails, searchQuery),
    [emails, searchQuery]
  );

  const views: Record<string, JSX.Element> = {
    inbox: <Inbox emails={filteredEmails.inbox} />,
    drafts: <Drafts emails={filteredEmails.drafts} />,
    starred: <Stars emails={filteredEmails.starred} />,
    spam: <Spam emails={filteredEmails.spam} />,
    sent: <Sent emails={filteredEmails.sent} />,
    bin: <Bin emails={filteredEmails.deleted} />,
  };

  const currentView = views[hash] || <NotFound />;

  return (
    <div className="w-full h-screen p-4 overflow-scroll">{currentView}</div>
  );
};

export default EmailView;
