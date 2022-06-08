import React from "react";
import "./Rectangle.scss";
import WedDevelopAvatar from "assets/icons/WebDeveloperRectangle.svg";

export default function Rectangle() {
  return (
    <div className="rectangle">
      <div className="rectangle-img">
        <img src={WedDevelopAvatar} />
      </div>
    </div>
  );
}
