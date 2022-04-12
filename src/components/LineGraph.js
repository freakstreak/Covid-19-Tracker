import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";


function LineGraph(props) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
  };
  const labels = props.label

  const data = {
    labels,
    datasets: [
      {
        label: "Number of Cases",
        data: props.yAxis,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      }      
    ]
  };

  return (
    <div
        style={{
            width:'600px',
            
            margin:'50px auto'
            }}>
    <p>Toll</p>
      <Line data={data} options={options} />
    </div>
  );
}

export default LineGraph;
