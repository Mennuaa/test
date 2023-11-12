import React, {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import EmployeeOffcanvas from '../../../constant/EmployeeOffcanvas'; 
import EditEmployeeOffcanvas from '../../../constant/EditEmployeeOffcanvas';
import { useDispatch } from 'react-redux';
import { setEmplInWorkData } from '../../../../store/actions/EmployeesInWorkActions';
import AddToBlackList from '../../../constant/AddToBlackList';


const NotificationsTable = () => {
   
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
      const response = await fetch(`/notifications.json?${Date.now()}`);
      const data = await response.json();

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
      const response = await fetch('http://localhost:8888/jobsi/frontend/jobsi/public/delete_from_black_list.php', {
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

  



  function sortVsechno() {

    const tableRows5 = document.querySelectorAll('#employee-tbl_wrapper tbody tr');

    tableRows5.forEach((row) => {
  
      row.style.display = 'table-row';
  
  });

  const selectElement = document.querySelector('.sortSelectEmploye');
  selectElement.selectedIndex = 0;
}


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
    // Выполняем начальную фильтрацию
    filterNameTable();
  }, []);

    return (
        <>
            <div className="card">            
                <div className="card-body p-0">
                    <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">   
                        <div className="tbl-caption">


                            <div className="div-addButton">
                              
                              
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
                                        
                                        <th className='d-flex'>Notification</th>
                                        {/* <th>Actions</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                {employees.slice().map((employee, index) => (
                                        <tr key={index}>
                                            
                                            <td>
                                                <div className="products">
                                                    
                                                    <div>
                                                        <h6><Link to={"#"} data-bs-toggle="offcanvas">{employee.notification}</Link></h6>
                                                        
                                                    </div>	
                                                </div>
                                            </td>
                                            <td>
                          <div>
                           
                            
                            {/* <Link
                              to={"#"}
                              className="btn btn-danger shadow btn-xs sharp"
                            
                            >z
                              <i className="fa fa-trash"></i>
                            </Link> */}
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
            
             <EditEmployeeOffcanvas 
                ref={editEmploye}
                Title="Edit Employee"
                setDataUpdateTrigger={setDataUpdateTrigger}
                selectedEmployee={selectedEmployee}
            />
            
        
        </>
    );
};


export default NotificationsTable;