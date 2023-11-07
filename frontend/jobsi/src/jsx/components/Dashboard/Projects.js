import React, { useState, useEffect } from 'react';
import MainPagetitle from '../../layouts/MainPagetitle';
import { SVGICON } from '../../constant/theme';
import CountUp from 'react-countup';


const Projects = () => {   

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

  return (
    <>
        <MainPagetitle mainTitle="Hostels" pageTitle="Hostels"  parentTitle="Home" />
        <div className="container-fluid noPaddings">
            <div className="row">
            {Object.keys(hostelBedInfo).map((ubytovna) => (                    
                    <div className="col-xl-4" key={ubytovna}>
                        <div className="card box-hover">
                            <div className="card-body">
                            <div className="icon-box icon-box-lg rounded-circle" style={{ backgroundColor: getRandomBackgroundColor() }}>
                                       {SVGICON.Home}
                                       
                                    </div>
                                <div className="d-flex align-items-center">
                                
                                    <div className="total-projects ms-3"> 
                                        <p>Lůžka:</p>                                       
                                        <CountUp  className={`project-counter count text-`} end={hostelBedInfo[ubytovna].totalBeds} duration="5"/>                                            
                                        
                                        
                                    </div>
                                    <div className="total-projects ms-3"> 
                                        <p>obsazeno:</p>                                       
                                        <CountUp  className={`project-counter count text-`} end={hostelBedInfo[ubytovna].occupiedBeds} duration="5"/>                                            
                                        
                                        
                                    </div>
                                    <div className="total-projects ms-3"> 
                                        <p>volno:</p>                                       
                                        <CountUp  className={`project-counter count text-`} end={hostelBedInfo[ubytovna].totalBeds - hostelBedInfo[ubytovna].occupiedBeds} duration="5"/>                                            
                                        
                                        
                                    </div>
                                </div>
                               
                            </div>
                            <h6>{ubytovna}</h6>
                        </div>
                    </div>
                ))}
                </div>
                    </div>
    </>
);
};

export default Projects;

