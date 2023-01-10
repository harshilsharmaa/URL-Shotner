import React from 'react'
import './PieChart.css'
import { Pie } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    ArcElement,
    Tooltip,
    Legend,
  } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DATA_COUNT = 5;


const data = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Grey'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [300, 50, 100],
        backgroundColor: ['cyan', 'purple', 'magenta', 'green', 'orange'],
        hoverOffset: 4,
        borderWidth: 0,
      }
    ]
  };


    const options = {
      responsive: true,
      plugins: {
        legend: {
            display: false,
        //   position: 'bottom',
        },
        title: {
          display: true,
          text: 'Chart.js Pie Chart'
        }
      }
    }
const PieChart = () => {
  return (
        <div className="canvas-div pie" id="all_three_pie-div d-inline-block">
            <Pie options={options} data={data} />
        </div>
  )
}

export default PieChart