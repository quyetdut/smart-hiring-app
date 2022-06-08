import React from "react";

import "./Work.scss";
import EditCapabilities from "assets/icons/edit-capabilities.svg";
import Content from "../Content/Content";
import None from "../Content/NoneContent";
import CrossTime from "../CrossTime/CrossTime";
import ModalWorkExperiences from "modals/ModalWorkExperiences/ModalWorkExperiences";
import useModal from "hook/useModal";

const Work = (props) => {
  const {
    workExperiences,
    workExperience,
    fromTime,
    toTime,
    position,
    businessType,
    employer,
    description,
    canEdit,
    handleWorkExperience,
    handleAdd
  } = props;
  const { isShowing, toggle } = useModal();

  return (
    <div className="work-exper">
      {workExperience && (
        <ModalWorkExperiences
          handleClose={toggle}
          isShowing={isShowing}
          workExperience={workExperience}
          handleWorkExper={handleWorkExperience}
        />
      )}

      {canEdit ? (
        <button className="button_top">
          <img
            src={EditCapabilities}
            alt="edit capabilities button"
            onClick={() => toggle()}
          />
        </button>
      ) : null}
      {workExperiences ? (
        <Content
          fromTime={fromTime}
          toTime={toTime}
          position={position}
          businessType={businessType}
          employer={employer}
          description={description}
        />
      ) : (
        <None handleAdd={handleAdd} />
      )}
      <div className="work-exper__space" />
      <CrossTime fromTime={fromTime} toTime={toTime} />
    </div>
  );
};

export default Work;
