import EmailMenu from "./emailWidgets/EmailMenu";
import { EmailMenuProps } from "../types";
import EmptyItem from "./shared/EmptyItem";

type Props = EmailMenuProps;
const Star: React.FC<Props> = ({
  emails,
  allSelected,
  onSelectAll,
  onSelectEmail,
  onStarEmail,
onDeleteEmail,
onMarkAsRead,
onMarkAsUnread,
onArchiveEmail,
onMarkAsSpam
}) => {
  return (
    <div>
      {emails.length > 0 ? (
        <EmailMenu
          {...{ emails, allSelected, onSelectAll, onSelectEmail, onStarEmail, onDeleteEmail }}
        />
      ) : (
        <EmptyItem />
      )}
    </div>
  );
};

export default Star;
