import React, { useState, forwardRef, useImperativeHandle, useRef  } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';
import axios from 'axios';


const RoomHostelsOffcanvas = forwardRef((props, ref) => {
    const { setDataUpdateTrigger, hostelData } = props;
    const [AddRoom, setAddRoom] = useState(false);
  
    const formRef2 = useRef(); 

    // Метод, который вы хотите вызывать через ref
    const showEditEmployeModal = () => {
      setAddRoom(true);
    };
  
    useImperativeHandle(ref, () => ({
      showEmployeModal() {
        setAddRoom(true);
      },
      showEditEmployeModal, // Передаем метод в ref
    }));
  
    const nav = useNavigate();
  
    const handleSubmit3 = async (e) => {
      e.preventDefault();
   
      const formData3 = new FormData(formRef2.current);
      
      try {

        const response = await fetch(`/pokoje.json?${Date.now()}`);
        const data = await response.json();

        const pokoj = formData3.get('id');
        const ubytovna = hostelData.name;
        const filteredData = data.filter(thisU => ubytovna === thisU.ubytovna)
        const isPokojUnique = filteredData.every(item => item.id !== pokoj);
  
        if (!isPokojUnique) {
          alert('Pokoj již existuje. Zadejte prosím jiný pokoj.');
          return;
        }
       
        axios.post('/save_rooms.php', formData3)
          .then(response => {
            console.log(response.data);
            setDataUpdateTrigger((prev) => !prev);
          })
          .catch(error => {
            console.error(error);
          });
  
        setAddRoom(false);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };



    return (
        <>
            <Offcanvas show={AddRoom} onHide={setAddRoom} className="offcanvas-end customeoff" placement='end'>
				<div className="offcanvas-header">
					<h5 className="modal-title" id="#gridSystemModal">Add room</h5>
					<button type="button" className="btn-close" 
						onClick={()=>setAddRoom(false)}
					>
						<i className="fa-solid fa-xmark"></i>
					</button>
				</div>
				<div className="offcanvas-body">
                    <div className="container-fluid">
                        
                        <form id="formAddRoom" onSubmit={handleSubmit3} ref={formRef2}>
                            <div className="row">
                            <input type="hidden" name="ubytovna" className="form-control" id="exampleFormControlInput2" value={hostelData.name} placeholder="" />
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput2" className="form-label">Číslo pokoje <span className="text-danger">*</span></label>
                                    <input type="text" name="id" className="form-control" id="exampleFormControlInput2" required placeholder="" />
                                </div>	
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput3" className="form-label">Počet lůžek <span className="text-danger">*</span></label>
                                    <input type="text" name="quantity" max="100" className="form-control" id="exampleFormControlInput3" required placeholder="" />
                                </div>                                
                                                            
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary me-1">Add</button>
                                <Link to={"#"} onClick={()=>setAddRoom(false)} className="btn btn-danger light ms-1">Zrušit</Link>
                            </div>
                        </form>
                    </div>
				</div>
			</Offcanvas>     
        </>
    );
});

export default RoomHostelsOffcanvas;