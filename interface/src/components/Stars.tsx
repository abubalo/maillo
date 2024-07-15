import EmailMenu from "./emailWidgets/EmailMenu";
import { EmailMenuProps } from "../types";

type Props = EmailMenuProps;
const Star: React.FC<Props> = ({ emails, allSelected }) => {
  return (
    <div>
      <EmailMenu {...{ emails, allSelected }} />
    </div>
  );
};

export default Star;
