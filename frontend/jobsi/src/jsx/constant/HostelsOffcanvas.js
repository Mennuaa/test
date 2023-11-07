import React, { useState, forwardRef, useImperativeHandle, useRef  } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import axios from 'axios';


const HostelsOffcanvas = forwardRef((props, ref) => {
    const { setDataUpdateTrigger } = props;
    const [AddHostel, setAddHostel] = useState(false);
  
    const formRef = useRef(); 

    // Метод, который вы хотите вызывать через ref
    const showEditEmployeModal = () => {
      setAddHostel(true);
    };
  
    useImperativeHandle(ref, () => ({
      showEmployeModal() {
        setAddHostel(true);
      },
      showEditEmployeModal, // Передаем метод в ref
    }));
  
    const nav = useNavigate();
  
    const handleSubmit2 = async (e) => {
      e.preventDefault();
   
      const formData2 = new FormData(formRef.current);
     
      try {
        // Загрузка данных из file.json
        const response = await fetch(`/ubytovny.json?${Date.now()}`);
        const data = await response.json();
  
        // Проверка на уникальность name
        const name = formData2.get('name');
        const isNameUnique = data.every(item => item.name !== name);
  
        if (!isNameUnique) {
          alert('Ubytovna již existuje.');
          return;
        }
  
        // Отправка данных на сервер
        axios.post('/save_hostels.php', formData2)
          .then(response => {
            
            setDataUpdateTrigger((prev) => !prev);
          })
          .catch(error => {
            console.error(error);
          });
  
        setAddHostel(false);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };



    return (
        <>
            <Offcanvas show={AddHostel} onHide={setAddHostel} className="offcanvas-end customeoff" placement='end'>
				<div className="offcanvas-header">
					<h5 className="modal-title" id="#gridSystemModal">Add hostel</h5>
					<button type="button" className="btn-close" 
						onClick={()=>setAddHostel(false)}
					>
						<i className="fa-solid fa-xmark"></i>
					</button>
				</div>
				<div className="offcanvas-body">
                    <div className="container-fluid">
                        
                        <form id="formAddHostel" onSubmit={handleSubmit2} ref={formRef}>
                            <div className="row">
                                
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput2" className="form-label">Název <span className="text-danger">*</span></label>
                                    <input type="text" name="name" className="form-control" id="exampleFormControlInput2" required placeholder="" />
                                </div>	
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput3" className="form-label">Adresa <span className="text-danger">*</span></label>
                                    <input type="text" name="adress" className="form-control" id="exampleFormControlInput3" required placeholder="" />
                                </div>                                
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput88" className="form-label">Kontaktní telefon </label>
                                    <input name="mobile" type="number" className="form-control" id="exampleFormControlInput88"  />
                                </div>
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput88" className="form-label">Kontaktní email </label>
                                    <input name="email" type="email" className="form-control" id="exampleFormControlInput88"  />
                                </div>
                                
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary me-1">Add</button>
                                <Link to={"#"} onClick={()=>setAddHostel(false)} className="btn btn-danger light ms-1">Zrušit</Link>
                            </div>
                        </form>
                    </div>
				</div>
			</Offcanvas>     
        </>
    );
});

export default HostelsOffcanvas;