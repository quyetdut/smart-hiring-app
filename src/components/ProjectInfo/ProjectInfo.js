import React from "react";
import { NavLink } from "react-router-dom";
import "./ProjectInfo.scss";
import PropTypes from "prop-types";
import ProjectInforContent from "./ProjectInfoContent/ProjectInforContent";

export default function ProjectInfo({ ...props }) {
  const { ProjectInfo } = props;
  return (
    <div className="project-info">
      <NavLink to="/manage-projects" className="back-all-project">
        {"< "} back to all project
      </NavLink>
      <h3 className="project-info-title">Project Health</h3>
      <ProjectInforContent ProjectInfo={ProjectInfo} />
    </div>
  );
}

ProjectInfo.prototype = {
  ProjectInfo: PropTypes.objectOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      completion: PropTypes.string.isRequired,
      percent: PropTypes.number.isRequired,
      hint: PropTypes.string.isRequired
    })
  )
};
