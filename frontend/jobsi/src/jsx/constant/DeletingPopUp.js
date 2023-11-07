import React, { useState, forwardRef, useImperativeHandle, useEffect  } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';


const DeletingPopUp = forwardRef((props, ref) => {

  const [showDeletingPopUp, setshowDeletingPopUp] = useState(false);

  const openDeletingPopUp = () => {
    setshowDeletingPopUp(true);
  };

  // useImperativeHandle(ref, () => ({
  //   showEmployeModal() {
  //     setshowDeletingPopUp(true);
  //   },
  //   showEditEmployeModal, // Передаем метод в ref
  // }));

    return (
        <>
            <Offcanvas show={showDeletingPopUp} onHide={setshowDeletingPopUp} className="offcanvas-end customeoff" placement='end'>
				<div className="offcanvas-header">
              
					<button type="button" className="btn-close" 
						onClick={()=>setshowDeletingPopUp(false)}
					>
						<i className="fa-solid fa-xmark"></i>
					</button>
				</div>
				<div className="offcanvas-body">
                    <div className="container-fluid">
                        
                        
                    </div>
				</div>
			</Offcanvas>     
        </>
    );
});

export default DeletingPopUp;