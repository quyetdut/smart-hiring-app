import React, { useEffect, useState } from "react";
import "./SelectRanking.scss";
import PropTypes from "prop-types";

function SelectRanking({ ranking }) {
  const [iTem, setItem] = useState({
    iTem1: 0,
    iTem2: 0,
    iTem3: 0,
    iTem4: 0,
    iTem5: 0
  });
  function setranking() {
    if ((ranking >= 0 && ranking <= 20) || ranking < 0) {
      let result = (ranking * 100) / 20;
      setItem({ ...iTem, iTem1: result });
    }
    if (ranking > 20 && ranking <= 40) {
      let result = ((ranking - 20) * 100) / 20;
      setItem({ ...iTem, iTem1: 100, iTem2: result });
    }
    if (ranking > 40 && ranking <= 60) {
      let result = ((ranking - 40) * 100) / 20;
      setItem({ ...iTem, iTem1: 100, iTem2: 100, iTem3: result });
    }
    if (ranking > 60 && ranking <= 80) {
      let result = ((ranking - 60) * 100) / 20;
      setItem({ ...iTem, iTem1: 100, iTem2: 100, iTem3: 100, iTem4: result });
    }
    if (ranking > 80 && ranking <= 100) {
      let result = ((ranking - 80) * 100) / 20;
      setItem({
        ...iTem,
        iTem1: 100,
        iTem2: 100,
        iTem3: 100,
        iTem4: 100,
        iTem5: result
      });
    }
    if (ranking > 100) {
      setItem({
        ...iTem,
        iTem1: 100,
        iTem2: 100,
        iTem3: 100,
        iTem4: 100,
        iTem5: 100
      });
    }
  }
  useEffect(() => {
    setranking();
  }, [ranking]);
  return (
    <div className="select-ranking">
      <div className="row g-1 ">
        <div className="col-2">
          <div className="myProgress  b_radius_left">
            <div
              className={
                (ranking >= 0 && ranking < 20) || ranking < 0
                  ? "myProgress-bar b_radius_left"
                  : "myProgress-barNoAfter-ful b_radius_left"
              }
              style={{
                width: `${iTem.iTem1}%`
              }}
            ></div>
          </div>
        </div>
        <div className="col-2">
          <div className="myProgress">
            <div
              className={
                ranking >= 20 && ranking < 40
                  ? "myProgress-bar"
                  : ranking >= 40
                  ? "myProgress-barNoAfter-ful"
                  : "myProgress-barNoAfter"
              }
              style={{
                width: `${iTem.iTem2}%`
              }}
            ></div>
          </div>
        </div>
        <div className="col-2">
          <div className="myProgress">
            <div
              className={
                ranking >= 40 && ranking < 60
                  ? "myProgress-bar"
                  : ranking >= 60
                  ? "myProgress-barNoAfter-ful"
                  : "myProgress-barNoAfter"
              }
              style={{
                width: `${iTem.iTem3}%`
              }}
            ></div>
          </div>
        </div>
        <div className="col-2">
          <div className="myProgress">
            <div
              className={
                ranking >= 60 && ranking < 80
                  ? "myProgress-bar"
                  : ranking >= 80
                  ? "myProgress-barNoAfter-ful"
                  : "myProgress-barNoAfter"
              }
              style={{
                width: `${iTem.iTem4}%`
              }}
            ></div>
          </div>
        </div>
        <div className="col-2">
          <div className="myProgress b_radius_right">
            <div
              className={
                (ranking >= 80 && ranking <= 100) || ranking > 100
                  ? "myProgress-bar"
                  : "myProgress-barNoAfter-full"
              }
              style={{
                width: `${iTem.iTem5}%`
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

SelectRanking.prototype = {
  ranking: PropTypes.number
};

export default SelectRanking;
