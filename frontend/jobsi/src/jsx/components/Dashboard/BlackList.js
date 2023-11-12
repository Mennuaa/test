import React, {useState, useRef, useEffect} from 'react';
import BlackListTables from './elements/BlackListTables';
import MainPagetitle from '../../layouts/MainPagetitle';



const Blacklist = () => {  
  
    return(
		<>			
			<MainPagetitle mainTitle="Black List" pageTitle="Black List" parentTitle="Home"  />
			<div className="container-fluid">
				<div className="row">
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
						<BlackListTables />
					</div>
				</div>							
			</div>			
		</>
	);
};

export default Blacklist;