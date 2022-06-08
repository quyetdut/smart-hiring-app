import React from "react";
import { Button } from "react-bootstrap";

import "./NoneContent.scss";

const None = ({ handleAdd }) => {
  return (
    <div className="work-exper-none">
      <p className="work-exper-none-text">No work experiences yet !</p>
      <div className="work-exper-none-edit">
        <Button
          onClick={() => handleAdd()}
          className="work-exper-none-edit-btn"
          color="info"
        >
          <span>+ &nbsp;&nbsp; Add more</span>
        </Button>
      </div>
    </div>
  );
};

export default None;
