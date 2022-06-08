import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from "@firebase/firestore";
import Loading from "components/Loading/Loading";
import { db } from "firebase";
import useUid from "hook/useUid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import MessageIcon from "assets/images/icons/message.svg";
import { getUidSorted } from "firestore/getUIDSorted";
import { STATUS_COLLABORATE } from "../../core/constants";
import {
  requestCollaborateByUser,
  useCollaborateStatus
} from "hook/useCollaborateStatus";
import http from "core/services/httpService";

const INTERESTED = "INTERESTED";
const NOT_INTERESTED = "NOT_INTERESTED";

const CardFooter = ({
  status,
  onInterest,
  onNotInterest,
  projectId,
  positionId,
  projectPositionList,
  poId
}) => {
  const history = useHistory();
  const [isLoading, getUid, uid] = useUid();
  const [isNavigate, setNavigate] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { data, execute } = useCollaborateStatus();
  const [isInterested, setIsInterested] = useState();

  useEffect(() => {
    execute({ projectId: projectId, userId: user.id });
  }, [projectId, execute]);
  useEffect(async () => {
    if (!projectId) return;
    const result = await http.get(
      `project/interesting/get-interest-status?projectId=${projectId}&userId=${user.id}`
    );
    setIsInterested(result.data.interestingStatus);
  }, [projectId, onInterest, onNotInterest]);
  useEffect(() => {
    if (uid === null) return;
    //ID for connect two users in firebase
    const id = getUidSorted(user, uid);
    const createChat = async () => {
      //From: Current user (user in localStorage);
      //To: Peer User
      const toUser = doc(db, `users/${uid.uid}`);
      const toUserGet = await getDoc(toUser);
      const toUserData = toUserGet.data();
      const fromUser = doc(
        db,
        `users/${JSON.parse(localStorage.getItem("user"))?.uid}`
      );
      const fromUserGet = await getDoc(fromUser);
      const fromUserData = fromUserGet.data();
      const connectRefFrom = doc(
        db,
        `connect/${JSON.parse(localStorage.getItem("user"))?.uid}`
      );

      const connectRefTo = doc(db, `connect/${uid.uid}`);
      const docSnapFrom = await getDoc(connectRefFrom);
      const docSnapTo = await getDoc(connectRefTo);
      const docDataFrom = docSnapFrom.data();
      const docDataTo = docSnapTo.data();
      const msgsRef = collection(db, "messages", id, "message");
      if (docSnapFrom.exists()) {
        await handleAskToCollaborate(msgsRef, id);
        if (!docDataFrom.friends.find((user) => user.uid === uid.uid)) {
          await updateDoc(connectRefFrom, {
            friends: [
              ...docDataFrom.friends,
              { ...toUserData, startAt: Date.now(), projectId }
            ]
          });
          if (docSnapTo.exists()) {
            await updateDoc(connectRefTo, {
              friends: [
                ...docDataTo?.friends,
                { ...fromUserData, startAt: Date.now(), projectId }
              ]
            });
          } else {
            await setDoc(doc(db, "connect", uid.uid), {
              friends: [{ ...fromUserData, startAt: Date.now(), projectId }]
            });
          }
        }
        if (isNavigate) {
          history.push({
            pathname: "/messages",
            state: {
              // location state
              uid: uid.uid
            }
          });
        }
      } else {
        // create a new connect
        await setDoc(
          doc(db, "connect", JSON.parse(localStorage.getItem("user"))?.uid),
          {
            friends: [{ ...toUserData, startAt: Date.now(), projectId }]
          }
        );
        await handleAskToCollaborate(msgsRef, id);
        if (docSnapTo.exists()) {
          await updateDoc(connectRefTo, {
            friends: [
              ...docDataTo?.friends,
              { ...fromUserData, startAt: Date.now(), projectId }
            ]
          });
        } else {
          await setDoc(doc(db, "connect", uid.uid), {
            friends: [{ ...fromUserData, startAt: Date.now(), projectId }]
          });
        }
        if (isNavigate) {
          history.push({
            pathname: "/messages",
            state: {
              // location state
              uid: uid.uid
            }
          });
        }
      }
    };
    createChat();
  }, [uid]);
  const chat = async (e) => {
    e.stopPropagation();
    await getUid(poId);
    setNavigate(true);
  };

  const handleAskToCollaborate = async (msgsRef, id) => {
    await setDoc(doc(db, "collaboration", id), {
      status: 1,
      requestByUserId: user.id
    });
    await addDoc(msgsRef, {
      content: "I want to collaborate! I've just sent a request.",
      collaborate: true,
      sendBy: user.uid,
      createdAt: new Date().getTime()
    });
  };
  const askToCollaborate = async (e) => {
    e.stopPropagation();
    await getUid(poId);
    await requestCollaborateByUser({
      projectId: projectId,
      userId: user.id
    }).then(() => execute({ projectId: projectId, userId: user.id }));
    setNavigate(false);
  };

  const showButtonCollaborate = () => {
    switch (data?.collaborateStatus) {
      case STATUS_COLLABORATE.NOT_COLLABORATE:
        return "Ask to collaborate";
      case STATUS_COLLABORATE.USER_REQUEST_COLLABORATE:
        return "Waiting for PO accept";
      case STATUS_COLLABORATE.PROJECT_REQUEST_COLLABORATE:
        return "Collaborate with project";
      case STATUS_COLLABORATE.COLLABORATING:
        return "Collaborating";
      case STATUS_COLLABORATE.USER_REJECT_COLLABORATE:
        return "Ask to collaborate";
      case STATUS_COLLABORATE.PROJECT_REJECT_COLLABORATE:
        return "Ask to collaborate";
      default:
        return "Ask to collaborate";
    }
  };

  if (isLoading) {
    return <Loading visible={isLoading} />;
  }

  if (status === "waiting" || status === "interested") {
    return (
      <div className="ctn-card-btn">
        <button className="ctn-card-btn-item btn-blue" onClick={(e) => chat(e)}>
          Message <img className="btn-blue-img" src={MessageIcon} />
        </button>
        {status === "interested" && (
          <button
            className="ctn-card-btn-item btn-green"
            onClick={(e) => askToCollaborate(e)}
            disabled={
              data?.collaborateStatus ==
                STATUS_COLLABORATE.USER_REQUEST_COLLABORATE ||
              data?.collaborateStatus == STATUS_COLLABORATE.COLLABORATING
            }
          >
            {showButtonCollaborate()}
          </button>
        )}
      </div>
    );
  }

  if (status === "accepted") {
    return (
      <>
        <div className="ctn-card-btn-interested">
          <span>Project added</span>
          <NavLink to="a">See my projects</NavLink>
        </div>
        <NavLink to="a" className="go-back">
          {"<"} Go back
        </NavLink>
      </>
    );
  }

  const handleInterested = (e) => {
    e.stopPropagation();
    onInterest(projectId, positionId, projectPositionList);
  };

  const handleNotInterested = (e) => {
    e.stopPropagation();
    onNotInterest(projectId, positionId, projectPositionList);
  };

  return (
    <div className="ctn-card-btn">
      <button
        className={`ctn-card-btn-item ${
          isInterested === NOT_INTERESTED ? "btn-white-disabled" : "btn-white"
        }`}
        onClick={(e) => handleNotInterested(e)}
        disabled={isInterested === NOT_INTERESTED}
        title={
          isInterested === NOT_INTERESTED
            ? "You were not interest in this project"
            : null
        }
      >
        Not interested
        <i className="fas fa-times"></i>
      </button>
      <button
        className={`ctn-card-btn-item ${
          isInterested === INTERESTED ? "btn-green-disabled" : "btn-green"
        }`}
        onClick={(e) => handleInterested(e)}
        disabled={isInterested === INTERESTED}
        title={
          isInterested === INTERESTED
            ? "You were interest in this project"
            : null
        }
      >
        Interested
        <i className="fas fa-check"></i>
      </button>
    </div>
  );
};
export default CardFooter;
