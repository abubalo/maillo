import EmailMenu from "./emailWidgets/EmailMenu";
import { Email } from "../types";

const Drafts: React.FC<{ emails: Email[] }> = ({ emails }) => {
  return (
    <div>
      <EmailMenu emails={emails}/>
    </div>
  );
};

export default Drafts;
