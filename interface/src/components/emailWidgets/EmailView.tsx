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
  const {
    emails,
    searchQuery,
    handleSelectEmail,
    handleSelectAll,
    handleStarEmail,
    handleMarkAsRead,
    handleMarkAsUnread,
    handleDeleteEmail,
    handleMarkAsSpamEmail,
    handleArchiveEmail,
  } = useEmailStoreState();

  function capitalizeFirstLetter(text: string) {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  useEffect(() => {
    const previousTitle = document.title;
    document.title = capitalizeFirstLetter(hash) || "Maillo";
    return () => {
      document.title = previousTitle;
    };
  }, [hash]);

  const allSelected = emails.every((email) => email.isSelected);

  const filteredEmails = useMemo(
    () => filterEmails(emails, searchQuery),
    [emails, searchQuery]
  );

  const views: Record<string, JSX.Element> = {
    inbox: (
      <Inbox
        emails={filteredEmails.inbox}
        allSelected={allSelected}
        onSelectAll={handleSelectAll}
        onSelectEmail={handleSelectEmail}
        onStarEmail={handleStarEmail}
        onDeleteEmail={handleDeleteEmail}
        onMarkAsRead={handleMarkAsRead}
        onMarkAsUnread={handleMarkAsUnread}
        onArchiveEmail={handleArchiveEmail}
        onMarkAsSpam={handleMarkAsSpamEmail}
      />
    ),
    drafts: (
      <Drafts
        emails={filteredEmails.drafts}
        allSelected={allSelected}
        onSelectAll={handleSelectAll}
        onSelectEmail={handleSelectEmail}
        onStarEmail={handleStarEmail}
        onDeleteEmail={handleDeleteEmail}
        onMarkAsRead={handleMarkAsRead}
        onMarkAsUnread={handleMarkAsUnread}
        onArchiveEmail={handleArchiveEmail}
        onMarkAsSpam={handleMarkAsSpamEmail}
      />
    ),
    starred: (
      <Stars
        emails={filteredEmails.starred}
        allSelected={allSelected}
        onSelectAll={handleSelectAll}
        onSelectEmail={handleSelectEmail}
        onStarEmail={handleStarEmail}
        onDeleteEmail={handleDeleteEmail}
        onMarkAsRead={handleMarkAsRead}
        onMarkAsUnread={handleMarkAsUnread}
        onArchiveEmail={handleArchiveEmail}
        onMarkAsSpam={handleMarkAsSpamEmail}
      />
    ),
    spam: (
      <Spam
        emails={filteredEmails.spam}
        allSelected={allSelected}
        onSelectAll={handleSelectAll}
        onSelectEmail={handleSelectEmail}
        onStarEmail={handleStarEmail}
        onDeleteEmail={handleDeleteEmail}
        onMarkAsRead={handleMarkAsRead}
        onMarkAsUnread={handleMarkAsUnread}
        onArchiveEmail={handleArchiveEmail}
        onMarkAsSpam={handleMarkAsSpamEmail}
      />
    ),
    bin: (
      <Bin
        emails={filteredEmails.deleted}
        allSelected={allSelected}
        onSelectAll={handleSelectAll}
        onSelectEmail={handleSelectEmail}
        onStarEmail={handleStarEmail}
        onDeleteEmail={handleDeleteEmail}
        onMarkAsRead={handleMarkAsRead}
        onMarkAsUnread={handleMarkAsUnread}
        onArchiveEmail={handleArchiveEmail}
        onMarkAsSpam={handleMarkAsSpamEmail}
      />
    ),
    sent: (
      <Sent
        emails={filteredEmails.sent}
        allSelected={allSelected}
        onSelectAll={handleSelectAll}
        onSelectEmail={handleSelectEmail}
        onStarEmail={handleStarEmail}
        onDeleteEmail={handleDeleteEmail}
        onMarkAsRead={handleMarkAsRead}
        onMarkAsUnread={handleMarkAsUnread}
        onArchiveEmail={handleArchiveEmail}
        onMarkAsSpam={handleMarkAsSpamEmail}
      />
    ),
  };

  const currentView = views[hash] || <NotFound />;

  return (
    <div className="w-full h-dvh">
      <div>{currentView}</div>
    </div>
  );
};

export default EmailView;
