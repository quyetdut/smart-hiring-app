import React from "react";

import "./Information.scss";

const Information = (props) => {
  return (
    <a className="information-item">
      <img className="information-item__img" src={props.srcIconInfor} alt="" />
      <p className="information-item__text">{props.text}</p>
    </a>
  );
};

export default Information;
