import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const DoughnutChartComponent = ({ strediskoCounts, strediskaGraf }) => {
  // Ensure the colors array has unique colors for each section of the doughnut chart
  console.log(strediskoCounts);
  const colors = ['#008A00', '#fcba03', '#808080', '#000000', 'red']; // Adjust these colors as needed
  
  const labels = Object.keys(strediskoCounts);
  // Assuming you want to remove the third item from the data
  const labelsWithoutThirdPosition = labels.slice(0, 2).concat(labels.slice(3));
  
  const dataPoints = Object.values(strediskoCounts);
  // Same assumption here for the data points
  const dataPointsWithoutThirdPosition = dataPoints.slice(0, 2).concat(dataPoints.slice(3));

  const data = {
    labels: labelsWithoutThirdPosition,
    datasets: [
      {
        data: dataPointsWithoutThirdPosition,
        backgroundColor: colors, // This should be the same length as the number of data points
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
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
      },
      title: {
        display: true,
        text: 'Doughnut Chart',
      },
    },
  };

  return <Doughnut data={data} options={options} plugins={[ChartDataLabels]} />;
  
};

export default DoughnutChartComponent;
