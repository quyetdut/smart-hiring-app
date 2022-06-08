import React from "react";
import PropTypes from "prop-types";

import styles from "./Slider.module.scss";

const Slider = ({
  className,
  val,
  currentColor,
  max,
  showIndex = true,
  ...props
}) => {
  const progressValue = (val / max) * 100;
  return (
    <div
      className={
        className ? `${styles.container} ${className}` : styles.container
      }
    >
      {showIndex && (
        <span
          className={styles.index}
          style={{ left: `calc(${progressValue}% - 10px)` }}
        >
          {Math.round(progressValue + Number.EPSILON)}%
        </span>
      )}
      <input
        type="range"
        value={val}
        max={max}
        style={{ color: currentColor }}
        {...props}
      />
      <span
        className={`${styles.leftPortion} ${styles.active}`}
        style={{ width: `${progressValue}%`, color: currentColor }}
      ></span>
      <span
        className={styles.rightPortion}
        style={{ width: `${100 - progressValue}%` }}
      ></span>
    </div>
  );
};

Slider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func
};

export default Slider;
