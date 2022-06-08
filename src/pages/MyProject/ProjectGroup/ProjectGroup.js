import ListProject from "pages/ExploreProject/ListProject.js";
import PropTypes from "prop-types";
import React from "react";
import "./ProjectGroup.scss";

ProjectGroup.propTypes = {
  header: PropTypes.string,
  projects: PropTypes.array,
  textDefault: PropTypes.string
};

ProjectGroup.defaultProps = {
  header: "Project group",
  projects: [],
  textDefault: "Description ..."
};

function ProjectGroup({ header, projects, textDefault }) {
  const projectNumberOfDigits = projects.length || 1;
  const amountTagWidth = (22 + projectNumberOfDigits * 10).toString() + "px";

  const amountColor = projects.length ? "active" : "inactive";

  if (textDefault.search("\n")) {
    textDefault = textDefault.split("\n").map((str, i) => {
      return (
        <div className="projects-text-default" key={i}>
          {str}
        </div>
      );
    });
  }

  const projectContent =
    projects?.length > 0 ? (
      <ListProject projects={projects} status={"interested"} />
    ) : (
      textDefault
    );

  return (
    <div className="project-group">
      <div className="header">
        <h5>{header}</h5>
        <div
          className={"amount " + amountColor}
          style={{ width: amountTagWidth, color: amountColor }}
        >
          {projects.length}
        </div>
      </div>
      <div className="projects">{projectContent}</div>
    </div>
  );
}

export default ProjectGroup;
