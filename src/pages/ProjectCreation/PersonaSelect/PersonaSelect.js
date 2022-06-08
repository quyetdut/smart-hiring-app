import React from "react";
import { FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";

import WizardStep2 from "assets/images/wizard-step-2.svg";
// import SolutionArchitectIcon from "assets/images/solution-architect-icon.svg";
import InputNumberFormik from "components/Forms/InputNumberFormik/InputNumberFormik";
import SelectPersonaFormik from "components/Forms/SelectPersonaFormik/SelectPersonaFormik";
import styles from "./PersonaSelect.module.scss";
import sessionStore from "core/sessionStore";
import usePersonaApi from "hook/usePersonaApi";

const PersonaSelect = ({ nextBtnRef, onNextStep }) => {
  const [personaOptions] = usePersonaApi("DEV");

  const initialValues = {
    personas: [
      {
        positionName: "",
        numberNeeded: 0,
        monthNeeded: 0,
        utilization: 0
      }
    ]
  };

  const validationSchema = Yup.object().shape({
    personas: Yup.array().of(
      Yup.object().shape({
        positionName: Yup.string().required("Required"),
        numberNeeded: Yup.number()
          .positive("The required number must be greater than 0")
          .required("Required"),
        monthNeeded: Yup.number()
          .positive("The required number must be greater than 0")
          .required("Required"),
        utilization: Yup.number()
          .positive("The required number must be greater than 0")
          .required("Required")
      })
    )
  });

  const renderPersonaRow = (values, arrayHelpers) => {
    if (values.personas && values.personas.length > 0) {
      return values.personas.map((persona, index) => (
        <div className={styles.row} key={"positionName-" + index}>
          <SelectPersonaFormik
            className={styles.select}
            label={"Persona " + (index + 1)}
            name={`personas.${index}.positionName`}
            options={personaOptions}
            onChangePersonaId={(val) => console.log(val)}
          />
          <InputNumberFormik
            className={styles.input}
            label="Number needed"
            name={`personas.${index}.numberNeeded`}
          />
          <InputNumberFormik
            className={styles.input}
            label="Month needed"
            name={`personas.${index}.monthNeeded`}
          />
          <InputNumberFormik
            className={styles.input}
            label="Utilization %"
            name={`personas.${index}.utilization`}
          />
          <div className={styles.buttonsGroup}>
            <button
              className={`${styles.button} ${styles.remove}`}
              type="button"
              onClick={() =>
                (index !== 0 || values.personas.length > 1) &&
                arrayHelpers.remove(index)
              }
            >
              <i className="fas fa-minus"></i>
            </button>
            <button
              className={`${styles.button} ${styles.add}`}
              type="button"
              onClick={() =>
                arrayHelpers.insert(index + 1, initialValues.personas[0])
              }
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
      ));
    }
    return <></>;
  };

  let flag = false;
  return (
    <>
      <h2 className="create-project-title">Persona Selection</h2>
      <div className="create-project-main">
        <div className="wizard-step d-flex justify-content-center align-items-center mb-5">
          <img src={WizardStep2} alt="wizard-step-2" />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={() => onNextStep()}
        >
          {({ values, setValues }) => {
            const project = sessionStore.getItem("project");
            if (!flag) {
              if (project && project.projectPersonas) {
                setValues({ personas: [...project.projectPersonas] });
              }
              flag = true;
            } else {
              let personas = values.personas.map((per) => {
                return {
                  positionId: personaOptions.find(
                    (arr) => arr.label === per.positionName
                  )?.id,
                  monthNeeded: per.monthNeeded,
                  numberNeeded: per.numberNeeded,
                  personasTechnicals: [],
                  positionName: per.positionName,
                  utilization: per.utilization
                };
              });
              sessionStore.setItem("project", {
                ...project,
                projectPersonas: personas
              });
            }

            return (
              <Form>
                <FieldArray
                  name="personas"
                  render={(arrayHelpers) =>
                    renderPersonaRow(values, arrayHelpers)
                  }
                ></FieldArray>
                <button ref={nextBtnRef} type="submit" hidden></button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default PersonaSelect;
