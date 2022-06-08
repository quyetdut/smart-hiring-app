import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProjectsByPoId,
  selectProjects,
  selectProjectsStatus,
  selectProjectsError
} from "store/projectsSlice";
import STATUS from "store/constants";

import "./ProjectList.scss";
import clock from "../../assets/icons/clock.svg";
import Loading from "components/Loading/Loading";
import projectImg from "../../assets/images/card-image.png";
import { collaborationScore } from "core/utils/collaborationScore";

function ProjectList({ searchTitle }) {
  const dispatch = useDispatch();
  const projectsStore = useSelector(selectProjects);
  const projectStatus = useSelector(selectProjectsStatus);
  const error = useSelector(selectProjectsError);
  const poId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    dispatch(fetchAllProjectsByPoId({ poId: poId, searchTitle: searchTitle }));
  }, [searchTitle]);

  let history = useHistory();

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

  let content;

  if (projectStatus === STATUS.LOADING) {
    content = <Loading visible={true} />;
  } else if (projectStatus === STATUS.SUCCEEDED) {
    const projects = projectsStore?.project;
    if (projects !== undefined) {
      content = projects.map((project, index) => (
        <div
          className="col"
          key={index}
          onClick={() => {
            history.push({
              pathname: `/project-health/${project.id}`
            });
          }}
        >
          <div className="card custom-card">
            <div className="topCard">
              <img
                src={
                  project?.imgPath
                    ? // eslint-disable-next-line no-undef
                      `${process.env.REACT_APP_API_URL}${project?.imgPath}`
                    : projectImg
                }
                className="image-project"
                alt="image project"
              />
              <div className="topRight">
                <div className="project-title">{project?.projectName}</div>
                <div className="project-time">
                  <img src={clock} alt="clock" className="project-time-clock" />
                  <div className="clock-text">{convertDate(project.endAt)}</div>
                </div>
              </div>
            </div>
            <div className="middleCard">
              <div className="collaboration-score">
                <div className="collaboration-score-text">
                  Collaboration score:{" "}
                  {collaborationScore(project.projectPersonas)
                    ? collaborationScore(project.projectPersonas)
                    : 0}{" "}
                  %
                </div>
                <div className="collaboration-score-progress">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${collaborationScore(project.projectPersonas)}%`
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="candidate-statistic">
                {project?.projectPersonas?.map((persona, index) => (
                  <div className="job-wrapper" key={index}>
                    <div className={`job-color job-color-${persona.name}`}>
                      <img src={persona.icon ? persona.icon : ""} />
                    </div>
                    <div className="job-name">
                      {persona.name}{" "}
                      {persona.numberCurrent ? persona.numberCurrent : 0} /{" "}
                      {persona.numberNeeded}
                    </div>
                    <div className="job-match">
                      {persona.numberCurrent / persona.numberNeeded > 0
                        ? `${(
                            (persona.numberCurrent / persona.numberNeeded) *
                            100
                          ).toFixed(0)}% matches`
                        : `No match`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bottomCard">
              <div className="project-completion">
                <div className="project-completion-text">
                  Project Completion: {project.projectCompletion} %
                </div>
                <div className="project-completion-progress">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${project.projectCompletion}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ));
    } else {
      content = "No project yet.";
    }
  } else if (projectStatus === STATUS.FAILED) {
    content = <div>{error}</div>;
  }

  return <>{content}</>;
}
export default ProjectList;
