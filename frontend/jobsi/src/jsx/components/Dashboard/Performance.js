import React,{useContext, useEffect, useState} from 'react';

//Import Components
import MainPagetitle from '../../layouts/MainPagetitle';
import EmployeesTableList from './elements/EmployeesTableList';
import AllProjectDonutChart from './elements/AllProjectDonutChart';
import AllProjectDonutChart2 from './elements/AllProjectDonutChart2';
import HostelsTableList from './elements/HostelsTableList';
import TovarnyTableList from './elements/TovarnyTableList';
import ProjectStatusBlog from '../Dashboard/elements/ProjectStatusBlog';
import Projects from '../Dashboard/Projects';

 

const Performance = () => {  
    const [employesNoWork, setEmployesNoWork] = useState([]);
    const [employesWork, setEmployesWork] = useState([]);
    const [employesAll, setEmployesAll] = useState([]);
    const [strediskaGraf, setStrediskaGraf] = useState([]);
    const [strediskoCounts, setStrediskoCounts] = useState({});
    const [employesNoLive, setEmployesNoLive] = useState([]);
    const [employesLive, setEmployesLive] = useState([]);
    const [countEmployes, setcountEmployes] = useState([]);
    
  
    useEffect(() => {
      fetchDataSetEmp();
      fetchDataSetTovarny();
    }, []);
  
    useEffect(() => {
      
      const updatedCounts = {};
      employesAll.forEach((employee) => {
        const stredisko = employee.stredisko;
        updatedCounts[stredisko] = (updatedCounts[stredisko] || 0) + 1;
      });
      console.log('employesAll', updatedCounts);
      setStrediskoCounts(updatedCounts);
    }, [employesAll, strediskaGraf]);
  
    const fetchDataSetEmp = async () => {
      try {
        const response = await fetch(`/file.json?${Date.now()}`);
        const data = await response.json();
        setEmployesAll(data);
        
  
        let countStrediskoWithDash = 0;

        for (const entry of data) {
          if (entry["stredisko"] === "-") {
            countStrediskoWithDash++;
          }
        }

        const totalCount = data.length;
  
        let EmpWork = totalCount - countStrediskoWithDash;
        setEmployesWork(EmpWork);
        setEmployesNoWork(countStrediskoWithDash);

        let count = 0;

        for (const item of data) {
          if (item.room !== "-" && item.room !== null && item.room !== undefined) {
            count++;
          } 
        }

        setEmployesLive(count);

        
        const noLive = totalCount - count ;
        
        setEmployesNoLive(noLive);
        

      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };
  
    const fetchDataSetTovarny = async () => {
      try {
        const response = await fetch(`/tovarny.json?${Date.now()}`);
        const data = await response.json();
        setStrediskaGraf(data);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };



return(
    <>			
        <MainPagetitle mainTitle="Reports" pageTitle="Reports" parentTitle="Perfomance"  />
        <div className="container-fluid">
  <div className="container-new"> 
  <div className="col-xl-3 col-sm-6 col-height">
            <div className="card same-card">
                <div className="card-body d-flex align-items-center  py-2">                        
                    <AllProjectDonutChart
                    employesWork={employesWork}
                    employesNoWork={employesNoWork}
                    employesLive={employesLive}
                    employesNoLive={employesNoLive}
                    employesAll={employesAll}
                     />
                    <ul className="project-list">
                        <li><h6>Workers</h6></li>
                        <li>
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="10" height="10" rx="3" fill="#3AC977"/>
                            </svg>{" "}
                            Pracuje - {employesWork}
                        </li>
                        <li>
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="10" height="10" rx="3" fill="var(--primary)"/>
                            </svg>{" "}
                            Nepracuje - {employesNoWork}
                        </li>
                        <li>
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="10" height="10" rx="3" fill="green"/>
                            </svg>{" "}
                            Ubytovano - {employesLive}
                        </li>
                        <li>
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="10" height="10" rx="3" fill="#0043c1"/>
                            </svg>{" "}
                            Neubytovano - {employesNoLive}
                        </li>
                    </ul>
                </div>
            </div>


         
       <ProjectStatusBlog 
       strediskaGraf={strediskaGraf}
       strediskoCounts={strediskoCounts}
       />
       

        </div>
         <div className="col-xl-9">
        <Projects />
        </div> 
                    
        </div>
							
        </div>			
    </>
)
}
export default Performance;