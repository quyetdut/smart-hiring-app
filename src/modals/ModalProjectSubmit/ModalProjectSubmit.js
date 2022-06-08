import React from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./ModalProjectSubmit.scss";

const ModalProjectSubmit = ({
  handleClose,
  isShowing,
  certificationSelected,
  handleRemoveCertification
}) => {
  return (
    <div className="modal-project-submit-wrapper">
      <Modal
        show={isShowing}
        onHide={handleClose}
        dialogClassName="modal-project-submit"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <h3 className="title">
          {certificationSelected ? "Delete!" : "Project submitted !"}
        </h3>
        <div className="content">
          {certificationSelected && certificationSelected.name}
        </div>
        {certificationSelected ? (
          <div className="cover-btn">
            <div className="button__cancel btn" onClick={() => handleClose()}>
              <p>Cancel</p>
            </div>
            <div
              className="button__submit btn"
              onClick={() => handleRemoveCertification(certificationSelected)}
            >
              <p>Delete Now</p>
            </div>
          </div>
        ) : (
          <Link to="/manage-projects" className="button__submit btn">
            <p>See project</p>
          </Link>
        )}
      </Modal>
    </div>
  );
};
export default ModalProjectSubmit;
