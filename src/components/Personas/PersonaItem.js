import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import IconEdit from "assets/icons/edit-capabilities.svg";
import IconWarning from "assets/icons/warning.svg";
import IconSuccess from "assets/icons/Vector.svg";
import FalgIcon from "assets/icons/flag.svg";
import ModalEditPersona from "modals/ModalEditPersona/ModalEditPersona";
import useModal from "hook/useModal";
import http from "core/services/httpService";
import { pushToast } from "components/Toast";
function PersonaItem({
  projectId,
  optionProp,
  showDetail,
  handleCapability,
  updateCapabilies
}) {
  const { isShowing, toggle } = useModal();
  const [option, setOption] = useState({});

  useEffect(() => {
    setOption(optionProp);
  }, [optionProp]);

  const handlerSubmitModal = (
    values,
    capabilities,
    positionName,
    positionId
  ) => {
    handleCapability
      ? handleCapability(values, capabilities, positionName, positionId)
      : handleSubmitPersona(values, capabilities, positionId, positionName);
    updateCapabilies(positionId, capabilities);
  };

  const handleSubmitPersona = async (values, capabilities, positionId) => {
    const personaTechnicalSubmit = capabilities.map((capa) => {
      return {
        capabilitiesId: capa.id,
        level: capa.point,
        importance: capa.importance
      };
    });
    const dataSubmit = {
      numberNeeded: values.numberNeed,
      monthNeeded: values.monthNeed,
      utilization: values.utilization,
      projectId: projectId,
      positionId: positionId,
      personasTechnicals: personaTechnicalSubmit
    };
    try {
      const res = await http.post(
        `project/project-personas/update/${projectId}`,
        dataSubmit
      );
      setOption({
        ...option,
        capabilitiesMap: capabilities,
        numberNeed: values.numberNeed,
        mounthNeed: values.monthNeed,
        utilization: values.utilization
      });
      pushToast("success", res.message);
    } catch (error) {
      console.log(error);
      pushToast("error", error.message);
    }
  };

  return (
    <div className="persona-item-option-wrapper">
      {showDetail && (
        <div className="persona-item-icon">
          <svg
            width="20"
            height="16"
            viewBox="0 0 20 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.99946 15.0969L0.607733 0.0123147L19.6595 0.182731L9.99946 15.0969Z"
              fill={option?.color}
            />
          </svg>
          <img src={FalgIcon} alt="Flag icon" />
        </div>
      )}
      <div
        className={
          showDetail === true
            ? `persona-item-option customed-option`
            : `persona-item-option`
        }
      >
        <img className="persona-item-option__icon" src={option?.icon} />
        <div className="persona-item-option__content">
          <h5 className="persona-item-option__content-title">
            {option?.title}
          </h5>
          <p className="persona-item-option__content-months-utilization">
            {option?.mounthNeed} months, at {option?.utilization} %
          </p>
          <div className="persona-item-option__content-capabilies">
            {option?.capabilies ? (
              <div>
                {" "}
                <img src={IconSuccess} />
                <span className="persona-item-option__content-capabilies-span-green">
                  Capabilies added
                </span>
              </div>
            ) : (
              <div>
                {" "}
                <img src={IconWarning} />
                <span className="persona-item-option__content-capabilies-span-orange">
                  No capabilies yet
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="persona-item-option__number">
          <p>
            {option?.numberHad} / {option?.numberNeed}
          </p>
        </div>
        <div className="persona-item-option__edit-cover">
          <button
            style={{ border: "none", background: "transparent" }}
            onClick={toggle}
          >
            <img className="persona-item-option__edit" src={IconEdit} />
          </button>
        </div>
      </div>
      <ModalEditPersona
        isShowing={isShowing}
        handlerSubmitModal={handlerSubmitModal}
        handleClose={toggle}
        optionProp={option}
      ></ModalEditPersona>
    </div>
  );
}

PersonaItem.propTypes = {
  option: PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    mounthNeed: PropTypes.number,
    utilization: PropTypes.number,
    capabilies: PropTypes.bool,
    numberNeed: PropTypes.number,
    numberHad: PropTypes.number
  })
};

export default PersonaItem;
