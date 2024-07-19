import EmailMenu from "./emailWidgets/EmailMenu";
import { Email } from "../types";

const Sent: React.FC<{ emails: Email[] }> = ({ emails }) => {
  return (
    <div>
      <EmailMenu emails={emails}/>
    </div>
  );
};

export default Sent;
