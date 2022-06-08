import React from "react";

import { Modal } from "react-bootstrap";

import "./ModalInforAndStatistics.scss";

import IconCalenda from "../../assets/icons/icon-calendar.svg";
import ImgBurndownChart from "./BurndownChart.svg";
import ModalContents from "./ModalContents/ModalContents";

const infomations = [
  {
    icon: IconCalenda,
    text: "Jira board link"
  },
  {
    icon: IconCalenda,
    text: "Backlog"
  }
];

const ModalInforAndStatistics = ({ isShowing, handleClose }) => {
  const onHide = () => {
    handleClose();
  };

  return (
    <Modal
      show={isShowing}
      onHide={onHide}
      dialogClassName="modal-statistics"
      centered
    >
      <button className="modal-btn__close" onClick={onHide} />
      <h4 className="modal-title">Informations And Statistics</h4>
      <Modal.Body>
        <ModalContents infomations={infomations} srcChart={ImgBurndownChart} />
      </Modal.Body>
    </Modal>
  );
};

export default ModalInforAndStatistics;
