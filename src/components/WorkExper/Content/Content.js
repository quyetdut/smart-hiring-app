import React from "react";

import "./Content.scss";

import DeveloperImg from "../../../assets/images/web-developer-icon.svg";
import ProductOwner from "../../../assets/images/product-owner-icon.svg";
import SolutionArchitect from "../../../assets/images/solution-architect-icon.svg";

const Content = (props) => {
  let positionImg = ProductOwner;
  switch (props.position) {
    case "Web Developer":
      positionImg = DeveloperImg;
      break;
    case "Product Owner":
      positionImg = ProductOwner;
      break;
    case "Solution Architect":
      positionImg = SolutionArchitect;
      break;
  }

  return (
    <div className="work-exper-content">
      <div className="work-exper-content-img">
        <img className="image" src={positionImg} alt="avatar" />
      </div>
      <div className="work-exper-content-time">
        {`${props.fromTime} - ${props.toTime}`}
      </div>
      <div className="work-exper-content-position">{props.position}</div>
      <div className="work-exper-content-organization">
        {`${props.businessType} - ${props.employer}`}
      </div>
      <div className="work-exper-content-description">{props.description}</div>
    </div>
  );
};

export default Content;
