import React from "react";

import "./AddPersona.scss";
import ModalEditPersona from "modals/ModalEditPersona/ModalEditPersona";
import CreatorIcon from "assets/images/creator-icon.svg";
import IconAdd from "assets/icons/add.png";
import useModal from "hook/useModal";

const AddPersona = ({ showDetail, personaSelected, handleAddNewPersona }) => {
  const { isShowing, toggle } = useModal();

  return (
    <>
      <div
        className={
          showDetail === true
            ? `add_persona-item-option add_persona-item--customed-option`
            : `add_persona-item-option`
        }
        onClick={toggle}
      >
        <img className="add_persona-item-option__icon" src={CreatorIcon} />
        <div className="add_persona-item-option__content">
          <h5 className="add_persona-item-option__content-title">
            Add a Persona
          </h5>
        </div>
        <div className="add_persona-item-option__number">
          <img src={IconAdd} />
        </div>
        <div className="add_persona-item-option__edit-cover">
          <p></p>
        </div>
      </div>

      <ModalEditPersona
        isShowing={isShowing}
        handleClose={toggle}
        personaSelected={personaSelected}
        handlerSubmitModal={handleAddNewPersona}
      ></ModalEditPersona>
    </>
  );
};

export default AddPersona;
