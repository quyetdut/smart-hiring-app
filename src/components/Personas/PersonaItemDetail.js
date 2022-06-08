import React, { useState } from "react";
import PropTypes from "prop-types";
import SearchPersonIcon from "assets/images/search-persona.svg";
import "./PersonaItemDetail.scss";
import HumanGroup from "assets/icons/human-group.svg";
import MatchingSlider from "../../pages/Creator/components/MatchingSlider/MatchingSlider";
// import MatchRadarChart from "components/Chart/MatchRadarChart/MatchRadarChart";
// import Collaborated from "components/Collaborated/Collaborated";
import MatchingSelection from "components/MatchingSelection/MatchingSelection";
import RadarChart from "components/RadarChart/RadarChart";
import {
  STATUS,
  COLOR_THREE_SELECTION,
  COLOR_ONE_SELECTION
} from "core/constants";
function PersonaItemDetail({ projectId, option }) {
  const [showMatchingResult, setShowMatchingResult] = useState(false);
  const [members, setMembers] = useState([]);
  const [isReset, setIsReset] = useState(false);
  const [statusDropdown, setStatusDropdown] = useState();
  const [maxSelected, setMaxSelected] = useState(3);
  const [listColor, setListColor] = useState(COLOR_THREE_SELECTION);
  const handleChangeSelectMember = (value) => {
    value && setMembers(value);
  };
  const handleChangeStatusDropdown = (status) => {
    if (status !== statusDropdown) {
      setStatusDropdown(status);
      setIsReset(true);
    }
    if (status === STATUS[0]) {
      setListColor(COLOR_ONE_SELECTION);
      setMaxSelected(1);
    } else {
      setListColor(COLOR_THREE_SELECTION);
      setMaxSelected(3);
    }
  };

  let content;

  if (showMatchingResult) {
    content = (
      <div className="persona-detail-content">
        <div className="matching">
          <div className="matching-slide">
            <MatchingSlider
              interested={option?.sliderMatchingObj?.interested}
              matching={option?.sliderMatchingObj?.matching}
              refused={option?.sliderMatchingObj?.refused}
              onChangeStatusDropdown={(status) =>
                handleChangeStatusDropdown(status)
              }
            />
          </div>
          <div className="matching-wrapper">
            <div className="select-persona col-12 col-md-6 d-flex align-items-center">
              <MatchingSelection
                maxSelected={maxSelected}
                listColor={listColor}
                projectId={projectId}
                position={option?.positionName}
                statusDropdown={statusDropdown}
                onChangeSelected={handleChangeSelectMember}
                isReset={isReset}
                setIsReset={setIsReset}
              />
            </div>
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              {/* <MatchRadarChart size={500} /> */}
              <RadarChart
                projectId={projectId}
                optionRequirement={option?.capabilitiesMap}
                options={members}
                setIsReset={setIsReset}
                // handleBtnBack={handleChangeSelectMember()}
              />
            </div>
          </div>
          {/* <div>
        <Collaborated total={6} available={0} />
      </div> */}
        </div>
      </div>
    );
  } else {
    if (!option?.capabilies) {
      content = (
        <div className="persona-detail-content">
          <div className="potentialMatch">
            <div className="potentialMatch__leftIcon">
              <img src={HumanGroup} alt="humans" className="HumanGroupIcon" />
            </div>
            <div className="potentialMatch__rightText">
              <div className="rightText__text">
                Fill in more informations to see them
              </div>
              <button
                className="seeMore__button seeMore__button-disable"
                disabled
                onClick={() => setShowMatchingResult(true)}
              >
                See them
              </button>
            </div>
          </div>
        </div>
      );
    } else if (
      (option?.sliderMatchingObj?.matching === 0 &&
        option?.sliderMatchingObj?.interested === 0 &&
        option?.capabilies) ||
      (!option?.sliderMatchingObj.matching &&
        !option?.sliderMatchingObj.interested &&
        option?.capabilies)
    ) {
      content = (
        <div className="persona-detail-content">
          <img className="icon" src={SearchPersonIcon}></img>
          <div className="text">
            We’re still looking for potential matches...
          </div>
        </div>
      );
    } else if (
      (option?.sliderMatchingObj?.matching > 0 ||
        (option?.sliderMatchingObj?.interested > 0 && option?.capabilies)) &&
      !showMatchingResult
    ) {
      content = (
        <div className="persona-detail-content">
          <div className="potentialMatch">
            <div className="potentialMatch__leftIcon">
              <img src={HumanGroup} alt="humans" className="HumanGroupIcon" />
            </div>
            <div className="potentialMatch__rightText">
              <div className="rightText__title">
                {option?.sliderMatchingObj?.matching} potential matches,{" "}
                {option?.sliderMatchingObj?.interested} interested
              </div>
              <div className="rightText__text"></div>
              <button
                className="seeMore__button seeMore__button-blue"
                onClick={() => setShowMatchingResult(true)}
              >
                See them
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  return <>{content}</>;
}

PersonaItemDetail.propTypes = {
  option: PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    mounthNeed: PropTypes.number,
    utilization: PropTypes.number,
    capabilies: PropTypes.bool,
    numberNeed: PropTypes.number,
    numberHad: PropTypes.number
  })
};

export default PersonaItemDetail;
