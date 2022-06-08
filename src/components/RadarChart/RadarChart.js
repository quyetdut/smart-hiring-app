import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { useHistory } from "react-router-dom";

import { configsFn } from "./config";
import hexRgb from "hex-rgb";
import ButtonChart from "components/Chart/ButtonChart/ButtonChart";
import useUid from "hook/useUid";
import Loading from "components/Loading/Loading";
import { doc, getDoc, setDoc, updateDoc } from "@firebase/firestore";
import { db } from "firebase";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({ projectId, optionRequirement, options, setIsReset }) => {
  let history = useHistory();
  const labels = optionRequirement?.map((capa) => capa.value);
  const dataRequirement = optionRequirement?.map((capa) => capa.point);
  const [isLoading, getUid, uid] = useUid();
  const mapCapaOptionToCapaRequirement = (capaOption) => {
    let result = [];
    for (let capaRequirement of optionRequirement) {
      const found = capaOption.find(
        ({ capabilityId }) => capabilityId === capaRequirement.id
      );
      result.push(found ? found.level : 0);
    }
    return result;
  };

  const requirement = {
    label: "Project Capstone",
    data: dataRequirement,
    backgroundColor: optionRequirement?.color
      ? hexRgb(`${optionRequirement?.color}`, { alpha: 0.5, format: "css" })
      : hexRgb("#BABABA", { alpha: 0.5, format: "css" }),
    borderColor: optionRequirement?.color || "#BABABA"
  };

  const optionsMapped = options?.map((option) => ({
    label: option?.name,
    data: mapCapaOptionToCapaRequirement(option?.capabilities),
    backgroundColor: option?.color
      ? hexRgb(`${option?.color}`, { alpha: 0.5, format: "css" })
      : hexRgb("#C4C4C4", { alpha: 0.5, format: "css" }),
    borderColor: option?.color || "red"
  }));

  const data = {
    labels,
    datasets: [...optionsMapped, requirement]
  };

  useEffect(() => {
    if (uid === null) return;

    const createChat = async () => {
      const toUser = doc(db, `users/${uid.uid}`);
      const toUserGet = await getDoc(toUser);
      const toUserData = toUserGet.data();
      const formUser = doc(
        db,
        `users/${JSON.parse(localStorage.getItem("user"))?.uid}`
      );
      const fromUserGet = await getDoc(formUser);
      const fromUserData = fromUserGet.data();

      const connectRefFrom = doc(
        db,
        `connect/${JSON.parse(localStorage.getItem("user"))?.uid}`
      );
      const connectRefTo = doc(db, `connect/${uid.uid}`);
      const docSnapFrom = await getDoc(connectRefFrom);
      const docSnapTo = await getDoc(connectRefTo);
      if (docSnapFrom.exists()) {
        const docDataFrom = docSnapFrom.data();
        const docDataTo = docSnapTo.data();
        if (!docDataFrom.friends.find((user) => user.uid === uid.uid)) {
          await updateDoc(connectRefFrom, {
            friends: [
              ...docDataFrom?.friends,
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
        // await setDoc(doc(db,"collaboration", ))
        history.push({
          pathname: "/messages",
          state: {
            uid: uid.uid
          }
        });
      } else {
        await setDoc(
          doc(db, "connect", JSON.parse(localStorage.getItem("user"))?.uid),
          {
            friends: [{ ...toUserData, startAt: Date.now(), projectId }]
          }
        );
        await setDoc(doc(db, "connect", uid.uid), {
          friends: [{ ...fromUserData, startAt: Date.now(), projectId }]
        });
        history.push({
          pathname: "/messages",
          state: {
            uid: uid.uid
          }
        });
      }
    };
    createChat();
  }, [uid]);
  const chat = async () => {
    await getUid(options[0].userId);
  };

  return (
    <div className="container chart">
      <Loading visible={isLoading} />
      <div className={options.length > 1 ? "big-chart" : "small-chart"}>
        <Radar
          data={data}
          options={options.length === 1 ? configsFn(options[0]) : configsFn()}
        />
      </div>
      {options.length === 1 && (
        <div className="button-chart">
          <ButtonChart
            info="View Profile"
            onClick={() => {
              history.push({
                pathname: `/my-profile/${options[0].userId}`,
                state: {
                  projectId: projectId
                }
              });
            }}
          />
          <ButtonChart info="Message" onClick={() => chat()} haveColor={true} />
        </div>
      )}
      {options.length > 1 && (
        <div className="button-chart">
          <ButtonChart
            info="< Back"
            onClick={() => {
              setIsReset(true);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default RadarChart;
