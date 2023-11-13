import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import './stacked-bar-chart.css';
import Chart from 'chart.js/auto'; // Import Chart


const StackedBarChart = () => {
  const [ubytovny, setUbytovny] = useState([]);
  const [Rooms, setRooms] = useState([]);
  const [clients, setClients] = useState([]);
  const [chartHeight, setChartHeight] = useState('500px'); // Default height
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) { // Assuming 768px as a breakpoint for mobile devices
        setChartHeight('300px'); // Adjust this value as needed for mobile
      } else {
        setChartHeight('500px'); // Default height for non-mobile devices
      }
    };
  
    // Call handleResize on component mount and add event listener for resize
    handleResize();
    // window.addEventListener('resize', handleResize);
  
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  
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

  const sortByTotalBeds = () => {
    ubytovny.sort((a, b) => {
      const totalBedsA = (hostelBedInfo[a]?.totalBeds || 0);
      const totalBedsB = (hostelBedInfo[b]?.totalBeds || 0);
      return totalBedsB - totalBedsA; // Sort in descending order
    });
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
      const sortedData = data.sort((a, b) => {
        const totalBedsA = (hostelBedInfo[a.name]?.totalBeds || 0);
        const totalBedsB = (hostelBedInfo[b.name]?.totalBeds || 0);
        return totalBedsB - totalBedsA; // Sort in descending order
      });

      // Extract the names after sorting
      const names = sortedData.map(element => element.name);

      // Update the state with all names
      setUbytovny(names);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };
  sortByTotalBeds();

  fetchUbytovny();
}, []);

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



const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 6; 
const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentUbytovny = ubytovny.slice(indexOfFirstItem, indexOfLastItem);
const occupiedBedsData = currentUbytovny.map(name => hostelBedInfo[name]?.occupiedBeds || 0);
const availableBedsData = currentUbytovny.map(name => 
  (hostelBedInfo[name]?.totalBeds || 0) - (hostelBedInfo[name]?.occupiedBeds || 0)
);
const data = {
  labels: currentUbytovny,
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

  const options = {
    maintainAspectRatio: false,
    // responsive:true,
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
  
    <div>
  <div className="pagination-container"  >
  <div className="chartBox">
  <Bar data={data} options={options}  style={{ backgroundColor:"#fff", padding:"10px", borderRadius:"10px" }}/>

  </div>
  
  </div >
  <div className="buttons">
  <button 
      onClick={() => handlePageChange(1)}
      className={`pagination-button ${currentPage === 1 ? 'active' : ''}`}
    >
      First
    </button>
    {Array.from({ length: Math.ceil(ubytovny.length / itemsPerPage) }, (_, i) => (
      <button 
        key={i} 
        onClick={() => handlePageChange(i + 1)}
        className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
      >
        {i + 1}
      </button>
    ))}
    <button 
      onClick={() => handlePageChange(Math.ceil(ubytovny.length / itemsPerPage))}
      className={`pagination-button ${currentPage === Math.ceil(ubytovny.length / itemsPerPage) ? 'active' : ''}`}
    >
      Last
    </button>
  </div>
</div>

  </>
)};

export default StackedBarChart;
