import React from "react";
import useModal from "hook/useModal";
import PropTypes from "prop-types";
import "./BaseProfile.scss";
// import Webdev from "assets/icons/web-dev.svg";
import EditBase from "assets/icons/edit-base-profile.svg";
import IconLocation from "assets/icons/location.svg";
import AvatarBlank from "assets/icons/avatar-blank.png";
import ModalInforAndPersonas from "modals/ModalInforAndPersonas/ModalInforAndPersonas";
import useLocation from "hook/useLocation";
// import usePersonaApi from "hook/usePersonaApi";

function BaseProfile(props) {
  const { profile, handlePersonaProfile, canEdit } = props;
  const { isShowing, toggle } = useModal();
  // const [persona] = usePersonaApi();
  const [locationOptions] = useLocation();
  const timeZone = (
    profile
      ? locationOptions.find(({ value }) => value === profile.location)
      : null
  )?.timeZone;

  return (
    <>
      <ModalInforAndPersonas
        handleClose={toggle}
        isShowing={isShowing}
        profile={profile}
        handlePersonaProfile={handlePersonaProfile}
      />

      {canEdit ? (
        <button className="button_top" onClick={() => toggle()}>
          <img src={EditBase} alt="edit  button" />
        </button>
      ) : null}
      <div className="baseProfile__general">
        <div className="baseProfile__avatar">
          <div className="jobImage">
            <img
              // src={
              //   persona.length !== 0
              //     ? persona.find((x) => x.value === `${profile.positions[0]}`)
              //         ?.icon
              //     : AvatarBlank
              // }
              src={AvatarBlank}
              alt=""
              className="jobIcon"
            />
          </div>
        </div>
        <div className="baseProfile__top">
          <div className="topLeft">
            <div className="topLeft__name">
              {profile?.firstName + " " + profile?.lastName}
            </div>
            <div className="location">
              <img
                src={IconLocation}
                alt="location-icon"
                className="locationIcon"
              />
              {profile?.location === "" ? "No Location " : profile?.location}
              {timeZone ? `, ${timeZone}` : " "}
            </div>
            <div className="jobText">{profile?.position}</div>
            <div className="topLeft_place">
              {profile?.contractualIterm === ""
                ? "No Contractual Iterm "
                : profile?.contractualTerm}
              &nbsp; at &nbsp;
              {profile?.division === "" ? " No Employer" : profile?.division}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

BaseProfile.prototype = {
  handleProfileSubmit: PropTypes.func
};

BaseProfile.defaultProps = {
  canEdit: true
};

export default BaseProfile;
