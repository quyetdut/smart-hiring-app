/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../../layout/MainLayout/MainLayout";
import "./ProjectCreation.scss";
import CreateFirstProject from "./CreateFirstProject/CreateFirstProject.js";
import ProjectReview from "./ProjectPreview/ProjectPreview";
import PersonaSelect from "./PersonaSelect/PersonaSelect";
import { Link } from "react-router-dom";
import sessionStore from "core/sessionStore";
import { useLocation } from "react-router-dom";

const ProjectCreation = () => {
  const [step, setStep] = useState(1);
  const nextBtnRef = useRef();
  const [project, setProject] = useState({});
  const location = useLocation();

  useEffect(() => {
    setProject(JSON.parse(sessionStorage.getItem("project")));
  }, [step]);

  const handleProjectPersonas = (
    value,
    positionName,
    listCapability,
    positionId
  ) => {
    let personasTechnicals = listCapability.map((capa) => {
      return {
        capabilitiesId: capa.id,
        capabilityName: capa.value,
        level: capa.point,
        importance: capa.importance
      };
    });
    let temp = sessionStore.getItem("project");
    let projectPersonas = temp.projectPersonas;
    const index = projectPersonas.findIndex(
      (x) => x.positionName === positionName
    );

    projectPersonas[index] = {
      ...projectPersonas[index],
      numberNeeded: parseInt(value.numberNeed, 10),
      monthNeeded: parseInt(value.monthNeed, 10),
      utilization: value.utilization,
      personasTechnicals,
      positionId
    };
    temp = { ...temp, projectPersonas };
    sessionStore.setItem("project", temp);
  };

  const handleAddProjectPersonas = (values, capabilities) => {
    let temp = sessionStore.getItem("project");
    let projectPersonas = [...temp.projectPersonas];

    let personasTechnicals = capabilities.map((capa) => {
      return {
        capabilitiesId: capa.id,
        capabilityName: capa.value,
        level: capa.point,
        importance: capa.importance
      };
    });
    const newPersona = {
      positionName: values.positionName.value,
      numberNeeded: values.numberNeed,
      monthNeeded: values.monthNeed,
      utilization: values.utilization,
      personasTechnicals,
      positionId: values.positionName.id
    };

    projectPersonas.push(newPersona);
    temp = { ...temp, projectPersonas };
    sessionStore.setItem("project", temp);
  };

  // const prevStep = () => {
  //   step > 1 && setStep((prevStep) => prevStep - 1);
  // };

  // const nextStep = () => {
  //   step < 3 && setStep((prevStep) => prevStep + 1);
  // };

  // const renderedButtonBack = () => {
  //   if (step > 1) {
  //     return (
  //       <div className="btn-link-back">
  //         <button
  //           type="button"
  //           className="btn-nav btn-back mr-4"
  //           onClick={() => prevStep()}
  //         >
  //           BACK
  //           <i className="ic-back" />
  //         </button>
  //       </div>
  //     );
  //   } else {
  //     const isNotBack = location.state?.isSetRedirectToProfileCreation;
  //     return (
  //       <>
  //         {isNotBack ? (
  //           ""
  //         ) : (
  //           <Link to="/general-information" className="btn-link-back">
  //             <button type="button" className="btn-nav btn-back mr-4">
  //               BACK
  //               <i className="ic-back" />
  //             </button>
  //           </Link>
  //         )}
  //       </>
  //     );
  //   }
  // };

  // const renderedButtonNext = () => {
  //   return (
  //     step < 3 && (
  //       <button
  //         type="button"
  //         className="btn-nav btn-next"
  //         onClick={() => nextBtnRef.current.click()}
  //       >
  //         NEXT
  //         <i className="ic-next" />
  //       </button>
  //     )
  //   );
  // };

  return (
    <MainLayout>
      <div className="create-project">
        <CreateFirstProject />
        {/* {step === 2 && (
          <PersonaSelect nextBtnRef={nextBtnRef} onNextStep={nextStep} />
        )}
        {step === 3 && (
          <ProjectReview
            inforProject={project}
            handleProjectPersonas={handleProjectPersonas}
            handleAddProjectPersonas={handleAddProjectPersonas}
          />
        )} */}

        {/* <div className="navigation-step d-flex justify-content-center align-items-center mt-5">
          {renderedButtonBack()}
          {renderedButtonNext()}
        </div> */}
      </div>
    </MainLayout>
  );
};

export default ProjectCreation;
