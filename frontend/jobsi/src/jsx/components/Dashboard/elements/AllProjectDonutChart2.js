import React, { useState,useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const AllProjectDonutChart2 = (props) => {
  const {strediskaGraf} = props
  // const [Rooms, setRooms] = useState([]);

  // useEffect(() => {
  //   // Вызов функции для загрузки данных при монтировании компонента
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(`/ubytovny.json?${Date.now()}`);
  //     const data = await response.json();
  //     setRooms(data);
  //   } catch (error) {
  //     console.error('Ошибка при загрузке данных:', error);
  //   }
    
  // };
  

const series = [strediskaGraf.length]

  const options = {
    chart: {
      type: "donut",
      width: 150,
    },
    colors: ["#3AC977", "var(--primary)", "var(--secondary)"],
    labels: ["Volno", "Obsazeno"],
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
                return w.globals.seriesTotals.reduce((a, b) => {
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

export default AllProjectDonutChart2;

