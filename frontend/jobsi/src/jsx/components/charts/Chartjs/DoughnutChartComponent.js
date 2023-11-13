import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const DoughnutChartComponent = ({ strediskoCounts, strediskaGraf }) => { 
  console.log(strediskoCounts);
  const colors = ['#008A00', '#fcba03', '#808080', '#000000', 'red']; 
  const labels = Object.keys(strediskoCounts);
  const labelsWithoutThirdPosition = labels.slice(0, 2).concat(labels.slice(3));
  
  const dataPoints = Object.values(strediskoCounts);
  const dataPointsWithoutThirdPosition = dataPoints.slice(0, 2).concat(dataPoints.slice(3));

  const data = {
    labels: labelsWithoutThirdPosition,
    // borderRadius:10,
    datasets: [
      {
        data: dataPointsWithoutThirdPosition,
        backgroundColor: colors,
        // borderColor: colors,
        borderWidth: 0.1,
        
      },
    ],
  };

  const options = {
    // responsive: true,
    cutout: '50%',
    plugins: {
      datalabels: {
        color: '#fff',
        formatter: (value, context) => {
          return value;
        },
      },
      legend: {
        position: 'top',
         labels: {
        usePointStyle: true,
        // boxWidth: 10, 
        // padding: 10,
        // borderRadius: 10, 
      },
      },
      title: {
        display: false,
      
      },
    },
  };

  return <Doughnut data={data} options={options} plugins={[ChartDataLabels]} />;
  
};

export default DoughnutChartComponent;
