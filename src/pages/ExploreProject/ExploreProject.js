import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "layout/MainLayout/MainLayout";
import SearchProduct from "components/SearchProject/SearchProject";
import "./ExploreProject.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProjectsRecommend } from "store/projectsSlice";
import STATUS from "store/constants";
import ListProject from "./ListProject";
import Loading from "components/Loading/Loading";
import { getPositonOfProfile } from "store/position";

export default function ExploreProject() {
  const dispatch = useDispatch();
  const projectsSelect = useSelector((state) => state.projects);
  const projectStatus = useSelector((state) => state.projects.status);
  const error = useSelector((state) => state.projects.error);
  let query = useQuery();
  const page = query.get("page") || 1;
  const SIZE_PAGE = 3;
  const userCurrentId = JSON.parse(localStorage.getItem("user")).id;
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    dispatch(getPositonOfProfile(userCurrentId));
    dispatch(
      fetchAllProjectsRecommend({
        userId: userCurrentId,
        page: page - 1,
        size: SIZE_PAGE,
        filterValue: filterValue
      })
    );
  }, [page, filterValue]);

  const onSubmitSearch = (value) => {
    setFilterValue(value);
  };

  let content;
  const projects = projectsSelect?.data?.projects;
  const totalPages = projectsSelect?.data?.totalPages;

  if (projectStatus === STATUS.LOADING) {
    content = <Loading visible={true} />;
  } else if (projectStatus === STATUS.SUCCEEDED) {
    if (projects?.length > 0) {
      content = (
        <ListProject
          projects={projects}
          totalPages={totalPages}
          pageProp={page}
        />
      );
    } else {
      content = "No project yet.";
    }
  } else if (projectStatus === STATUS.FAILED) {
    content = <div>{error}</div>;
  }

  return (
    <MainLayout>
      <div className="explore">
        <h2 className="explore-title-top">Explore project </h2>
        {projects?.length > 0 && <SearchProduct onSubmit={onSubmitSearch} />}
        <h4 className="explore-title-bottom">Recommended for you</h4>
        {content}
      </div>
    </MainLayout>
  );
}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
