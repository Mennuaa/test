import React, { useEffect, useState } from 'react';
import { SVGICON } from './theme';

const Graf2 = () => {
    console.log("RE2-RE2");
  
    // START Luzka graf
    const [Rooms5s, setRooms5s] = useState([]);
	const [Obsazenosts, setObsazenosts] = useState([]);
	const [progressWidths, setprogressWidths] = useState(0);
	const [pokoje, setPokoje] = useState([]);
	const [roomOccupancy, setRoomOccupancy] = useState({});
    const [totalOccupiedRooms5, setTotalOccupiedRooms5] = useState(0);


    useEffect(() => {
        const fetchDataGraf2 = async () => {
          const roomQuantities = {}; // Словарь для хранения максимального количества кроватей в комнате
          const roomOccupied = {};   // Словарь для хранения количества занятых кроватей в комнате
          let totalOccupied = 0;
          
          try {
            const response = await fetch(`/pokoje.json?${Date.now()}`);
            const data = await response.json();
            setRooms5s(data);
            data.forEach(room => {
              roomQuantities[room.id] = parseInt(room.quantity);
              roomOccupied[room.id] = 0;
            });
            setRoomOccupancy(roomOccupied);

            const response2 = await fetch(`/file.json?${Date.now()}`);
            const data2 = await response2.json();


            data2.forEach(person => {
              if (person.room && roomQuantities[person.room]) {
                roomOccupied[person.room]++;
                if (roomOccupied[person.room] === roomQuantities[person.room]) {
                  totalOccupied++;
                }
              }
            });

            setTotalOccupiedRooms5(totalOccupied);

          } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
          }
        };
      
        fetchDataGraf2();

      
      }, []);
      
      useEffect(() => {
        const percentage2 = (totalOccupiedRooms5 / Rooms5s.length) * 100;
        setprogressWidths(percentage2);
        }, [totalOccupiedRooms5,Rooms5s]);

  
    // END Luzka graf
  
  return(
    <div className="card">
                    <div className="card-body depostit-card">
                        <div className="depostit-card-media d-flex justify-content-between style-1">
                            <div>
                                <h6>Rooms</h6>
                                <h3>{Rooms5s.length}</h3>
                            </div>
                            <div className="icon-box bg-primary-light">
                                {SVGICON.HomeSvg}
                            </div>
                        </div>
                        <div className="progress-box mt-0">
                            <div className="d-flex justify-content-between">
                                <p className="mb-0">Obsazenost:</p>
                                <p className="mb-0">{totalOccupiedRooms5}/{Rooms5s.length}</p>
                            </div>
                            <div className="progress">
                                <div className="progress-bar bg-primary" style={{width:`${progressWidths}%`, height:"5px", borderRadius:"4px"}} ></div>
                            </div>
                        </div>
                    </div>
                </div> 

	)
}
export default Graf2;