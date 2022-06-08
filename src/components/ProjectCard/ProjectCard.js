/*eslint-disable*/
import React, { useEffect, useRef, useState } from "react";
import "./ProjectCard.scss";
import CardImage from "assets/images/card-image.png";
import PropTypes from "prop-types";
import useModal from "hook/useModal";
import ModalProjectDetail from "modals/ModalProjectDetail/ModalProjectDetail";
import IconShare from "assets/images/icons/Icon-share.svg";
import { useSelector } from "react-redux";
import CardFooter from "./CardFooter";
export default function ProjectCard({
  projectProp,
  positionProp,
  matchingScore,
  onInterest,
  onNotInterest,
  status,
  parentRef
}) {
  const { isShowing, toggle } = useModal();
  const [project, setProject] = useState();
  const [positionCard, setPositionCard] = useState();
  const [capabilities, setCapabilities] = useState([]);
  const positionList = useSelector((state) => state.position);
  const convertDate = (str) => {
    if (str === undefined) return "";
    let parts = str.split("-");
    let months = {
      "01": "January",
      "02": "February",
      "03": "March",
      "04": "April",
      "05": "May",
      "06": "June",
      "07": "July",
      "08": "August",
      "09": "September",
      10: "October",
      11: "November",
      12: "December"
    };

    if (parts) return months[parts[1]] + "," + parts[0];
  };

  useEffect(() => {
    const projectConverter = () => {
      setProject({
        ...project,
        id: projectProp?.id,
        imgPath: projectProp?.imgPath,
        projectName: projectProp?.projectName,
        timeEnd:
          convertDate(projectProp?.endAt) !== ""
            ? convertDate(projectProp?.endAt)
            : projectProp?.timeEnd,
        projectPersonas: projectProp?.projectPersonas,
        technologys:
          projectProp?.capabilities?.map((capability) => capability.name) ||
          projectProp?.technologys,
        TargetOperatingModel:
          projectProp?.processes?.map((process) => process.processName) ||
          projectProp?.TargetOperatingModel,
        status: "explore",
        problem_statement: projectProp?.problemStatement,
        big_vision: projectProp?.bigVison,
        value_proposition: projectProp?.valueProposition,
        customer: projectProp?.customer,
        documents: projectProp?.documents,
        poId: projectProp?.poId
      });
      setPositionCard({
        ...positionCard,
        id: positionProp?.positionId,
        name: positionProp?.name,
        icon: positionProp?.icon
      });
    };

    const addCapabilities = () => {
      let capabilityList = [];

      projectProp?.projectPersonas?.map((position) => {
        if (position?.positionName === positionProp?.name) {
          position?.personasTechnicals?.map((tech) => {
            if (!capabilityList.includes(tech?.capabilityName)) {
              capabilityList.push(tech?.capabilityName);
            }
          });
        }
      });

      setCapabilities(capabilityList);
    };

    projectConverter();
    addCapabilities();
  }, [projectProp, positionList]);

  return (
    <div
      className={
        project?.status === "accepted"
          ? "card ctn-card bg-card-accepted"
          : "card ctn-card"
      }
    >
      <ModalProjectDetail
        handleClose={toggle}
        isShowing={isShowing}
        project={project}
        status={status}
      />
      <div className="card-body" onClick={!parentRef ? toggle : null}>
        <div className="d-flex justify-content-between">
          <div className="ctn-card-header-left">
            <img src={project?.imgPath ? project.imgPath : CardImage}></img>
          </div>
          {project?.status !== "accepted" ? (
            <div>
              <div className="match-total">
                <div
                  className="match-total-dev"
                  style={{ height: `${matchingScore || 0}%` }}
                ></div>
                <span className="match-total-percent">
                  {matchingScore || 0}%
                </span>
              </div>
              <span className="match-total-title">Matching score</span>
            </div>
          ) : (
            <div className="collaborating">
              <div className="collaborating-square" />
              <span>Collaborating</span>
            </div>
          )}
        </div>
        <h4 className="project-name">{project?.projectName}</h4>
        <div className="row">
          <div className="col-1">
            <i className="far fa-clock"></i>
          </div>
          <div className="col">
            <span className="content">End in {project?.timeEnd}</span>
          </div>
        </div>
        <h6>For this project, we are looking for...</h6>
        {project?.projectPersonas?.map((projectPersona, index) => {
          if (projectPersona.positionName === positionCard.name)
            return (
              <div className="d-flex" key={index}>
                <div className="personas-avatar">
                  <img
                    src={positionCard?.icon}
                    className="developer-avatar"
                  ></img>
                </div>
                <div className="personas-content">
                  <h5>
                    {projectPersona && projectPersona?.positionName}
                    {projectPersona &&
                      projectPersona?.numberNeeded -
                        projectPersona?.numberCurrent !==
                        0 && (
                        <span className="position-content">
                          {projectPersona?.numberNeeded -
                            projectPersona?.numberCurrent}{" "}
                          position left
                        </span>
                      )}
                  </h5>
                  <span className="postion-time">
                    For{" "}
                    {projectPersona?.monthNeeded
                      ? projectPersona?.monthNeeded
                      : ""}{" "}
                    month ,at {projectPersona?.utilization}%
                  </span>
                </div>
              </div>
            );
        })}
        <h5 className="list-title-top">With these capabilities :</h5>
        <ul className="ctn-card-item">
          {capabilities?.map((tech, index) => {
            if (index > 5) {
              return;
            }

            return (
              <li className="ctn-card-item-child" key={index}>
                {tech}
              </li>
            );
          })}
          {capabilities.length > 6 && (
            <div className="ctn-card-item-child">...</div>
          )}
        </ul>
        <h5 className="list-title-bottom">Process :</h5>
        <ul className="ctn-card-item">
          {project?.TargetOperatingModel?.map((model, index) => (
            <li className="ctn-card-item-child" key={index}>
              {model}
            </li>
          ))}
        </ul>
      </div>
      <div className="card-footer">
        <CardFooter
          status={status || ""}
          onInterest={onInterest}
          onNotInterest={onNotInterest}
          projectId={project?.id}
          positionId={positionCard?.id}
          projectPositionList={projectProp?.projectPersonas}
          poId={projectProp?.poId}
        />
        <button
          className={
            project?.status === "accepted"
              ? "ctn-card-btn-share-accepted"
              : "ctn-card-btn-share"
          }
        >
          Share{" "}
          <i className="icon-share">
            <img src={IconShare} />
          </i>
        </button>
      </div>
    </div>
  );
}

ProjectCard.prototype = {
  projectProp: PropTypes.objectOf(
    PropTypes.shape({
      imgPath: PropTypes.string.isRequired,
      match: PropTypes.number.isRequired,
      projectName: PropTypes.string.isRequired,
      timeEnd: PropTypes.number.isRequired,
      location: PropTypes.string.isRequired,
      persona: PropTypes.string.isRequired,
      numberOfPersona: PropTypes.number.isRequired,
      timeOfPersona: PropTypes.number.isRequired,
      percent: PropTypes.number.isRequired,
      technologys: PropTypes.arrayOf(PropTypes.string),
      TargetOperatingModel: PropTypes.arrayOf(PropTypes.string),
      status: PropTypes.string.isRequired
      // có 4 trạn thái explore , interested, waiting , accepted
    })
  ),
  onInterest: PropTypes.func,
  onNotInterest: PropTypes.func
};
