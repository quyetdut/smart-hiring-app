import React, { useEffect, useState } from "react";
import "./CrossTime.scss";

const CrossTime = (props) => {
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const convertDate = (date) => {
    const temp = date.split("/");
    return temp[0] + "/" + temp[2];
  };

  useEffect(() => {
    setStartAt(convertDate(props.fromTime));
    setEndAt(convertDate(props.fromTime));
  }, [props]);

  return (
    <div className="crosstime">
      <div className="crosstime-to">
        {endAt !== "None/undefined" ? endAt : "Present"}
      </div>
      <div className="crosstime-cross">
        <div className="crosstime-cross-circle" />
      </div>
      <div className="crosstime-from">
        {startAt !== "None/undefined" ? startAt : "None"}
      </div>
    </div>
  );
};

export default CrossTime;
