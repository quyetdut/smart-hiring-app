import React from "react";
import ChartNote from "./ChartNote/ChartNote.js";
import ChartRadar from "./ChartRadar/ChartRadar.js";
import "./MatchRadarChart.scss";
import { PropTypes } from "prop-types";
import ChartDetail from "./ChartDetail/ChartDetail";
import ButtonChart from "../ButtonChart/ButtonChart.js";

MatchRadarChart.propTypes = {
  caption: PropTypes.object, // about skill like HTML/CSS, JAVA, ...
  data: PropTypes.array, // consist of: name (name of DEV), data(score about skill), meta(color)
  size: PropTypes.number // the size of Chart (default: 520)
};

MatchRadarChart.defaultProps = {
  caption: {},
  data: []
};

/** ⇩⇩⇩⇩ TEST DATA ⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩**/
const colorVariable = {
  PROJECT: "#C4C4C4",
  PERSON_01: "#DF7112",
  PERSON_02: "#DF12CA",
  PERSON_03: "#00AC11",
  NOT_MATCH: "#8A8A8A"
};

const dataTest = [
  {
    name: "project",
    data: {
      html: 0.7,
      nodeJs: 0.8,
      materialDesign: 0.9,
      css: 0.67,
      php: 0.8,
      angular2: 0.5
    },
    meta: { color: colorVariable.PROJECT }
  },
  {
    name: "person1",
    data: {
      html: 0.6,
      nodeJs: 0.85,
      materialDesign: 0.5,
      css: 0.1,
      php: 0.7,
      angular2: 0.8
    },
    meta: { color: colorVariable.PERSON_01 }
  },
  {
    name: "person2",
    data: {
      html: 0.2,
      nodeJs: 0.4,
      materialDesign: 0.7,
      css: 0.8,
      php: 0.5,
      angular2: 0.6
    },
    meta: { color: colorVariable.PERSON_02 }
  },
  {
    name: "person3",
    data: {
      html: 0.6,
      nodeJs: 0.6,
      materialDesign: 0.8,
      css: 0.3,
      php: 0.8,
      angular2: 0.7
    },
    meta: { color: colorVariable.PERSON_03 }
  }
];

const captionsTest = {
  // columns
  html: "HTML",
  nodeJs: "NodeJs",
  materialDesign: "Material Design",
  css: "CSS",
  php: "PHP",
  angular2: "Angular 2+"
};
/** ⇧⇧⇧⇧⇧ TEST DATA ⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧⇧**/

const createNoteData = (dataNote) => {
  let notes = {};
  for (const element of dataNote) {
    notes[element.name] = element.meta.color;
  }
  return notes;
};

function MatchRadarChart(props) {
  // const chartNumber = props.data.length;
  // const chartNumber = dataTest.length;
  const chartNumber = 2;

  const fatherTagClassName = "matchRadarChart " + `c${chartNumber}`;

  const resize = chartNumber == 2 ? 425 : 523;

  // const numberOfChartData = dataTest.length;
  const numberOfChartData = 2;

  return (
    <div style={{ maxWidth: "fit-content", maxHeight: "fit-content" }}>
      {numberOfChartData == 2 && (
        <ChartDetail
          name="Patricia Benzin"
          jobTitle="Web Developer"
          percent={85}
        />
      )}

      <div className={fatherTagClassName}>
        <ChartRadar
          captions={captionsTest}
          data={dataTest}
          size={resize || props.size || null} // 'size' can be empty
        />
        <ChartNote data={createNoteData(dataTest)} />
      </div>

      {numberOfChartData == 2 ? (
        <div className="button-chart size425">
          <ButtonChart info="View Profile" onClick={null} />
          <ButtonChart info="Message" onClick={null} haveColor={true} />
        </div>
      ) : (
        <div className="button-chart size523">
          <ButtonChart info="< Back" onClick={null} />
        </div>
      )}
    </div>
  );
}

export default MatchRadarChart;
