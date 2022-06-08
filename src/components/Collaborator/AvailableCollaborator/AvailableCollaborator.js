import React, { useState } from "react";
import "./AvailableCollaborator.scss";
import collaborator_icon_remove from "assets/icons/collaborator-icon-remove.svg";

const AvailableCollaborator = (props) => {
  const [remove, setRemove] = useState(true);

  return (
    <div>
      {remove && (
        <div div className="available-collaborator">
          <div className="available-collaborator-content">
            <div className="available-collaborator-content__name">
              {props.name}
            </div>
            <div className="available-collaborator-content__job">
              {props.job}
            </div>
          </div>
          <div
            className="available-collaborator-icon"
            onClick={() => setRemove(false)}
          >
            <img
              src={collaborator_icon_remove}
              alt="collaborator icon remove"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableCollaborator;
