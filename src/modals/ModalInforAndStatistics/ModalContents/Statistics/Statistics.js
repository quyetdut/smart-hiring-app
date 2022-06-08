import React from "react";

import "./Statistics.scss";

import Information from "./Information/Information";
import Specification from "./Specification/Specification";

const Statistics = (props) => {
  const informations = props.infomations;

  let userStoryDone = {
    name: "Users Stories done",
    percent: "10%",
    styleContent: {
      bgColor: "#a15a21",
      height: "10%"
    }
  };

  let technicalDebt = {
    name: "Technical debt",
    percent: "3%",
    styleContent: {
      bgColor: "#a15a21",
      height: "3%"
    }
  };
  let sprintsDone = {
    name: "Sprints done",
    percent: "3",
    styleContent: {
      bgColor: "none",
      height: "0%"
    }
  };
  let currentSprintCompletion = {
    name: "Current sprint completion",
    percent: "47%",
    styleContent: {
      bgColor: "#86c2a0",
      height: "47%"
    }
  };
  let teamVelocity = {
    name: "Team velocity",
    percent: "13sp",
    styleContent: {
      bgColor: "none",
      height: "0%"
    }
  };

  const inforElement = informations.map((information, index) => {
    return (
      <Information
        key={index}
        srcIconInfor={information.icon}
        text={information.text}
      />
    );
  });

  return (
    <div className="statistics" style={{}}>
      <div className="statistics__infor">{inforElement}</div>

      <div className="statistics__specification">
        <Specification
          name={userStoryDone.name}
          percent={userStoryDone.percent}
          bgColor="#784c2b"
          styleContent={userStoryDone.styleContent}
        />
        <Specification
          name={technicalDebt.name}
          percent={technicalDebt.percent}
          bgColor="#784c2b"
          styleContent={technicalDebt.styleContent}
        />
        <Specification
          name={sprintsDone.name}
          percent={sprintsDone.percent}
          bgColor="#54782b"
          styleContent={sprintsDone.styleContent}
        />
        <Specification
          name={currentSprintCompletion.name}
          percent={currentSprintCompletion.percent}
          bgColor="#0f7d3e"
          styleContent={currentSprintCompletion.styleContent}
        />
        <Specification
          name={teamVelocity.name}
          percent={teamVelocity.percent}
          bgColor="#0f7d3e"
          styleContent={teamVelocity.styleContent}
        />
        ,
      </div>
    </div>
  );
};

export default Statistics;
