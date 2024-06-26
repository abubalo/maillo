import React from "react";
import EmailList from "./EmailList";
import EmailOptions from "./EmailOptions";
import { EmailMenuProps } from "./types";

const EmailMenu: React.FC<EmailMenuProps> = ({ emails, allSelected, onSelectAll, onSelectEmail, onStarEmail }) => {
  return (
    <section className="border rounded-tr-lg rounded-tl-lg overflow-hidden border-gray-300 dark:border-neutral-800">
      <EmailOptions onSelectAll={onSelectAll} allSelected={allSelected} />
      <div className="">
        {emails.map((email) => (
          <EmailList key={email.id} {...email} onSelect={onSelectEmail} onStar={onStarEmail} />
        ))}
      </div>
    </section>
  );
};

export default EmailMenu;
