import React, { useState, forwardRef, useImperativeHandle, useEffect  } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';
import axios from 'axios';


const PracovnikyOffcanvas = forwardRef((props, ref) => {
  const { selectedTovarna, setDataUpdateTrigger } = props;
    const [pracovniky, setPracovniky] = useState([]);
    const [addEmploye, setPracovnik] = useState(false);
    const [employeeData, setEmployeeData] = useState({});


    useEffect(() => {
      fetchDataPracovniky();
  }, []);

  const fetchDataPracovniky = async () => {
    try {
      const response = await fetch(`/file.json?${Date.now()}`);
      const data = await response.json();
      setPracovniky(data);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };


    useImperativeHandle(ref, () => ({
      showTovarnaModal() {
        setPracovnik(true);
      }
    }));
  
    const nav = useNavigate();
  
    const handleSubmitAddPracovnik = async (e) => {
      e.preventDefault();
  
      try {
          const email = employeeData.email;
          const url = `/update_EmpToTovarna.php?email=${email}`;
          const stredisko = selectedTovarna.name;
  
          const response = await axios.put(url, { email: email, stredisko: stredisko });


          if (response.status === 200) {
              console.log('Данные работника успешно обновлены');
              fetchDataPracovniky();
              setDataUpdateTrigger();
          } else {
              console.log('Произошла ошибка при обновлении данных работника');
          }
      } catch (error) {
          console.error('Ошибка при выполнении запроса:', error);
      }
      setPracovnik(false);
  };
  
        
        

      
      const handleChange = (e) => {
        const { name, value } = e.target;
        
        setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
      };


    return (
        <>
            <Offcanvas show={addEmploye} onHide={setPracovnik} className="offcanvas-end customeoff" placement='end'>
				<div className="offcanvas-header">
                
					<h5 className="modal-title" id="#gridSystemModal">Add worker</h5>
					<button type="button" className="btn-close" 
						onClick={()=>setPracovnik(false)}
					>
						<i className="fa-solid fa-xmark"></i>
					</button>
				</div>
				<div className="offcanvas-body">
          
                    <div className="container-fluid">
                        <form onSubmit={handleSubmitAddPracovnik}>
                            <div className="row">
                                
                                {/* <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput2" className="form-label">Jméno <span className="text-danger">*</span></label>
                                    <input type="text" name="name" className="form-control" id="exampleFormControlInput2" required placeholder="" />
                                </div>	 */}
                                
                                <div className="col-xl-6 mb-3">
        <label className="form-label">Pracovniky</label>
        <select
  name="email"
  className="default-select form-control"
  onChange={handleChange}
>
  
  <option data-display="Select">-</option>
  {selectedTovarna !== null && selectedTovarna.name
    ? pracovniky
        .filter(pracovnik => pracovnik.stredisko === '-' || pracovnik.stredisko === '')
        .map((pracovnik, index) => (
          <option key={index} value={pracovnik.email}>
            {pracovnik.name}
          </option>
        ))
    : null}
</select>


      </div>

                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary me-1">Add</button>
                                <Link to={"#"} onClick={()=>setPracovnik(false)} className="btn btn-danger light ms-1">Zrušit</Link>
                            </div>
                        </form>
                    </div>
				</div>
			</Offcanvas>     
        </>
    );
});

export default PracovnikyOffcanvas;