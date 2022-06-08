import React, { useEffect, useRef, useState } from "react";
import dropdownIcon from "assets/icons/dropdown-icon.svg";
import "./Dropdown.scss";
import { useDetectOutsideClick } from "./useDetectOutsideClick";

export default function Dropdown({
  value,
  initialStatus,
  currentColor,
  onChangeStatusDropdown
}) {
  const [status, setStatus] = useState(initialStatus || value[0]);
  const dropdownRef = useRef(null);
  const [show, setShow] = useDetectOutsideClick(dropdownRef, false);

  useEffect(() => {
    onChangeStatusDropdown && onChangeStatusDropdown(status);
  }, [status]);
  const handleShowDropdown = () => {
    setShow(!show);
  };
  const handleChangeStatusDropdown = (val) => {
    setStatus(val);
  };
  return (
    <div>
      <div className="dropdown-wrapper" onClick={handleShowDropdown}>
        <div className="custom-dropdown" style={{ color: currentColor }}>
          {status}
        </div>
        <img src={dropdownIcon} alt="dropdown icon" />
        <div
          ref={dropdownRef}
          className={
            show === true
              ? `dropdown-content dropdown-show-content`
              : `dropdown-content`
          }
        >
          {value.map((val, index) => (
            <div key={index} onClick={() => handleChangeStatusDropdown(val)}>
              {val}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
