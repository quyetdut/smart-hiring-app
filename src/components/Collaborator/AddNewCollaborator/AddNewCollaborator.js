import React from "react";
import "./AddNewCollaborator.scss";
import icon_add from "assets/icons/add.png";

const AddNewCollaborator = () => {
  return (
    <div className="add-new-collaborator">
      <div className="add-new-collaborator-icon">
        <img src={icon_add} alt="icon add new collaborator" />
      </div>
      <div className="add-new-collaborator-label">Add New Collaborator</div>
    </div>
  );
};

export default AddNewCollaborator;
