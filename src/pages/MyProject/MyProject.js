import MainLayout from "layout/MainLayout/MainLayout.js";
import React from "react";
import "./MyProject.scss";
import ProjectGroup from "./ProjectGroup/ProjectGroup";
import useFavorite from "hook/useFavorite";
import useCollaboratingMyFavorite from "hook/useCollaboratingMyFavorite";

function MyProject() {
  const collaboratingTextDefault =
    "No project yet.\n" +
    "Collaborate with project you're interested in or explore projects.";

  const interestedTextDefault = "Explore more projects.";

  const [favorite] = useFavorite(JSON.parse(localStorage.getItem("user"))?.id);
  const [collaborating] = useCollaboratingMyFavorite(
    JSON.parse(localStorage.getItem("user"))?.id
  );

  return (
    <MainLayout>
      <div className="myProject">
        <div className="collaborating">
          <ProjectGroup
            header="Project I&#39;m collaborating with"
            textDefault={collaboratingTextDefault}
            projects={collaborating}
          />
        </div>
        <div className="interested">
          <ProjectGroup
            header="Project I&#39;m interested in"
            textDefault={interestedTextDefault}
            projects={favorite}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default MyProject;
