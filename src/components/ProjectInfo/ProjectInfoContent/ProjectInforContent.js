import React from "react";
import ProjectImg from "assets/images/card-image.png";
import EditCapabilities from "assets/icons/edit-capabilities.svg";
import ClockIcon from "assets/images/icons/Clock.svg";
import Clock12hIcon from "assets/images/icons/Clock12h.svg";
import EarthIcon from "assets/images/icons/Earth.svg";
import Progress from "../Progress/Progress";
import PropTypes from "prop-types";
import "./ProjectInforContent.scss";
import usePOInfo from "hook/usePOInfo";

export default function ProjectInforContent({ ...props }) {
  const { ProjectInfo } = props;
  // eslint-disable-next-line no-undef
  const [po] = usePOInfo();
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
  return (
    <>
      <div className="project-info-content-header">
        <button>
          <img src={EditCapabilities} />
        </button>
        <div className="project-info-content-header-left">
          <img
            src={
              ProjectInfo?.imgPath
                ? // eslint-disable-next-line no-undef
                  `${process.env.REACT_APP_API_URL}${ProjectInfo?.imgPath}`
                : ProjectImg
            }
            alt="project"
          />
        </div>
        <div className="project-info-content-header-right">
          <h4 className="project-name">{ProjectInfo?.projectName}</h4>
          <h5>
            {po?.firstName + po?.lastName} | {po?.division}
          </h5>
          <h5>ID: {ProjectInfo?.id}</h5>
        </div>
      </div>
      <div className="project-info-content-footer">
        <div className="project-info-content-footer-child">
          <h6>
            <i>
              <img src={EarthIcon} />
            </i>
            Status
          </h6>
          <span>{ProjectInfo?.projectStatus.toLowerCase()}</span>
        </div>
        <div className="project-info-content-footer-child">
          <h6>
            <i>
              <img src={Clock12hIcon} />
            </i>
            Schedule
          </h6>
          <span>
            {convertDate(ProjectInfo?.startAt) +
              " - " +
              convertDate(ProjectInfo?.endAt)}
          </span>
        </div>
        <div className="completion">
          <div className="completion-icon">
            <img src={ClockIcon} />
          </div>
          <div className="completion-content">
            <h6>Project Completion : {ProjectInfo?.projectCompletion}%</h6>
            <Progress percent={ProjectInfo?.projectCompletion} />

            <span className="hint">
              <strong>Hint:</strong>
              <span>you should add more informations to some Personas</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

ProjectInforContent.prototype = {
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
