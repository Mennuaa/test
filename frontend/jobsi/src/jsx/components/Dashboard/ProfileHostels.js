import React, { useContext, useEffect, useState } from 'react';

//Import Components
import { ThemeContext } from "../../../context/ThemeContext";
import MainPagetitle from '../../layouts/MainPagetitle';
import ProfileHostelTableList from './elements/ProfileHostelTableList';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setRoomData } from '../../../store/actions/RoomActions';

const ProfileHostels = () => {

	const [hostelData , setHostelData] = useState({});
	const dispatch = useDispatch();
	let { hostelName } = useParams();
	  useEffect(()=>{
		  fetch('/ubytovny.json')
		  .then(response => response.json())
		  .then(data => {
			const result = data.filter(ubytovna => ubytovna.name.toLowerCase().includes(hostelName.toLowerCase()));
		console.log('naerl', result);
		setHostelData(...result);
		setRoomData(...result);
  
  
		  })
		  .catch(error => {
			console.error('Error fetching ubytovny data:', error);
		  });
	  console.log(hostelData);
	  },[])
  
		  

	return (
		<>
			<MainPagetitle mainTitle="Hostel profile" pageTitle="Hostel profile" parentTitle="Home" />
			<div className="container-fluid">
				<div className="row">
					<div className="col-xl-9 wid-100">
						<div className="row">
							{/* <CardWidget /> */}
							<div className="col-xl-8">
								{/* <ProjectOverviewTab /> */}
							</div>
							<div className="col-xl-4">
								{/* <ToDoList /> */}
							</div>

						</div>
					</div>
					<div className="col-xl-3 t-earn">
						{/* <EarningBlog /> */}
					</div>
					<div className="col-xl-6 active-p">
						{/* <ActiveProjects /> */}
					</div>
					<div className="col-xl-6 col-md-6 flag">
						{/* <ActiveUserMap />		 */}
					</div>
					<div className="col-xl-4 col-md-6 chat-map">
						{/* <ChatElementBlog /> */}
					</div>
					<div className="col-xl-5 bst-seller">
						{/* <BestSellerTable /> */}
					</div>
					<div className="col-xl-3 col-md-6 up-shd">
						{/* <UpcomingBlog /> */}
					</div>

					{/* <div className="col-xl-3 col-md-6 up-shd">
						<ProjectStatusBlog  title="Projects Status"/>
					</div> */}

					{/* <div className="testik">
{ <form action="save_data.php" method="post">
  
  <input type="text" name="name" placeholder="Ваше имя"/>
  <input type="email" name="email" placeholder="Ваш Email"/>
  <button type="submit">Отправить</button>
</form> }

<form method="post" action="delete_file.php">
        <input type="submit" value="Удалить файл"/>
    </form>

					</div> */}
					<div className="col-xl-9 bst-seller">
						<ProfileHostelTableList />
					</div>
				</div>
			</div>
		</>
	)
}
export default ProfileHostels;