import React from 'react'
import './LineChart.css'
import { Line } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

 
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  export const options = {
    responsive: true,
    maintainAspectRatio: false,
    spanGaps: true,
    plugins: {
      legend: {
        display: false,
        // position: 'top',
      },
      title: {
        display: true,
        text: 'Line Chart',
      },
    },
  };

const LineChart = () => {

    let labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const data = {
        labels,
        datasets: [
          {
            label: 'Temperature',
            data: [32,43,54,34,43,28,19,10,49,31],
            // borderColor: 'rgb(255, 99, 132)',
            borderColor: 'cyan',
            borderWidth: 1,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            tension: 0,
          },
        ],
      };

    return (
        <div className="canvas-div line" id="all_three_line-div d-inline-block"> 
            <Line  options={options} data={data} />
        </div>
    )
}

export default LineChart