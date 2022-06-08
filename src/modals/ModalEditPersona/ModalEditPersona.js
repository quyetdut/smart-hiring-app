import React, { useEffect, useState } from "react";
import {
  Modal,
  Row,
  Col,
  Button,
  Form,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Item from "components/Capabilities/PonitItem";
import { ReactComponent as Subtraction } from "../../assets/icons/subtraction.svg";
import { ReactComponent as Summation } from "../../assets/icons/summation.svg";
import MultiSelectField from "components/Forms/MultiSelectField/MultiSelectField";
import "./ModalEditPersona.scss";
import useCapability from "hook/useCapability";
// import SelectPersonaFormik from "components/Forms/SelectPersonaFormik/SelectPersonaFormik";
import SingleSelectField from "components/Forms/SingleSelectField/SingleSelectField";
import CreatorIcon from "assets/images/creator-icon.svg";
import usePersonaApi from "hook/usePersonaApi";

const ModalEditPersona = ({
  isShowing,
  handlerSubmitModal,
  handleClose,
  optionProp,
  personaSelected,
  ...props
}) => {
  const [option, setOption] = useState({});
  const [capabilities, setCapabilities] = useState([]);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [capabilitySkills] = useCapability(
    option?.positionName || selectedPersona
  );

  useEffect(() => {
    setOption(optionProp);
    formik.setValues({ ...optionProp, monthNeed: optionProp?.mounthNeed });
    setCapabilities(
      optionProp?.capabilitiesMap ? [...optionProp?.capabilitiesMap] : []
    );
  }, [optionProp]);

  const [personaOptions] = usePersonaApi("DEV");
  var filteredItems = personaOptions.filter(
    (ar) => !personaSelected?.find((rm) => rm.positionName === ar.value)
  );
  const handleOnSelectSkills = (skills) => {
    const newCapabilities = skills.map((skill) => ({
      ...skill,
      point: skill.point || 5,
      importance: skill.importance || 5
    }));
    setCapabilities(newCapabilities);
  };
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

  const handleimportance = (index, importance) => {
    const newCapabilities = [...capabilities];
    newCapabilities[index] = {
      ...capabilities[index],
      importance: importance
    };
    setCapabilities(newCapabilities);
  };

  const formik = useFormik({
    initialValues: {
      positionName: null,
      numberNeed: 0,
      monthNeed: 0,
      utilization: 0
    },
    validationSchema: Yup.object({
      positionName: option
        ? null
        : Yup.object().required("Required !").nullable(),
      numberNeed: Yup.number()
        .positive("The required number must be greater than 0")
        .required("Required!"),
      monthNeed: Yup.number()
        .positive("The required number must be greater than 0")
        .required("Required!"),
      utilization: Yup.number()
        .positive("The required number must be greater than 0")
        .max(100, "The required number must be less than or equal to 100")
        .required("Required!")
    }),
    onSubmit: (values, { resetForm }) => {
      handleClose();
      handlerSubmitModal(
        values,
        capabilities,
        option?.title,
        option?.positionName.id
      );
      resetForm();
      setSelectedPersona(null);
    }
  });
  const touched = formik.touched;
  const error = formik.errors;
  const values = formik.values;

  const renderTooltip = (props) => (
    <Tooltip {...props}>
      <span className="header-tooltip">
        <div>5: very importance</div>
        <div>4: importance</div>
        <div>3: must to have</div>
        <div>2: good to have</div>
        <div>1: should have</div>
      </span>
    </Tooltip>
  );

  return (
    <div className="modal-edit-persona">
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered={true}
        dialogClassName="modal-edit-persona-style"
        onHide={handleClose}
        show={isShowing}
      >
        <Modal.Body className="modal-edit-persona-body">
          <Form onSubmit={formik.handleSubmit}>
            <div>
              <div className="modal-edit-persona-sub row">
                <div className="col-lg-5 row-sm mb-sm-4 mb-lg-0">
                  {option ? (
                    <div className="row">
                      <div className="persona col-4">
                        <img className="icon-persona" src={option?.icon} />
                      </div>
                      <div className="label-persona col">
                        <h5>{option?.title}</h5>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <SingleSelectField
                        className="selects-persona"
                        inputId="addNewPersona"
                        name="positionName"
                        options={filteredItems}
                        value={selectedPersona}
                        onChange={(value) =>
                          formik.setFieldValue("positionName", value) &&
                          setSelectedPersona(value)
                        }
                        placeholder={{
                          label: "Choose a persona",
                          icon: CreatorIcon
                        }}
                      />
                      {error.positionName && touched.positionName && (
                        <p className="errors selects-persona-error">
                          {error.positionName}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <div className="inputs-persona col-lg">
                  <div className="row">
                    <div className="col form-group group-edit-input">
                      <label className="label-form">Number needed </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder=""
                        name="numberNeed"
                        value={values.numberNeed}
                        onChange={formik.handleChange}
                      />
                      {error.numberNeed && touched.numberNeed && (
                        <p className="errors">{error.numberNeed}</p>
                      )}
                    </div>
                    <div className="col form-group group-edit-input">
                      <label className="label-form">Months needed </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder=""
                        name="monthNeed"
                        defaultValue={values.monthNeed}
                        onChange={formik.handleChange}
                      />
                      {error.monthNeed && touched.monthNeed && (
                        <p className="errors">{error.monthNeed}</p>
                      )}
                    </div>
                    <div className="col form-group group-edit-input">
                      <label className="label-form">Utilization %</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder=""
                        name="utilization"
                        value={values.utilization}
                        // disabled={true}
                        onChange={formik.handleChange}
                      />
                      {error.utilization && touched.utilization && (
                        <p className="errors">{error.utilization}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-edit-persona-selections col-sm-6 offset-sm-3">
              <Row>
                <Col>
                  <MultiSelectField
                    aria-labelledby="capabilities"
                    inputId="capabilities"
                    name="capabilities"
                    cacheOptions
                    defaultOptions
                    options={capabilitySkills}
                    value={capabilities}
                    defaultValue={[]}
                    limitSelected={100}
                    limitResults={5}
                    onChange={handleOnSelectSkills}
                    placeholder="Search"
                    noOptionsMessage={() => "No results"}
                  />
                </Col>
              </Row>
            </div>

            {capabilities.length > 0 && (
              <Row className="modal-edit-persona-header">
                <Col sm={3}>SKILL</Col>
                <Col>LEVEL</Col>
                <Col sm={3}>
                  IMPORTANCE
                  <br />
                  (1~5)
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                  >
                    <div className="modal-edit-persona-header-info-importance">
                      &#9432;
                    </div>
                  </OverlayTrigger>
                </Col>
              </Row>
            )}

            <div className="modal-edit-persona-group">
              {capabilities.length > 0 &&
                capabilities.map((a, index) => (
                  <Row key={index}>
                    <Col sm={2} className="label-capability">
                      <span>{a?.label}</span>
                    </Col>
                    <Col sm={1}>
                      <Button
                        className="btn-subtraction"
                        size="sm"
                        onClick={() => {
                          handlerSubtraction(index);
                        }}
                        disabled={a?.point === 1 ? true : false}
                      >
                        <Subtraction></Subtraction>
                      </Button>
                    </Col>
                    <Col>
                      <Item
                        label={a?.label}
                        point={a?.point}
                        key={index}
                      ></Item>
                    </Col>
                    <Col sm={1}>
                      <Button
                        className="btn-summation"
                        size="sm"
                        onClick={() => {
                          handlerSummation(index);
                        }}
                        disabled={a?.point === 10 ? true : false}
                      >
                        <Summation></Summation>
                      </Button>
                    </Col>
                    <Col sm={2} className="importance-point">
                      <input
                        className="importance-point-value"
                        type="number"
                        defaultValue={a.importance || 5}
                        required
                        min="1"
                        max="5"
                        onChange={(e) => {
                          if (!isNaN(e.target.value))
                            handleimportance(index, e.target.value);
                        }}
                      />
                    </Col>
                  </Row>
                ))}
            </div>
            <div className="d-flex mt-5 mb-3 justify-content-center">
              <button type="submit" className="modal-edit-persona-button">
                Submit
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalEditPersona;
