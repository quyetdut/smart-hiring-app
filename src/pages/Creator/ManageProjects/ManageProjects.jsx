import React, { useState } from "react";

import "./ManageProjects.scss";
import SearchIcon from "../../../assets/icons/search-project-icon.svg";
import addNew from "../../../assets/icons/add-new.svg";
import ProjectList from "../../../components/ProjectList/ProjectList";
import MainLayout from "layout/MainLayout/MainLayout";
// import Dropdown from "components/Dropdown/Dropdown";
import { useHistory } from "react-router";
export default function ManageProjects() {
  // const STATUS = ["Project1", "Project2", "Project3"];
  const history = useHistory();
  const [searchField, setSearchField] = useState("");
  const [searchValueSubmit, setSearchValueSubmit] = useState("");

  const handleChangeSearchValue = (e) => {
    e.preventDefault();
    setSearchValueSubmit(searchField);
  };
  return (
    <MainLayout>
      <div className="creator-home-page">
        <div className="top-home-page">
          <div className="creator-home-page-title">Manage Projects</div>
          <div
            onClick={() =>
              history.push({
                pathname: "/project-creation",
                state: {
                  isSetRedirectToProfileCreation: true
                }
              })
            }
            className="add-new"
          >
            <img src={addNew} alt="add" />
            <div className="add-new-text"> ADD NEW PROJECT</div>
          </div>
        </div>
        <div className="project-filter">
          <div className="search-wrapper">
            <form onSubmit={handleChangeSearchValue}>
              <input
                type="text"
                className="search-project"
                placeholder="Project Title"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
              />
              <img
                onClick={handleChangeSearchValue}
                src={SearchIcon}
                alt=""
                className="search-icon"
              />
            </form>
          </div>
          {/* <Dropdown value={STATUS} /> */}
        </div>

        <div className="creator-home-page-main">
          <div
            className="row row-cols-md-1 row-cols-lg-2 row-cols-xl-3 g-4"
            data-masonry='{"percentPosition": true }'
          >
            <ProjectList searchTitle={searchValueSubmit} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
