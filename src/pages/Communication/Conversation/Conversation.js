import React, { useEffect, useRef } from "react";

import "./conversation.scss";
import webIcon from "assets/images/web-developer-icon.svg";
import poIcon from "assets/images/product-owner-icon.svg";
import collabPOIcon from "assets/images/collab-po-icon.svg";
import collabDevIcon from "assets/images/collab-dev-icon.svg";
import collabSuccessIcon from "assets/images/collab-success-icon.svg";

import classNames from "classnames";
const Message = ({ message, currentContact }) => {
  const { createdAt, img, isPO, content, sendBy, collaborate } = message;
  const isMessage = JSON.parse(localStorage.getItem("user")).uid === sendBy;
  const getNameOfMessage = () => {
    if (sendBy === currentContact.uid) {
      return currentContact.name;
    } else return JSON.parse(localStorage.getItem("user")).name;
  };
  const messageClass = classNames({
    sent: isMessage,
    replies: !isMessage
  });
  if (isPO) var icon = poIcon;
  else icon = webIcon;

  return (
    <li className={messageClass}>
      <img src={img ? img : icon} alt="" />
      <div className="ctn-msg">
        <div className="infor">
          {getNameOfMessage()}
          <span>
            {" "}
            ,
            {new Date(createdAt).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true
            })}
          </span>
        </div>
        {!collaborate ? (
          <div className="message-text">{content}</div>
        ) : (
          <MessageCollab message={message} />
        )}
      </div>
    </li>
  );
};
const MessageCollab = ({ message }) => {
  const { content, isMyMessage, isPO } = message;
  const messageClass = classNames({
    sent: isMyMessage,
    replies: !isMyMessage
  });
  return (
    <li className={messageClass}>
      <div className="ctn-msg">
        <div
          className={
            isPO
              ? "message-collab text-center"
              : "message-collab text-center mesage-collab-dev"
          }
        >
          <div className="ctn-img">
            <img
              className="collab-icon"
              src={isPO ? collabPOIcon : collabDevIcon}
            ></img>
            {isMyMessage ? (
              <img
                className="collab-success-icon"
                src={collabSuccessIcon}
              ></img>
            ) : (
              <div></div>
            )}
          </div>
          <div className="mb-2">{content}</div>
        </div>
      </div>
    </li>
  );
};
// const messageCollab = {
//   img: null,
//   messageText: "I accepted your request. Welcome to the team !",
//   createdAt: "2:39 PM",
//   name: "Diana",
//   isMyMessage: true,
//   isPO: true
// };
// const messageDeveloperCollab = {
//   img: null,
//   messageText: "I want to collaborate ! I’ve just sent a request.",
//   createdAt: "2:38 PM",
//   name: "Patricia",
//   isMyMessage: false,
//   isPO: false
// };
const Conversation = ({ conversation, currentContact, isCollab }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [conversation, isCollab]);
  return (
    <div className="conversation">
      <div className="timestamp">
        <div>{conversation.createdAt}</div>
      </div>
      <ul>
        {conversation &&
          conversation.map((message, index) => (
            <Message
              key={index}
              message={message}
              currentContact={currentContact}
            />
          ))}

        {/* <MessageCollab message={messageDeveloperCollab} /> */}
        {/* {isCollab ? <MessageCollab message={messageCollab} /> : <div></div>} */}
        <div ref={messagesEndRef} />
      </ul>
    </div>
  );
};

export default Conversation;
