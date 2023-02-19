import React,{useEffect, useState} from 'react'
import './PieChart.css'
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

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
        text: 'Chart.js Pie Chart'
      }
    }
  }
const PieChart = () => {

  const {analytics} = useSelector(state => state.analytics);

  const [browserName, setBrowserName] = useState('');
  const [browserCount, setBrowserCount] = useState('');

  const labels = browserName;

  let data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: browserCount,
        backgroundColor: ['cyan', 'purple', 'magenta', 'green', 'orange'],
        hoverOffset: 4,
        borderWidth: 0,
      }
    ]
  };

  useEffect(() => {
    if(analytics){
      const {browser} = analytics;
      // console.log(browser);
      // console.log(analytics.browser);
      DATA_COUNT = browser.length;
      let newLabels = [];
      let newData = [];
      for(let i=0; i<DATA_COUNT; i++){
          newLabels.push(browser[i].name);
          newData.push(browser[i].count);
      }
      setBrowserName(newLabels);
      setBrowserCount(newData);
    }
  },[analytics])

  return (
        <div className="canvas-div pie" id="all_three_pie-div d-inline-block">
            <Pie options={options} data={data} />
        </div>
  )
}

export default PieChart