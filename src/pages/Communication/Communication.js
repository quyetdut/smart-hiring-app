import React, { useEffect, useState } from "react";

import "./communication.scss";
import MainLayout from "layout/MainLayout/MainLayout";
import SidePanel from "./SidePanel/SidePanel";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc
} from "@firebase/firestore";
import { db } from "firebase";
import ChatContent from "./ChatContent/ChatContent";
import { useSelector } from "react-redux";
import SendMessage from "./SendMessage/SendMessage";
import ModalCollaborating from "modals/ModalCollaborating/ModalCollaborating";
import useModal from "hook/useModal";
import { useLocation } from "react-router";
import http from "core/services/httpService";
const Communication = () => {
  const { isShowing, toggle } = useModal();
  const [isCollab, setCollab] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState(null);
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  //Get friends to chat list
  useEffect(() => {
    (async () => {
      const querySnapshot = await getDoc(
        doc(db, `connect/${JSON.parse(localStorage.getItem("user"))?.uid}`)
      );
      const docData = querySnapshot.data();
      setContacts(docData?.friends || []);
      if (location.state?.uid) {
        selectUser(
          ...docData?.friends.filter((f) => f.uid === location.state.uid)
        );
      }
    })();
  }, []);

  useEffect(() => {
    const peerUser = currentContact?.uid;
    const id =
      user.uid > peerUser
        ? `${user.uid}:${peerUser}`
        : `${peerUser}:${user.uid}`;
    const msgsRef = collection(db, "messages", id, "message");
    const q = query(msgsRef, orderBy("createdAt", "asc"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setConversation(msgs);
    });
    return () => unsub();
  }, [currentContact]);

  //Select User to chat
  const selectUser = async (contact) => {
    const result = await http.get(`auth/message/get-id-by-uid/${contact.uid}`);
    setCurrentContact({ ...contact, id: result?.data.userId });
    const peerUser = contact?.uid;
    const id =
      user.uid > peerUser
        ? `${user.uid}:${peerUser}`
        : `${peerUser}:${user.uid}`;
    const msgsRef = collection(db, "messages", id, "message");
    const q = query(msgsRef, orderBy("createdAt", "asc"));
    const querySnapshot = await getDocs(q);
    let msgs = [];
    querySnapshot.forEach((doc) => {
      msgs.push(doc.data());
    });
    setConversation(msgs);
    const docSnap = await getDoc(doc(db, "lastMsg", id));
    if (docSnap.data() && docSnap.data().sendBy !== user.uid) {
      await updateDoc(doc(db, "lastMsg", id), {
        unread: false
      });
    }
  };

  return (
    <MainLayout>
      <div className="communication">
        <SidePanel contacts={contacts} selectUser={selectUser} />

        <ModalCollaborating toggle={toggle} isShowing={isShowing} />
        <div className="content">
          {currentContact ? (
            <>
              <ChatContent
                conversation={conversation}
                isCollab={isCollab}
                setCollab={setCollab}
                currentContact={currentContact}
                toggle={toggle}
              />
              <SendMessage currentContact={currentContact} />
            </>
          ) : (
            <>
              <div className="no-content">Welcome to connect everyone!</div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};
export default Communication;
