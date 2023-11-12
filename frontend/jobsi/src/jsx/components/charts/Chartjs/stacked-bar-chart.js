import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import Chart from 'chart.js/auto'; // Import Chart


const StackedBarChart = () => {
  const [ubytovny, setUbytovny] = useState([]);
  const [Rooms, setRooms] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchDataClients();
    fetchDataRooms();
    
  }, []);

  const fetchDataRooms = async () => {
    try {
      const response = await fetch(`/pokoje.json?${Date.now()}`);
      const data = await response.json();
    
      setRooms(data);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };

  const fetchDataClients = async () => {
    try {
      const response = await fetch(`/file.json?${Date.now()}`);
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };


  const hostelBedInfo = {};
  Rooms.forEach((room) => {
    const { ubytovna, quantity } = room;
    if (!hostelBedInfo[ubytovna]) {
      hostelBedInfo[ubytovna] = {
        totalBeds: 0,
        occupiedBeds: 0,
      };
    }
    hostelBedInfo[ubytovna].totalBeds += parseInt(quantity, 10);
  });


  clients.forEach((client) => {
    const { ubytovna, room } = client;
    if (hostelBedInfo[ubytovna] && room !== '-' && room !== null) {
      hostelBedInfo[ubytovna].occupiedBeds += 1;
    }
  });

  function getRandomBackgroundColor() {
        
          const red = Math.floor(Math.random() * 51 + 205); 
    const green = Math.floor(Math.random() * 51 + 205); 
    const blue = Math.floor(Math.random() * 51 + 205);
        
          return `rgb(${red},${green},${blue})`;
        }
useEffect(() => {
  const fetchUbytovny = async () => {
    try {
      const response = await fetch(`/ubytovny.json?${Date.now()}`);
      const data = await response.json();

      // Create an array to hold the names
      const names = data.map(element => element.name);

      // Update the state with all names
      setUbytovny(names);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };

  fetchUbytovny();
}, []);
const totalBedsData = ubytovny.map(name => hostelBedInfo[name]?.totalBeds || 0);
const occupiedBedsData = ubytovny.map(name => hostelBedInfo[name]?.occupiedBeds || 0);
const availableBedsData = ubytovny.map(name => (hostelBedInfo[name]?.totalBeds || 0) - (hostelBedInfo[name]?.occupiedBeds || 0));
const whiteBackgroundPlugin = {
  id: 'whiteBackground',
  beforeDraw: (chart) => {
    const ctx = chart.ctx;
    ctx.save();
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
};


const data = {
  labels: ubytovny,
  datasets: [
    {
      label: 'available Beds',
      data: availableBedsData,
      backgroundColor: 'rgba(0, 255, 0, 0.5)', // Green
    },
    // {
    //   label: 'Occupied Beds',
    //   data: occupiedBedsData,
    //   backgroundColor: 'rgba(255, 165, 0, 0.5)', // Orange
    // },
    {
      label: 'occupied Beds',
      data: occupiedBedsData,
      backgroundColor: 'rgba(255, 0, 0, 0.5)', // Red
    },
  ],
};
const containerStyles = {
  width: '100%', // Adjust the width as needed
  height: '500px', // Adjust the height as needed
  overflow: 'auto', // This enables scrolling
};

// Optionally, adjust the chart's size based on the data
let chartWidth = '100%';
let chartHeight = '100%';
if (data.length > 20) {
  chartWidth = '200%'; // Example: make the chart wider for horizontal scrolling
  // chartHeight = '200%'; // Uncomment for vertical scrolling
}
  const options = {
  
    scales: {
      y: {
        stacked: true,
        ticks: {
          beginAtZero: true,
          callback: function(value, index, values) {
            return value; // Convert the number to a string and add a '%' sign
          }
        }
      },
      x: {
        stacked: true
      }
    },
    plugins: {
      // legend: {
      //   display: true,
      // },
      title: {
        display: true,
        text: 'Hotels',
      },
    },
    
  };
  return (

  <>
    <div className='header'>
      <h1 className='title'>Revenue Flow</h1>
    </div>
    <Bar data={data} options={options}  style={{ backgroundColor:"#fff" , padding:"10px", borderRadius:"20px"}}/>
  </>
)};

export default StackedBarChart;
