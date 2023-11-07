import React from "react";
import ReactApexChart from "react-apexcharts";


// const AllProjectDonutChart = (props) => {

  function AllProjectDonutChart({employesWork, employesNoWork, employesLive, employesNoLive, employesAll}) {


  // const {employesWork, employesNoWork, employesLive, employesNoLive} = props;
  
  
const series = [employesWork,employesNoWork, employesLive, employesNoLive]


  const options = {
    chart: {
      type: "donut",
      width: 150,
    },
    colors: ["#3AC977", "var(--primary)", "#008000", "#0043c1"],
    labels: ["Pracuje", "Ne pracuje", "Ubytovano", "Ne ubytovano"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "80%",
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: 12,
            },
            value: {
              show: true,
              fontSize: "22px",
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
              color: "var(--primary)",
              formatter: function (w) {
                const firstTwoValues = w.globals.seriesTotals.slice(0, 2); // Выбираем первые два элемента из series
                return firstTwoValues.reduce((a, b) => {
                  return a + b;
                }, 0);
              },
            },
          },
        },
      },
    },
  };

  return (
    <div id="AllProject">
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        width={150}
      />
    </div>
  );
};

export default AllProjectDonutChart;


