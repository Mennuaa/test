import React, { useState, forwardRef, useImperativeHandle, useEffect  } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';
import axios from 'axios';


const EmployeeOffcanvas = forwardRef((props, ref) => {

    const [hostelsData, setHostels] = useState([]);
    const [tovarnyData, setTovarny] = useState([]);
    const [selectedSelect, setSelectedSelect] = useState(null);
    const [selectedTovarna, setSelectedTovarna] = useState(null);
    const [Rooms, setRooms] = useState([]);
    const [RoomsCapacity, setRoomsCapacity] = useState([]);
    const [currentDate, setCurrentDate] = useState('');
    
    const [email, setEmail] = useState('');
    const [serverEmails, setServerEmails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    
    const generateRandomEmail = () => {
      let randomEmail;
      do {
        randomEmail = `${Math.random().toString(36).substring(2, 10)}@example.com`;
      } while (serverEmails.includes(randomEmail)); // Проверяем, что email не существует на сервере
      setEmail(randomEmail);
    };
  
   
    const handleButtonClick = (e) => {
      e.preventDefault();

      const hiddenInput = document.querySelector('.hideInputEmail');
      hiddenInput.style.display = 'none';

        generateRandomEmail();    
    };

  
  

    useEffect(() => { 
    fetchData88();
    fetchDataTovarny();
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setCurrentDate(formattedDate);
  }, []);

  const fetchData88 = async () => {
    try {
      const response = await fetch(`/ubytovny.json?${Date.now()}`);
      const data = await response.json();
      setHostels(data);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };

  const fetchDataTovarny = async () => {
    try {
      const response = await fetch(`/tovarny.json?${Date.now()}`);
      const data = await response.json();
      setTovarny(data);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };

    const { setDataUpdateTrigger } = props;
    const [startDate, setStartDate] = useState(new Date());
    const [startDate2, setStartDate2] = useState(new Date());
    const [addEmploye, setAddEmploye] = useState(false);

    


    const showEditEmployeModal = () => {
      setAddEmploye(true);
    };
  
    useImperativeHandle(ref, () => ({
      showEmployeModal() {
        setAddEmploye(true);
      },
      showEditEmployeModal, // Передаем метод в ref
    }));
  
    const nav = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = new FormData(e.target);
              

      try {
        // Загрузка данных из file.json
        const response = await fetch(`/file.json?${Date.now()}`);
        const data = await response.json();
 
        
        // Проверка на уникальность email
        const email = formData.get('email');
        const isEmailUnique = data.every(item => item.email !== email);
  
        if (!isEmailUnique) {
          alert('Email již existuje. Zadejte prosím jiný e-mail.');
          return;
        }
  
        // Отправка данных на сервер
        axios.post('/save_data.php', formData)
          .then(response => {
          
            setDataUpdateTrigger((prev) => !prev);
          })
          .catch(error => {
            console.error(error);
          });
  
        setAddEmploye(false);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };
      
    



    const fetchDataPokoje = async () => {
        try {
          const response = await fetch(`/pokoje.json?${Date.now()}`);
          const data = await response.json();

          const response2 = await fetch(`/file.json?${Date.now()}`);
          const data2 = await response2.json();

          const filteredRooms = data.filter(
            (room) =>
              room.ubytovna === selectedSelect 
          );

          console.log('filteredRooms', filteredRooms);

          const roomCount = {};

      data2.forEach((client) => {
        if (client.ubytovna === selectedSelect) {
          const key = `${client.ubytovna} - ${client.room}`;
          if (!roomCount[key]) {
            roomCount[key] = 1;
          } else {
            roomCount[key]++;
          }
        }
      });

      console.log('roomCount', roomCount);
    
      const numberOfKeys = Object.keys(roomCount).length;

      if (numberOfKeys > 0) {
        
      const roomCountArray = Object.keys(roomCount).map((key) => {
        const [ubytovna, room] = key.split(' - ');
        return { ubytovna, room, count: roomCount[key] };
      });

      console.log('1-roomCountArray', roomCountArray);

      const roomsWithFreeSpace = filteredRooms.map((room) => {
        const countObj = roomCountArray.find((obj) => obj.ubytovna === room.ubytovna && obj.room === room.id);
        if (countObj) {
            const quantity = parseInt(room.quantity, 10);
            const count = countObj.count;
            const freeSpace = quantity - count;
            return { ...room, freeSpace };
        } else {
            // Если не удалось найти соответствующий объект в roomCountArray, то считаем, что свободных мест нет.
            return { ...room, freeSpace: room.quantity };
        }
    });
    
    console.log('roomsWithFreeSpace', roomsWithFreeSpace);

    const RoomsWithSpace = roomsWithFreeSpace.filter((room) => room.freeSpace > 0);

    console.log('RoomsWithSpace', RoomsWithSpace);

  setRooms(RoomsWithSpace);
} else {
  setRooms(filteredRooms);
  console.log('filteredRooms-filteredRooms',filteredRooms);
}
          // setRooms(data);
        } catch (error) {
          console.error('Ошибка при загрузке данных:', error);
        }
      };
    


      const fetchDataFile = async () => {
        try {
          const response = await fetch(`/file.json?${Date.now()}`);
          const data = await response.json();
      
          
          const roomCounts = {};
          const emailList = data.map(item => item.email);
           
          setServerEmails(emailList);
          

          // Подсчитываем количество объектов с одинаковыми значениями ключа "room"
          data.forEach(obj => {
            if (obj.hasOwnProperty('room')) {
              const roomValue = obj.room;
              roomCounts[roomValue] = (roomCounts[roomValue] || 0) + 1;
            }
          });
      
           setRoomsCapacity(roomCounts);
      
        } catch (error) {
          console.error('Ошибка при загрузке данных:', error);
        }
      };


      useEffect(() => {
        
        fetchDataPokoje();
        fetchDataFile();
      }, []);


      useEffect(() => {
       
        fetchDataPokoje();
        setTimeout(() => {
          console.log('Rooms1', Rooms);
        },1000);
      }, [selectedSelect]);
    
      const handleUbytovnaSelect = (event) => {
        const selectedHostelName = event.target.value;
        
        setSelectedSelect(selectedHostelName);
        setTimeout(() => {
        console.log('Hotel: selectedSelect', selectedSelect);
      },900);
      };

      const handleTovarnaSelect = (event) => {
        const selectedTovarnaName = event.target.value;
        
        setSelectedTovarna(selectedTovarnaName);

      };



    return (
        <>
            <Offcanvas show={addEmploye} onHide={setAddEmploye} className="offcanvas-end customeoff" placement='end'>
				<div className="offcanvas-header">
              
					<h5 className="modal-title" id="#gridSystemModal">Add worker</h5>
					<button type="button" className="btn-close" 
						onClick={()=>setAddEmploye(false)}
					>
						<i className="fa-solid fa-xmark"></i>
					</button>
				</div>
				<div className="offcanvas-body">
                    <div className="container-fluid">
                        
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                            
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput2" className="form-label">Jméno <span className="text-danger">*</span></label>
                                    <input type="text" name="name" className="form-control" id="exampleFormControlInput2" required placeholder="" />
                                </div>	
                                <div className="col-xl-6 mb-3 hideInputEmail">
                                  <div className="display-flex" >
                                    <label htmlFor="exampleFormControlInput3" className="form-label">Email <span className="text-danger">*</span></label>
                                    <a className="btn btn-primary btn-sm" onClick={handleButtonClick}>neni</a>
                                    </div>
                                    <input
        type="email"
        name="email"
        className="form-control"
        id="exampleFormControlInput3"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
                                </div>
                               
                                <div className="col-xl-6 mb-3">
                                    <label className="form-label">Národnost <span className="text-danger">*</span></label>
                                    <select name="country" className="default-select form-control" required>
                                        <option  data-display="Select">Prosím vyberte</option>
                                        <option value="CZ">CZ</option>
                                        <option value="UA">UA</option>
                                        <option value="PL">PL</option>
                                        <option value="LT">LT</option>
                                        <option value="RO">RO</option>
                                        <option value="MD">MD</option>
                                        <option value="BGR">BGR</option>
                                    </select>
                                </div>
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput88" className="form-label">Telefon <span className="text-danger">*</span></label>
                                    <input name="mobile" type="number" className="form-control" id="exampleFormControlInput88" required placeholder="" />
                                </div>
                                <div className="col-xl-6 mb-3">
                                    <label className="form-label">Pohlaví <span className="text-danger">*</span></label>
                                    <select name="gender" className="default-select form-control" required>
                                        <option  data-display="Select">Prosím vyberte</option>
                                        <option value="Mužský">Mužský</option>
                                        <option value="Ženský">Ženský</option>
                                    </select>
                                </div>
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput99" className="form-label">Datum registrace<span className="text-danger">*</span></label>                                    
                                    <input
      type="date"
      id="registr"
      name="registr"
      className="inputReg form-control"
      value={currentDate}
      onChange={(e) => setCurrentDate(e.target.value)}
    />
                                </div>
                                <div className="col-xl-6 mb-3">
                                    <label htmlFor="exampleFormControlInput8" className="form-label">Datum narození <span className="text-danger">*</span></label>                                    
                                    <input name="birth" type="date" className="form-control" id="exampleFormControlInput88" required placeholder="" />
                                </div>
                                <div className="col-xl-6 mb-3">
        <label className="form-label">Středisko</label>
        <select
          name="stredisko"
          className="default-select form-control"
          onChange={handleTovarnaSelect}
        >
          <option data-display="Select">-</option>
          {tovarnyData.map((tovarna, index) => (
            <option key={index} value={tovarna.name}>
              {tovarna.name}
            </option>
          ))}
        </select>
      </div>

                                <div className="col-xl-6 mb-3">
        <label className="form-label">Ubytovna</label>
        <select
          name="ubytovna"
          className="default-select form-control"
          onChange={handleUbytovnaSelect}
        >
          <option data-display="Select">-</option>
          {hostelsData.map((hostel, index) => (
            <option key={index} value={hostel.name}>
              {hostel.name}
            </option>
          ))}
        </select>
      </div>
      {selectedSelect && (
        <div className="col-xl-6 mb-3">
          <label className="form-label">Pokoj</label>
          <select name="pokoj" className="default-select form-control">
            <option data-display="Select">-</option>
            {setTimeout(() => {
              console.log('Rooms2', Rooms)
            },2000)}
            {Rooms.map((room, index) => (
              
              <option
                key={index}
                value={room.id}
              >
                {`Pokoj č. ${room.id}`}
              </option>
            ))}
          </select>
        </div>
      )}

                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary me-1">add</button>
                                <Link to={"#"} onClick={()=>setAddEmploye(false)} className="btn btn-danger light ms-1">Zrušit</Link>
                            </div>
                        </form>
                    </div>
				</div>
			</Offcanvas>     
        </>
    );
});

export default EmployeeOffcanvas;