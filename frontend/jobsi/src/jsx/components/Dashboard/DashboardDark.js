import React,{useContext, useEffect} from 'react';

//Import Components
import { ThemeContext } from "../../../context/ThemeContext";
import MainPagetitle from '../../layouts/MainPagetitle';
import CardWidget from './elements/CardWidget';
import ProjectOverviewTab from './elements/ProjectOverviewTab';
import ToDoList from './elements/ToDoList';
import EarningBlog from './elements/EarningBlog';
import ActiveProjects from './elements/ActiveProjects';
import BestSellerTable from './elements/BestSellerTable';
import ProjectStatusBlog from './elements/ProjectStatusBlog';
import ChatElementBlog from './elements/ChatElementBlog';
import EmployeesTableList from './elements/EmployeesTableList';
import ActiveUserMap from './elements/ActiveUserMap';
import UpcomingBlog from './elements/UpcomingBlog';


const DashboardDark = () => {
	const { changeBackground } = useContext(ThemeContext);	
	useEffect(() => {
		changeBackground({ value: "dark", label: "Dark" });
	}, []);
		
	return(
		<>			
			<MainPagetitle mainTitle="Kontrolní panel" pageTitle="Dashboard" parentTitle="Home"  />
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

<div className="testik">
{/* <form action="save_data.php" method="post">
  
  <input type="text" name="name" placeholder="Ваше имя"/>
  <input type="email" name="email" placeholder="Ваш Email"/>
  <button type="submit">Отправить</button>
</form> */}

<form method="post" action="delete_file.php">
        <input type="submit" value="Удалить файл"/>
    </form>

					</div>
					<div className="col-xl-9 bst-seller">
						<EmployeesTableList />
					</div>
				</div>							
			</div>			
		</>
	)
}
export default DashboardDark;