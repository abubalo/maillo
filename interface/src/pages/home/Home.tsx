import { useState } from "react";
import EmailView from "../../components/emailWidgets/EmailView";
import Sidebar from "../../components/ui/sidebar/Sidebar";

const Home = () => {
  const [isComposeEmailOpen, setIsComposeEmailOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsComposeEmailOpen(true);
  };

  const handleCloseDialog = () => {
    setIsComposeEmailOpen(false);
  };
  return (
    <main className="flex">
      <Sidebar onComposeEmail={handleOpenDialog} />
      <EmailView
        isDialogOpen={isComposeEmailOpen}
        onDialogClose={handleCloseDialog}
      />
    </main>
  );
};

export default Home;
