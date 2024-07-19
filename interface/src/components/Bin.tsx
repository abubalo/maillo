import EmailMenu from "./emailWidgets/EmailMenu";
import { Email } from "../types";

const Bin: React.FC<{ emails: Email[] }> = ({ emails }) => {
  return (
    <div>
      <EmailMenu emails={emails}/>
    </div>
  );
};

export default Bin;
