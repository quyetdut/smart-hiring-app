import InputField from "components/Forms/InputField";
import { ErrorMessage, FastField, Form, Formik } from "formik";
import React from "react";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";
import "../ModalWorkExperiences/ModalWorkExperiences.scss";
const ModalCertificationsSchema = Yup.object().shape({
  name: Yup.string().required("Certification name is required")
});

function ModalCertifications({ handleClose, isShowing, handleCertifications }) {
  const onHide = () => {
    handleClose();
  };

  const initialValues = {
    name: ""
  };

  return (
    <div>
      <Modal
        show={isShowing}
        size="lg"
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="workexperiences-modal-body">
          <div className="workexperiences-wrapper">
            <div className="workexperiences-content">
              <div className="workexperiences-heading">
                <div className="workexperiences-title">Certifications</div>
                <div className="workexperiences-close" onClick={onHide}>
                  <div className="close-1"></div>
                  <div className="close-2"></div>
                </div>
              </div>
              <div className="workexperiences-form__list">
                <Formik
                  initialValues={initialValues}
                  validationSchema={ModalCertificationsSchema}
                  onSubmit={(values) => {
                    handleCertifications(values);
                    onHide();
                  }}
                >
                  <Form>
                    <FastField
                      name="name"
                      component={InputField}
                      label="Certification name"
                      placeholder="Add certification name"
                    />
                    <ErrorMessage
                      name="name"
                      render={(msg) => <div className="errors">{msg}</div>}
                    />
                    <div className="d-flex mt-5 justify-content-center">
                      <button
                        className="btn btn-md my-3 modal-info-person-button"
                        type="submit"
                      >
                        Finish
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default ModalCertifications;
