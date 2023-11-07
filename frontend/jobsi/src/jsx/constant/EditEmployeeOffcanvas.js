import React, { useState, forwardRef, useImperativeHandle, useEffect, useRef  } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';
import axios from 'axios';


const EditEmployeeOffcanvas = forwardRef((props, ref) => {
    const { selectedEmployee, setDataUpdateTrigger } = props;
    const [editEmploye , setEditEmploye] = useState(false);
    const [employeeData, setEmployeeData] = useState(selectedEmployee ? selectedEmployee : {});
    const [initialEmail, setInitialEmail] = useState('');
    const [hostelsData, setHostels] = useState([]);

    useEffect(() => {

    fetchData();
   
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`/ubytovny.json?${Date.now()}`);
      const data = await response.json();
      setHostels(data);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };

    useEffect(() => {
        setEmployeeData(selectedEmployee || {});
        setInitialEmail(selectedEmployee?.email || ''); // Сохраняем email работника в состояние
      }, [selectedEmployee]);



      const handleChange = (e) => {
        const { name, value } = e.target;
       
        setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
      };

    useImperativeHandle(ref, () => ({
        showEditEmployeModal() {
            setEditEmploye(true)
        }    
    }));
    const nav = useNavigate();


    const handleEditSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const email =  employeeData.email
          
          const url = `/update_data.php?email=${email}`;

          
          employeeData.oldEmail = initialEmail;

         
          const response = await axios.put(url, employeeData);
          
          if (response.status === 200) {
            // Запрос выполнен успешно, обновляем компонент
            setDataUpdateTrigger((prev) => !prev);
            console.log('Данные успешно обновлены');
          } else {
            // Обработка ошибок, если запрос вернул ошибку
            console.error('Ошибка при обновлении данных:', response.data.message);
          }
        } catch (error) {
          console.error('Ошибка при выполнении запроса:', error);
        }
        
        setEditEmploye(false);
      };
      
      
    
    


    return (
        <>
            <Offcanvas show={editEmploye} onHide={setEditEmploye} className="offcanvas-end customeoff" placement='end'>
				<div className="offcanvas-header">
					<h5 className="modal-title" id="#gridSystemModal">Upravit pracovníka</h5>
					<button type="button" className="btn-close" 
						onClick={()=>setEditEmploye(false)}
					>
						<i className="fa-solid fa-xmark"></i>
					</button>
				</div>
				<div className="offcanvas-body">
                    <div className="container-fluid">
                        
                        <form onSubmit={handleEditSubmit}>
                            <div className="row">
                                
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput2" className="form-label">Jméno <span className="text-danger">*</span></label>
                                    <input type="text" name="name" value={employeeData.name} onChange={handleChange} className="form-control" id="exampleFormControlInput2" required placeholder="" />
                                </div>	
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput3" className="form-label">Email <span className="text-danger">*</span></label>
                                    <input type="email" name="email" value={employeeData.email} onChange={handleChange} className="form-control" id="exampleFormControlInput3" required placeholder="" />
                                </div>
                                
                                {/* <div className="col-xl-6 mb-3">
    <label className="form-label">Ubytovna <span className="text-danger">*</span></label>
    <select name="ubytovna" value={employeeData.ubytovna} onChange={handleChange}  className="default-select form-control" required>
        <option data-display="Select">Prosím vyberte</option>
        {hostelsData && hostelsData.map((hostel, index) => (
            <option key={index} value={hostel.name}>{hostel.name}</option>
        ))}
    </select>
</div> */}
                                <div className="col-xl-6 mb-3">
                                    <label className="form-label">Národnost <span className="text-danger">*</span></label>
                                    <select name="country" value={employeeData.country} onChange={handleChange} className="default-select form-control" required>
                                        <option  data-display="Select">Prosím vyberte</option>
                                        <option value="CZ">CZ</option>
                                        <option value="UA">UA</option>
                                        <option value="PL">PL</option>
                                        <option value="LT">LT</option>
                                        <option value="RO">RO</option>
                                        <option value="MD">MD</option>
                                    </select>
                                </div>
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput88" className="form-label">Mobile <span className="text-danger">*</span></label>
                                    <input name="mobile" value={employeeData.mobile} onChange={handleChange} type="number" className="form-control" id="exampleFormControlInput88" required placeholder="" />
                                </div>
                                <div className="col-xl-6 mb-3">
                                    <label className="form-label">Pohlaví <span className="text-danger">*</span></label>
                                    <select name="gender" value={employeeData.gender} onChange={handleChange} className="default-select form-control" required>
                                        <option  data-display="Select">Prosím vyberte</option>
                                        <option value="Mužský">Mužský</option>
                                        <option value="Ženský">Ženský</option>
                                    </select>
                                </div>
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput99" className="form-label">Datum registrace</label>                                    
                                    <input
      type="date"
      id="registr"
      name="registr"
      className="inputReg form-control"
      value={employeeData.registr}
      disabled
    />
                                </div>
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput8" className="form-label">Datum narození</label>                                    
                                    <input name="birth" value={employeeData.birth} onChange={handleChange} type="date" className="form-control" id="exampleFormControlInput88"   /> 
                                </div>
                                
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary me-1">Upravit</button>
                                <Link to={"#"} onClick={()=>setEditEmploye(false)} className="btn btn-danger light ms-1">Zrušit</Link>
                            </div>
                        </form>
                    </div>
				</div>
			</Offcanvas>     
        </>
    );
});

export default EditEmployeeOffcanvas;