import React from "react";

import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  ResponsiveContainer,
  Label
} from "recharts";

import Line1 from "assets/icons/line1.svg";
import Line2 from "assets/icons/line2.svg";
import Line3 from "assets/icons/line3.svg";
import Line4 from "assets/icons/line4.svg";

import "./BurndownChart.scss";

const data = [
  {
    day: "day 1",
    uv: 240,
    pv: 225,
    amt: 22.5,
    bar: 0
  },
  {
    day: "day 2",
    uv: 240,
    pv: 220,
    amt: 22.5 - 1.0,
    bar: 0
  },
  {
    day: "day 3",
    uv: 240,
    pv: 210,
    amt: 22.5 - 2.0,
    bar: 0
  },
  {
    day: "day 4",
    uv: 225,
    pv: 190,
    amt: 22.5 - 3.0,
    bar: 10
  },
  {
    day: "day 5",
    uv: 210,
    pv: 180,
    amt: 22.5 - 4.0,
    bar: 0
  },
  {
    day: "day 6",
    uv: 210,
    pv: 205,
    amt: 22.5 - 5.0,
    bar: 10
  },
  {
    day: "day 7",
    uv: 210,
    pv: 203,
    amt: 22.5 - 6.0,
    bar: 0
  },
  {
    day: "day 8",
    uv: 180,
    pv: 180,
    amt: 22.5 - 7.0,
    bar: 30
  },
  {
    day: "day 9",
    uv: 180,
    pv: 175,
    amt: 22.5 - 8.0,
    bar: 0
  },
  {
    day: "day 10",
    uv: 180,
    pv: 140,
    amt: 22.5 - 9.0,
    bar: 0
  },
  {
    day: "day 11",
    uv: 150,
    pv: 100,
    amt: 22.5 - 10.0,
    bar: 40
  },
  {
    day: "day 12",
    uv: 125,
    pv: 80,
    amt: 22.5 - 11.0,
    bar: 20
  },
  {
    day: "day 13",
    uv: 120,
    pv: 75,
    amt: 22.5 - 12.0,
    bar: 10
  },
  {
    day: "day 14",
    uv: 120,
    pv: 60,
    amt: 22.5 - 13.0,
    bar: 0
  },
  {
    day: "day 15",
    uv: 100,
    pv: 55,
    amt: 22.5 - 14.0,
    bar: 20
  },
  {
    day: "day 16",
    uv: 90,
    pv: 50,
    amt: 22.5 - 15.0,
    bar: 10
  },
  {
    day: "day 17",
    uv: 80,
    pv: 48,
    amt: 22.5 - 16.0,
    bar: 10
  },
  {
    day: "day 18",
    uv: 70,
    pv: 25,
    amt: 22.5 - 17.0,
    bar: 20
  },
  {
    day: "day 19",
    uv: 50,
    pv: 20,
    amt: 22.5 - 18.0,
    bar: 10
  },
  {
    day: "day 20",
    uv: 40,
    pv: 5,
    amt: 22.5 - 19.0,
    bar: 30
  },
  {
    day: "day 21",
    uv: 0,
    pv: 0,
    amt: 22.5 - 20.0,
    bar: 20
  }
];

const CustomizedDot = (props) => {
  const { cx, cy } = props;
  return (
    <svg
      width={15}
      height={15}
      x={cx - 10}
      y={cy - 9}
      viewBox="0 0 30 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.954056"
        y="14.6465"
        width="20"
        height="20"
        transform="rotate(-45 0.954056 14.6465)"
        fill="#4472C4"
      />
    </svg>
  );
};

const BurndownChart = () => {
  return (
    <div className="burndownChart">
      <div className="titleWrapper">
        <div className="title">Sample Burndown Chart</div>
      </div>
      <div className="chartWrapper">
        <div className="chartContent">
          <div className="chart">
            <ResponsiveContainer width="99%" height={300}>
              <ComposedChart data={data}>
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" tickCount={6}>
                  <Label
                    value="Remaining effort (hours)"
                    position="insideLeft"
                    angle={-90}
                    style={{
                      textAnchor: "middle",
                      fontSize: "90%",
                      fill: "rgba(0, 0, 0, 0.87)"
                    }}
                  />
                </YAxis>
                <YAxis yAxisId="right" tickCount={6} orientation="right">
                  <Label
                    value="Remaining and completed tasks"
                    position="insideRight"
                    angle={-90}
                    style={{
                      textAnchor: "middle",
                      fontSize: "90%",
                      fill: "rgba(0, 0, 0, 0.87)"
                    }}
                  />
                </YAxis>
                <Tooltip />
                <CartesianGrid />
                <Bar yAxisId="left" dataKey="bar" barSize={15} fill="#FFC000" />
                <Line
                  yAxisId="left"
                  dataKey="uv"
                  stroke="#9DC3E6"
                  strokeWidth={4}
                  dot={false}
                />
                <Line
                  yAxisId="left"
                  dataKey="pv"
                  stroke="#4472C4"
                  strokeWidth={4}
                  dot={<CustomizedDot />}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="amt"
                  strokeWidth={4}
                  dot={false}
                  stroke="#548235"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="legend">
          <div className="line">
            <img src={Line3} />
            <div className="legendText">Completed tasks</div>
          </div>
          <div className="line">
            <img src={Line1} className="bar" />
            <div className="legendText">Remaining effort</div>
          </div>
          <div className="line">
            <img src={Line2} />
            <div className="legendText">Ideal burndown</div>
          </div>
          <div className="line">
            <img src={Line4} />
            <div className="legendText">Remaining tasks</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurndownChart;
