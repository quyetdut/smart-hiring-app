/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
//import images
import ImageHolder from "../../assets/images/image-holder.png";
import IcUpload from "../../assets/images/icons/ic-upload.png";

import "./UploadImage.scss";

const UploadImage = (props) => {
  const { name, imgUrl, onImgUrlChange, onSelectBlur } = props;
  // eslint-disable-next-line no-undef
  const [img, setImg] = useState("");

  const handleChange = (e) => {
    if (e.target.files.length !== 0) {
      const file = URL.createObjectURL(e.target.files[0]);
      setImg(file);
      onImgUrlChange(e.target.files[0]);
    }
  };

  const inputEl = useRef(null);

  const onClickUpload = () => {
    inputEl.current.click();
  };

  return (
    <div className="upload-image d-flex align-items-center flex-lg-row flex-column">
      <img
        src={img ? img : ImageHolder}
        className="upload-image-review mb-3 mb-lg-0"
        accept="image/*"
        type="file"
      />
      <div
        className="btn-upload-image d-flex flex-column align-items-center justify-content-center"
        onClick={() => {
          onClickUpload();
        }}
      >
        <img src={IcUpload} alt="ic-upload" />
        <p className="btn-upload-image-text">Upload Project Thumbnail</p>
      </div>
      <input
        type="file"
        accept="image/png, image/gif, image/jpeg"
        ref={inputEl}
        className="d-none"
        name={name}
        onBlur={onSelectBlur}
        onChange={handleChange}
      />
    </div>
  );
};

UploadImage.propTypes = {
  name: PropTypes.string,
  imgUrl: PropTypes.string,
  onImgUrlChange: PropTypes.func,
  onSelectBlur: PropTypes.func
};

UploadImage.defaultProps = {
  name: "",
  imgUrl: "",
  onImgUrlChange: null,
  onSelectBlur: null
};

export default UploadImage;
