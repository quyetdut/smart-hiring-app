import React from "react";
import PropTypes from "prop-types";
import "./ButtonChart.scss";

ButtonChart.propTypes = {
  info: PropTypes.string,
  onClick: PropTypes.func,
  haveColor: PropTypes.bool
};

ButtonChart.defaultProps = {
  haveColor: false
};

function ButtonChart({ info, onClick, haveColor }) {
  const className = "button" + (haveColor ? " blue" : " white");

  return (
    <button className={className} onClick={onClick}>
      {info}
    </button>
  );
}

export default ButtonChart;
