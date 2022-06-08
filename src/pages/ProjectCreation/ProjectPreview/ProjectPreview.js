/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./ProjectPreview.scss";

import Personas from "components/Personas/Personas";
import PurposePitch from "components/PurposePitch/PurposePitch";
import Collaborator from "components/Collaborator/Collaborator";
import Process from "components/TargetOperatingModel/TargetOperatingModel";
import DocumentsAndFiles from "components/DocumentsAndFiles/DocumentsAndFiles";
import ProjectInforContent from "components/ProjectInfo/ProjectInfoContent/ProjectInforContent";
import ModalProjectSubmit from "modals/ModalProjectSubmit/ModalProjectSubmit";
import useModal from "hook/useModal";
import http from "core/services/httpService";
import Loading from "components/Loading/Loading";
import { pushToast } from "components/Toast";
import { useHistory } from "react-router";
import axios from "axios";

const ProjectReview = (props) => {
  const history = useHistory;
  const { inforProject, handleProjectPersonas, handleAddProjectPersonas } =
    props;
  const { isShowing, toggle } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [capabilities, setCapapbilities] = useState([]);

  const handleSubmit = async () => {
    var formData = new FormData();
    let dataSession = JSON.parse(sessionStorage.getItem("project"));
    const projectInfo = { ...dataSession.projectInfo, projectCompletion: 50 };
    let dataSubmit = {
      ...dataSession,
      projectInfo,
      tools: [],
      processes: [],
      members: [],
      documents: []
    };
    // append value to FormData objects
    formData.append("projectDocuments", dataSubmit.documents);
    formData.append("image", projectInfo.img);
    formData.append("projectInfo", JSON.stringify(projectInfo));
    formData.append(
      "projectPersonas",
      JSON.stringify(dataSession.projectPersonas)
    );
    formData.append("tools", JSON.stringify(dataSubmit.tools));
    formData.append("processes", JSON.stringify(dataSubmit.processes));
    formData.append("members", JSON.stringify(dataSubmit.members));

    setIsLoading(true);
    try {
      await axios({
        method: "post",
        url: `/project/projects/creation/${
          JSON.parse(localStorage.getItem("user"))?.id
        }`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      }).then((response) => {
        console.log(response.data);
        pushToast("success", response.message);
        sessionStorage.removeItem("project");
        toggle();
        history.push("/manage-projects");
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleCapability = (
    values,
    listCapability,
    namePersona,
    positionId
  ) => {
    let temp = capabilities;
    listCapability.map((capa) => {
      const pos = capabilities
        .map((capaState) => {
          return capaState.value;
        })
        .includes(capa.value);
      if (!pos) {
        temp = [...temp, capa];
      }
    });
    setCapapbilities(temp);
    handleProjectPersonas(values, namePersona, listCapability, positionId);
  };

  const handleSubmitAddNewPersona = (values, capabilities) => {
    handleAddProjectPersonas(values, capabilities);
  };
  if (isLoading) {
    return <Loading visible={isLoading}></Loading>;
  }
  return (
    <div className="project-preview">
      <div className="project-preview-btn">
        <button className="project-preview-btn__submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <ModalProjectSubmit handleClose={toggle} isShowing={isShowing} />
      <h2 className="project-preview-title project">
        Project Preview : edit your project before submitting
      </h2>
      <div className="project-preview-infor">
        <ProjectInforContent ProjectInfo={inforProject?.projectInfo} />
      </div>
      <div className="project-preview-purposePitch">
        <PurposePitch project={inforProject?.projectInfo} />
      </div>
      <div className="project-preview-targetOperating">
        <Process capapbilities={capabilities} />
      </div>
      <div className="project-preview-personas">
        <Personas
          project={inforProject}
          handleCapability={handleCapability}
          handleSubmitAddNewPersona={handleSubmitAddNewPersona}
        />
      </div>
      <div className="project-preview-collaborators">
        <Collaborator />
      </div>
      <div className="project-preview-documents">
        <DocumentsAndFiles />
      </div>
    </div>
  );
};

export default ProjectReview;
