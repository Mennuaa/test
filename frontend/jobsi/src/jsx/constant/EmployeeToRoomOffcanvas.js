import React, { useState, forwardRef, useImperativeHandle, useEffect, useRef  } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';
import axios from 'axios';


const EmployeeToRoomOffcanvas = forwardRef((props, ref) => {
    const { selectedRoom, setDataUpdateTrigger, dataUpdateTrigger} = props;
    const [addEmpToRoom , setaddEmpToRoom] = useState(false);
    const [employesNoRoom, setNoRoom] = useState([]);
    const [choosedFreeEmploye, setChoosedEmploye] = useState({});

    useEffect(() => {

    fetchData();
   
  }, [dataUpdateTrigger]);


  const fetchData = async () => {
    try {
      const response = await fetch(`/file.json?${Date.now()}`);
      const data = await response.json();
      const filteredData = data.filter(item => !item.hasOwnProperty('room') || item.room === '-' || item.room === null);
      setNoRoom(filteredData);
    
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setChoosedEmploye((prevData) => ({ ...prevData, [name]: value }));
    
  };

    useImperativeHandle(ref, () => ({
        showaddEmpToRoomModal() {
            setaddEmpToRoom(true)
        }    
    }));
    const nav = useNavigate();

    

    const handleEditRoomSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const email = choosedFreeEmploye.email;
          const idRoom = selectedRoom.id;
          const idUbytovna = selectedRoom.ubytovna;
      

    const url = `/set_EmpRoom.php`;
    const data = { email: email, idRoom: idRoom, idUbytovna: idUbytovna };
       
    
    // Выполняем запрос методом PUT с помощью Axios
    const response = await axios.put(url, data);
    
    if (response.status === 200) {
      // Запрос выполнен успешно, обновляем компонент
      console.log('Данные успешно обновлены');
      setDataUpdateTrigger((prev) => !prev);
      fetchData();
      // Здесь вы можете обновить состояние вашего компонента
      // создавая новый объект с ключом "room" и добавляя его к массиву данных
      const updatedData = employesNoRoom.map(item => {
        if (item.email === email) {
          return { ...item, room: idRoom };
        }
        return item;
      });

      // Обновляем состояние
      setNoRoom(updatedData);
    } else {
      // Обработка ошибок, если запрос вернул ошибку
      console.error('Ошибка при обновлении данных:', response.data.message);
    }
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
  }
  
  setaddEmpToRoom(false);
};
      
      
      
    
    


    return (
        <>
            <Offcanvas show={addEmpToRoom} onHide={setaddEmpToRoom} className="offcanvas-end customeoff" placement='end'>
				<div className="offcanvas-header">
					<h5 className="modal-title" id="#gridSystemModal">Ubytovat pracovníka</h5>
					<button type="button" className="btn-close" 
						onClick={()=>setaddEmpToRoom(false)}
					>
						<i className="fa-solid fa-xmark"></i>
					</button>
				</div>
				<div className="offcanvas-body">
                    <div className="container-fluid">
                        
                        <form onSubmit={handleEditRoomSubmit}>
                            <div className="row" style = {{marginBottom: '35px'}}>
                                {/* col-xl-6 mb-3 */}
                                <div className="" style = {{display: 'block !important', marginBottom: '35px !important'}}>
                                    <label className="form-label" style = {{marginRight: '25px'}}>Ubytovna: <span className="black-color">{selectedRoom ? selectedRoom.ubytovna : '' }</span> <span className="text-danger"></span></label>
                                    <label className="form-label">Čislo pokoje: <span className="black-color">{selectedRoom ? selectedRoom.id : ''}</span> <span className="text-danger"></span></label>
                                    <input hidden type="text" name="room" value={selectedRoom ? selectedRoom.id : ''} onChange={handleChange} className="form-control" id="exampleFormControlInput2" required placeholder="" />
                                    <input hidden type="text" name="ubytovna" value={selectedRoom ? selectedRoom.ubytovna : ''} onChange={handleChange} className="form-control" id="exampleFormControlInput2" required placeholder="" />
                                </div>	
                              
<div className="">
  <label className="form-label">Pracovník <span className="text-danger">*</span></label>
  <select name="email" value={choosedFreeEmploye.value} onChange={handleChange} className="default-select form-control" required>
  <option data-display="Select">-</option>
    {employesNoRoom &&
  employesNoRoom
    .filter(employeNoRoom => employeNoRoom.ubytovna === (selectedRoom ? selectedRoom.ubytovna : '') || employeNoRoom.ubytovna === '-')
    .map((employeNoRoom, index) => (
      <option key={index} value={employeNoRoom.email}>
        {employeNoRoom.name}
      </option>
    ))
}

  </select>
</div>

                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary me-1">Upravit</button>
                                <Link to={"#"} onClick={()=>setaddEmpToRoom(false)} className="btn btn-danger light ms-1">Zrušit</Link>
                            </div>
                        </form>
                    </div>
				</div>
			</Offcanvas>     
        </>
    );
});

export default EmployeeToRoomOffcanvas;