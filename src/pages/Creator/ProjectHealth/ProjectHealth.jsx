/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import MainLayout from "layout/MainLayout/MainLayout";
import "./ProjectHealth.scss";
import Personas from "../../../components/Personas/Personas";
import PurposePitch from "components/PurposePitch/PurposePitch";
import Process from "components/TargetOperatingModel/TargetOperatingModel";
import Collaborator from "components/Collaborator/Collaborator";
import ProjectInfo from "components/ProjectInfo/ProjectInfo";
import DocumentsAndFiles from "components/DocumentsAndFiles/DocumentsAndFiles";
import Error from "pages/Error/Error.js";
import Loading from "components/Loading/Loading";
import http from "core/services/httpService";
import { pushToast } from "components/Toast";

function ProjectHealth() {
  const urlElement = window.location.href.split("/");
  const idProject = urlElement[urlElement.length - 1];
  const [project, setProject] = useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFilesUpload, setFilesUpload] = useState(false);
  // const [imgUpload, setImgUpload] = useState();
  // const [file, setFile] = useState();
  useEffect(() => {
    const getProject = async (idProject) => {
      setIsLoading(true);
      try {
        const res = await http.get(`/project/projects/${idProject}`);
        setIsLoading(false);
        setProject(res.data);
      } catch (err) {
        setIsLoading(false);
        pushToast("error", "get project fail !");
        console.log(err);
      }
    };
    getProject(idProject);
  }, [setFilesUpload]);

  const convertProjectToCapability = (p) => {
    let capability = [];
    p?.projectPersonas.map((projectPersonas) => {
      projectPersonas.personasTechnicals.map((technical) => {
        if (capability.length == 0) {
          capability.push(technical);
        } else {
          const found = capability.find(
            (cap) => cap?.capabilityName === technical?.capabilityName
          );

          !found && capability.push(technical);
        }
      });
    });
    let convert = [];
    capability?.map((cap) => {
      convert.push({
        id: cap.capabilitiesId,
        label: cap.capabilityName,
        point: cap.level,
        value: cap.capabilityName,
        importance: cap.importance
      });
    });
    return convert;
  };

  if (isLoading) {
    return <Loading visible={isLoading}></Loading>;
  }
  return (
    <>
      {project ? (
        <MainLayout>
          <div className="projectHealth">
            <div className="projectHealth__projectinfo">
              <ProjectInfo ProjectInfo={project} />
            </div>
            <div className="projectHealth__purposePitch">
              <PurposePitch project={project} />
            </div>
            <div className="projectHealth__TargetOperatingModel">
              <Process
                capapbilities={convertProjectToCapability(project)}
                process={project?.processes}
              />
            </div>
            <div className="projectHealth__personas">
              <Personas project={project} showDetail={true} />
            </div>
            <div className="projectHealth__collaborators">
              <Collaborator idProject={idProject} />
            </div>
            <div className="projectHealth__documents">
              <DocumentsAndFiles
                documents={project.documents}
                idProject={idProject}
                setFilesUpload={setFilesUpload}
              />
            </div>
          </div>
        </MainLayout>
      ) : (
        <Error />
      )}
    </>
  );
}

export default ProjectHealth;
