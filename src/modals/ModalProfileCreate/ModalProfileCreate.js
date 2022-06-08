import React from "react";

import { useHistory } from "react-router";
import "./ModalProfileCreate.scss";
import { Modal } from "react-bootstrap";
const ModalProfileCreate = ({ isShowing, toggle }) => {
  const history = useHistory();
  return (
    <Modal
      show={isShowing}
      onHide={toggle}
      dialogClassName="modal-profile-create"
      centered
    >
      <Modal.Body>
        <div className="ctn-text">
          <span className="txt-bold">Profile created !</span>
          <br />
          <div className="txt-explore">
            Now explore projects that match your profile, communicate with the
            project creators and collaborate with them !
          </div>
          {/* <Link to="/explore-projects" className="directional-signup-link"> */}
          <button
            className="btn-explore text-center"
            onClick={() => history.push("/explore-projects?page=1&size=3")}
          >
            <span>Explore</span>
          </button>
          {/* </Link> */}
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default ModalProfileCreate;
