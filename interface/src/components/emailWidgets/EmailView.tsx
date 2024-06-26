import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import EmailHeader from "./EmailHeader";
import EmailMenu from "./EmailMenu";
import { Email } from "./types";
import Inbox from "../Inbox";
import Drafts from "../Drafts";
import Spam from "../Spam";
import Sent from "../Sent";
import Bin from "../Bin";
import Stars from "../Stars";
import ComposeEmail from "../ComposeEmail";

type Props = {
  isDialogOpen: boolean;
  onDialogClose: () => void;
}


const EmailView = ({isDialogOpen, onDialogClose}: Props) => {
  
  
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "inbox";


  const renderView = [
    {
      name: "inbox",
      view: (
        <Inbox
        />
      ),
    },
    { name: "drafts", view: <Drafts /> },
    { name: "stars", view: (<Stars />) },
    { name: "spam", view: (<Spam /> )},
    { name: "bin", view: (<Bin />) },
    { name: "sent", view: (<Sent />) },
  ];

  const currentView = renderView.find((item) => item.name === view)?.view;

  return (
    <div className="w-full h-dvh">
      {/* <EmailHeader
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      /> */}
      {currentView}

      <ComposeEmail  {...{isDialogOpen, onDialogClose}} />
    </div>
  );
};

export default EmailView;
