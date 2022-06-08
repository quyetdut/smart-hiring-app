import React from "react";
import Conversation from "../Conversation/Conversation";
import MatchingHeader from "../MatchingHeader/MatchingHeader";

const ChatContent = ({
  toggle,
  setCollab,
  isCollab,
  conversation,
  currentContact
}) => {
  return (
    <>
      <>
        <MatchingHeader
          toggle={toggle}
          setCollab={setCollab}
          isCollab={isCollab}
          currentContact={currentContact}
        />
        <Conversation
          conversation={conversation}
          currentContact={currentContact}
          isCollab={isCollab}
        />
      </>
    </>
  );
};

export default ChatContent;
