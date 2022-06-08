import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Row, Col, Button, Modal, CloseButton } from "react-bootstrap";
import SingleSelectField from "components/Forms/SingleSelectField/SingleSelectField";
import CreatorIcon from "assets/images/creator-icon.svg";
import "./FormProfileInfo.scss";
import "modals/ModalInforAndPersonas/ModalInforAndPersonas.scss";
import usePersonaApi from "hook/usePersonaApi";
import useDivision from "hook/useDivision";
import useSubmitGeneralInfo from "hook/useSubmitGeneralInfo";
import usePOInfo from "hook/usePOInfo";

const FormProfileInfo = (props) => {
  const [personaOptions] = usePersonaApi("PO");
  const { type, isShowing, handleClose } = props;
  const [companies] = useDivision();
  const [submit] = useSubmitGeneralInfo();

  const [editProfile, setEditProfile] = useState(true);
  const onHide = () => {
    handleClose();
  };

  const infoPO = {
    firstName: "",
    lastName: "",
    contractualTerm: "",
    division: "",
    positions: [
      {
        icon: "https://cdn.computercareers.org/wp-content/uploads/Solution-Architect.png",
        id: 5,
        name: "Product Owner"
      }
    ]
  };

  if (type == "view-profile") {
    const [po] = usePOInfo();
    infoPO.firstName = po.firstName;
    infoPO.lastName = po.lastName;
    infoPO.contractualTerm = po.contractualTerm;
    infoPO.division = po.division;
    infoPO.positions = po.positions;
  }

  const terms = [
    { value: "Fulltime employee", label: "Fulltime employee" },
    { value: "Parttime employee", label: "Parttime employee" },
    { value: "Contract employee", label: "Contract employee" }
  ];

  const handleEditProfile = () => {
    setEditProfile(!editProfile);
  };

  const handleOnClickCreatePersona = () => {
    console.log("Create a new Persona");
  };

  const renderFooterContentMenuList = () => (
    <button type="button" onClick={handleOnClickCreatePersona}>
      + Create a new Persona
    </button>
  );

  const formik = useFormik({
    initialValues: {
      first_name: infoPO.firstName || "",
      last_name: infoPO.lastName || "",
      contractual_term: infoPO.contractualTerm || "",
      company_name: infoPO.division || "SMARTDEV_VIETNAM",
      persona: infoPO.persona || ""
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("Required!"),
      last_name: Yup.string()
        .min(1, "Mininum 1 characters")
        .max(15, "Maximum 15 characters")
        .required("Required!"),
      persona: Yup.string().required("Please select a persona")
    }),
    onSubmit: (values) => {
      const dataSubmit = {
        userId: JSON.parse(localStorage.getItem("user")).id,
        // userId: 20,
        firstName: values.first_name,
        lastName: values.last_name,
        contractualTerm: values.contractual_term,
        division: values.company_name,
        positions: [values.persona]
      };

      const type = "view-profile";

      submit(dataSubmit, type);
    }
  });
  const touched = formik.touched;
  const error = formik.errors;
  const values = formik.values;

  const handleOnChange = ({ value }) => {
    formik.values.persona = value;
  };

  const handleChangeContractualTems = (e) => {
    formik.values.contractual_term = e.target.value;
  };

  const handleChangeCompany = (e) => {
    formik.values.company_name = e.target.value;
  };

  return (
    <div className="modal-info-person">
      <Modal
        show={isShowing}
        onHide={onHide}
        size="lg"
        dialogClassName="modal-info-person-style"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="modal-info-person-content">
          <Row className="modal-info-person-title">
            <Col xs={11}>
              <h4 className="font-weight-bold"> Infos and Personas</h4>
            </Col>
            <Col sx={1}>
              <CloseButton
                className="modal-info-person-button-close"
                onClick={onHide}
              />
            </Col>
          </Row>
          <Row>
            <Col xl={{ span: 6, offset: 3 }} lg={{ span: 8, offset: 2 }}>
              <Form onSubmit={formik.handleSubmit} validated={false}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="first_name"
                      autoComplete="off"
                      value={
                        type == "view-profile"
                          ? infoPO.firstName
                          : values.first_name
                      }
                      onChange={formik.handleChange}
                      disabled={type == "view-profile" ? editProfile : false}
                    />
                    {error.first_name && touched.first_name && (
                      <p className="errors">{error.first_name}</p>
                    )}
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridFullName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="last_name"
                      value={
                        type == "view-profile"
                          ? infoPO.lastName
                          : values.last_name
                      }
                      autoComplete="off"
                      onChange={formik.handleChange}
                      disabled={type == "view-profile" ? editProfile : false}
                    />
                    {error.last_name && touched.last_name && (
                      <p className="errors">{error.last_name}</p>
                    )}
                  </Form.Group>
                </Row>

                <Form.Group
                  className="mb-3"
                  controlId="formGridContractualTerms"
                >
                  <Form.Label>Contractual terms</Form.Label>
                  {type && editProfile ? (
                    <Form.Control
                      type="text"
                      name="term"
                      autoComplete="off"
                      value={infoPO.contractualTerm}
                      onChange={formik.handleChange}
                      disabled
                    />
                  ) : (
                    <select
                      className="form-select"
                      aria-label="Select Contractual terms"
                      defaultValue={values.contractual_term}
                      onChange={handleChangeContractualTems}
                      name="term"
                    >
                      {terms.map((term) => {
                        return (
                          <option
                            value={term.value}
                            key={term.value}
                            label={term.label}
                          ></option>
                        );
                      })}
                    </select>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridCompanyName">
                  <Form.Label>Company Name</Form.Label>
                  {type && editProfile ? (
                    <Form.Control
                      type="text"
                      name="company"
                      autoComplete="off"
                      value={infoPO.division}
                      onChange={formik.handleChange}
                      disabled
                    />
                  ) : (
                    <select
                      className="form-select"
                      aria-label="Select Company"
                      onChange={handleChangeCompany}
                      name="company"
                    >
                      {companies.map((company) => {
                        return (
                          <option
                            value={company.value}
                            key={company.value}
                            label={company.label}
                          ></option>
                        );
                      })}
                    </select>
                  )}
                </Form.Group>

                <Form.Group
                  className="mb-3 form-select-persona "
                  controlId="formGridPersona"
                >
                  <Form.Label>Persona</Form.Label>
                  {type && editProfile ? (
                    infoPO?.positions?.map((item, index) => {
                      return (
                        <Form.Control
                          key={index}
                          type="text"
                          name="persona"
                          autoComplete="off"
                          value={item.name}
                          onChange={formik.handleChange}
                          disabled
                        />
                      );
                    })
                  ) : (
                    <span>
                      <SingleSelectField
                        id="persona"
                        name="persona"
                        options={personaOptions}
                        onChange={handleOnChange}
                        placeholder={{
                          label: "Choose a persona",
                          icon: CreatorIcon
                        }}
                        footerContentMenuList={renderFooterContentMenuList()}
                      />
                      {error.persona && touched.persona && (
                        <p className="errors">{error.persona}</p>
                      )}
                    </span>
                  )}
                </Form.Group>

                <div className="form-submit">
                  {type == "view-profile" ? (
                    <Button
                      variant="primary"
                      className="btn-submit"
                      onClick={handleEditProfile}
                    >
                      {/* {type == "view-profile" ? "Submit" : "NEXT"} */}
                      {editProfile ? "Edit" : "submit"}
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      type="submit"
                      className="btn-submit "
                    >
                      {/* {type == "view-profile" ? "Submit" : "NEXT"} */}
                      {"Submit"}
                    </Button>
                  )}
                  {/* <Button variant="primary" type="submit" className="btn-submit">
                {type == "view-profile" ? "Submit" : "NEXT"} 
                {"Submit"}
              </Button> */}
                </div>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FormProfileInfo;
