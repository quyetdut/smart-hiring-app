import React, { useEffect, useState } from "react";

import "./sidepanel.scss";
import webIcon from "assets/images/web-developer-icon.svg";
import { doc, onSnapshot } from "@firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "firebase";

const Contact = ({ item, selectUser }) => {
  const { name, position, img, active } = item;
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState("");
  const peerUser = item.uid;
  useEffect(() => {
    const id =
      user.uid > peerUser
        ? `${user.uid}:${peerUser}`
        : `${peerUser}:${user.uid}`;
    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, []);
  return (
    <li
      className={active ? "contact active" : "contact"}
      onClick={() => selectUser(item)}
    >
      <div className="wrap">
        <div className="avatar">
          <img src={img ? img : webIcon} alt="" />
        </div>
        <div className="meta">
          <div className="left">
            <div className="name">{name}</div>
            <div className="preview">{position}</div>
          </div>
          <div>
            {data?.sendBy !== user.uid && data?.unread && (
              <small className="unread">New</small>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

const SidePanel = ({ contacts, selectUser }) => {
  return (
    <div className="sidepanel">
      {!contacts.length ? (
        <div className="no-contacts"></div>
      ) : (
        <div className="contacts">
          <ul>
            {contacts &&
              contacts.map((item, index) => (
                <Contact key={index} item={item} selectUser={selectUser} />
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default SidePanel;
