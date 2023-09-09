import React, { useEffect, useState } from 'react'
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

let DATA_COUNT = 0;

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      //   position: 'bottom',
    },
    title: {
      display: true,
      // text: 'Chart.js Pie Chart'
    }
  }
}
const PieChart = ({ analytics }) => {

  const [browserName, setBrowserName] = useState('');
  const [browserCount, setBrowserCount] = useState('');

  const labels = browserName;

  let data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: browserCount,
        backgroundColor: ['#633EBB', '#BE61CA', '#F2BC5E', '#F13C59', 'green', 'red'],
        hoverOffset: 4,
        borderWidth: 0,
        offset: true,
      }
    ]
  };

  useEffect(() => {
    if (analytics) {
      const { browser } = analytics;
      DATA_COUNT = browser.length;
      let newLabels = [];
      let newData = [];
      for (let i = 0; i < DATA_COUNT; i++) {
        newLabels.push(browser[i].name);
        newData.push(browser[i].count);
      }
      setBrowserName(newLabels);
      setBrowserCount(newData);
    }
  }, [analytics])

  return (
    <div className="canvas-div pie" id="all_three_pie-div d-inline-block">
      {
        analytics && analytics.browser.length > 0 ? <Pie options={options} data={data} />
          : <h4 style={{ "font-size": "1.6rem" }} className="text-center">Not enough data to track</h4>
      }
    </div>
  )
}

export default PieChart