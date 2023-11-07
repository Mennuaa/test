import React, { useState, forwardRef, useImperativeHandle, useEffect, useRef  } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';
import axios from 'axios';


const editTovarnasOffcanvas = forwardRef((props, ref) => {
    const { selectedTovarna, setDataUpdateTrigger } = props;
    const [editTovarna , seteditTovarna] = useState(false);
    const [tovarnaData, settovarnaData] = useState(selectedTovarna ? selectedTovarna : {});
    const [initialName, setInitialName] = useState('');

    useEffect(() => {
        settovarnaData(selectedTovarna || {});
        setInitialName(selectedTovarna?.name || ''); // Сохраняем email работника в состояние
      }, [selectedTovarna]);



      const handleChangeTovarna = (e) => {
        const { name, value } = e.target;
        
        settovarnaData((prevData) => ({ ...prevData, [name]: value }));
      };

    useImperativeHandle(ref, () => ({
      showeditTovarnaModal() {
            seteditTovarna(true)
        }    
    }));
    const nav = useNavigate();


    const handleEditSubmitTovarna = async (e) => {
        e.preventDefault();
      
        try {
          const name =  tovarnaData.name
       
          const url = `/update_tovarna.php?name=${name}`;

          
          
          tovarnaData.oldName = initialName;

         
          const response = await axios.put(url, tovarnaData);
          
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
        
        seteditTovarna(false);
      };
      
      
    
    


    return (
        <>
            <Offcanvas show={editTovarna} onHide={seteditTovarna} className="offcanvas-end customeoff" placement='end'>
				<div className="offcanvas-header">
					<h5 className="modal-title" id="#gridSystemModal">Upravit středisko</h5>
					<button type="button" className="btn-close" 
						onClick={()=>seteditTovarna(false)}
					>
						<i className="fa-solid fa-xmark"></i>
					</button>
				</div>
				<div className="offcanvas-body">
                    <div className="container-fluid">
                       
                        <form onSubmit={handleEditSubmitTovarna}>
                            <div className="row">
                               
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput2" className="form-label">Název <span className="text-danger">*</span></label>
                                    <input type="text" name="name" value={tovarnaData.name} onChange={handleChangeTovarna} className="form-control" id="exampleFormControlInput2" required placeholder="" />
                                </div>	
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput3" className="form-label">Adresa <span className="text-danger">*</span></label>
                                    <input type="text" name="adress" value={tovarnaData.adress} onChange={handleChangeTovarna} className="form-control" id="exampleFormControlInput3" required placeholder="" />
                                </div>
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput88" className="form-label">Kontaktní telefon </label>
                                    <input name="mobile" value={tovarnaData.mobile} onChange={handleChangeTovarna} type="number" className="form-control" id="exampleFormControlInput88" />
                                </div>
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput88" className="form-label">Kontaktní email </label>
                                    <input name="email" value={tovarnaData.email} onChange={handleChangeTovarna} type="email" className="form-control" id="exampleFormControlInput88"  />
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary me-1">Upravit</button>
                                <Link to={"#"} onClick={()=>seteditTovarna(false)} className="btn btn-danger light ms-1">Zrušit</Link>
                            </div>
                        </form>
                    </div>
				</div>
			</Offcanvas>     
        </>
    );
});

export default editTovarnasOffcanvas;