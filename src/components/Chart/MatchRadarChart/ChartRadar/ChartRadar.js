import RadarChart from "react-svg-radar-chart";
import "react-svg-radar-chart/build/css/index.css";
import "./ChartRadar.scss";

import React from "react";
import PropTypes from "prop-types";

ChartRadar.propTypes = {
  captions: PropTypes.object,
  data: PropTypes.array,
  size: PropTypes.number
};

ChartRadar.defaultProps = {
  captions: {},
  data: []
};

const defaultOptions = {
  size: 520,
  axes: true, // show axes?
  scales: 10, // show scale circles?
  captions: true, // show captions?
  captionMargin: 80,
  zoomDistance: 1.3, // where on the axes are the captions?
  captionProps: () => ({
    className: "caption",
    textAnchor: "middle",
    fontFamily: "Toyota Type"
  }),
  rotation: 30
};

function ChartRadar({ captions, data, size }) {
  return (
    <div className="matchRadarChar">
      <RadarChart
        captions={captions}
        data={data}
        size={size || 520}
        options={defaultOptions}
      />
    </div>
  );
}

export default ChartRadar;
