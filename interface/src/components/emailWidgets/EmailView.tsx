import { useLocation } from "react-router-dom";
import EmailHeader from "./EmailHeader";
import Inbox from "../Inbox";
import Drafts from "../Drafts";
import Spam from "../Spam";
import Sent from "../Sent";
import Bin from "../Bin";
import Stars from "../Stars";
import ComposeEmail from "../ComposeEmail";
import DetailView from "./DetailView";
import { useEmailStoreState } from "../../stores/stateStores";
import { useMemo } from "react";
import { filterEmails } from "../../utils/filterEmails";
import NotFound from "../errors/NotFound";

const EmailView = () => {
  const { hash } = useLocation();
  const emailId = location.hash.split("/").pop();
  if(!emailId) return < NotFound />;

  const {
    emails,
    deletedEmails,
    view,
    searchQuery,
    setView,
    setSearchQuery,
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

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const filteredEmails = useMemo(()=> filterEmails(emails, searchQuery), [emails, searchQuery])

  const views = {
    "#inbox": (
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
    "#drafts": (
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
    "#stars": (
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
    "#spam": (
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
    "#bin": (
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
    "#sent": (
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
    [emailId]: <DetailView emailId={emailId}  />,
  };

  const currentView = views[hash] || views[emailId]

  return (
    <div className="w-full h-dvh">
      <EmailHeader
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <div>{currentView}</div>

      <ComposeEmail />
    </div>
  );
};

export default EmailView;
