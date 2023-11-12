import React, { useState, forwardRef, useImperativeHandle, useEffect  } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';
import axios from 'axios';


const AddToBlackList = forwardRef((props, ref) => {

    const [hostelsData, setHostels] = useState([]);
    const [tovarnyData, setTovarny] = useState([]);
    const [selectedSelect, setSelectedSelect] = useState(null);
    const [selectedTovarna, setSelectedTovarna] = useState(null);
    const [Rooms, setRooms] = useState([]);
    const [emoliyees, setEmloyees] = useState([]);
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
        const userData = data.find(item => item.email === email);

        formData.append('name', userData.name);
        formData.append('stredisko', userData.stredisko);
        formData.append('ubytovna', userData.ubytovna);
        formData.append('country', userData.country);
        formData.append('mobile', userData.mobile);
        formData.append('gender', userData.gender);
        formData.append('pokoj', userData.pokoj);
        formData.append('registr', userData.registr);
        formData.append('birth', userData.birth);
        if (userData) {
            console.log(userData); // Вывод данных пользователя с соответствующим email
        } else {
            console.log('Email not found in the data'); // Email не найден
        }
        axios.post('/add_to_black_list.php', formData)
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
          setEmloyees(data);
          

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
        <label className="form-label">Select User</label>
        <select
            name="email"
          className="default-select form-control"
          onChange={handleTovarnaSelect}
        >
          <option data-display="Select">Select User</option>
          {emoliyees.map((tovarna, index) => (
            <option name="user" key={index} value={tovarna.email}>
              {tovarna.name}
            </option>
          ))}
        </select>
      </div>

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

export default AddToBlackList;