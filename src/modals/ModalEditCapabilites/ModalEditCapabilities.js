import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, CloseButton } from "react-bootstrap";
import Item from "components/Capabilities/PonitItem";
import { ReactComponent as Subtraction } from "../../assets/icons/subtraction.svg";
import { ReactComponent as Summation } from "../../assets/icons/summation.svg";
import MultiSelectField from "components/Forms/MultiSelectField/MultiSelectField";
import "./ModalEditCapabilities.scss";
import useCapability from "hook/useCapability";

const ModalEditCapabilities = ({ handleCapaFromModalEdit, ...props }) => {
  const [capabilities, setCapabilities] = useState(props.capabilities);
  const [capabilitySkills] = useCapability(null, true);

  useEffect(() => {
    setCapabilities(props.capabilities);
  }, [props.capabilities]);

  const handlerSubtraction = (index) => {
    const newCapabilities = [...capabilities];
    newCapabilities[index] = {
      ...capabilities[index],
      point: capabilities[index].point - 1
    };
    setCapabilities(newCapabilities);
  };

  const handlerSummation = (index) => {
    const newCapabilities = [...capabilities];
    newCapabilities[index] = {
      ...capabilities[index],
      point: capabilities[index].point + 1
    };
    setCapabilities(newCapabilities);
  };

  const handlerSubmitModal = () => {
    handleCapaFromModalEdit(capabilities);
    props.onHide();
  };

  const handleOnSelectSkills = (skills) => {
    setCapabilities(
      skills.map((skill) => ({ ...skill, point: skill.point || 5 }))
    );
  };

  return (
    <div className="modal-capabilities">
      <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered={true}
        dialogClassName="modal-capabilities-style"
        scrollable
      >
        <Modal.Body className="modal-capabilities-content">
          <div>
            <Row className="modal-capabilities-title">
              <Col xs={11}>
                <h4>Capabilities</h4>
              </Col>
              <Col sx={1}>
                <CloseButton
                  className="modal-capabilities-button-close"
                  onClick={props.onHide}
                />
              </Col>
            </Row>
          </div>
          <div className="modal-capabilities-selections col-sm-6 offset-sm-3">
            <Row>
              <Col>
                <MultiSelectField
                  aria-labelledby="capabilities"
                  inputId="capabilities"
                  name="capabilities"
                  options={capabilitySkills}
                  value={capabilities}
                  limitSelected={100}
                  limitResults={5}
                  onChange={handleOnSelectSkills}
                  placeholder="Search"
                  noOptionsMessage={() => "No results"}
                />
              </Col>
            </Row>
          </div>
          <div className="modal-capabilities-group">
            {capabilities.map((a, index) => (
              <Row key={index}>
                <Col sm={2} className="label-capability">
                  <span>{a.label}</span>
                </Col>
                <Col sm={1}>
                  <Button
                    className="btn-subtraction"
                    size="sm"
                    onClick={() => {
                      handlerSubtraction(index);
                    }}
                    disabled={a.point === 1 ? true : false}
                  >
                    <Subtraction></Subtraction>
                  </Button>
                </Col>
                <Col>
                  <Item label={a.label} point={a.point} key={index}></Item>
                </Col>
                <Col sm={1}>
                  <Button
                    className="btn-summation"
                    size="sm"
                    onClick={() => {
                      handlerSummation(index);
                    }}
                    disabled={a.point === 10 ? true : false}
                  >
                    <Summation></Summation>
                  </Button>
                </Col>
                <Col sm={1} className="capability-point">
                  <span>{a.point}</span>
                </Col>
              </Row>
            ))}
          </div>
          <div className="d-flex mt-5 mb-3 justify-content-center">
            <button
              onClick={handlerSubmitModal}
              className="modal-capabilities-button"
            >
              Finish
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default ModalEditCapabilities;
