import React from "react";
import "./Collaborated.scss";
import Rectangle from "./Rectangle/Rectangle";
import PropTypes from "prop-types";

export default function Collaborated({ total, available }) {
  return (
    <div className="collaborated">
      <div className="collaborated-top">
        <h3 className="title">Collaborated</h3>
        <h3 className="point">
          {available}/{total}
        </h3>
      </div>
      <div className="row">
        {Array.from(Array(total).keys()).map((index) => (
          <div
            key={index}
            className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6"
          >
            <Rectangle />
          </div>
        ))}
      </div>
    </div>
  );
}

Collaborated.prototype = {
  total: PropTypes.number.isRequired,
  available: PropTypes.number.isRequired
};
