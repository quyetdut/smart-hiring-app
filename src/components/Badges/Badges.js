import React, { useEffect, useState } from "react";
import "./Badges.scss";
import communityIcon from "assets/icons/community-icon.svg";
import ModalCertifications from "modals/ModalCertifications/ModalCertifications";
import useModal from "hook/useModal";
import http from "core/services/httpService";
import { pushToast } from "components/Toast";
import { ReactComponent as RemoveUpload } from "assets/icons/remove-upload.svg";
import ModalProjectSubmit from "modals/ModalProjectSubmit/ModalProjectSubmit";

const Badges = ({ certificationsProp, profileId }) => {
  const { isShowing: isShowingForDelete, toggle: toggleForDelete } = useModal();
  const { isShowing: isShowingForAdd, toggle: toggleForAdd } = useModal();
  const [certifications, setCertifications] = useState([]);
  const [certificationSelected, setCertificationSelected] = useState(null);

  useEffect(() => {
    setCertifications(certificationsProp);
  }, [certificationsProp]);

  const handleAddCertifications = async (data) => {
    try {
      const res = await http.post(
        `persona/certification/create-and-update/${profileId}`,
        data
      );
      setCertifications([...certifications, res.data]);
      pushToast("success", "Add Certification Success");
    } catch (error) {
      console.log(error);
      pushToast("error", error.message);
    }
  };

  const handleRemoveCertification = async (data) => {
    toggleForDelete();
    try {
      await http.get(`persona/certification/delete/${data.id}`);
      const dataUpdate = certifications.filter((x) => x.id !== data.id);
      setCertifications(dataUpdate);
      pushToast("success", "Delete Certification Success");
    } catch (error) {
      console.log(error);
      pushToast("error", error.message);
    }
  };

  let content;
  if (certifications?.length > 0) {
    content = certifications.map((certification, index) => {
      return (
        <li key={index} className="certifications-description-item">
          {certification.name}
          <div
            className="certifications-remove"
            onClick={() => {
              toggleForDelete();
              setCertificationSelected(certification);
            }}
          >
            <RemoveUpload />
          </div>
        </li>
      );
    });
  } else content = "No certifications yet!";

  return (
    <div className="badges-section">
      <ModalCertifications
        isShowing={isShowingForAdd}
        handleClose={() => toggleForAdd()}
        handleCertifications={handleAddCertifications}
      />
      <ModalProjectSubmit
        isShowing={isShowingForDelete}
        handleClose={() => toggleForDelete()}
        certificationSelected={certificationSelected}
        handleRemoveCertification={handleRemoveCertification}
      />
      <div className="badges-header">Certifications</div>
      <div className="badges-wrapper">
        <div className="certifications">
          {/* <div className="certifications-title"></div> */}
          <div className="certifications-description">{content}</div>
        </div>
        <div className="community">
          <div className="vertical-line"></div>
          <div className="community-wrapper">
            <div className="community-title">Add your Certification</div>
            <div className="community-icon" onClick={() => toggleForAdd()}>
              <img src={communityIcon} alt="communityicon" />
            </div>
          </div>
        </div>
        {/* <div className="community-description">Description</div> */}
      </div>
    </div>
  );
};

export default Badges;
