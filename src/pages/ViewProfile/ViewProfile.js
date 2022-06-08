import React, { useEffect } from "react";

import MainLayout from "layout/MainLayout/MainLayout";

import "./ViewProfile.scss";
import http from "core/services/httpService";
import BaseProfile from "components/BaseProfile/BaseProfile";
import { pushToast } from "components/Toast";
import Loading from "components/Loading/Loading";

const ViewProfile = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [profile, setProfile] = React.useState({});
  const userId = JSON.parse(localStorage.getItem("user"))?.id || 0;

  useEffect(() => {
    const getProfile = async (idProfile) => {
      setIsLoading(true);
      await http
        .get(`/persona/profiles/${idProfile}`)
        .then((response) => {
          setProfile({ ...profile, ...response.data });
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          pushToast("error", "get profile fail !");
        });
    };

    getProfile(userId);
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

  if (isLoading) {
    return <Loading visible={isLoading}></Loading>;
  }

  return (
    <MainLayout>
      {/* <div className="general-information">
        <FormProfileInfo
          type="view-profile"
          isShowing={isShowing}
          handleClose={toggle}
        />
        <button className="button_top" onClick={() => toggle()}>
          <img src={EditBase} alt="edit  button" />
        </button>
        <div className="baseProfile__general">
          <div className="baseProfile__avatar">
            <div className="jobImage">
              <img src={AvatarBlank} alt="" className="jobIcon" />
            </div>
          </div>
          <div className="baseProfile__top">
            <div className="topLeft">
              <div className="topLeft__name">
                {po.firstName + " " + po.lastName}
              </div>

              <div className="jobText">
                {po.positions ? po.positions[0]?.name : ""}
              </div>
              <div className="topLeft_place">
                {po.contractualTerm === ""
                  ? "No Contractual Iterm "
                  : po.contractualTerm}
                &nbsp; at &nbsp;
                {po.division === "" ? " No Employer" : po.division}
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <BaseProfile
        profile={profile}
        handlePersonaProfile={handlePersonaProfile}
      />
    </MainLayout>
  );
};

export default ViewProfile;
