import { FastField, Formik, Form } from "formik";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import { DatePickerCalendar } from "components/Forms/DatePickerCalendar/DatePickerCalendar";

const WorkExperiencesFormSchema = Yup.object().shape({
  startAt: Yup.date().required("required").nullable(),
  endAt: Yup.date()
    .min(Yup.ref("startAt"), "End date can't be before start date")
    .required("required")
    .nullable(),
  employer: Yup.string().max(50, "too long").required("required"),
  businessType: Yup.string().max(50, "too long").required("required"),
  position: Yup.string().max(50, " too long").required("required"),
  description: Yup.string().max(50, "too long").required(" required")
});

function WorkExperiencesForm({ ...props }) {
  const { experience, handleWorkExperience, handleClose } = props;

  const initialValues = {
    id: experience?.id || null,
    startAt: experience?.startAt || null,
    endAt: experience?.endAt || null,
    employer: experience?.employer || "",
    businessType: experience?.businessType || "",
    position: experience?.position || "",
    description: experience?.description || ""
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={WorkExperiencesFormSchema}
      onSubmit={(values) => {
        handleWorkExperience(values);
        handleClose();
      }}
    >
      {(formikProps) => {
        const { values, errors, touched, handleChange, handleBlur } =
          formikProps;
        return (
          <Form>
            <div className="workexperiences-from__item">
              <div className="employer-from-to__group to-group">
                <div className="form-item-employer">
                  <div className="form-group">
                    <label htmlFor="employer-input">Employer</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Company name"
                      id="employer"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.employer}
                    />
                    {errors.employer && touched.employer && (
                      <p className="errors">{errors.employer}</p>
                    )}
                  </div>
                </div>

                <div className="form-item-from-to">
                  <div className="form-group from-input">
                    <label htmlFor="from-input">From</label>

                    <FastField
                      name="startAt"
                      displayIcon={false}
                      component={DatePickerCalendar}
                    />
                    {errors.startAt && touched.startAt && (
                      <p className="errors">{errors.startAt}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="to-input">To</label>

                    <FastField
                      name="endAt"
                      displayIcon={false}
                      component={DatePickerCalendar}
                    />
                    {errors.endAt && touched.endAt && (
                      <p className="errors">{errors.endAt}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="to-group">
                <div className="form-group">
                  <label htmlFor="sector-input">
                    Type of business or sector
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Field, sector..."
                    id="businessType"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.businessType}
                  />
                  {errors.businessType && touched.businessType && (
                    <p className="errors">{errors.businessType}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="position-input">Occupation or position</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Type your position"
                    id="position"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.position}
                  />
                  {errors.position && touched.position && (
                    <p className="errors">{errors.position}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="form-group">
                  <label htmlFor="employer-input">
                    Your responsibilities, acquired skills and competences
                  </label>
                  {values.description ? (
                    <textarea
                      id="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      className="form-control textarea"
                      placeholder="Type your experience "
                      style={{ height: "96px" }}
                    />
                  ) : (
                    <textarea
                      id="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      className="form-control textarea"
                      placeholder="Type your experience "
                    />
                  )}
                  {errors.description && touched.description && (
                    <p className="errors">{errors.description}</p>
                  )}
                </div>
              </div>
            </div>
            <button className="workexperiences-btn__next" type="submit">
              Finish
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default WorkExperiencesForm;
