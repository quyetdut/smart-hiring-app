import React from "react";
import PropTypes from "prop-types";
import "./ChartDetail.scss";

ChartDetail.propTypes = {
  name: PropTypes.string.isRequired,
  jobTitle: PropTypes.string.isRequired,
  percent: PropTypes.number.isRequired
};

function ChartDetail({ name, jobTitle, percent }) {
  return (
    <div className="detail">
      <div className="detail-name">{name}</div>
      <div className="detail-job">
        {jobTitle} | {percent}% matching
      </div>
    </div>
  );
}

export default ChartDetail;
