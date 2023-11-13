import React, {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import EmployeeOffcanvas from '../../../constant/EmployeeOffcanvas'; 
import EditEmployeeOffcanvas from '../../../constant/EditEmployeeOffcanvas';
import { useDispatch } from 'react-redux';
import { setEmplInWorkData } from '../../../../store/actions/EmployeesInWorkActions';
import AddToBlackList from '../../../constant/AddToBlackList';


const BlackListTables = () => {
 
    
    const [dataUpdateTrigger, setDataUpdateTrigger] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null); // Добавляем состояние для хранения выбранного работника
    const employe = useRef();   
    const editEmploye = useRef(); 
    const dispatch = useDispatch();

    const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Вызов функции для загрузки данных при монтировании компонента
    fetchData99();
  }, []);

  const fetchData99 = async () => {
    try {
      const response = await fetch(`/black-list.json?${Date.now()}`);
      const data = await response.json();

      data.sort((a, b) => {
        const nameA = a.name.trim();
        const nameB = b.name.trim();
        return nameA.localeCompare(nameB, undefined, { sensitivity: 'base' });
      });
      setEmployees(data);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };
 
  

  useEffect(() => {
    fetchData99();
  }, [dataUpdateTrigger]);





  const handleDelete = async (email) => {
    
    try {
      // Отправляем запрос на сервер для удаления сотрудника по его email
      const response = await fetch('/delete_from_black_list.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Передаем только email
      });
  
      // Проверяем успешность удаления данных на сервере
      if (!response.ok) {
        console.log('Не удалось удалить данные на сервере');
        throw new Error('Не удалось удалить данные на сервере');
        
      }
    
      const employeeIndex = employees.findIndex((employee) => employee.email === email);
    if (employeeIndex === -1) {
      
      return;
    }

    const updatedEmployees = [...employees];
    updatedEmployees.splice(employeeIndex, 1);
    setEmployees(updatedEmployees);


    } catch (error) {
      console.error('Ошибка при удалении сотрудника:', error);
      console.log('Ошибка при удалении сотрудника:');
      console.log(error);
    }
  };
  
  
  const handleEdit = (employee) => {
    
    setSelectedEmployee(employee); // Устанавливаем выбранного работника для редактирования
    editEmploye.current.showEditEmployeModal();
  };
  
   const numberOfEmployees = employees.length;


  useEffect(() => {
    // Здесь можно выполнить дополнительную логику, если необходимо,
    // когда массив employees меняется, но не нужно обновлять numberOfEmployees
    
    // Также обновляем количество работников в Redux при каждом изменении employees
    dispatch(setEmplInWorkData(numberOfEmployees));
  }, [employees, dispatch]);  // Указываем массив зависимостей, в данном случае employees и dispatch

  

  function createDeletingPopUp(employeeEmail) {
    
    var overlay = document.createElement("div");
    overlay.className = "overlay";
  
    
    var popup = document.createElement("div");
    popup.className = "popup"; 

    var buttonspopup = document.createElement("div");
    buttonspopup.className = "buttonspopup";
  
    
    var text = document.createElement("p");
    text.textContent = "Opravdu chcete zaměstnance trvale smazat ?";

    var logoPoUp = document.createElement("img");
    logoPoUp.src = '/static/media/Logo%20OWB%20website.f8178ceeb0449f70be9f.png';
    logoPoUp.classList.add('logoPoUp');
    
    var yesButton = document.createElement("button");  
    yesButton.classList.add('btn', 'btn-primary');
    yesButton.textContent = "Ano";
    yesButton.addEventListener("click", function () {
      //  удаления сотрудника
      handleDelete(employeeEmail)
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



  function sortNeubytovan() {
    // Найти все tr элементы в таблице
const tableRows = document.querySelectorAll('#employee-tbl_wrapper tbody tr');

// Пройти по каждому tr элементу
tableRows.forEach((row) => {
  // Найти все span элементы с классом .badge-success внутри текущего tr элемента
  const successBadges = row.querySelectorAll('span.green-ubytovan');

  // Если в текущем tr элементе есть span с классом .badge-success, скрыть этот tr элемент
  if (successBadges.length > 0) {
    row.style.display = 'none';
  }
});



const tableRows2 = document.querySelectorAll('#employee-tbl_wrapper tbody tr');


tableRows2.forEach((row) => {
  
  const noRoomOrange = row.querySelectorAll('span.noRoomOrange');

 
  if (noRoomOrange.length > 0) {
    row.style.display = 'none';
  }
});

tableRows2.forEach((row) => {
  
  const neubytovan = row.querySelectorAll('.red-neubytovan');
  
  if (neubytovan.length > 0) {
    row.style.display = 'table-row';
  }

});


  }

  function sortNepracuje() {
    const tableRows3 = document.querySelectorAll('#employee-tbl_wrapper tbody tr');


tableRows3.forEach((row) => {
  
  const noWork = row.querySelectorAll('span.green-pracuje');

 
  if (noWork.length > 0) {
    row.style.display = 'none';
  }
});


tableRows3.forEach((row) => {
  
  const nepracuje = row.querySelectorAll('.red-pracuje');
  
  if (nepracuje.length > 0) {
    row.style.display = 'table-row';
  }

});
  }




  function sortBezpokoje() {

const tableRows4 = document.querySelectorAll('#employee-tbl_wrapper tbody tr');


tableRows4.forEach((row) => {
  

    row.style.display = 'none';

});

tableRows4.forEach((row) => {
  
  const noRoom = row.querySelectorAll('.noRoomOrange');
  
  if (noRoom.length > 0) {
    row.style.display = 'table-row';
  }

});



  }


  function sortVsechno() {

    const tableRows5 = document.querySelectorAll('#employee-tbl_wrapper tbody tr');

    tableRows5.forEach((row) => {
  
      row.style.display = 'table-row';
  
  });

  const selectElement = document.querySelector('.sortSelectEmploye');
  selectElement.selectedIndex = 0;
}



  const handleSelectChange = (event) => {
    if (event.target.value === "vsechno") {
      sortVsechno();
    }
    if (event.target.value === "Neubytovan") {
      sortNeubytovan();
    }
    if (event.target.value === "Nepracuje") {
      sortNepracuje();
    }
    if (event.target.value === "Bez pokoje") {
      sortBezpokoje();
    }
  };

  const filterInputRef = useRef(null);
  const employeeTableRef = useRef(null);

  useEffect(() => {
    const filterNameTable = () => {
      const filterInput = filterInputRef.current;
      const employeeTable = employeeTableRef.current;

      if (!filterInput || !employeeTable) {
        return; // Защита от ошибок, если элементы не существуют
      }

      const rows = employeeTable.getElementsByTagName('tr');
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
    filterInputRef.current.addEventListener('input', filterNameTable);

    // Выполняем начальную фильтрацию
    filterNameTable();
  }, []);

    return (
        <>
            <div className="card">            
                <div className="card-body p-0">
                    <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">   
                        <div className="tbl-caption">
                            <h4 className="heading mb-0 heading-img">Black List: {numberOfEmployees} <img class="table-img" src='/worker.png'/></h4>
                           <input
  type="text"
  ref={filterInputRef}
  placeholder="Zadejte jméno"
  className="NameSearchInput"
/>

                          <div className="table_filter-sort">
                            <p>Filtr:</p>
                            <select className="sortSelectEmploye" onChange={handleSelectChange}>
                            <option value="vsechno">Všechno</option>
      <option value="Neubytovan">Neubytovan</option>
      <option value="Nepracuje">Nepracuje</option>
      <option value="Bez pokoje">Bez pokoje</option>
    </select>
    <button onClick={() => {
      sortVsechno();
    }}>Resetovat</button>
    </div>
                            <div className="div-addButton">
                                
                                <Link to={"#"} className="btn btn-primary btn-sm" data-bs-toggle="offcanvas"
                                   onClick={()=>employe.current.showEmployeModal()}
                                >+ Add Worker To Black List</Link> {" "}
                              
                            </div>
                        
                        </div>          
                        <div id="employee-tbl_wrapper" className="dataTables_wrapper no-footer">
                        <table
        id="projects-tbl employeeTable"
        ref={employeeTableRef}
        className="table ItemsCheckboxSec dataTable no-footer mb-0"
      >
                                <thead>
                                    <tr>
                                        
                                        <th>Jméno</th>
                                       
                                        <th>Ubytovna</th>
                                        <th>Pohlaví</th>                                        
                                        <th>Národnost</th>
                                        <th>Telefon</th>
                                        <th>Status práce</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {employees.slice().map((employee, index) => (
                                        <tr key={index}>
                                            
                                            <td>
                                                <div className="products">
                                                    
                                                    <div>
                                                        <h6><Link to={"#"} data-bs-toggle="offcanvas" onClick={() => handleEdit(employee)}>{employee.name}</Link></h6>
                                                        
                                                    </div>	
                                                </div>
                                            </td>
                                            

                                            <td>
  {employee.hasOwnProperty("ubytovna") ? (
    employee.ubytovna !== "-" ? (
      <span className={`badge badge-success green-ubytovan light border-0 ${(employee.room && employee.room !== '-') ? '' : 'noRoomOrange'}`}>
  {employee.ubytovna}
  {(employee.room && employee.room !== '-') ? `, č. ${employee.room}` : null}
</span>

    ) : (
      <span className="badge badge-danger red-neubytovan light border-0">Neubytovan</span>
    )
  ) : (
    <span className="badge badge-danger red-neubytovan light border-0">Neubytovan</span>
  )}
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
                          <div className="d-flex">
                           
                            
                            <Link
                              to={"#"}
                              className="btn btn-danger shadow btn-xs sharp"
                              onClick={() => createDeletingPopUp(employee.email)}
                            >
                              <i className="fa fa-trash"></i>
                            </Link>
                          </div>
                        </td>
                                        </tr>
                                    ))}
                                </tbody>                                
                            </table>
                            
                        </div>
                    </div>
                </div>
            </div>           
            <AddToBlackList 
                ref={employe}
                Title="Add Employee"
                setDataUpdateTrigger={setDataUpdateTrigger}
            />
             <EditEmployeeOffcanvas 
                ref={editEmploye}
                Title="Edit Employee"
                setDataUpdateTrigger={setDataUpdateTrigger}
                selectedEmployee={selectedEmployee}
            />
            
        
        </>
    );
};


export default BlackListTables;