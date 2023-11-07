import React, { useState, forwardRef, useImperativeHandle, useEffect, useRef  } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import axios from 'axios';


const EditHostelsOffcanvas = forwardRef((props, ref) => {
    const { selectedHostel, setDataUpdateTrigger } = props;
    const [editHostel , seteditHostel] = useState(false);
    const [hostelData, sethostelData] = useState(selectedHostel ? selectedHostel : {});
    const [initialName, setInitialName] = useState('');

    useEffect(() => {
        sethostelData(selectedHostel || {});
        setInitialName(selectedHostel?.name || ''); // Сохраняем email работника в состояние
      }, [selectedHostel]);



      const handleChange = (e) => {
        const { name, value } = e.target;
        
        sethostelData((prevData) => ({ ...prevData, [name]: value }));
      };

    useImperativeHandle(ref, () => ({
        showeditHostelModal() {
            seteditHostel(true)
        }    
    }));
    const nav = useNavigate();


    const handleEditSubmit3 = async (e) => {
        e.preventDefault();
      
        try {
          const name =  hostelData.name
          
          const url = `/update_hostel.php?name=${name}`;
          // const url = `/update_hostel.php?name=${name}`;

          hostelData.oldName = initialName;
          
          console.log('hostelData', hostelData);

          console.log('hostelData', hostelData);

          // Выполняем запрос методом PUT с помощью Axios
          const response = await axios.put(url, hostelData);
          
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
        
        seteditHostel(false);
      };
      
      
    
    


    return (
        <>
            <Offcanvas show={editHostel} onHide={seteditHostel} className="offcanvas-end customeoff" placement='end'>
				<div className="offcanvas-header">
					<h5 className="modal-title" id="#gridSystemModal">Upravit ubytovnu</h5>
					<button type="button" className="btn-close" 
						onClick={()=>seteditHostel(false)}
					>
						<i className="fa-solid fa-xmark"></i>
					</button>
				</div>
				<div className="offcanvas-body">
                    <div className="container-fluid">
                       
                        <form onSubmit={handleEditSubmit3}>
                            <div className="row">
                               
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput2" className="form-label">Název <span className="text-danger">*</span></label>
                                    <input type="text" name="name" value={hostelData.name} onChange={handleChange} className="form-control" id="exampleFormControlInput2" required placeholder="" />
                                </div>	
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput3" className="form-label">Adresa <span className="text-danger">*</span></label>
                                    <input type="text" name="adress" value={hostelData.adress} onChange={handleChange} className="form-control" id="exampleFormControlInput3" required placeholder="" />
                                </div>
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput88" className="form-label">Kontaktní telefon </label>
                                    <input name="mobile" value={hostelData.mobile} onChange={handleChange} type="number" className="form-control" id="exampleFormControlInput88"  />
                                </div>
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput88" className="form-label">Kontaktní email </label>
                                    <input name="email" value={hostelData.email} onChange={handleChange} type="email" className="form-control" id="exampleFormControlInput88"  />
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary me-1">Upravit</button>
                                <Link to={"#"} onClick={()=>seteditHostel(false)} className="btn btn-danger light ms-1">Zrušit</Link>
                            </div>
                        </form>
                    </div>
				</div>
			</Offcanvas>     
        </>
    );
});

export default EditHostelsOffcanvas;