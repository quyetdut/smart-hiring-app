/* eslint-disable no-unused-vars */
import React, { useRef } from "react";

import "./modalProjectDetail.scss";
import ProjectCard from "components/ProjectCard/ProjectCard";
import { Modal } from "react-bootstrap";
import useInterest from "hook/useInterest";
import Loading from "components/Loading/Loading";

const Personas = ({ item }) => {
  const { name, numberNeeded, numberCurrent, icon } = item;
  return (
    <li className="row personas-item">
      <img
        src={icon}
        className="col-lg-4 col-md-2 col-sm-4 col-4 card-img parsonas-img"
        alt=""
      />
      <div className="col-lg col-md col-sm-8 col-8">
        <div className="personas-title">{name}</div>
        <span className="found">
          <div className="num">
            {numberCurrent} / {numberNeeded} found
          </div>
          {numberCurrent && numberCurrent < numberNeeded ? (
            <div className="position-left">
              {numberNeeded - numberCurrent} position left !
            </div>
          ) : (
            <div />
          )}
        </span>
      </div>
    </li>
  );
};

const Notification = ({ project }) => {
  return (
    <div className="ctn-added row">
      <div className="col text-center">
        {project} added to your list of
        <span> projects you’re interested in</span>.
      </div>
    </div>
  );
};

const ModalProjectDetail = ({ handleClose, isShowing, project, status }) => {
  const [isInterested, setShowResults] = React.useState(false);
  const [isLoading, interest] = useInterest();

  const myRef = useRef();
  const handelInterest = (projectId, positionId) => {
    const dataInterest = {
      projectId: projectId,
      positionId: positionId,
      userId: JSON.parse(localStorage.getItem("user"))?.id
    };
    interest(dataInterest, { interest: true });
  };
  const handleNotInterest = (projectId, positionId) => {
    const dataNotInterest = {
      projectId: projectId,
      positionId: positionId,
      userId: JSON.parse(localStorage.getItem("user"))?.id
    };
    interest(dataNotInterest, { interest: false });
  };
  var documents = [];
  if (project?.documents) {
    for (var i = 0; i < project?.documents?.length; i++) {
      documents.push(
        <li key={i}>
          <a href={project?.documents && project?.documents[i]?.filePath}>
            expression-of-needs.pdf
          </a>
        </li>
      );
    }
  }
  <Loading visible={isLoading} />;
  return (
    <>
      <Modal
        show={isShowing}
        onHide={handleClose}
        dialogClassName="modal-project-detail"
        backdrop="static"
        centered
        ref={myRef}
      >
        <Modal.Header>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            onClick={handleClose}
          >
            <span aria-hidden="true">×</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="row ctn-modal-body">
            <div className="first col-lg-4 col-md-4 col-sm-4">
              <ProjectCard
                projectProp={project}
                key={project?.id}
                onInterest={handelInterest}
                onNotInterest={handleNotInterest}
                status={status}
                parentRef={myRef}
              />
            </div>
            <div className="second col-lg-4 col-md-4 col-sm-4 mb-5">
              <div className="text-detail">
                <span className="require-title">Problem Statement</span>
                <br></br>
                {project?.problem_statement} <br></br>
              </div>
              <div className="text-detail">
                <span className="require-title">The Big Vision</span>
                <br></br>
                {project?.big_vision}
                <br></br>
              </div>
              <div className="text-detail">
                <span className="require-title">Value Proposition</span>
                <br></br>
                {project?.value_proposition}
                <br></br>
              </div>
              <div className="text-detail">
                <span className="require-title">Customer</span>
                <br></br>
                {project?.customer}
                <br></br>
              </div>
            </div>
            <div className="third col-lg-4 col-md-4 col-sm-4">
              <div className="lead">Personas</div>
              <ul className="list-unstyled">
                {project &&
                  project.personas?.map((item) => (
                    <Personas key={item.id} item={item} />
                  ))}
              </ul>
              <div className="files">
                <div className="lead">Files</div>
                <ul className="list-files">{documents}</ul>
              </div>
              <div>
                {isInterested ? (
                  <Notification project={project.name} />
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ModalProjectDetail;
