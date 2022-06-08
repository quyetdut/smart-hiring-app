import React, { useState } from "react";
import sendIcon from "assets/images/send-msg-icon.svg";
import { db } from "firebase";
import { addDoc, collection, doc, setDoc } from "@firebase/firestore";
import { useSelector } from "react-redux";

const SendMessage = ({ currentContact }) => {
  const [msg, setMsg] = useState("");
  const { user } = useSelector((state) => state.user);
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    let content = msg;
    setMsg("");
    const peerUser = currentContact.uid;
    const id =
      user.uid > peerUser
        ? `${user.uid}:${peerUser}`
        : `${peerUser}:${user.uid}`;
    await addDoc(collection(db, "messages", id, "message"), {
      content,
      sendBy: user.uid,
      createdAt: new Date().getTime()
    });
    await setDoc(doc(db, "lastMsg", id), {
      content,
      sendBy: user.uid,
      createdAt: new Date().getTime(),
      unread: true
    });
  };
  return (
    <div>
      <form className="message-input" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type a message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit text-center" type="submit">
          <img src={sendIcon}></img>
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
