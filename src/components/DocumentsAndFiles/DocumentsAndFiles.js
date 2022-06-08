import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

import { ReactComponent as FileUpload } from "assets/icons/file-upload.svg";
import { ReactComponent as RemoveUpload } from "assets/icons/remove-upload.svg";
import { ReactComponent as UploadCloud } from "assets/icons/upload-cloud.svg";
import "./DocumentsAndFiles.scss";
import http from "core/services/httpService";
import { pushToast } from "components/Toast";

function ModalUploadDocumentsAndFiles(props) {
  const {
    show,
    handleClose,
    handleSelectFiles,
    arrFiles,
    handleRemoveFileItem,
    handleUploadFiles
  } = props;

  const handleRenderArrFile = () => {
    if (arrFiles?.length === 0) {
      return (
        <div className="file-item">
          <div className="file-name">There are no files here.</div>
        </div>
      );
    }
    return arrFiles?.map((data, index) => (
      <div className="file-item" key={index}>
        <div className="file-heading">
          <div className="file-icon">
            <FileUpload />
          </div>
          {/* <a href={data.filePath} download={data.fileName}>
            {data.fileName}
          </a> */}
          <div className="file-name">{data.name}</div>
        </div>
        <div className="file-remove" onClick={() => handleRemoveFileItem(data)}>
          <RemoveUpload />
        </div>
      </div>
    ));
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Upload documents</Modal.Title>
        </Modal.Header>
        <Modal.Body className="documents-and-files-wrapper">
          <div className="documents-and-files-content">
            <div className="file-list">{handleRenderArrFile()}</div>
            <label>
              <div className="upload-file-group">
                <div className="upload-file-icon">
                  <UploadCloud />
                </div>
                <div className="upload-file-text">Select Files</div>
                <input
                  id="upload-file"
                  className="upload-file"
                  type="file"
                  onChange={(e) => handleSelectFiles(e)}
                />
              </div>
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleUploadFiles}
            disabled={arrFiles.length === 0}
          >
            Upload Files
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function DocumentsAndFiles({ documents, idProject, setFilesUpload }) {
  const [arrFiles, setArrFiles] = useState([]);
  const [show, setShow] = useState(false);
  const [existedDocuments, setExistedDocuments] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  React.useEffect(() => {
    let convert = [];
    documents?.map((document) => {
      let documentConvert = {
        filePath: document.filePath,
        name: document.name
      };
      convert.push(documentConvert);
    });
    setExistedDocuments(convert);
  }, []);

  React.useEffect(() => {
    () => handleRenderExistedDocuments();
  }, [arrFiles]);

  const handleRenderExistedDocuments = () => {
    if (existedDocuments?.length === 0) {
      return (
        <div className="file-item">
          <div className="file-name">There are no files here.</div>
        </div>
      );
    }

    return existedDocuments?.map((data, index) => (
      <div className="file-item" key={index}>
        <div className="file-heading">
          <div className="file-icon">
            <FileUpload />
          </div>
          <a
            // eslint-disable-next-line no-undef
            href={`${process.env.REACT_APP_API_URL}${data.filePath}`}
            // download={data.name}
          >
            <div className="file-name">
              {data.name ? data.name : data.filePath}
            </div>
          </a>
        </div>
        <div className="file-remove" onClick={() => handleRemoveFileItem(data)}>
          <RemoveUpload />
        </div>
      </div>
    ));
  };

  const handleUploadFiles = async () => {
    let formData = new FormData();
    formData.append("projectId", idProject);
    arrFiles.map((file) => {
      formData.append("documents", file);
    });
    try {
      await http
        .post(`/project/document/create-and-update`, formData)
        .then((res) => {
          let convertDataUpdate = [];
          res.data?.map((document) => {
            let documentConvert = {
              filePath: document.filePath,
              name: document.name
            };
            convertDataUpdate.push(documentConvert);
          });
          setExistedDocuments([...existedDocuments, ...convertDataUpdate]);
          setFilesUpload(true);
        });
      setArrFiles([]);
    } catch (error) {
      pushToast("error", "files is existed");
      setArrFiles([]);
    } finally {
      handleClose();
    }
  };

  const handleSelectFiles = (e) => {
    if (e.target.files.length > 0) {
      setArrFiles([...arrFiles, e.target.files[0]]);
    }
  };

  const handleRemoveFileItem = (file) => {
    const newArrFiles = arrFiles;
    const removedItem = newArrFiles.filter((name) => file !== name);
    setArrFiles(removedItem);
  };

  return (
    <div>
      <div className="documents-and-files-wrapper">
        <div className="documents-and-files-title">Documents and Files</div>
        <div className="documents-and-files-content">
          <div className="file-list"> {handleRenderExistedDocuments()}</div>
          <label>
            <div className="upload-file-group" onClick={handleShow}>
              <div className="upload-file-icon">
                <UploadCloud />
              </div>
              <div className="upload-file-text">Select Files</div>
            </div>
          </label>
        </div>
      </div>
      <ModalUploadDocumentsAndFiles
        show={show}
        handleClose={handleClose}
        handleSelectFiles={handleSelectFiles}
        arrFiles={arrFiles}
        handleRemoveFileItem={handleRemoveFileItem}
        handleUploadFiles={handleUploadFiles}
      />
    </div>
  );
}

export default DocumentsAndFiles;
