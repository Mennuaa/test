import React from "react";
import ReactApexChart from "react-apexcharts";

function ProjectStatusBlogDonutChart({strediskoCounts, strediskaGraf}) {

  const labels = Object.keys(strediskoCounts);
  const labelsWithoutThirdPosition = labels.slice(0, 2).concat(labels.slice(3));

  const series = Object.values(strediskoCounts);
  const seriesWithoutThirdPosition = series.slice(0, 2).concat(series.slice(3));

  // const labels = ['b','2','3','4','5','6','7','8','a'];
  // const series = [1,2,3,4,5,6,7,8,9];

  // console.log('labels',labels);
  // console.log('labels', labelsWithoutThirdPosition);
  // console.log('series',series);
  // console.log('series',seriesWithoutThirdPosition);

  const options = {
    chart: {
      type: "donut",
      width: 250,
    },
    colors: ['#008A00',
    '#FF0000',
    '#0000FF',
    '#000000',
    '#FF00FF',
    '#00BCBC',
    '#E98C01',
    '#0015BE',
    '#0099FF',
    '#9900FF',
    '#3AC977',
    '#00975B',
    '#FF6600',
    '#00FF66',
    '#6600FF',
    '#FF0066',
    '#66FF00',
    '#0066FF',
    '#FF3300',
    '#0033FF'
    ],
    labels: labelsWithoutThirdPosition,
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "90%",
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: 12,
            },
            value: {
              show: true,
              fontSize: "24px",
              fontFamily: "Arial",
              fontWeight: "500",
              offsetY: -17,
            },
            total: {
              show: true,
              fontSize: "11px",
              fontWeight: "500",
              fontFamily: "Arial",
              label: "Celkem",
              // formatter: function (w) {
              //   return w.globals.seriesTotals.reduce((a, b) => {
              //     return strediskaGraf.length;
              //   }, 0);
              // },
              formatter: function () {
                return strediskaGraf.length;
              },
            },
          },
        },
      },
    },
  };

//   document.addEventListener("DOMContentLoaded", () => {
  
//   setTimeout(() => {

  
//   const projectDates = document.querySelectorAll('.project-date .project-media');
//   const lengthDates = projectDates.length;
//   const toChangeClass = document.querySelectorAll('#SvgjsText1213');
//   toChangeClass.textContent = lengthDates;
// },3000);
//   });

  return (
    <div id="projectChart" className="project-chart">
      <ReactApexChart
        options={options}
        series={seriesWithoutThirdPosition}
        type="donut"
        width={250}
      />
    </div>
  );
}

export default ProjectStatusBlogDonutChart;
