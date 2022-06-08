/* eslint-disable */
import React from "react";

import AddPersona from "../AddPersona/AddPersona";
import PersonaItem from "./PersonaItem";
import "./Personas.scss";
import usePersonaApi from "hook/usePersonaApi";
import PersonaItemDetail from "./PersonaItemDetail";
import { collaborationScore } from "core/utils/collaborationScore";
import http from "core/services/httpService";
import { pushToast } from "components/Toast";

function Personas(props) {
  const { showDetail, project, handleCapability, handleSubmitAddNewPersona } =
    props;
  const [personaOption, setPersonaOption] = React.useState([]);
  const [positions] = usePersonaApi("DEV");
  React.useEffect(() => {
    const fetchData = async () => {
      let convert = [];
      if (project?.projectPersonas?.length > 0) {
        for (const persona of project?.projectPersonas) {
          const res = project.id
            ? await http.get(
              `/project/project-members/get-user-position-interaction?projectId=${project.id}&positionId=${persona.positionId}`
            )
            : null;
          let a = {
            positionName: positions.find(
              (o) => o.value === persona?.positionName
            ),
            title: persona?.positionName,
            icon: positions.find((o) => o.value === persona?.positionName)
              ?.icon,
            mounthNeed: persona?.monthNeeded,
            utilization: persona?.utilization,
            capabilitiesMap: persona?.personasTechnicals?.map((skill) => ({
              id: skill.capabilitiesId,
              value: skill.capabilityName,
              label: skill.capabilityName,
              point: skill.level,
              importance: skill.importance
            })),
            capabilies: persona?.personasTechnicals
              ? persona?.personasTechnicals[0]
                ? true
                : false
              : false,
            numberNeed: persona?.numberNeeded,
            numberHad: persona?.numberCurrent ? persona.numberCurrent : 0,
            color: "#00628A",
            sliderMatchingObj: res
          };
          convert.push(a);
        }
      }
      setPersonaOption(convert);
    };
    fetchData();
  }, [positions, project?.projectPersonas]);

  const collaboration = collaborationScore(project?.projectPersonas)
    ? collaborationScore(project?.projectPersonas)
    : 0;
  const updateCapabilies = (id, capabilities) => {
    const updatedPersonaOption =
      capabilities?.length > 0
        ? personaOption.map((option) =>
          option.positionName.id === id
            ? { ...option, capabilies: true }
            : option
        )
        : personaOption.map((option) =>
          option.positionName.id === id
            ? { ...option, capabilies: false }
            : option
        );
    setPersonaOption(updatedPersonaOption);
  };

  const handleSubmitPersona = async (dataSubmit) => {
    try {
      const res = await http.post(
        `project/project-personas/update/${project.id}`,
        dataSubmit
      );
      const newPersonaOption = [...personaOption];
      const newPersonaResponse = {
        positionName: positions.find(
          (o) => o.value === res?.data?.positionName
        ),
        title: res?.data?.positionName,
        icon: positions.find((o) => o.value === res?.data?.positionName)?.icon,
        mounthNeed: res?.data?.monthNeeded,
        utilization: res?.data?.utilization,
        numberNeed: res?.data?.numberNeeded,
        numberHad: res?.data?.numberCurrent || 0,
        capabilitiesMap: res?.data?.personasTechnicals.map((skill) => ({
          id: skill.capabilitiesId,
          value: skill.capabilityName,
          label: skill.capabilityName,
          point: skill.level,
          importance: skill.importance
        })),
        capabilies: res?.data?.personasTechnicals
          ? res?.data?.personasTechnicals[0]
            ? true
            : false
          : false,
        sliderMatchingObj: {}
      };
      newPersonaOption.push(newPersonaResponse);
      setPersonaOption(newPersonaOption);
      pushToast("success", res.message);
    } catch (error) {
      console.log(error);
      pushToast("error", error.message);
    }
  };
  const handleAddNewPersona = (values, capabilities) => {
    if (handleSubmitAddNewPersona) {
      const newArray = [...personaOption];
      const newPersona = {
        positionName: positions.find(
          (o) => o.value === values?.positionName?.value
        ),
        title: values?.positionName?.value,
        icon: positions.find((o) => o.value === values?.positionName.value)
          ?.icon,
        mounthNeed: values?.monthNeed,
        utilization: values?.utilization,
        numberNeed: values?.numberNeed,
        numberHad: 0,
        capabilitiesMap: capabilities,
        capabilies: capabilities.length > 0 ? true : false
      };
      newArray.push(newPersona);
      setPersonaOption(newArray);
      handleSubmitAddNewPersona(values, capabilities);
    } else {
      const personaTechnicalSubmit = capabilities.map((capa) => {
        return {
          capabilitiesId: capa.id,
          level: capa.point,
          importance: capa.importance
        };
      });
      const dataSubmit = {
        numberNeeded: values.numberNeed,
        monthNeeded: values.monthNeed,
        utilization: values.utilization,
        projectId: project.id,
        positionId: values.positionName.id,
        personasTechnicals: personaTechnicalSubmit
      };
      handleSubmitPersona(dataSubmit);
    }
  };

  return (
    <div className="personas-component">
      <div
        className="personas-title"
        style={{ marginBottom: showDetail ? "49px" : "32px" }}
      >
        Personas
      </div>
      {showDetail && (
        <div className="personas__progress">
          <div className="progress__text">
            Collaboration score : {collaboration} %
          </div>
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
                style={{
                  width: `${collaboration}%`,
                  backgroundColor: "#00b4ff"
                }}
                aria-valuenow={collaboration}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        </div>
      )}
      <div
        className={
          showDetail === true
            ? `persona-item  customed-persona-item`
            : `persona-item`
        }
      >
        {personaOption?.map((option, index) => (
          <div
            key={index}
            style={{ marginBottom: showDetail ? "0px" : "32px" }}
          >
            <PersonaItem
              projectId={project.id}
              optionProp={option}
              showDetail={showDetail}
              handleCapability={handleCapability}
              updateCapabilies={updateCapabilies}
            />
            {showDetail && (
              <PersonaItemDetail projectId={project.id} option={option} />
            )}
          </div>
        ))}
        <AddPersona
          personaSelected={project.projectPersonas}
          handleAddNewPersona={handleAddNewPersona}
          showDetail={showDetail}
        />
      </div>
    </div>
  );
}

// Personas.propTypes = {
//   showDetail: PropTypes.boolean
// };

export default Personas;
