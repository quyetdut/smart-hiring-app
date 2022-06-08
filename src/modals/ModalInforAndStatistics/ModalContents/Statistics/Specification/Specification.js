import React from "react";

import "./Specification.scss";

const Specification = (props) => {
  const styleContent = {
    position: "absolute",
    bottom: "0",
    left: "0",
    backgroundColor: props.styleContent.bgColor,
    width: "100%",
    height: props.styleContent.height,
    zIndex: "2"
  };

  const bgContent = {
    backgroundColor: props.bgColor
  };

  return (
    <div className="statistics-specify">
      <div className="statistics-specify__content" style={bgContent}>
        <p className="statistics-specify__content-text">{props.percent}</p>
        <div style={styleContent}></div>
      </div>
      <p className="statistics-specify__title">{props.name}</p>
    </div>
  );
};

export default Specification;
