import React, { useState, forwardRef, useImperativeHandle, useEffect, useRef  } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';
import axios from 'axios';


const CheckOutOffcanvas = forwardRef((props, ref) => {
    const { selectedRoom, setDataUpdateTrigger} = props;
    const [checkOut , setcheckOut] = useState(false);
    const [employesWithRoom, setWithRoom] = useState([]);
    const [choosedFreeEmploye, setChoosedEmploye] = useState({});

  useEffect(() => {
    
    const fetchDataCheckOut = async () => {
        try {
            const response = await fetch(`/file.json?${Date.now()}`);
            const data = await response.json();
            
            const thisRoom = selectedRoom.id;
            const filteredData = data.filter(item => item.room === thisRoom);
            setWithRoom(filteredData);
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        }
    };
    fetchDataCheckOut();
    
}, [selectedRoom]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setChoosedEmploye((prevData) => ({ ...prevData, [name]: value }));
    
  };

    useImperativeHandle(ref, () => ({
        showcheckOutModal() {
            setcheckOut(true)
        }    
    }));
    const nav = useNavigate();

    

    const handleCheckOutSubmit = async (e) => {
      e.preventDefault();
      
      try {
        const email = choosedFreeEmploye.email;
        
        const url = `/checkOut.php`;
                
        // Выполняем запрос методом PUT с помощью Axios
        const response = await axios.put(url, email);
        
        if (response.status === 200) {
          // Запрос выполнен успешно, обновляем компонент
          console.log('Данные успешно обновлены');
          setDataUpdateTrigger((prev) => !prev);
        //    fetchDataCheckOut();
    
          // Обновляем состояние
          // setWithRoom(updatedData);
        } else {
          // Обработка ошибок, если запрос вернул ошибку
          console.error('Ошибка при обновлении данных:', response.data.message);
        }
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
      }
      
      setcheckOut(false);
    };
    
      
      
      
    
    


    return (
        <>
            <Offcanvas show={checkOut} onHide={setcheckOut} className="offcanvas-end customeoff" placement='end'>
				<div className="offcanvas-header">
					<h5 className="modal-title" id="#gridSystemModal">Ckeck - Out</h5>
					<button type="button" className="btn-close" 
						onClick={()=>setcheckOut(false)}
					>
						<i className="fa-solid fa-xmark"></i>
					</button>
				</div>
				<div className="offcanvas-body">
                    <div className="container-fluid">
                        
                        <form onSubmit={handleCheckOutSubmit}>
                            <div className="row" style = {{marginBottom: '35px'}}>
                                {/* col-xl-6 mb-3 */}
                                <div className="" style = {{display: 'block !important', marginBottom: '35px !important'}}>
                                    <label className="form-label" style = {{marginRight: '25px'}}>Ubytovna: <span className="black-color">{selectedRoom ? selectedRoom.ubytovna : '' }</span> <span className="text-danger"></span></label>
                                    <label className="form-label">Čislo pokoje: <span className="black-color">{selectedRoom ? selectedRoom.id : ''}</span> <span className="text-danger"></span></label>
                                    <input hidden type="text" name="room" value={selectedRoom ? selectedRoom.id : ''} onChange={handleChange} className="form-control" id="exampleFormControlInput2" required placeholder="" />
                                </div>	
                               {/* col-xl-6 mb-3 */}
                                <div className="">
    <label className="form-label">Pracovník <span className="text-danger">*</span></label>
    <select name="email" value={choosedFreeEmploye.value} onChange={handleChange}  className="default-select form-control" required>
    <option data-display="Select">-</option>
    {employesWithRoom && employesWithRoom
    .filter(employeWithRoom => employeWithRoom.ubytovna === (selectedRoom ? selectedRoom.ubytovna : ''))
    .map((employeWithRoom, index) => (
      <option key={index} value={employeWithRoom.email}>{employeWithRoom.name}</option>
    ))}
    </select>
</div>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary me-1">Upravit</button>
                                <Link to={"#"} onClick={()=>setcheckOut(false)} className="btn btn-danger light ms-1">Zrušit</Link>
                            </div>
                        </form>
                    </div>
				</div>
			</Offcanvas>     
        </>
    );
});

export default CheckOutOffcanvas;