import React from "react";
import "./TargetOperatingModel.scss";
import EditIcon from "../../assets/icons/edit-capabilities.svg";

const TargetOperatingModel = ({ capapbilities, process }) => {
  // const allTech = [
  //   { label: "Angular JS", value: "angularjs" },
  //   { label: "HTML 5", value: "html5" },
  //   { label: "Spring Boot", value: "spring boot" },
  //   { label: "React Js", value: "reactjs" },
  //   { label: "Vue JS", value: "vuejs" },
  //   { label: ".NET", value: ".net" },
  //   { label: "Communication", value: "communication" },
  //   { label: "Problem Solver", value: "problem solver" },
  //   { label: "Decision Making", value: "decision making" }
  // ];
  const [allTech, setAllTech] = React.useState([]);
  // const practiceAndPrinciples = [
  //   // { label: "PHP 7", value: "php7" },
  //   // { label: "Node JS", value: "nodejs" }
  // ];
  React.useEffect(() => {
    setAllTech(capapbilities);
  }, [capapbilities]);

  return (
    <div className="model-container">
      <div className="header">Process</div>
      <div className="model-wrapper">
        <button
          className="button-top"
          // onClick={handleEditTargetOperatingModel}
        >
          <img src={EditIcon} alt="edit target operating model" />
        </button>
        <div className="practice-principles">
          <div className="model-title">Process</div>
          <div className="model-content">
            {process?.map((item, index) => (
              <div key={index} className="skill-tag">
                {item.processName}
              </div>
            ))}
          </div>
        </div>
        <div className="vertical-line"></div>
        <div className="all-tech">
          <div className="all-tech-wrapper">
            <div className="model-title">All Tech stack and Tools </div>
            <div className="model-content">
              {allTech?.length !== 0 &&
                allTech?.map((item, index) => (
                  <div key={index} className="skill-tag">
                    {item?.label}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetOperatingModel;
