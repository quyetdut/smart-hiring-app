import React from "react";
import PropTypes from "prop-types";
import Item from "./PonitItem";
import "./Capabilities.scss";
import EditCapabilities from "../../assets/icons/edit-capabilities.svg";
export default function Capabilities({ ...props }) {
  const { capabilities, showModal, canEdit } = props;

  return (
    <div className="ctn-capability">
      <span className="ctn-capability-title">Capabilities</span>
      <div className="capability">
        {canEdit ? (
          <button className="button_top" onClick={showModal}>
            <img src={EditCapabilities} alt="edit capabilities button" />
          </button>
        ) : null}
        <div className="inside">
          {capabilities.map((a, index) => (
            <div key={index} className="capabilityBar">
              <div className="capabilityBar__label">
                <div className="boxSpan">{a.label}</div>
              </div>
              <div className="capabilityBar__bar">
                <Item label={a.label} point={a.point} key={index}></Item>
              </div>
              <div className="capabilityBar__point">
                <span>{a.point}</span>
              </div>
            </div>
          ))}
          {canEdit && (
            <div className="button_bottom" onClick={showModal}>
              + Add more
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Capabilities.prototype = {
  capabilities: PropTypes.array
};

Capabilities.defaultProps = {
  canEdit: true
};
