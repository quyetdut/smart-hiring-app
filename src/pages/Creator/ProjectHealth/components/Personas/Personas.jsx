import React from "react";

import Flag from "../../../../../assets/icons/flag.svg";
import WarningPolygon from "../../../../../assets/icons/warning-polygon.svg";
import HumanGroup from "../../../../../assets/icons/human-group.svg";
import UxUiDesigner from "../../../../../assets/images/uiux-designer-icon.svg";
import EditIcon from "../../../../../assets/icons/edit-capabilities.svg";
import OrangePolygon from "../../../../../assets/icons/orange-polygon.svg";
import "./Personas.scss";
import useModal from "hook/useModal";
import ModalInforAndStatistics from "modals/ModalInforAndStatistics/ModalInforAndStatistics";

function Personas() {
  const { isShowing, toggle } = useModal();

  return (
    <>
      <ModalInforAndStatistics handleClose={toggle} isShowing={isShowing} />
      <div className="personasComponent">
        <div className="personas__title">Personas</div>
        <div className="personas__progress">
          <div className="progress__text">Collaboration score : 25%</div>
          <div className="progress__bar">
            <div
              className="progress progress--custom"
              style={{
                height: "10px",
                backgroundColor: "#D5D5D5"
              }}
            >
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "25%", backgroundColor: "#DF7112" }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        </div>
        <div className="personas__content">
          <div className="iconsWrapper">
            <div className="polygonIcon">
              <img src={OrangePolygon} alt="" />
            </div>
            <div className="flagIcon">
              <img src={Flag} alt="" />
            </div>
          </div>
          <div className="content__wrapper">
            <div className="personasContent__top">
              <div className="top__baseInfor">
                <img
                  src={UxUiDesigner}
                  alt=""
                  className="baseInfor__leftAvatar"
                />
                <div className="baseInfor__rightText">
                  <div className="rightText__title">Material UI</div>
                  <div className="rightText__date">6 months, at 20%</div>
                  <div className="rightText__alert">
                    <img src={WarningPolygon} alt="" className="alert__icon" />
                    <div className="alert__text">No capabilities yet.</div>
                  </div>
                </div>
              </div>
              <div className="top__match">0 / 3</div>
              <div className="top__edit">
                <img src={EditIcon} alt="" />
              </div>
            </div>
            <div className="personasContent__bottom">
              <div className="potentialMatch">
                <div className="potentialMatch__leftIcon">
                  <img
                    src={HumanGroup}
                    alt="humans"
                    className="HumanGroupIcon"
                  />
                </div>
                <div className="potentialMatch__rightText">
                  <div className="rightText__title">89 potential matches</div>
                  <div className="rightText__text">
                    Fill in more informations to see them
                  </div>
                  <button className="seeMore__buton" onClick={() => toggle()}>
                    See them
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Personas;
