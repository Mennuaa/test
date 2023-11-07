import React, { useEffect, useState } from 'react';
import { SVGICON } from '../../../src/jsx/constant/theme';

const Graf1 = () => {
    console.log("RE-RE");
  
    // START Luzka graf
    const [totalQuantity1, settotalQuantity1] = useState(0);
    const [Obsazenost, setObsazenost] = useState([]);
    const [progressWidth, setProgressWidth] = useState(0);

    useEffect(() => {
        const fetchDataGraf1 = async () => {
          try {
            const response1 = await fetch(`/pokoje.json?${Date.now()}`);
            const data1 = await response1.json();
            let sum = 0;
            data1.forEach(item => {
                sum += parseInt(item.quantity);
              });
              settotalQuantity1(sum);

            const response2 = await fetch(`/file.json?${Date.now()}`);
            const data2 = await response2.json();
            const roomCount = data2.filter(item => item.room).length;
            setObsazenost(roomCount);
      
          } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
          }
        };
      
        fetchDataGraf1();

      
      }, []);
      
      useEffect(() => {
      const percentage = (Obsazenost / totalQuantity1) * 100;
        setProgressWidth(percentage);
    }, [Obsazenost,totalQuantity1]);
  
    // END Luzka graf
  
  return(
    <div className="card">
    <div className="card-body depostit-card">
        <div className="depostit-card-media d-flex justify-content-between style-1">
            <div>
                <h6>Lůžka</h6>
                <h3>{totalQuantity1}</h3>
            </div>
            <div className="icon-box bg-primary-light">
                {SVGICON.HomeSvg}
            </div>
        </div>
        <div className="progress-box mt-0">
            <div className="d-flex justify-content-between">
                <p className="mb-0">Obsazenost:</p>
                <p className="mb-0">{Obsazenost}/{totalQuantity1}</p>
            </div>
            <div className="progress">
                <div className="progress-bar bg-primary" style={{width:`${progressWidth}%`, height:"5px", borderRadius:"4px"}} ></div>
            </div>
        </div>
    </div>
</div>

	)
}
export default Graf1;