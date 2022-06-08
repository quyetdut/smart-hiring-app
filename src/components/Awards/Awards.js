import React from "react";

import "./Awards.scss";
import human from "assets/images/human.svg";
import award2 from "assets/images/award-2.png";
import arrow from "assets/images/arrow.svg";
import chart from "assets/images/chart.svg";

const Awards = () => {
  return (
    <div className="awards-section">
      <div className="awards-header">
        <div className="awards-header-title">Awards</div>
        <div className="awards-header-count">0</div>
      </div>
      <div className="awards-content ">
        <div className="award-wrapper row row-cols-2 g-4">
          <div className="col">
            <div className="award-item">
              <div className="img-award one">
                <img src={human} alt="human" />
              </div>
              <div className="award-title">Always Thougthful</div>
              <div className="award-count">0 award yet</div>
            </div>
          </div>
          <div className="col">
            <div className="award-item">
              <div className="img-award two">
                <img src={award2} alt="award2" />
              </div>
              <div className="award-title">Confidently Collaborative</div>
              <div className="award-count">0 award yet</div>
            </div>
          </div>
          <div className="col">
            <div className="award-item">
              <div className="img-award three">
                <img src={arrow} alt="arrow" />
              </div>
              <div className="award-title">Constantly Adapting</div>
              <div className="award-count">0 award yet</div>
            </div>
          </div>
          <div className="col">
            <div className="award-item">
              <div className="img-award four">
                <img src={chart} alt="chart" />
              </div>
              <div className="award-title">Responsibly Progressive</div>
              <div className="award-count">0 award yet</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Awards;
