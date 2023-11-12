import React, {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import RoomsOffcanvas from '../../../constant/RoomHostelsOffcanvas'; 
import EmployeeToRoomOffcanvas from '../../../constant/EmployeeToRoomOffcanvas';
import CheckOutOffcanvas from '../../../constant/CheckOutOffcanvas';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setRoomData } from '../../../../store/actions/RoomActions';



const ProfileHostelTableList = () => {
  const [dataUpdateTrigger, setDataUpdateTrigger] = useState(false);
    const [selectedRoom, setselectedRoom] = useState(null);
    const room = useRef();   
    const editRoom = useRef();
    const addEmpToRoom = useRef();
    const checkOut = useRef();
    const [Rooms, setRooms] = useState([]);
    const [RoomsCapacity, setRoomsCapacity] = useState([]);
    const [hostels, setHostels] = useState([]);
  const [hostelData, setHostelData] = useState({});
  const dispatch = useDispatch();
  let { hostelName } = useParams();
  
  useEffect(() => {
    fetch('/ubytovny.json')
      .then(response => response.json())
      .then(data => {
        const result = data.find(ubytovna => 
          ubytovna.name.toLowerCase() === hostelName.toLowerCase()
        ); // Assuming you want a single match, use find instead of filter
  
        setHostelData(result || {}); // Set hostelData or an empty object if no result is found
      })
      .catch(error => {
        console.error('Error fetching ubytovny data:', error);
      });
  }, [hostelName]); // Dependency array with hostelName
  
  useEffect(() => {
    if (!hostelData.name) return; // If hostelData is not yet set, don't run the fetchData
  
    const fetchData = async () => {
      try {
        const response = await fetch(`/pokoje.json?${Date.now()}`);
        const data = await response.json();
        const thisRooms = data.filter(room => room.ubytovna === hostelData.name);
  
        const sortedRooms = thisRooms.sort((roomA, roomB) => {
          // Функция для разбора id remains unchanged
          const parseId = id => {
            // ... same function as you provided
          };
  
          const parsedA = parseId(roomA.id);
          const parsedB = parseId(roomB.id);
  
          // ... same comparison logic as you provided
        });
  
        setRooms(sortedRooms);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };
  
    fetchData();
  }, [hostelData]); // Dependency array with hostelData to run fetchData after hostelData is set
  
  // Further logic can be added here if needed
  
  


    const handleLinkClickRoom = (hostel) => {
    dispatch(setRoomData(hostel));
  };
          
    
    

  useEffect(() => {
    fetchData77();
    // fetchData();
    fetchDataPokoje();
  }, []);



  const fetchDataPokoje = async () => {
    try {
      const response = await fetch(`/file.json?${Date.now()}`);
      const data = await response.json();
  
      const roomCount = {};

      data.forEach((client) => {
        if (client.ubytovna === hostelData.name) {
          const key = `${client.ubytovna} - ${client.room}`;
          if (!roomCount[key]) {
            roomCount[key] = 1;
          } else {
            roomCount[key]++;
          }
        }
      });

      const roomCountArray = Object.keys(roomCount).map((key) => {
        const [ubytovna, room] = key.split(' - ');
        return { ubytovna, room, count: roomCount[key] };
      });

     

       setRoomsCapacity(roomCountArray);
  
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };
  
  const fetchData77 = async () => {
    try {
      const response = await fetch(`/ubytovny.json?${Date.now()}`);
      const data = await response.json();
      setHostels(data);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };
 
  

  useEffect(() => {
    fetchData77();
    // fetchData();
    fetchDataPokoje();
  }, [dataUpdateTrigger]);



  const handleDeletePokoj = async (ubytovna, pokoj) => {
    try {
      // Отправляем запрос на сервер для удаления комнаты по имени и номеру
      const response = await fetch('/delete_pokoj.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ubytovna, pokoj }),
      });
  
      // Проверяем успешность удаления данных на сервере
      if (!response.ok) {
        console.log('Не удалось удалить данные на сервере');
        throw new Error('Не удалось удалить данные на сервере');
      }
  
      // Обновляем состояние Rooms, убирая удаленную комнату
      setRooms(prevRooms => prevRooms.filter(room => room.ubytovna !== ubytovna || room.id !== pokoj));
    } catch (error) {
      console.error('Ошибка при удалении комнаты:', error);
    }
  };
  
  
  
  const handleEdit = (room) => {
    
    setselectedRoom(room); 
    editRoom.current.showeditRoomModal();
  };

  const handleCheckIn = (room) => {
    
    setselectedRoom(room); // Устанавливаем выбранного работника для редактирования
    addEmpToRoom.current.showaddEmpToRoomModal();
  };

  const handleCheckOut = (room) => {
   
    setselectedRoom(room); // Устанавливаем выбранного работника для редактирования
    checkOut.current.showcheckOutModal();
                    
  };

  function createDeletingPopUpPokoj(ubytovna, id) {
    
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
      handleDeletePokoj(ubytovna, id);
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

    // const timerPopUp = setTimeout(function() {
    //   overlay.remove();
    //   popup.remove();
    // }, 20000);

  }
  
  function closePopUp(overlay, popup) {
    overlay.remove();
    popup.remove();
    // clearTimeout(timerPopUp);
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
                            
                            <div>
                                {/* <CSVLink {...csvlink} className="btn btn-primary light btn-sm me-2"><i className="fa-solid fa-file-excel" /> Export Report</CSVLink>  */}
                                <Link to={"#"} className="btn btn-primary btn-sm" data-bs-toggle="offcanvas"
                                   onClick={()=>room.current.showEmployeModal()}
                                >+ Add room</Link> {" "}
                                {/* <button type="button" className="btn btn-secondary btn-sm" 
                                    onClick={() => invite.current.showInviteModal()}
                                >+ Invite Employee
                                </button> */}
                            </div>
                        
                        </div>  
                        <div style={{ display: 'flex', paddingLeft: '20px' }}>
                            <p className="text-primary" style={{  marginRight: '20px' }}><span className="black-color">Tel.:</span> {hostelData.mobile}</p>
                            <p className="text-primary" ><span className="black-color">Email: </span> {hostelData.email}</p>
                            </div>        
                        <div id="employee-tbl_wrapper" className="dataTables_wrapper no-footer">
                            <table id="projects-tbl" className="table ItemsCheckboxSec dataTable no-footer mb-0">
                                <thead>
                                    <tr>
                                        {/* <th className="sorting_asc_11" >
                                            <div className="form-check custom-checkbox ms-0">
                                                <input type="checkbox" className="form-check-input checkAllInput" required="" 
                                                     onClick={()=>handleCheckedAll(unchecked)}
                                                />
                                                <label className="form-check-label" htmlFor="checkAll"></label>
                                            </div>
                                        </th> */}
                                        {/* <th>Employee ID</th> */}
                                        <th>Číslo pokoje</th>
                                        <th></th>
                                        <th>Počet lůžek</th>
                                        <th>Volno</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                
                                {Rooms.slice().reverse().map((room, index) => (
                                        <tr key={index}>
                                            
                                            <td>
                                                <div className="products">
                                                    
                                                    <div>
                                                        <h6><Link to={"/profile-room"} onClick={() => handleLinkClickRoom(room)}>{room.id}</Link></h6>
                                                        
                                                    </div>	
                                                </div>
                                            </td>
                                            
                                            <td>
                                              
                                            {/* <Link
  to="#"
  className={`btn btn-primary btn-xxs shadow ${Number(room.quantity) - Number(RoomsCapacity[room.id]) <= 0 ? "gray-bg" : ""}`}
  
  onClick={() => {
    const howQuantity = Number(room.quantity) - Number(RoomsCapacity[room.id]);

    if (howQuantity <= 0) {
      return;
    } else {
      handleCheckIn(room);
    }
  }}
>
  Check-In
</Link> */}

<Link
  to="#"
  className={`btn btn-primary btn-xxs shadow ${Number(room.quantity) - Number(RoomsCapacity.find((data) => data.room === room.id)?.count || 0) <= 0 ? "gray-bg" : ""}`}
  onClick={() => {
    const roomData = RoomsCapacity.find((data) => data.room === room.id);
    const availableCount = roomData ? Number(room.quantity) - roomData.count : Number(room.quantity);

    if (availableCount <= 0) {
      return;
    } else {
      handleCheckIn(room);
    }
  }}
>
  Check-In
</Link>


                          <Link
                            to={"#"}
                            className="btn btn-outline-danger btn-xxs ms-1"
                            onClick={() => {
                            // Предотвращаем переход по ссылке
                              handleCheckOut(room);
                            }} >
                            Check-Out
                          </Link>
                          </td>       
                                            <td><Link to={"#"} className="text-primary">{room.quantity}</Link></td>
                                            <td>
  <Link to="#" className="text-primary">
    {(() => {
      const roomData = RoomsCapacity.find((data) => data.room === room.id);
      if (roomData) {
        const availableCount = Number(room.quantity) - roomData.count;
        return availableCount >= 0 ? availableCount : 0;
      } else {
        return Number(room.quantity);
      }
    })()}
  </Link>
</td>

                                            <td>
                          <div className="d-flex" style={{justifyContent: 'flex-end'}} >  
                            {/* <Link
                              to={"#"}
                              className="btn btn-primary shadow btn-xs sharp me-1" data-bs-toggle="offcanvas" onClick={() => handleEdit(room)}
                            >
                              <i className="fas fa-pencil-alt"></i>
                            </Link> */} 
                            {/* <Link
                              to={"#"}
                              className="btn btn-danger shadow btn-xs sharp"
                              onClick={() => handleDeletePokoj(room.ubytovna, room.id)}
                            > */}
                            <Link
              to="#"
              className={`btn btn-danger shadow btn-xs sharp ${
                (() => {
                  const roomData = RoomsCapacity.find((data) => data.room === room.id);
                  if (roomData) {
                   
                    return  "pointerNone";
                  } else {
                    return "else0";
                  }
                })()
              }`}
              onClick={() => createDeletingPopUpPokoj(room.ubytovna, room.id)}
            >

                              <i className="fa fa-trash"></i>
                            </Link>
                          </div>
                        </td>
                                        </tr>
                                    ))}
                                </tbody>                                
                            </table>
                            <div className="d-sm-flex text-center justify-content-between align-items-center">
                                <div className='dataTables_info'>
                                    {/* Showing {lastIndex-recordsPage + 1} to{" "}
                                    {tableData.length < lastIndex ? tableData.length : lastIndex}
                                    {" "}of {tableData.length} entries */}
                                </div>
                                {/* <div
                                    className="dataTables_paginate paging_simple_numbers justify-content-center"
                                    id="example2_paginate"
                                >
                                    <Link
                                        className="paginate_button previous disabled"
                                        to="#"                                        
                                        onClick={prePage}
                                    >
                                        <i className="fa-solid fa-angle-left" />
                                    </Link>
                                    <span>                                      
                                        {number.map((n , i )=>(
                                            <Link className={`paginate_button ${currentPage === n ? 'current' :  '' } `} key={i}                                            
                                                onClick={()=>changeCPage(n)}
                                            > 
                                                {n}  
                                            </Link>
                                        ))}
                                    </span>
                                    <Link
                                        className="paginate_button next"
                                        to="#"                                        
                                        onClick={nextPage}
                                    >
                                        <i className="fa-solid fa-angle-right" />
                                    </Link>
                                </div> */}
                            </div> 
                        </div>
                    </div>
                </div>
            </div>           
            <RoomsOffcanvas 
                ref={room}
                Title="Add Hostel"
                setDataUpdateTrigger={setDataUpdateTrigger}
                hostelData={hostelData}
            />
            {/* <EditRoomsOffcanvas 
                ref={editRoom}
                Title="Edit Room"
                setDataUpdateTrigger={setDataUpdateTrigger}
                selectedRoom={selectedRoom}
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
             
            {/* <InviteCustomer
                ref={invite}     
                Title="Invite Employee"
            /> */}
        
        </>
    );
};


export default ProfileHostelTableList;