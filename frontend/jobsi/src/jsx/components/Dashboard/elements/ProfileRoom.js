import React, {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import RoomsOffcanvas from '../../../constant/RoomHostelsOffcanvas'; 
import EmployeeToRoomOffcanvas from '../../../constant/EmployeeToRoomOffcanvas';
import CheckOutOffcanvas from '../../../constant/CheckOutOffcanvas';
import { useSelector } from 'react-redux';




const ProfileRoom = () => {
    const hostelData = useSelector((state) => state.hostel.hostelData);
    const RoomData = useSelector((state) => state.room.roomData);
    const [dataUpdateTrigger, setDataUpdateTrigger] = useState(false);
    const [selectedRoom, setselectedRoom] = useState(null);
    const room = useRef();   
    const editRoom = useRef();
    const addEmpToRoom = useRef();
    const checkOut = useRef();
    const [Rooms, setRooms] = useState([]);
    const [employeesInRoom, setEmployeesInRoom] = useState([]);
    const [hostels, setHostels] = useState([]);
console.log('RoomData', RoomData);
console.log('RoomData.id', RoomData.id);
console.log('hostelData', hostelData);
console.log('hostelData.name', hostelData.name);
  useEffect(() => {
    fetchDataInRoom();
  }, []);

  

  const fetchDataInRoom = async () => {
    try {
      const response = await fetch(`/file.json?${Date.now()}`);
      const data = await response.json();
  

      const employeesInRoom = data.filter((client) => {
        return client.ubytovna === hostelData.name && client.room === RoomData.id;
      });

      console.log('employeesInRoom', employeesInRoom);
   
      setEmployeesInRoom(employeesInRoom);
  
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };
  
  

  useEffect(() => {
    fetchDataInRoom()
  }, [dataUpdateTrigger]);



  const handleCheckOutEmployee = async (name) => {
    try {
      
      const response = await fetch('/checkOut_inRoom.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
  
      
      if (!response.ok) {
        console.log('Не удалось удалить данные на сервере');
        throw new Error('Не удалось удалить данные на сервере');
      }
  
      
      fetchDataInRoom();
    } catch (error) {
      console.error('Ошибка при удалении комнаты:', error);
    }
  };
  
  function createDeletingPopUpInRoom(name) {
    
    var overlay = document.createElement("div");
    overlay.className = "overlay";
  
    
    var popup = document.createElement("div");
    popup.className = "popup"; 

    var buttonspopup = document.createElement("div");
    buttonspopup.className = "buttonspopup";
  
    
    var text = document.createElement("p");
    text.textContent = "Opravdu chcete pokoj trvale smazat ?";

    var logoPoUp = document.createElement("img");
    logoPoUp.src = '/static/media/Logo%20OWB%20website.f8178ceeb0449f70be9f.png';
    logoPoUp.classList.add('logoPoUp');
    
    var yesButton = document.createElement("button");  
    yesButton.classList.add('btn', 'btn-primary');
    yesButton.textContent = "Ano";
    yesButton.addEventListener("click", function () {
      //  удаление
      handleCheckOutEmployee(name);
      closePopUp(overlay, popup);
    });
  
    
    var cancelButton = document.createElement("button"); 
    cancelButton.classList.add('btn', 'btn-danger', 'shadow');
    cancelButton.textContent = "Zrušit";
    cancelButton.addEventListener("click", function () {
      closePopUp(overlay, popup);
    });
  
    
    popup.appendChild(logoPoUp);
    popup.appendChild(text);
    buttonspopup.appendChild(yesButton);
    buttonspopup.appendChild(cancelButton);
    popup.appendChild(buttonspopup);
    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    setTimeout(() => {
      
    },20000);

  }
  
  function closePopUp(overlay, popup) {
    overlay.remove();
    popup.remove();
    
  }
  
    return (
        <>
            <div className="card">            
                <div className="card-body p-0">
                    <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">   
                        <div className="tbl-caption">
                          <div style={{ display: 'flex' }}>
                            <h4 className="heading mb-0" style={{ marginRight: '20px' }}>{hostelData.name}</h4>
                            
                            <p className="text-primary">{hostelData.adress}</p>
                            </div>
                            
                            {/* <div>
                                 <CSVLink {...csvlink} className="btn btn-primary light btn-sm me-2"><i className="fa-solid fa-file-excel" /> Export Report</CSVLink> 
                                <Link to={"#"} className="btn btn-primary btn-sm" data-bs-toggle="offcanvas"
                                   onClick={()=>room.current.showEmployeModal()}
                                >+ Ubytovat</Link> {" "}
                               
                            </div> */}
                        
                        </div>  
                        
                        <div style={{ display: 'flex', paddingLeft: '20px' }}>
                            <p className="text-primary" style={{  marginRight: '20px' }}><span className="black-color">Tel.:</span> {hostelData.mobile}</p>
                            <p className="text-primary" ><span className="black-color">Email: </span> {hostelData.email}</p>
                            </div>        
                            <div className="tbl-caption">
                        <h4 className="heading mb-0" style={{ marginRight: '20px' }}>Čislo pokoje: {RoomData.id}</h4>
                        </div>
                        <div id="employee-tbl_wrapper" className="dataTables_wrapper no-footer">
                            <table id="projects-tbl" className="table ItemsCheckboxSec dataTable no-footer mb-0">
                                <thead>
                                    <tr>                                       
                                        <th>Jméno</th>
                                        <th>Pohlaví</th>                                        
                                        <th>Národnost</th>
                                        <th>Telefon</th>
                                        <th>Status práce</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                  {console.log('Rooms-now',Rooms)}
                                {employeesInRoom.slice().map((employee, index) => (
                                        <tr key={index}>
                                            
                                            <td>
                                                <div className="products">
                                                    
                                                    <div>
                                                        <h6><Link to={"#"}>{employee.name}</Link></h6>
                                                        
                                                    </div>	
                                                </div>
                                            </td>
                                            
                                            <td>
                                                <span>{employee.gender}</span>
                                            </td>
                                            


                                            <td>
                                                <span>{employee.country}</span>
                                            </td>		
                                            <td>
                                                <span>{employee.mobile}</span>
                                            </td>
                                            <td>
  {employee.stredisko !== "-" ? (
    <span className="badge badge-success green-pracuje light border-0">{employee.stredisko}</span>
  ) : (
    <span className="badge badge-danger red-pracuje light border-0">Nepracuje</span>
  )}
</td>

                                            <td>
                          <div className="d-flex" style={{justifyContent: 'flex-end'}} >  
               
                          <Link
                            to={"#"}
                            className="btn btn-outline-danger btn-xxs ms-1"
                            onClick={() => createDeletingPopUpInRoom(employee.name)} >
                            Check-Out
                          </Link>
                          </div>
                        </td>
                                        </tr>
                                    ))}
                                </tbody>                                
                            </table>
                            <div className="d-sm-flex text-center justify-content-between align-items-center">
                                <div className='dataTables_info'>
                                   
                                </div>
                                
                            </div> 
                        </div>
                    </div>
                </div>
            </div>           
            {/* <RoomsOffcanvas 
                ref={room}
                Title="Add Hostel"
                setDataUpdateTrigger={setDataUpdateTrigger}
                hostelData={hostelData}
            /> */}
            
            <EmployeeToRoomOffcanvas 
                ref={addEmpToRoom}
                Title="checkIn"
                selectedRoom={selectedRoom}
                setDataUpdateTrigger={setDataUpdateTrigger}
                dataUpdateTrigger={dataUpdateTrigger}
            /> 
             <CheckOutOffcanvas 
                ref={checkOut}
                Title="CheckOut"
                selectedRoom={selectedRoom}
                setDataUpdateTrigger={setDataUpdateTrigger}
            /> 
            
        
        </>
    );
};


export default ProfileRoom;