export function configsFn(obj) {
  return {
    layout: {
      padding: 10
    },
    scales: {
      r: {
        grid: {
          circular: true
        },
        beginAtZero: true,
        pointLabels: {
          font: {
            size: 14
          },
          callback: (label) => {
            if (/\s/.test(label)) {
              return label.split(" ");
            } else {
              return label;
            }
          }
        },
        ticks: {
          display: true,
          stepSize: 1
        },
        suggestedMin: 0,
        suggestedMax: 10
      }
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14
          },
          pointStyle: "rect",
          usePointStyle: true
        },
        position: "right",
        align: "start",
        maxHeight: 100,
        fullSize: false
      },
      title: {
        text: obj?.name,
        display: true,
        font: {
          size: 24
        },
        color: "#282830",
        align: "center"
      },
      subtitle: {
        text: obj && `${obj?.positionName} | ${obj?.matching}% matching`,
        display: true,
        font: {
          size: 16
        },
        color: "#6a6b70",
        align: "center"
      }
    }
  };
}
