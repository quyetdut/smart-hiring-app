import React, { useEffect, useState } from "react";
import "./Progress.scss";
import PropTypes from "prop-types";

export default function Progress({ percent }) {
  const [percentChild, setPercentChild] = useState({
    child1: 0,
    child2: 0,
    child3: 0,
    child4: 0
  });

  const handleProgress = () => {
    if (percent >= 0 && percent <= 25) {
      let result = (percent * 100) / 25;
      console.log(percent, result);
      setPercentChild({ child1: result, child2: 0, child3: 0, child4: 0 });
    }
    if (percent > 25 && percent <= 50) {
      let result = ((percent - 25) * 100) / 25;
      setPercentChild({ child1: 100, child2: result, child3: 0, child4: 0 });
    }
    if (percent > 50 && percent <= 75) {
      let result = ((percent - 50) * 100) / 25;
      setPercentChild({
        child1: 100,
        child2: 100,
        child3: result,
        child4: 0
      });
    }
    if (percent > 75 && percent <= 100) {
      let result = ((percent - 75) * 100) / 25;
      setPercentChild({
        child1: 100,
        child2: 100,
        child3: 100,
        child4: result
      });
    }
    if (percent > 100) {
      setPercentChild({
        child1: 100,
        child2: 100,
        child3: 100,
        child4: 100
      });
    }
  };

  useEffect(() => {
    handleProgress();
  }, [percent]);
  return (
    <div className="progressed">
      <div className="row">
        <div className="col-3">
          <div className="progressed-item">
            <div
              className="progressed-item-orange"
              style={{ width: `${percentChild.child1}%` }}
            >
              {percentChild.child2 === 0 &&
                percentChild.child3 === 0 &&
                percentChild.child4 === 0 &&
                percent >= 0 && <span>{percent}%</span>}
              {percent < 0 && <span>0%</span>}
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="progressed-item">
            <div
              className="progressed-item-orange"
              style={{ width: `${percentChild.child2}%` }}
            >
              {percentChild.child2 !== 0 &&
                percentChild.child3 === 0 &&
                percentChild.child4 === 0 && <span>{percent}%</span>}
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="progressed-item">
            <div
              className="progressed-item-orange"
              style={{ width: `${percentChild.child3}%` }}
            >
              {percentChild.child2 === 100 &&
                percentChild.child3 !== 0 &&
                percentChild.child4 === 0 && <span>{percent}%</span>}
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="progressed-item">
            <div
              className="progressed-item-orange"
              style={{ width: `${percentChild.child4}%` }}
            >
              {percentChild.child4 > 0 &&
                percentChild.child4 <= 100 &&
                percent <= 100 && <span>{percent}%</span>}
              {percent > 100 && <span>100%</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Progress.prototype = {
  percent: PropTypes.number.isRequired
};
