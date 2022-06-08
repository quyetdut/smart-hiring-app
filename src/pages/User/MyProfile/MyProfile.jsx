import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

import BaseProfile from "components/BaseProfile/BaseProfile";
import Capabilities from "components/Capabilities/Capabilities";
import MainLayout from "layout/MainLayout/MainLayout";
import "./MyProfile.scss";
import Awards from "components/Awards/Awards";
import Badges from "components/Badges/Badges";
import WorkExperience from "components/WorkExper/WorkExper";
import ModalEditCapabilities from "modals/ModalEditCapabilites/ModalEditCapabilities";
import http from "core/services/httpService";
import Loading from "components/Loading/Loading";
import { pushToast } from "components/Toast";
import { useSelector } from "react-redux";
import { USER_ROLE } from "core/constants";

const MyProfile = () => {
  const urlElement = window.location.href.split("/");
  const idProfile = parseInt(urlElement[urlElement.length - 1]);
  const history = useHistory();
  const location = useLocation();
  const idProject = location.state?.projectId;
  const { user } = useSelector((state) => state.user);
  const isPO = user ? user.roles[0] === USER_ROLE.PROJECT_OWNER : false;
  const userId = JSON.parse(localStorage.getItem("user"))?.id || 0;

  const [capabilities, setCapabilities] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [profileId, setProfileId] = useState(0);
  const [profile, setProfile] = React.useState({
    positions: [],
    capabilities: {},
    userId: 0,
    contractualTerm: "",
    employer: "",
    firstName: "",
    lastName: "",
    location: "",
    workExperiences: [],
    certifications: [],
    awards: {}
  });

  useEffect(() => {
    const getProfile = async (idProfile) => {
      setIsLoading(true);
      await http
        .get(`/persona/profiles/${idProfile}`)
        .then((response) => {
          setProfile({ ...profile, ...response.data });
          setProfileId(response.data.profileId);
          let temp = [];
          for (let capability of response.data.capabilities) {
            temp.push({
              id: capability.capabilityId,
              label: capability.name,
              value: capability.name,
              point: capability.level
            });
          }
          setCapabilities(temp);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          pushToast("error", "get profile fail !");
        });
    };
    if (!idProfile) {
      getProfile(userId);
    } else {
      getProfile(idProfile);
    }
  }, []);

  const handlePersonaProfile = async (data) => {
    const personaSubmit = {
      userId: userId,
      firstName: data.firstName,
      lastName: data.lastName,
      position: data.position.value,
      contractualTerm: data.contractualTerm.value,
      divisionId: data.division.id,
      locationId: data.location.id
    };
    try {
      const personaUpdate = {
        ...personaSubmit,
        position: data.position.value,
        location: data.location.value,
        division: data.division.value
      };
      await http.post(`persona/profiles/create-and-update`, personaSubmit);
      pushToast("success", "Update profile success");
      setProfile({ ...profile, ...personaUpdate });
    } catch (error) {
      console.log(error);
      pushToast("error", error?.message);
    }
  };

  const editCapabilities = async (capabilities) => {
    const capabilitySubmit = [];
    for (let cap of capabilities) {
      capabilitySubmit.push({
        capabilityId: cap.id,
        level: cap.point
      });
    }
    try {
      await http.post(
        `persona/profile-capability/create-and-update/${profileId}`,
        capabilitySubmit
      );
      pushToast("success", "Update capabilities success");
      setCapabilities(capabilities);
    } catch (error) {
      console.log(error);
      pushToast("error", error?.message);
    }
  };

  if (isLoading) {
    return <Loading visible={isLoading}></Loading>;
  }

  return (
    <MainLayout>
      <div className="myProfile">
        {isPO ? (
          <div
            className="back-project"
            onClick={() => {
              history.push({
                pathname: `/project-health/${idProject}`
              });
            }}
          >
            {"< "} back to project
          </div>
        ) : null}
        <div className="myProfile__awards">
          <div>
            <BaseProfile
              profile={profile}
              handlePersonaProfile={handlePersonaProfile}
              canEdit={!isPO}
            />
          </div>
        </div>
        <div className="myProfile__badges">
          <Badges
            certificationsProp={profile.certifications}
            profileId={profileId}
          />
        </div>
        <div className="myProfile__awards">
          <Awards />
        </div>
        <div className="myProfile__capabilities">
          <Capabilities
            capabilities={capabilities}
            showModal={() => setShowModal(true)}
            canEdit={!isPO}
          />
          <ModalEditCapabilities
            capabilities={capabilities}
            show={showModal}
            onHide={() => setShowModal(false)}
            handleCapaFromModalEdit={editCapabilities}
          ></ModalEditCapabilities>
        </div>
        <div className="myProfile__workExperience">
          <WorkExperience
            workExperiencesProp={profile.workExperiences}
            profileId={profileId}
            canEdit={!isPO}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default MyProfile;
