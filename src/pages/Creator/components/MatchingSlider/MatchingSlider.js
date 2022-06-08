import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Slider from "components/Slider/Slider";
import styles from "./MatchingSlider.module.scss";
import Dropdown from "components/Dropdown/Dropdown";
import {
  STATUS,
  COLOR_INTERESTED,
  COLOR_MATCHING,
  COLOR_REFUSED
} from "core/constants";

const MatchingSlider = ({
  interested,
  matching,
  refused,
  onChangeStatusDropdown,
  ...props
}) => {
  const [status, setStatus] = useState();
  const [currentColor, setCurrentColor] = useState();
  const [val, setVal] = useState(0);
  const valueStatus = Object.values(STATUS);

  const initialStatus = STATUS.MATCHING;

  useEffect(() => {
    if (status === STATUS["INTERESTED"]) {
      setVal(interested);
      setCurrentColor(COLOR_INTERESTED);
    }
    if (status === STATUS["MATCHING"]) {
      setVal(matching);
      setCurrentColor(COLOR_MATCHING);
    }
    if (status === STATUS["NOT_INTERESTED"]) {
      setVal(refused);
      setCurrentColor(COLOR_REFUSED);
    }
    onChangeStatusDropdown && onChangeStatusDropdown(status);
  }, [status]);
  return (
    <div {...props}>
      <div className={styles.label}>
        <h3>Matching results</h3>
        <Dropdown
          value={valueStatus}
          initialStatus={initialStatus}
          currentColor={currentColor}
          onChangeStatusDropdown={(status) => setStatus(status)}
        />
      </div>
      <div className={styles.sliderContainer}>
        <Slider
          className={styles.slider}
          val={val}
          currentColor={currentColor}
          max={interested + matching + refused}
          status={status}
          disabled
        />
        <div className={styles.sliderInfo}>
          <span className={styles.active} style={{ color: currentColor }}>
            {val} {status}
          </span>
        </div>
      </div>
    </div>
  );
};

MatchingSlider.propTypes = {
  interested: PropTypes.number,
  matching: PropTypes.number,
  refused: PropTypes.number,
  initialStatus: PropTypes.bool
};

export default MatchingSlider;
