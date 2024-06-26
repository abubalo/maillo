import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import EmailMenu from "./emailWidgets/EmailMenu";
import { EmailMenuProps } from "../../types";

const Inbox = () => {
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "inbox";

  const [emails, setEmails] = useState<Email[]>([
    {
      id: 1,
      subject: "Weekly Team Meeting",
      sender: "John Doe",
      address: "john.doe@example.com",
      preview: "Let's discuss our progress this Friday at 2 PM.",
      timestamp: "09:00 AM",
      isUnread: true,
      unStared: true,
      link: "dnhsjkbbdhd",
      isSelected: false,
    },
    {
      id: 2,
      subject: "New Project Proposal",
      sender: "Jane Smith",
      address: "jane.smith@example.com",
      preview: "I've attached the new project proposal for your review.",
      timestamp: "10:30 AM",
      isUnread: false,
      unStared: false,
      link: "dckjshbmkshhdoo",
      isSelected: false,
    },
    {
      id: 3,
      subject: "Lunch Catch-Up?",
      sender: "Michael Brown",
      address: "michael.brown@example.com",
      preview: "Hey, are you free for lunch tomorrow? Let me know!",
      timestamp: "12:15 PM",
      isUnread: true,
      unStared: true,
      link: "klshdfhsdlf",
      isSelected: false,
    },
    {
      id: 4,
      subject: "Quarterly Financial Report",
      sender: "Emily White",
      address: "emily.white@example.com",
      preview: "The quarterly financial report is ready for review.",
      timestamp: "03:45 PM",
      isUnread: false,
      unStared: false,
      link: "aslkdfjwelk",
      isSelected: false,
    },
    {
      id: 5,
      subject: "Team Outing Plan",
      sender: "Chris Green",
      address: "chris.green@example.com",
      preview: "Let's plan our team outing for next month. Suggestions?",
      timestamp: "05:30 PM",
      isUnread: true,
      unStared: true,
      link: "oiuwefhlwkj",
      isSelected: false,
    },
  ]);
  

  const handleSelectEmail = (id: string | number) => {
    setEmails(
      emails.map((email) =>
        email.id === id ? { ...email, isSelected: !email.isSelected } : email
      )
    );
  };

  const handleSelectAll = () => {
    const allSelected = emails.every((email) => email.isSelected);
    setEmails(emails.map((email) => ({ ...email, isSelected: !allSelected })));
  };

  const allSelected = emails.every((email) => email.isSelected);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const filteredEmails = emails.filter(
    (email) =>
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStarEmail = (id: string | number) => {
    setEmails(
      emails.map((email) =>
        email.id === id ? { ...email, unStared: !email.unStared } : email
      )
    );
  };
  return (
    <section>
      <EmailMenu
        emails={filteredEmails}
        allSelected={allSelected}
        onSelectAll={handleSelectAll}
        onSelectEmail={handleSelectEmail}
        onStarEmail={handleStarEmail}
      />
    </section>
  );
};

export default Inbox;
