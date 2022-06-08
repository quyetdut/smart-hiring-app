import React from "react";
import "./PurposePitchItem.scss";
import edit_purpose_pitch_icon from "assets/icons/edit-capabilities.svg";

const PurposePitchItem = (props) => {
  return (
    <div className="purpose-pitch-item">
      <div className="purpose-pitch-item-wrapper">
        <div className="purpose-pitch-item-wrapper-content">
          <div className="purpose-pitch-item-wrapper-content__title">
            {props.title}
          </div>
          <div className="purpose-pitch-item-wrapper-content__description">
            {props.description}
          </div>
        </div>
        <div className="purpose-pitch-item-wrapper-edit-button">
          <img
            src={edit_purpose_pitch_icon}
            alt="edit button of purpose pitch item "
          />
        </div>
      </div>
    </div>
  );
};

export default PurposePitchItem;
