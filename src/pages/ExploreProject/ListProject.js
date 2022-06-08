import React, { useState } from "react";
import ProjectCard from "components/ProjectCard/ProjectCard";
import PropTypes from "prop-types";
import { GrPrevious, GrNext } from "react-icons/gr";
import useInterest from "hook/useInterest";
import Loading from "components/Loading/Loading";
import { Link } from "react-router-dom";

export default function ListProject({
  projects,
  totalPages,
  pageProp,
  status
}) {
  const [isLoading, interest] = useInterest();
  const [page, setPage] = useState(parseInt(pageProp) || 1);

  function changePrev() {
    if (page > 1 && page <= totalPages) {
      setPage(page - 1);
    }
  }
  function changeNext() {
    if (page >= 1 && page < totalPages) {
      setPage(page + 1);
    }
  }
  const onInterest = (projectId, positionId) => {
    const dataInterest = {
      projectId: projectId,
      positionId: positionId,
      userId: JSON.parse(localStorage.getItem("user"))?.id
    };
    interest(dataInterest, { interest: true });
  };
  const onNotInterest = (projectId, positionId) => {
    const dataNotInterest = {
      projectId: projectId,
      positionId: positionId,
      userId: JSON.parse(localStorage.getItem("user"))?.id
    };
    interest(dataNotInterest, { interest: false });
  };
  <Loading visible={isLoading} />;
  return (
    <div>
      <div
        className="row row-cols-md-1 row-cols-lg-2 row-cols-xl-3 g-4"
        data-masonry='{"percentPosition": true }'
      >
        {projects.map((projectObj, index) => (
          <div
            className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6 d-flex"
            key={index}
          >
            <ProjectCard
              projectProp={projectObj.project || projectObj}
              positionProp={projectObj.position}
              matchingScore={projectObj.matchingScore}
              onInterest={onInterest}
              onNotInterest={onNotInterest}
              status={status}
            />
          </div>
        ))}
      </div>
      <div className="explore-project-page">
        <span>
          Page {page} / {totalPages}
        </span>

        {page > 1 && page <= totalPages && (
          <Link to={`/explore-projects?page=${page - 1}&size=3`}>
            <button onClick={changePrev}>
              <GrPrevious />
            </button>
          </Link>
        )}

        {page >= 1 && page < totalPages && (
          <Link to={`/explore-projects?page=${page + 1}&size=3`}>
            <button onClick={changeNext}>
              <GrNext />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

ListProject.prototype = {
  projects: PropTypes.array
};
