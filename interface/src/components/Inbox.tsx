import EmailMenu from "./emailWidgets/EmailMenu";
import { Email } from "../types";

const Inbox: React.FC<{ emails: Email[] }> = ({ emails }) => {
  return (
    <div>
      <EmailMenu emails={emails}/>
    </div>
  );
};

export default Inbox;
