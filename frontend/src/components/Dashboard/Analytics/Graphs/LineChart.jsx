import React, { useEffect, useState } from 'react'
import './LineChart.css'
import { Line } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { getClicks } from '../../../../Actions/Analytics.actions'

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
    },
    title: {
      display: true,
      // text: 'Line Chart',
    },
  },
};

const LineChart = ({urlHash, duration}) => {

  const { clicks } = useSelector(state => state.clicks);
  // console.log(clicks);

  const [labelInfo, setLabelInfo] = useState('');
  const [clickCount, setClickCount] = useState('');

  let labels = labelInfo;
  const data = {
    labels,
    datasets: [
      {
        label: 'Clicks',
        data: clickCount,
        // borderColor: 'rgb(255, 99, 132)',
        borderColor: 'cyan',
        borderWidth: 1,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0,
        // pointStyle: false,
      },
    ],
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClicks(urlHash, duration))
  }, [duration]);

  useEffect(() => {
    if (clicks) {
      console.log(clicks);
      let labels = Object.keys(clicks);
      let clickCount = Object.values(clicks);
      
      setLabelInfo(labels);
      setClickCount(clickCount);
    }
  },[clicks])


  return (
    <div className="canvas-div line" id="all_three_line-div d-inline-block">
      {
        clicks && Object.keys(clicks).length > 0 ? <Line options={options} data={data} /> : <h4 style={{"font-size":"1.6rem"}} className="text-center">Not enough data to track</h4>
      }
    </div>
  )
}

export default LineChart