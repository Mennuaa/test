import React, {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { IMAGES } from '../../../constant/theme';
import HostelsOffcanvas from '../../../constant/HostelsOffcanvas'; 
import EditHostelsOffcanvas from '../../../constant/EditHostelsOffcanvas';
import { useDispatch } from 'react-redux';
 
const HostelsTableList = () => {
    const dispatch = useDispatch();

    const handleLinkClick = (hostel) => {
      console.log('deded', hostel);
  };

    const [dataUpdateTrigger, setDataUpdateTrigger] = useState(false);
    const [selectedHostel, setSelectedHostel] = useState(null); // Добавляем состояние для хранения выбранного работника
    const invite = useRef();
    const hostel = useRef();   
    const editHostel = useRef(); 
    const [hostels, setHostels] = useState([]);


 

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
  }, [dataUpdateTrigger]);





  const handleDelete = async (name) => {
    
  
    try {
      // Отправляем запрос на сервер для удаления сотрудника по его name
      const response = await fetch('http://localhost:8080/jobsi/backend/delete_hostel.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }), // Передаем только name
      });
      console.log(response);
      // Проверяем успешность удаления данных на сервере
      if (!response.ok) {
        console.log('Не удалось удалить данные на сервере');
        throw new Error('Не удалось удалить данные на сервере');
        
      }
    
      const hostelIndex = hostels.findIndex((hostel) => hostel.name === name);
    if (hostelIndex === -1) {
      
      return;
    }

    const updatedHostels = [...hostels];
    updatedHostels.splice(hostelIndex, 1);
    setHostels(updatedHostels);

    // new Deleting:

    const response2 = await fetch('/delete_hostelAndRooms.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }), // Передаем только name
      });

    // end

    // new Deleting in pokoje.json:

    const response3 = await fetch('/delete_hostelRoomsInPokojeJson.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }), // Передаем только name
      });

    // end


    } catch (error) {
      console.error('Ошибка при удалении сотрудника:', error);
      console.log('Ошибка при удалении сотрудника:');
      console.log(error);
    }
  };
  
  
  const handleEdit = (hostel) => {
    
    setSelectedHostel(hostel); // Устанавливаем выбранного работника для редактирования
    editHostel.current.showeditHostelModal();
  };


  function createDeletingPopUpUbytovna(hostelName) {
    
    var overlay = document.createElement("div");
    overlay.className = "overlay";
  
    
    var popup = document.createElement("div");
    popup.className = "popup"; 

    var buttonspopup = document.createElement("div");
    buttonspopup.className = "buttonspopup";
  
    
    var text = document.createElement("p");
    text.textContent = "Opravdu chcete ubytovnu trvale smazat ?";

    var logoPoUp = document.createElement("img");
    logoPoUp.src = '/static/media/Logo%20OWB%20website.f8178ceeb0449f70be9f.png';
    logoPoUp.classList.add('logoPoUp');
    
    var yesButton = document.createElement("button");  
    yesButton.classList.add('btn', 'btn-primary');
    yesButton.textContent = "Ano";
    yesButton.addEventListener("click", function () {
      //  удаление
      handleDelete(hostelName);
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


  const filterHostelNameTable = useRef(null);
  const hostelsTableRef = useRef(null);

  useEffect(() => {
    const filterNameTable = () => {
      const filterInput = filterHostelNameTable.current;
      const hostelsTable = hostelsTableRef.current;

      if (!filterInput || !hostelsTable) {
        return; // Защита от ошибок, если элементы не существуют
      }

      const rows = hostelsTable.getElementsByTagName('tr');
      const filterText = filterInput.value.toUpperCase();

      for (let i = 1; i < rows.length; i++) {
        const name = rows[i].getElementsByTagName('td')[0].textContent;
        if (name.toUpperCase().startsWith(filterText)) {
          rows[i].style.display = '';
        } else {
          rows[i].style.display = 'none';
        }
      }
    };

    // Назначаем обработчик события 'input' для фильтрации
    filterHostelNameTable.current.addEventListener('input', filterNameTable);

    // Выполняем начальную фильтрацию
    filterNameTable();
  }, []);

    return (
        <>
            <div className="card">            
                <div className="card-body p-0">
                    <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">   
                        <div className="tbl-caption">
                            <h4 className="heading mb-0 heading-img">Hostels <img class="table-img table-img-hostel" src='/hostel.png'/></h4>
                            <input
  type="text"
  ref={filterHostelNameTable}
  placeholder="Zadejte název"
  className="NameSearchInput"
/>
                            <div>
                                
                                <Link to={"#"} className="btn btn-primary btn-sm" data-bs-toggle="offcanvas"
                                   onClick={()=>hostel.current.showEmployeModal()}
                                >+ Add Hostel</Link> {" "}
                                
                            </div>
                        
                        </div>          
                        <div id="employee-tbl_wrapper" className="dataTables_wrapper no-footer">
                            <table id="projects-tbl hostelsTable" className="table ItemsCheckboxSec dataTable no-footer mb-0" ref={hostelsTableRef}>
                                <thead>
                                    <tr>
                                        
                                        <th>Název ubytovny</th>
                                        <th>Adresa</th>
                                        <th>Kontaktní telefon</th>
                                        <th>Kontaktní email</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {hostels.slice().reverse().map((hostel, index) => (
                                        <tr key={index}>
                                            {/* <td className="sorting_20">
                                                <div className="form-check11custom-checkbox">
                                                    <input type="checkbox" className="form-check-input" 
                                                        id={`emply-${item.id}`}
                                                        checked={item.inputchecked}
                                                        onChange={()=>handleChecked(item.id)}
                                                    />
                                                    <label className="form-check-label" htmlFor={`emply-${item.id}`}></label>
                                                </div>
                                            </td> */}
                                            {/* <td><span>{item.emplid}</span></td> */}
                                            <td>
                                                <div className="products">
                                                    {/* <img src={item.image} className="avatar avatar-md" alt="" /> */}
                                                    <div>
                                                        <h6><Link to={`/profile-hostels/${hostel.name}`}>{hostel.name}</Link></h6>
                                                        
                                                    </div>	
                                                </div>
                                            </td>
                                            <td><Link to={"#"} className="text-primary">{hostel.adress}</Link></td>
                                            <td>
                                                <span>{hostel.mobile}</span>
                                            </td>
                                            <td>
                                                <span>{hostel.email}</span>
                                            </td>
                                            
                                            <td>
                          <div className="d-flex">
                            {/* <Link
                              to={"#"}
                              className="btn btn-primary shadow btn-xs sharp me-1" data-bs-toggle="offcanvas" onClick={() => handleEdit(hostel)}
                            >
                              <i className="fas fa-pencil-alt"></i>
                            </Link>  */}
                            {/* <Link
                              to={"#"}
                              className="btn btn-danger shadow btn-xs sharp"
                              onClick={() => handleDelete(hostel.name)}
                            > */}
                            <Link
                              to={"#"}
                              className="btn btn-danger shadow btn-xs sharp"
                              onClick={() => createDeletingPopUpUbytovna(hostel.name)}
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
            <HostelsOffcanvas 
                ref={hostel}
                Title="Add Hostel"
                setDataUpdateTrigger={setDataUpdateTrigger}
            />
            <EditHostelsOffcanvas 
                ref={editHostel}
                Title="Edit Hostel"
                setDataUpdateTrigger={setDataUpdateTrigger}
                selectedHostel={selectedHostel}
            />
            {/* <InviteCustomer
                ref={invite}     
                Title="Invite Employee"
            /> */}
        
        </>
    );
};


export default HostelsTableList;