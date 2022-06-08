import React from "react";
import PropTypes from "prop-types";
import "./ChartNote.scss";

ChartNote.propTypes = {
  data: PropTypes.object
};

ChartNote.defaultProps = {
  data: {}
};

const createNoteTag = (notes) => {
  if (notes) {
    const noteTag = Object.entries(notes)
      .reverse()
      .map(([key, color]) => {
        return (
          <div className="note" key={key}>
            <div
              className="note-color"
              style={{ backgroundColor: color }}
            ></div>
            <div className="note-key">{key}</div>
          </div>
        );
      });
    return noteTag;
  }
  return;
};

function ChartNote({ data }) {
  return <div className="chart-note">{createNoteTag(data)}</div>;
}
export default ChartNote;
