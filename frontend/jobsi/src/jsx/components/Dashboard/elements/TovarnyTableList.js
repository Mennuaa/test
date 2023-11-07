import React, {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import TovarnyOffcanvas from '../../../constant/TovarnyOffcanvas'; 
import EditTovarnaOffcanvas from '../../../constant/EditTovarnaOffcanvas';
import { useDispatch } from 'react-redux';
import { setTovarnaData } from '../../../../store/actions/TovarnaActions';



const TovarnyTableList = () => {
   
    const [dataUpdateTrigger, setDataUpdateTrigger] = useState(false);
    const [selectedTovarna, setselectedTovarna] = useState(null); // Добавляем состояние для хранения выбранного работника
    const tovarna = useRef();   
    const editTovarna = useRef(); 
    const [tovarny, setTovarny] = useState([]);
    

    const dispatch = useDispatch();

    const handleLinkClick = (tovarna) => {
    dispatch(setTovarnaData(tovarna));
  };

  useEffect(() => {
    // Вызов функции для загрузки данных при монтировании компонента
    fetchDataTovarna();
    
  }, []);

  

  const fetchDataTovarna = async () => {
    try {
      const response = await fetch(`/tovarny.json?${Date.now()}`);
      
      if (response.ok) {
        try {
          const data = await response.json();
          setTovarny(data);
        } catch (jsonError) {
          console.error('Ошибка при парсинге JSON:', jsonError);
        }
      } else {
        console.error('Ошибка при загрузке данных:', response.status);
      }
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };
 
  

  useEffect(() => {
    fetchDataTovarna();
  }, [dataUpdateTrigger]);





  const handleTovarnaDelete = async (name) => {
        
    
    try {
      
      const response = await fetch('/delete_tovarna.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }), 
      });

      console.log('response', response);
  
      // Проверяем успешность удаления данных на сервере
      if (!response.ok) {
        console.log('Не удалось удалить данные на сервере');
        throw new Error('Не удалось удалить данные на сервере');
        
      }
    
      const tovarnaIndex = tovarny.findIndex((tovarna) => tovarna.name === name);
    if (tovarnaIndex === -1) {
     
      return;
    }

    const updatedTovarny = [...tovarny];
    updatedTovarny.splice(tovarnaIndex, 1);
    setTovarny(updatedTovarny);


    } catch (error) {
      console.error('Ошибка при удалении сотрудника:', error);
      console.log('Ошибка при удалении сотрудника:');
      console.log(error);
    }
  };
  
  
  const handleTovarnaEdit = (tovarna) => {
    
    setselectedTovarna(tovarna); // Устанавливаем выбранного работника для редактирования
    editTovarna.current.showeditTovarnaModal();
  };


  function createDeletingPopUpTovarna(tovarnaName) {
    
    var overlay = document.createElement("div");
    overlay.className = "overlay";
  
    
    var popup = document.createElement("div");
    popup.className = "popup"; 

    var buttonspopup = document.createElement("div");
    buttonspopup.className = "buttonspopup";
  
    
    var text = document.createElement("p");
    text.textContent = "Opravdu chcete středisko trvale smazat ?";

    var logoPoUp = document.createElement("img");
    logoPoUp.src = '/static/media/Logo%20OWB%20website.f8178ceeb0449f70be9f.png';
    logoPoUp.classList.add('logoPoUp');
    
    var yesButton = document.createElement("button");  
    yesButton.classList.add('btn', 'btn-primary');
    yesButton.textContent = "Ano";
    yesButton.addEventListener("click", function () {
      //  удаление
      handleTovarnaDelete(tovarnaName);
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
                        <h4 className="heading mb-0 heading-img">Workplaces <img class="table-img" src='/tovarna.png'/></h4>
                        <div>
                            {/* <CSVLink {...csvlink} className="btn btn-primary light btn-sm me-2"><i className="fa-solid fa-file-excel" /> Export Report</CSVLink>  */}
                            <Link to={"#"} className="btn btn-primary btn-sm" data-bs-toggle="offcanvas"
                               onClick={()=>tovarna.current.showTovarnaModal()}
                            >+ Add Workplace</Link> {" "}
                            {/* <button type="button" className="btn btn-secondary btn-sm" 
                                onClick={() => invite.current.showInviteModal()}
                            >+ Invite Employee
                            </button> */}
                        </div>
                    
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
                                    <th>Název Střediska</th>
                                    <th>Adresa</th>
                                    <th>Kontaktní Telefon</th>
                                    <th>Kontaktní Email</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {tovarny.slice().reverse().map((tovarna, index) => (
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
                                                    <h6><Link to={"/profile-tovarna"} onClick={() => handleLinkClick(tovarna)}>{tovarna.name}</Link></h6>
                                                    
                                                </div>	
                                            </div>
                                        </td>
                                        <td><Link to={"#"} className="text-primary">{tovarna.adress}</Link></td>
                                        <td>
                                            <span>{tovarna.mobile}</span>
                                        </td>
                                        <td>
                                            <span>{tovarna.email}</span>
                                        </td>
                                        
                                        <td>
                      <div className="d-flex">
                        <Link
                          to={"#"}
                          className="btn btn-primary shadow btn-xs sharp me-1" data-bs-toggle="offcanvas" onClick={() => handleTovarnaEdit(tovarna)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </Link> 
                        {/* <Link
                          to={"#"}
                          className="btn btn-danger shadow btn-xs sharp"
                          onClick={() => handleTovarnaDelete(tovarna.name)}
                        > */}
                          <Link
                          to={"#"}
                          className="btn btn-danger shadow btn-xs sharp"
                          onClick={() => createDeletingPopUpTovarna(tovarna.name)}
                        >
                          <i className="fa fa-trash"></i>
                        </Link>
                      </div>
                    </td>
                                    </tr>
                                ))}
                            </tbody>                                
                        </table>
                        {/* <div className="d-sm-flex text-center justify-content-between align-items-center">
                            <div className='dataTables_info'>
                            Zobrazení 1 -{" "}
                                5
                                {" "}z {employees.length}
                            </div>
                        
                        </div>  */}
                    </div>
                </div>
            </div>
        </div>           
        <TovarnyOffcanvas 
            ref={tovarna}
            Title="Add Tovarnu"
            setDataUpdateTrigger={setDataUpdateTrigger}
        />
         <EditTovarnaOffcanvas 
            ref={editTovarna}
            Title="Edit Tovarnu"
            setDataUpdateTrigger={setDataUpdateTrigger}
            selectedTovarna={selectedTovarna}
        />
          
    </>
);
};


export default TovarnyTableList;