import InputField from "components/Forms/InputField";
import SelectField from "components/Forms/SelectField";
import { FastField, Form, Formik } from "formik";
import useDivision from "hook/useDivision";
import useLocation from "hook/useLocation";
import usePosition from "hook/usePosition";
import { Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import "./InfosPersonas.scss";
import { useSelector } from "react-redux";

const CONST_OPTION_CONTRACTUAL_ITEMS = [
  { value: "Fulltime employee", label: "Fulltime employee" },
  { value: "Parttime employee", label: "Parttime employee" },
  { value: "Contract employee", label: "Contract employee" }
];

const InfosPersonasSchema = Yup.object().shape({
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
  position: Yup.object().required("Location is required").nullable()
});
export default function InfosPersonas({ handlePersonaProfile }) {
  const [divisionOptions] = useDivision();
  const [locationOptions] = useLocation();
  const [positionOptions] = usePosition();
  const { user } = useSelector((state) => state.user);

  const initialValues = {
    firstName: "",
    lastName: "",
    contractualTerm: null,
    division: null,
    location: null,
    position: null
  };

  return (
    <div>
      <div className="create-persona">
        <h2 className="create-persona-title">Profile Information</h2>
        <div className="create-persona-main">
          <Formik
            initialValues={initialValues}
            validationSchema={InfosPersonasSchema}
            onSubmit={(values) => {
              handlePersonaProfile(values);
            }}
          >
            {(formikProps) => {
              const { errors, touched } = formikProps;
              return (
                <div>
                  <Form className="create-persona-form">
                    <Row className="align-items-end mb-4">
                      <Col lg={6} md={12} sm={12}>
                        <FastField
                          name="firstName"
                          component={InputField}
                          label="Name *"
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

                    <div className="form-group mb-4">
                      <FastField
                        name="position"
                        component={SelectField}
                        label="Position *"
                        placeholder="Select your position"
                        options={positionOptions}
                      />
                    </div>

                    <div className="mb-4">
                      <FastField
                        name="contractualTerm"
                        component={SelectField}
                        label="Contractual Term *"
                        placeholder="Select a Contractual Term"
                        options={CONST_OPTION_CONTRACTUAL_ITEMS}
                      />
                    </div>
                    <div className="mb-4">
                      <FastField
                        name="division"
                        component={SelectField}
                        label="Division *"
                        placeholder="Select your Division"
                        options={divisionOptions}
                      />
                    </div>
                    <div className="mb-4">
                      <FastField
                        name="location"
                        component={SelectField}
                        label="Location *"
                        placeholder="Select your Location"
                        options={locationOptions}
                      />
                    </div>

                    <div className="d-flex mt-5 justify-content-center">
                      <button
                        className="btn btn-md my-3 modal-info-person-button"
                        type="submit"
                        disabled={user.isProfileCreated}
                      >
                        Finish
                      </button>
                    </div>
                  </Form>
                </div>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}
