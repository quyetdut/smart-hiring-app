import React from "react";
import "./PurposePitch.scss";
import PurposePitchItem from "./PurposePitchItem/PurposePitchItem";

const PurposePitch = ({ project }) => {
  return (
    <div className="purpose-pitch">
      <div className="purpose-pitch-header">Purpose Pitch</div>
      <div className="purpose-pitch-body">
        <PurposePitchItem
          title={"Problem Statement"}
          description={project?.problemStatement}
        />
        <PurposePitchItem
          title={"The big vison"}
          description={project?.bigVision}
        />
        <PurposePitchItem
          title={"value proposition"}
          description={project?.valueProposition}
        />
        <PurposePitchItem title={"customer"} description={project?.customer} />
        {}
        <PurposePitchItem
          title={"Revenue Streams"}
          description={project?.revenueStreams}
        />
      </div>
    </div>
  );
};

export default PurposePitch;
