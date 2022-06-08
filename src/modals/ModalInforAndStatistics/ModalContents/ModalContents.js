import React from "react";

import "./ModalContents.scss";

import Statistics from "./Statistics/Statistics";
import BurndownChart from "./BurndownChart/BurndownChart";

const ModalContens = (props) => {
  return (
    <div className="modal-contents">
      <div className="modal-contents__statistics">
        <Statistics infomations={props.infomations} />
      </div>
      <div className="modal-contents__chart">
        <BurndownChart srcChart={props.srcChart} />
      </div>
    </div>
  );
};

export default ModalContens;
