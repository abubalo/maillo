import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import EmailView from "../../components/emailWidgets/EmailView";
import Sidebar from "../../components/ui/sidebar/Sidebar";
import DetailView from "../../components/emailWidgets/DetailView"; // Adjust the import as needed
import { useEmailStoreState } from "../../stores/stateStores";
import { Email } from "../../types";
import NotFound from "../../components/errors/NotFound";
import EmailHeader from "../../components/emailWidgets/EmailHeader";
import ComposeEmail from "../../components/ComposeEmail";

const Home = () => {
  const location = useLocation();
  const [currentEmail, setCurrentEmail] = useState<Email | undefined | null>(
    null
  );
  const { emails, searchQuery, setSearchQuery } = useEmailStoreState();

  const hash = location.hash.substring(1);
  useEffect(() => {
    if (hash) {
      const [path, emailId] = hash.split("/");

      if (path === "inbox" && emailId) {
        const email = emails.find((email) => email.id === emailId);
        setCurrentEmail(email);
      } else if (path === "drafts" && emailId) {
        const email = emails.find((email) => email.id === emailId);
        setCurrentEmail(email);
      } else if (path === "sent" && emailId) {
        const email = emails.find((email) => email.id === emailId);
        setCurrentEmail(email);
      } else if (path === "spam" && emailId) {
        const email = emails.find((email) => email.id === emailId);
        setCurrentEmail(email);
      } else if (path === "starred" && emailId) {
        const email = emails.find((email) => email.id === emailId);
        setCurrentEmail(email);
      } else if (path === "bin" && emailId) {
        const email = emails.find((email) => email.id === emailId);
        setCurrentEmail(email);
      } else {
        setCurrentEmail(null);
        <NotFound />;
      }
    }
  }, [emails, hash]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <main className="flex h-auto min-h-max">
      <Sidebar />
      <div className="w-full ">
        <ComposeEmail />
        <EmailHeader
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        {currentEmail ? (
          <DetailView email={currentEmail} />
        ) : (
          <EmailView hash={hash} />
        )}
      </div>
    </main>
  );
};

export default Home;
