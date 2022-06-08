import React from "react";
// import { Row, Col } from "react-bootstrap";
import "./Capabilities.scss";
import PropTypes from "prop-types";

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export default function PointItem({ point }) {
  return (
    <div className="ctn-item">
      <div className="item">
        {array.map((index) => (
          <div
            className={index <= point ? "rectangle orange" : "rectangle gray"}
            key={index}
          ></div>
        ))}
      </div>
    </div>
  );
}

PointItem.prototype = {
  label: PropTypes.string,
  point: PropTypes.number
};
