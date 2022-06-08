import React from "react";

import "./ModalCollaborating.scss";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
const ModalCollaborating = ({ isShowing, toggle }) => {
  return (
    <Modal
      show={isShowing}
      onHide={toggle}
      dialogClassName="modal-collaborating"
      centered
    >
      <Modal.Body>
        <div className="ctn-collab">
          <div className="ctn text-center">
            <div className="text">
              Congratulations on your first collaboration.<br></br>Go see your
              new collaboration.
            </div>
            <Link to="/my-projects" className="button_submit btn">
              <p>My projects</p>
            </Link>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default ModalCollaborating;
