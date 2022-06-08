import React, { useEffect, useState } from "react";
import useModal from "hook/useModal";
import "./WorkExper.scss";

import Work from "./Work/Work";
import ModalWorkExperiences from "modals/ModalWorkExperiences/ModalWorkExperiences";
import { Button } from "react-bootstrap";
import http from "core/services/httpService";
import { pushToast } from "components/Toast";
const WorkExper = ({ ...props }) => {
  const { workExperiencesProp, canEdit, profileId } = props;
  const [workExperiences, setWorkExperiences] = useState(workExperiencesProp);
  const { isShowing, toggle } = useModal();
  let renderWorks;

  useEffect(() => {
    setWorkExperiences(workExperiencesProp);
  }, [workExperiencesProp]);

  const convert = (str) => {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [mnth, day, date.getFullYear()].join("/");
  };

  const handleWorkExperience = async (data) => {
    const dataSubmit = {
      ...data,
      startAt: convert(data.startAt),
      endAt: convert(data.endAt)
    };
    try {
      const res = await http.post(
        `persona/work-experience/create-and-update/${profileId}`,
        dataSubmit
      );
      const dataUpdate = workExperiencesProp
        ? workExperiencesProp?.find((x) => x.id === res.data.id)
          ? workExperiencesProp?.map((x) =>
              x.id === res.data.id ? res.data : x
            )
          : [...workExperiencesProp, res.data]
        : [res.data];
      setWorkExperiences(dataUpdate);
      pushToast("success", "Update Work Experience success");
    } catch (error) {
      console.log(error);
      pushToast("error", "Update Work Experience fail!");
    }
  };

  if (workExperiences?.length > 0) {
    renderWorks = workExperiences?.map((work, index) => {
      return (
        <Work
          key={index}
          workExperiences={workExperiences}
          workExperience={work}
          fromTime={work.startAt}
          toTime={work.endAt}
          position={work.position}
          businessType={work.businessType}
          employer={work.employer}
          description={work.description}
          canEdit={canEdit}
          handleWorkExperience={handleWorkExperience}
        />
      );
    });
  } else {
    renderWorks = (
      <Work
        workExperiences={workExperiences?.length}
        fromTime={"None"}
        toTime={"Present"}
        handleAdd={() => toggle()}
      />
    );
  }

  return (
    <>
      <ModalWorkExperiences
        handleClose={toggle}
        isShowing={isShowing}
        handleWorkExper={handleWorkExperience}
      />
      <div className="work-exper-wrapper">
        <span className="title">Work Experience</span>
        <div className="work-exper-parent">
          {renderWorks}
          {workExperiences?.length > 0 && canEdit && (
            <div className="work-exper-none-edit">
              <Button
                onClick={() => toggle()}
                className="work-exper-none-edit-btn"
                color="info"
              >
                <span>+ &nbsp;&nbsp; Add more</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

WorkExper.defaultProps = {
  canEdit: true
};

export default WorkExper;
