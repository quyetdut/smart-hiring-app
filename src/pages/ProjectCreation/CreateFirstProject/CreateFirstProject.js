/* eslint-disable no-unused-vars */
import React from "react";
import { FastField, Formik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
// import WizardStep1 from "assets/images/wizard-step-1.svg";
import UploadImageField from "components/Forms/UploadImageField";
import { DatePickerCalendar } from "components/Forms/DatePickerCalendar/DatePickerCalendar";
import "./CreateFirstProject.scss";
import sessionStore from "core/sessionStore";
import { useLocation, useHistory } from "react-router";
import { useSelector } from "react-redux";
// import http from "core/services/httpService";
import { pushToast } from "components/Toast";
import axios from "axios";
import http from "core/services/httpService";

const CreateFirstProject = ({ nextBtnRef }) => {
  const location = useLocation();
  const isFirstProject =
    location.pathname === "/project-first-creation" ? true : false;

  const history = useHistory();

  const { user } = useSelector((state) => state.user);

  const initialValues = {
    projectName: "",
    projectStatus: "",
    problemStatement: "",
    bigVision: "",
    valueProposition: "",
    customer: "",
    revenueStreams: "",
    startAt: "",
    endAt: ""
  };
  const handleSubmit = async (values) => {
    const { img } = values;
    delete values["img"];
    const projectInfo = { ...values, projectCompletion: 50 };
    let formData = new FormData();
    formData.append("image", img);
    formData.append("projectInfo", JSON.stringify(projectInfo));
    formData.append("poId", user.id);
    try {
      await http.post("/project/projects/create", formData).then((response) => {
        pushToast("success", response.message);
        console.log(response);
        sessionStorage.removeItem("project");
        history.push(`project-health/${response.data}`);
      });
    } catch (error) {
      console.log(error);
    }
    // try {
    //   await axios({
    //     method: "POST",
    //     url: "http://172.16.0.130:8080/project/projects/create",
    //     data: formData,
    //     headers: { "Content-Type": "multipart/form-data" }
    //   }).then((response) => {
    //     pushToast("success", response.message);
    //     sessionStorage.removeItem("project");
    //     history.push(`project-health/${response.data.data}`);
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const validationSchema = Yup.object().shape({
    projectName: Yup.string()
      .min(2, "Project name too short")
      .max(100, "Project name too long")
      .matches(/^\s*\S[\s\S]*$/, "Project name cannot contain only blankspaces")
      .required("Project name is required"),
    projectStatus: Yup.string().required("Status is required"),
    startAt: Yup.date().required("Start date is required").nullable(),
    endAt: Yup.date()
      .min(Yup.ref("startAt"), "End date can't be before start date")
      .required("End date is required")
      .nullable(),
    problemStatement: Yup.string()
      .min(2, "Problem Statement too short")
      .max(500, "Problem Statement too long")
      .matches(
        /^\s*\S[\s\S]*$/,
        "Problem Statement cannot contain only blankspaces"
      )
      .required("Problem Statement is required"),
    bigVision: Yup.string()
      .min(2, "Big Vison too short")
      .max(500, "Big Vison too long")
      .matches(/^\s*\S[\s\S]*$/, "Big Vison cannot contain only blankspaces")
      .required("Big Vison is required"),
    valueProposition: Yup.string()
      .min(2, "Value Proposition too short")
      .max(500, "Value Proposition too long")
      .matches(
        /^\s*\S[\s\S]*$/,
        "Value Proposition cannot contain only blankspaces"
      )
      .required("Value Proposition is required"),
    customer: Yup.string()
      .min(2, "Customer too short")
      .max(500, "Customer too long")
      .matches(/^\s*\S[\s\S]*$/, "Customer cannot contain only blankspaces")
      .required("Customer is required")
  });

  let flag = false;
  return (
    <div className="create-first-project">
      <h2 className="create-project-title">
        {isFirstProject ? "Create your first project" : "Create your project"}
      </h2>
      <div className="create-project-main">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {(formikProps) => {
            const {
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setValues
            } = formikProps;

            const project = sessionStore.getItem("project");
            if (!flag) {
              if (project && project.projectInfo) {
                setValues({ ...project.projectInfo });
              }
              flag = true;
            } else {
              sessionStore.setItem("project", {
                ...project,
                projectInfo: { ...values }
              });
            }

            return (
              <form
                className="create-first-project-form"
                onSubmit={handleSubmit}
              >
                <div className="mb-5">
                  <FastField name="img" component={UploadImageField} />
                </div>

                <div className="mb-4">
                  <label className="mb-2 lb-text-field" htmlFor="projectName">
                    Project Name *
                  </label>
                  <input
                    className="form-control shadow-none input-text-field"
                    id="projectName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.projectName}
                    autoComplete="off"
                  />
                  {errors.projectName && touched.projectName && (
                    <p className="errors">{errors.projectName}</p>
                  )}
                </div>

                <div className="mb-4 group-radio">
                  <label className="mb-2 lb-text-field">Status *</label>
                  <div className="d-flex flex-lg-row flex-column">
                    <label className="radio-inline d-flex align-items-center lb-radio">
                      <input
                        type="radio"
                        name="projectStatus"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value="PUBLIC"
                        checked={values.projectStatus === "PUBLIC"}
                      />
                      <span>Public</span>
                    </label>
                    <label className="radio-inline d-flex align-items-center lb-radio">
                      <input
                        type="radio"
                        name="projectStatus"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value="CONFIDENTIAL"
                        checked={values.projectStatus === "CONFIDENTIAL"}
                      />
                      <span>Confidential</span>
                    </label>
                    <label className="radio-inline d-flex align-items-center lb-radio">
                      <input
                        type="radio"
                        name="projectStatus"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value="HIGHLY_CONFIDENTIAL"
                        checked={values.projectStatus === "HIGHLY_CONFIDENTIAL"}
                      />
                      <span>Highly confidential</span>
                    </label>
                  </div>
                  {errors.projectStatus && touched.projectStatus && (
                    <p className="errors">{errors.projectStatus}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="mb-2 lb-text-field">
                    Start and end of project *
                  </label>
                  <div className="date-picker d-flex flex-lg-row flex-column justify-content-between">
                    <div className="date-picker-items">
                      <FastField
                        name="startAt"
                        component={DatePickerCalendar}
                        displayIcon={true}
                      />
                      {errors.startAt && touched.startAt && (
                        <p className="errors">{errors.startAt}</p>
                      )}
                    </div>
                    <div className="date-picker-items">
                      <FastField
                        name="endAt"
                        component={DatePickerCalendar}
                        displayIcon={true}
                      />
                      {errors.endAt && touched.endAt && (
                        <p className="errors">{errors.endAt}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    className="mb-2 lb-text-field"
                    htmlFor="problemStatement"
                  >
                    Problem Statement *
                  </label>
                  <textarea
                    className="form-control text-area"
                    rows="3"
                    id="problemStatement"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.problemStatement}
                  ></textarea>
                  {errors.problemStatement && touched.problemStatement && (
                    <p className="errors">{errors.problemStatement}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="mb-2 lb-text-field" htmlFor="bigVision">
                    The big vision *
                  </label>
                  <textarea
                    className="form-control text-area"
                    rows="3"
                    id="bigVision"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bigVision}
                  ></textarea>
                  {errors.bigVision && touched.bigVision && (
                    <p className="errors">{errors.bigVision}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    className="mb-2 lb-text-field"
                    htmlFor="valueProposition"
                  >
                    Value Proposition *
                  </label>
                  <textarea
                    className="form-control text-area"
                    rows="3"
                    id="valueProposition"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.valueProposition}
                  ></textarea>
                  {errors.valueProposition && touched.valueProposition && (
                    <p className="errors">{errors.valueProposition}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="mb-2 lb-text-field" htmlFor="customer">
                    Customer *
                  </label>
                  <textarea
                    className="form-control text-area"
                    rows="3"
                    id="customer"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.customer}
                  ></textarea>
                  {errors.customer && touched.customer && (
                    <p className="errors">{errors.customer}</p>
                  )}
                </div>

                <div className="mb-5">
                  <label
                    className="mb-2 lb-text-field"
                    htmlFor="revenueStreams"
                  >
                    Revenue Streams{" "}
                    <span className="lb-text-field-sub">(optional)</span>
                  </label>
                  <textarea
                    className="form-control text-area"
                    rows="3"
                    id="revenueStreams"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.revenueStreams}
                  ></textarea>
                </div>

                <button
                  className="btn-nav btn-next m-auto"
                  ref={nextBtnRef}
                  type="submit"
                >
                  Finish
                </button>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

CreateFirstProject.prototype = {
  handleSetStep: PropTypes.func.isRequired,
  bindSubmitForm: PropTypes.func.isRequired
};

export default CreateFirstProject;
