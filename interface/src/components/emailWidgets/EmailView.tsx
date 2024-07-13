import { useLocation } from "react-router-dom";
import Inbox from "../Inbox";
import Drafts from "../Drafts";
import Spam from "../Spam";
import Sent from "../Sent";
import Bin from "../Bin";
import Stars from "../Stars";
import ComposeEmail from "../ComposeEmail";
import { useEmailStoreState } from "../../stores/stateStores";
import { useMemo } from "react";
import { filterEmails } from "../../utils/filterEmails";
import NotFound from "../errors/NotFound";

const EmailView = () => {
  const location = useLocation();
  const hash = location.hash.substring(1);

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
    stars: (
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

  const currentView = views[hash] || (
    <NotFound message="error from email view" />
  );

  return (
    <div className="w-full h-dvh">
      <div>{currentView}</div>
      <ComposeEmail />
    </div>
  );
};

export default EmailView;
