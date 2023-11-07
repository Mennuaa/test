import React, { useState, forwardRef, useImperativeHandle, useEffect, useRef  } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';
import axios from 'axios';


const EditRoomsOffcanvas = forwardRef((props, ref) => {
    const { selectedRoom, setDataUpdateTrigger, hostelData } = props;
    const [editRoom , seteditRoom] = useState(false);
    const [roomData, setroomData] = useState(selectedRoom ? selectedRoom : {});


      const handleChangeRoom = (e) => {
        const { name, value } = e.target;
        
        setroomData((prevData) => ({ ...prevData, [name]: value }));
      };

      
    useImperativeHandle(ref, () => ({
      showeditRoomModal() {
            seteditRoom(true)
        }    
    }));
    const nav = useNavigate();


    const handleEditSubmitRoom = async (e) => {
      e.preventDefault();
    
      try {
        const new_id = roomData.id; // Используйте roomData.id как новый идентификатор
        const ubytovna = hostelData.name;
        const old_id = selectedRoom.id;
    
     

        const dataToSend = {
          old_id: "77",
          ubytovna: "Ubytovna Novy Bor",
          new_id: "5", 
          quantity: "5"
        };
    
        const url = `/update_hostelRoom.php`;
    
        
        // Выполняем запрос методом PUT с помощью Axios
        const response = await axios.put(url, dataToSend, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      
    
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
    
      seteditRoom(false);
    };
    
    
      
      
    
    


    return (
        <>
            <Offcanvas show={editRoom} onHide={seteditRoom} className="offcanvas-end customeoff" placement='end'>
				<div className="offcanvas-header">
					<h5 className="modal-title" id="#gridSystemModal">Upravit pokoj</h5>
					<button type="button" className="btn-close" 
						onClick={()=>seteditRoom(false)}
					>
						<i className="fa-solid fa-xmark"></i>
					</button>
				</div>
				<div className="offcanvas-body">
                    <div className="container-fluid">
                       
                        <form onSubmit={handleEditSubmitRoom}>
                            <div className="row">
                               
                            <input type="hidden" name="ubytovna" className="form-control" id="exampleFormControlInput2" value={hostelData.name} placeholder="" />
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput2" className="form-label">Číslo pokoje <span className="text-danger">*</span></label>
                                    <input type="text" value={roomData.id} name="id" onChange={handleChangeRoom} className="form-control" id="exampleFormControlInput2" required placeholder="" />
                                </div>	
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput3" className="form-label">Počet lůžek <span className="text-danger">*</span></label>
                                    <input type="text" value={roomData.quantity} name="quantity" onChange={handleChangeRoom} className="form-control" id="exampleFormControlInput3" required placeholder="" />
                                </div>  
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary me-1">Upravit</button>
                                <Link to={"#"} onClick={()=>seteditRoom(false)} className="btn btn-danger light ms-1">Zrušit</Link>
                            </div>
                        </form>
                    </div>
				</div>
			</Offcanvas>     
        </>
    );
});

export default EditRoomsOffcanvas;