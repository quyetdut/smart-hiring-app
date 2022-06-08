import React from "react";
import { Modal } from "react-bootstrap";
import WorkExperiencesForm from "./WorkExperiencesForm/WorkExperiencesForm";
import "./ModalWorkExperiences.scss";

function ModalWorkExperiences({
  handleClose,
  isShowing,
  workExperience,
  handleWorkExper
}) {
  const onHide = () => {
    handleClose();
  };

  return (
    <div className="workexperiences">
      <Modal
        show={isShowing}
        size="lg"
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="workexperiences-modal-body">
          <div className="workexperiences-wrapper">
            <div className="workexperiences-content">
              <div className="workexperiences-heading">
                <div className="workexperiences-title">Work experiences</div>
                <div className="workexperiences-close" onClick={onHide}>
                  <div className="close-1"></div>
                  <div className="close-2"></div>
                </div>
              </div>
              <div className="workexperiences-form__list">
                <WorkExperiencesForm
                  experience={workExperience}
                  handleWorkExperience={handleWorkExper}
                  handleClose={handleClose}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default ModalWorkExperiences;
