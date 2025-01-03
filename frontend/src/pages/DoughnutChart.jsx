import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ value1, value2 }) => {
  const percentage = (value1 / value2) * 100;

  // Doughnut chart data
  const data = {
    labels: ["Percentage", "Remaining"],
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ["#3B82F6", "#909090"],
        borderWidth: [1,1],
      },
    ]

  };

  const options = {
    responsive: true,
    cutout: "70%",
    plugins: {
      tooltip: {
        enabled: false, // Disable tooltip
      },
      legend: {
        display: false, // Hide legend
      },
      datalabels: {
        display: true,
        color: "#000",
        font: {
          weight: "bold",
          size: 24,
        },
        formatter: (value) => `${Math.round(value)}%`, // Format to show percentage
      },
    },
  };

  return (
    <div style={{ width: "300px", height: "300px" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
