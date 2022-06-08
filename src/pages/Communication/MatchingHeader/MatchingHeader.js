/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import "./matchingheader.scss";
import webIcon from "assets/images/web-developer-icon.svg";
import collabSuccessIcon from "assets/images/collab-success-icon.svg";
import {
  acceptCollaborateByPO,
  acceptCollaborateByUser,
  rejectCollaborateByPO,
  rejectCollaborateByUser,
  useCollaborateStatus
} from "hook/useCollaborateStatus";
import { useSelector } from "react-redux";
import { STATUS_COLLABORATE_FIREBASE, USER_ROLE } from "core/constants";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc
} from "@firebase/firestore";
import { db } from "firebase";
import { getUidSorted } from "firestore/getUIDSorted";
import http from "core/services/httpService";

const Profile = ({ currentContact }) => {
  return (
    <div className="first col-lg-5 col-md-5 col-sm-5 col-5">
      <div className="ctn">
        <img
          className="image col-lg-4 col-md-4 col-sm-4 col-4"
          src={webIcon}
          alt=""
        />
        <div className="txt">
          <p className="name">{currentContact?.name}</p>
          <p className="persona">{currentContact?.position}</p>
        </div>
      </div>
    </div>
  );
};
const ProjectMatching = ({
  isCollab,
  collabStatus,
  currentContact,
  acceptCollaborate,
  cancelCollaborate,
  matchingScore
}) => {
  const { user } = useSelector((state) => state.user);
  //Change css of collab button with collabstatus
  if (collabStatus?.status === 2) {
    var buttonCollab = "btn-collab collaborating";
    var iconSuccess = (
      <img className="collab-success-icon" src={collabSuccessIcon} />
    );
  } else if (
    collabStatus?.status === 1 &&
    collabStatus.requestByUserId === user.id
  ) {
    buttonCollab = "btn-collab cancel-collab";
    iconSuccess = <div />;
  } else {
    buttonCollab = "btn-collab collaborate";
    iconSuccess = <div />;
  }

  // Show button's content
  const switchCollaborateButton = (param) => {
    switch (param?.status) {
      case 0:
        return "Collaborate";
      case 1:
        if (param.requestByUserId === user.id) {
          return "Cancel collaboration request";
        }
        return "Collaborate";
      case 2:
        return `Collaborating`;
      default:
        return `Collaborate`;
    }
  };
  return (
    <div className="second col-lg-7 col-md-7 col-sm-7 col-7">
      <div className="ctn">
        <div className="ctn-text">
          <p className="project">Prius efficiency Tracker</p>
          <p className="match">{matchingScore?.matchingScore}% match</p>
        </div>
        <button
          className={buttonCollab}
          onClick={() => {
            {
              collabStatus?.status === 1 &&
              collabStatus.requestByUserId === user.id
                ? cancelCollaborate()
                : acceptCollaborate();
            }
          }}
          disabled={
            collabStatus?.status === 0 || collabStatus?.status === 1
              ? false
              : true
          }
        >
          <div>{switchCollaborateButton(collabStatus)}</div>
          {iconSuccess}
        </button>
      </div>
    </div>
  );
};
const MatchingHeader = ({ toggle, setCollab, isCollab, currentContact }) => {
  const { user } = useSelector((state) => state.user);
  const { execute } = useCollaborateStatus();
  const [dataStatus, setDataStatus] = useState();
  const [matchingScore, setMatchingScore] = useState();
  //arrange id for firbase
  const id = getUidSorted(user, currentContact);

  useEffect(() => {
    if (user.roles[0] === USER_ROLE.DEVELOP) {
      execute({ projectId: currentContact.projectId, userId: user.id });
    } else {
      execute({
        projectId: currentContact.projectId,
        userId: currentContact.id
      });
    }
  }, [execute]);
  useEffect(() => {
    (async () => {
      await http
        .get(
          `persona/recommendation/get-matching-score?userId=${
            user.roles[0] === USER_ROLE.DEVELOP ? user.id : currentContact.id
          }&projectId=${currentContact.projectId}`
        )
        .then((res) => {
          setMatchingScore(res.data);
        });
    })();
  }, []);
  useEffect(() => {
    let collabRef = doc(db, "collaboration", id);
    const unsub = onSnapshot(collabRef, (doc) => {
      setDataStatus(doc.data());
    });
    return () => unsub();
  }, []);
  const acceptCollaborate = async () => {
    let content = "";
    if (user.roles[0] === USER_ROLE.PROJECT_OWNER) {
      if (dataStatus.status === STATUS_COLLABORATE_FIREBASE.COLLABORATE) {
        content = "I want you to join my team, please consider this invitation";
        await setDoc(doc(db, "collaboration", id), {
          status: 1,
          requestByUserId: user.id
        });
      }
      if (dataStatus.status === STATUS_COLLABORATE_FIREBASE.COLLABORATING) {
        content = "I accept your request, welcome to my team ";
        await setDoc(doc(db, "collaboration", id), {
          status: 2,
          requestByUserId: user.id
        });
      }
    } else if (user.roles[0] === USER_ROLE.DEVELOP) {
      if (dataStatus.status === STATUS_COLLABORATE_FIREBASE.COLLABORATE) {
        content = "I want to collaborate! I've just sent a request";
        await setDoc(doc(db, "collaboration", id), {
          status: 1,
          requestByUserId: user.id
        });
      }
      if (dataStatus.status === STATUS_COLLABORATE_FIREBASE.COLLABORATING) {
        content = "I'm ready, I accept your invitation";
        await setDoc(doc(db, "collaboration", id), {
          status: 2,
          requestByUserId: user.id
        });
      }
    }
    if (user.roles[0] === USER_ROLE.DEVELOP) {
      await acceptCollaborateByUser({
        projectId: currentContact.projectId,
        userId: user.id
      })
        .then(() =>
          execute({ projectId: currentContact.projectId, userId: user.id })
        )
        .then((data) => {
          if (data.status === 2) {
            toggle();
            setCollab(true);
          }
        });
    } else {
      await acceptCollaborateByPO({
        projectId: currentContact.projectId,
        userId: currentContact.id
      })
        .then(() =>
          execute({
            projectId: currentContact.projectId,
            userId: currentContact.id
          })
        )
        .then((data) => {
          if (data.status === 2) {
            setCollab(true);
          }
        });
    }
    await addDoc(collection(db, "messages", id, "message"), {
      collaborate: true,
      content,
      sendBy: user.uid,
      createdAt: new Date().getTime()
    });
    await setDoc(doc(db, "lastMsg", id), {
      collaborate: true,
      sendBy: user.uid,
      createdAt: new Date().getTime(),
      unread: true
    });
  };
  const cancelCollaborate = async () => {
    if (user.roles[0] === USER_ROLE.DEVELOP) {
      await setDoc(doc(db, "collaboration", id), {
        status: 0,
        requestByUserId: user.id
      });
      await rejectCollaborateByUser({
        projectId: currentContact.projectId,
        userId: user.id
      }).then(() =>
        execute({ projectId: currentContact.projectId, userId: user.id })
      );
    } else {
      await setDoc(doc(db, "collaboration", id), {
        status: 0,
        requestByUserId: user.id
      });
      await rejectCollaborateByPO({
        projectId: currentContact.projectId,
        userId: currentContact.id
      }).then(() =>
        execute({
          projectId: currentContact.projectId,
          userId: currentContact.id
        })
      );
    }
  };
  return (
    <div className="matching-header row">
      <Profile currentContact={currentContact} />
      <ProjectMatching
        toggle={toggle}
        setCollab={setCollab}
        isCollab={isCollab}
        currentContact={currentContact}
        collabStatus={dataStatus}
        acceptCollaborate={acceptCollaborate}
        cancelCollaborate={cancelCollaborate}
        matchingScore={matchingScore}
      />
    </div>
  );
};

export default MatchingHeader;
