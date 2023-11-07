import React, {useState, useRef, useEffect} from 'react';
import EmployeesTableList from './elements/EmployeesTableList';
import MainPagetitle from '../../layouts/MainPagetitle';



const Employees = () => {  
  
    return(
		<>			
			<MainPagetitle mainTitle="Workers" pageTitle="Workers" parentTitle="Home"  />
			<div className="container-fluid">
				<div className="row">
					<div className="col-xl-9 wid-100">
						<div className="row">
						{/* <div className="col-xl-3 col-sm-6">
                <div className="card same-card">
                    <div className="card-body d-flex align-items-center  py-2">                        
                        <AllProjectDonutChart
						
						 />
                        <ul className="project-list">
                            <li><h6>Pracovníci</h6></li>
                            <li>
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="10" height="10" rx="3" fill="#3AC977"/>
                                </svg>{" "}
                                Pracuje
                            </li>
                            <li>
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="10" height="10" rx="3" fill="var(--primary)"/>
                                </svg>{" "}
                                Ne pracuje
                            </li>
                            
                        </ul>
                    </div>
                </div>
				
            </div> */}
			
							{/* <div className="col-xl-3 col-sm-6">
							<div className="card same-card">
                    <div className="card-body d-flex align-items-center  py-2">                        
                        <AllProjectDonutChart2
						
						 />
                        <ul className="project-list">
                            <li><h6>Ubytovny</h6></li>
                            <li>
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="10" height="10" rx="3" fill="#3AC977"/>
                                </svg>{" "}
                                Volno
                            </li>
                            <li>
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="10" height="10" rx="3" fill="var(--primary)"/>
                                </svg>{" "}
                                Obsazeno
                            </li>
                            
                        </ul>
                    </div>
                </div>
							</div> */}
							<div className="col-xl-4">
								{/* <ToDoList /> */}
							</div>

						</div>
					</div>
					{/* new commit */}
					<div className="col-xl-3 t-earn">
						{/* <EarningBlog /> */}
					</div>
					<div className="col-xl-6 active-p">
						{/* <ActiveProjects /> 
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
					<div className="col-xl-9 bst-seller">
						<EmployeesTableList />
					</div>
				</div>							
			</div>			
		</>
	);
};

export default Employees;