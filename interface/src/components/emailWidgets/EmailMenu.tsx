import EmailList from "./EmailList";
import EmailOptions from "./EmailOptions";
import { EmailMenuProps } from "./../../types";

const EmailMenu: React.FC<EmailMenuProps> = ({
  emails,
  allSelected,
  onSelectAll,
  onSelectEmail,
  onStarEmail,
  onDeleteEmail,
  onMarkAsRead,
  onMarkAsUnread,
  onArchiveEmail,
  onMarkAsSpam,
}) => {

  
  return (
    <section className="overflow-hidden border border-gray-300 rounded-tl-lg rounded-tr-lg dark:border-neutral-800">
      <EmailOptions onSelectAll={onSelectAll} allSelected={allSelected} />
      <div className="">
        {emails.map((email) => (
          <EmailList
            key={email.id}
            {...email}
            onSelect={onSelectEmail}
            onStar={onStarEmail}
            onDelete={onDeleteEmail}
            {...{onSelectEmail, onStarEmail, onDeleteEmail, onMarkAsRead, onMarkAsUnread, onArchiveEmail, onMarkAsSpam }}
          />
        ))}
      </div>
    </section>
  );
};

export default EmailMenu;
