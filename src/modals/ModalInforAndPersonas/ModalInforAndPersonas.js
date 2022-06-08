import { Modal, Row, Col, CloseButton } from "react-bootstrap";
import { Formik, Form, FastField } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";
import "./ModalInforAndPersonas.scss";
import InputField from "components/Forms/InputField";
import TimeZoneField from "components/Forms/TimeZoneField";
import SelectField from "components/Forms/SelectField";
// import SingleSelectField from "components/Forms/SingleSelectField/SingleSelectField";
// import CreatorIcon from "assets/images/creator-icon.svg";
// import usePersonaApi from "hook/usePersonaApi";
import useLocation from "hook/useLocation";
import useDivision from "hook/useDivision";
import usePosition from "hook/usePosition";

const CONST_OPTION_CONTRACTUAL_ITEMS = [
  { value: "Fulltime employee", label: "Fulltime employee" },
  { value: "Parttime employee", label: "Parttime employee" },
  { value: "Contract employee", label: "Contract employee" }
];

const ModalInfoAndPersonaSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(50, "First name too long")
    .required("First name is required"),
  lastName: Yup.string()
    .max(50, "Last name too long")
    .required("Last name is required"),
  contractualTerm: Yup.object()
    .required("Contractual Term is required")
    .nullable(),
  division: Yup.object().required("Division is required").nullable(),
  location: Yup.object().required("Location is required").nullable(),
  anotherPersona: Yup.object(),
  position: Yup.object().required("Location is required").nullable()
});

const ModalInforAndPersonas = (props) => {
  const { handleClose, isShowing, profile, handlePersonaProfile } = props;
  // const [personaOptions] = usePersonaApi("DEV");
  const [locationOptions] = useLocation();
  const [divisionOptions] = useDivision();
  const [positionOptions] = usePosition();

  // const [testValueAnotherPersona, setTestValueAnotherPersona] = useState("");
  const onHide = () => {
    handleClose();
  };

  const location = profile
    ? locationOptions.find(({ value }) => value === profile.location)
    : null;

  const initialValues = {
    firstName: profile?.firstName,
    lastName: profile?.lastName,
    contractualTerm: profile
      ? CONST_OPTION_CONTRACTUAL_ITEMS.find(
          ({ value }) => value === profile.contractualTerm
        )
      : null,
    division: profile
      ? divisionOptions.find(({ value }) => value === profile.division)
      : null,
    location: location,
    timeZone: location?.timeZone || "",
    position: profile
      ? positionOptions.find(({ value }) => value === profile.position)
      : null
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
          <Formik
            initialValues={initialValues}
            validationSchema={ModalInfoAndPersonaSchema}
            onSubmit={(values) => {
              // if (
              //   values?.anotherPersona?.value !== profile.position ||
              //   values.anotherPersona === undefined
              // ) {
              // setTestValueAnotherPersona("");
              handlePersonaProfile(values);
              onHide();
              // } else {
              // setTestValueAnotherPersona("You already have Persona");
              // }
            }}
          >
            {(formikProps) => {
              const { errors, touched } = formikProps;
              return (
                <div>
                  <Row className="modal-info-person-title">
                    <Col xs={11}>
                      <h4 className="font-weight-bold"> Edit profile</h4>
                    </Col>
                    <Col sx={1}>
                      <CloseButton
                        className="modal-info-person-button-close"
                        onClick={onHide}
                      />
                    </Col>
                  </Row>
                  <Form className="modal-info-person-form">
                    <Row className="align-items-end">
                      <Col lg={6} md={12} sm={12}>
                        <FastField
                          name="firstName"
                          component={InputField}
                          label="Name"
                          placeholder="Enter your first name"
                        />
                      </Col>
                      <Col lg={6} md={12} sm={12}>
                        <FastField
                          name="lastName"
                          component={InputField}
                          label=" "
                          placeholder="Enter your last name"
                        />
                      </Col>
                    </Row>
                    <Row className="align-items-end">
                      <Col lg={6} md={12} sm={12}>
                        {errors.firstName && touched.firstName ? (
                          <div className="errors">{errors.firstName}</div>
                        ) : null}
                      </Col>
                      <Col lg={6} md={12} sm={12}>
                        {errors.lastName && touched.lastName ? (
                          <div className="errors">{errors.lastName}</div>
                        ) : null}
                      </Col>
                    </Row>

                    <FastField
                      name="position"
                      component={SelectField}
                      label="Position"
                      placeholder="Select your position"
                      options={positionOptions}
                    />

                    <FastField
                      name="contractualTerm"
                      component={SelectField}
                      label="Contractual Term"
                      placeholder="Select a Contractual Term"
                      options={CONST_OPTION_CONTRACTUAL_ITEMS}
                    />
                    <FastField
                      name="division"
                      component={SelectField}
                      label="Division"
                      placeholder="Select your Division"
                      options={divisionOptions}
                    />
                    <FastField
                      name="location"
                      component={SelectField}
                      label="Location"
                      placeholder="Select your Location"
                      options={locationOptions}
                      handleChange={(value) =>
                        formikProps.setFieldValue("timeZone", value.timeZone)
                      }
                    />
                    <FastField
                      name="timeZone"
                      component={TimeZoneField}
                      label="Timezone"
                      placeholder="timezone"
                      disabled={true}
                    />

                    {/* <div className="form-group">
                      <label className="form-label">Persona 1</label>
                      <div className="clearfix">
                        <img
                          className="modal-info-person-avatar pull-left"
                          src=""
                          // src={
                          //   personaOptions.length !== 0
                          //     ? personaOptions.find(
                          //         (x) => x.value === `${profile.positions[0]}`
                          //       ).icon
                          //     : ""
                          // }
                        />
                        <label className="ms-3 modal-info-person-text-right form-label">
                          {profile.length !== 0 ? profile.position : ""}
                        </label>
                      </div>
                    </div> */}
                    {/* <div className="form-group">
                      <label className="form-label" htmlFor="persona">
                        Add another persona
                      </label>
                      <SingleSelectField
                        id="anotherPersona"
                        name="anotherPersona"
                        options={personaOptions}
                        placeholder={{
                          label: "Choose a persona",
                          icon: CreatorIcon
                        }}
                        onChange={(value) =>
                          formikProps.setFieldValue("anotherPersona", value)
                        }
                      />
                      {errors.anotherPersona && touched.anotherPersona ? (
                        <div className="errors">{errors.anotherPersona}</div>
                      ) : null}
                      {testValueAnotherPersona !== "" ? (
                        <div className="errors">{testValueAnotherPersona}</div>
                      ) : null}
                    </div> */}
                    <div className="d-flex mt-5 justify-content-center">
                      <button
                        className="btn btn-md my-3 modal-info-person-button"
                        type="submit"
                      >
                        Finish
                      </button>
                    </div>
                  </Form>
                </div>
              );
            }}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

ModalInforAndPersonas.prototype = {
  handleClose: PropTypes.func.isRequired,
  isShowing: PropTypes.bool.isRequired,
  handleProfileSubmit: PropTypes.func
};

export default ModalInforAndPersonas;
