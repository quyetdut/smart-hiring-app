/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./Collaborator.scss";
import AddNewCollaborator from "./AddNewCollaborator/AddNewCollaborator";
import AvailableCollaborator from "./AvailableCollaborator/AvailableCollaborator";
import PropTypes from "prop-types";
import http from "core/services/httpService.js";

const Collaborator = ({ idProject }) => {
  const [collaborators, setCollaborators] = useState([]);

  useEffect(() => {
    const getCollaborate = async (idProject) => {
      try {
        const res = await http.get(
          `/persona/collaborators?projectId=${idProject}`
        );
        setCollaborators(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCollaborate(idProject);
  }, []);

  return (
    <div className="collaborator">
      <div className="collaborator-title">Collaborators</div>
      <div className="collaborator-body">
        <AddNewCollaborator />
        <>
          {collaborators &&
            collaborators?.map((collaborator, index) => {
              return (
                <AvailableCollaborator
                  key={index}
                  name={collaborator.userName}
                  job={collaborator.positionName}
                />
              );
            })}
        </>
      </div>
    </div>
  );
};

Collaborator.protoTypes = {
  collaborators: PropTypes.array
};

export default Collaborator;
