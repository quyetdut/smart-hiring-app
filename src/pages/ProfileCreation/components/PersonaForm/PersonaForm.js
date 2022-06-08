import React, { useState } from "react";
import PropTypes from "prop-types";

import SingleSelectField from "components/Forms/SingleSelectField/SingleSelectField";
import CreatorIcon from "assets/images/creator-icon.svg";
// import WebDeveloperIcon from "assets/images/web-developer-icon.svg";
// import ProductOwnerIcon from "assets/images/product-owner-icon.svg";
// import SolutionArchitectIcon from "assets/images/solution-architect-icon.svg";
import MultiSelectField from "components/Forms/MultiSelectField/MultiSelectField";
import PrimaryButton from "components/PrimaryButton/PrimaryButton";
import styles from "./PersonaForm.module.scss";
import usePersonaApi from "hook/usePersonaApi";
import useCapability from "hook/useCapability";

const LIMIT_SKILLS_SELECTED = 3;

const PersonaForm = (props) => {
  const [personaOptions] = usePersonaApi("DEV");
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [capabilitySkills] = useCapability(selectedPersona);

  // Go to "https://react-select.com/props#prop-types" for using event props
  const handleOnSelectPersona = (persona) => {
    setSelectedPersona(persona);
  };

  const handleOnSelectSkills = (skills) => {
    setSelectedSkills(skills);
  };

  const handleOnClickCreatePersona = () => {
    console.log("Create a new Persona");
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({ positions: selectedPersona, skills: selectedSkills });
  };

  const renderFooterContentMenuList = () => (
    <button type="button" onClick={handleOnClickCreatePersona}>
      + Create a new Persona
    </button>
  );

  const submittable = () =>
    selectedPersona && selectedSkills.length === LIMIT_SKILLS_SELECTED;

  return (
    <form className={styles.form} onSubmit={handleOnSubmit}>
      <div className={styles.formControl}>
        <label htmlFor="persona" className={styles.formControlLabel}>
          Persona
        </label>
        <SingleSelectField
          inputId="persona"
          name="persona"
          options={personaOptions}
          value={selectedPersona}
          onChange={handleOnSelectPersona}
          placeholder={{ label: "Choose a persona", icon: CreatorIcon }}
          footerContentMenuList={renderFooterContentMenuList()}
        />
      </div>

      <div className={styles.formControl}>
        <label htmlFor="capabilities" className={styles.formControlLabel}>
          Capabilities {`${selectedSkills.length}/${LIMIT_SKILLS_SELECTED}`}
        </label>
        <MultiSelectField
          inputId="capabilities"
          name="capabilities"
          options={capabilitySkills}
          value={selectedSkills}
          defaultValue={selectedSkills}
          limitSelected={LIMIT_SKILLS_SELECTED}
          limitResults={5}
          onChange={handleOnSelectSkills}
          placeholder="Search"
          noOptionsMessage={() => "No results"}
        />
      </div>

      {submittable() && (
        <div className={styles.formBtnContainer}>
          <PrimaryButton type="submit">NEXT</PrimaryButton>
        </div>
      )}
    </form>
  );
};

PersonaForm.prototype = {
  onSubmit: PropTypes.func
};

export default PersonaForm;
