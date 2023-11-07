import React, {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import PracovnikyOffcanvas from '../../../constant/PracovnikyOffcanvas'; 
import { useSelector } from 'react-redux';

const ProfileTovarnaTableList = () => {
  const selectedTovarna = useSelector((state) => state.tovarna.tovarnaData);
    const [dataUpdateTrigger, setDataUpdateTrigger] = useState(false);
    const [Pracovniky, setPracovniky] = useState([]);
    const tovarna = useRef();

  useEffect(() => {
    
    fetchDataPracovniky();
  }, []);

  const fetchDataPracovniky = async () => {
    try {
      const response = await fetch(`/file.json?${Date.now()}`);
      const data = await response.json();
      const thisPracovniky = data.filter(pracovnik => pracovnik.stredisko === selectedTovarna.name);
      setPracovniky(thisPracovniky);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };

   
  

  useEffect(() => {
    fetchDataPracovniky();
  }, [dataUpdateTrigger, selectedTovarna]);





  const handleDeletePracovnik = async (pracovikEmail) => {
    
    try {
      const response = await fetch('/delete_pracovnik.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: pracovikEmail }), 
      });
  
      // Проверяем успешность удаления данных на сервере
      if (!response.ok) {
        console.log('Не удалось удалить данные на сервере');
        throw new Error('Не удалось удалить данные на сервере');
        
      }
      
      const PacovnikIndex = Pracovniky.findIndex((pacovnik) => pacovnik.email === pracovikEmail);
    if (PacovnikIndex === -1) {
      
      return;
    }

    const updatedPracovniky = [...Pracovniky];
    updatedPracovniky.splice(PacovnikIndex, 1);
   
    setPracovniky(updatedPracovniky);
    fetchDataPracovniky();

    } catch (error) {
      console.error('Ошибка при удалении сотрудника:', error);
      console.log('Ошибка при удалении сотрудника:');
      console.log(error);
    }
  };
  
    return (
        <>
            <div className="card">            
                <div className="card-body p-0">
                    <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">   
                        <div className="tbl-caption">
                          <div style={{ display: 'flex' }}>
                            <h4 className="heading mb-0" style={{ marginRight: '20px' }}>{selectedTovarna ? selectedTovarna.name : 'Středisko neni vybrane'}</h4>
                            
                            <p className="text-primary">{selectedTovarna ? selectedTovarna.adress : 'Středisko neni vybrane'}</p>
                            </div>
                            
                            <div>
                                {/* <CSVLink {...csvlink} className="btn btn-primary light btn-sm me-2"><i className="fa-solid fa-file-excel" /> Export Report</CSVLink>  */}
                                <Link to={"#"} className="btn btn-primary btn-sm" data-bs-toggle="offcanvas"
                                   onClick={()=>tovarna.current.showTovarnaModal()}
                                >+ Zaměstnat</Link> {" "}
                                {/* <button type="button" className="btn btn-secondary btn-sm" 
                                    onClick={() => invite.current.showInviteModal()}
                                >+ Invite Employee
                                </button> */}
                            </div>
                        
                        </div>  
                        <div style={{ display: 'flex', paddingLeft: '20px' }}>
                            <p className="text-primary" style={{  marginRight: '20px' }}><span className="black-color">Tel.:</span> {selectedTovarna ? selectedTovarna.mobile : 'Středisko neni vybrane'}</p>
                            <p className="text-primary" ><span className="black-color">Email: </span> {selectedTovarna ? selectedTovarna.email : 'Středisko neni vybrane'}</p>
                            </div>        
                        <div id="employee-tbl_wrapper" className="dataTables_wrapper no-footer">
                            <table id="projects-tbl" className="table ItemsCheckboxSec dataTable no-footer mb-0">
                                <thead>
                                    <tr>
                                        
                                        <th>Jméno</th>
                                        {/* <th>Email</th> */}
                                        <th>Pohlaví</th>
                                        <th>Ubytovna</th>
                                        <th>Národnost</th>
                                        <th>Telefon</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {Pracovniky.slice().reverse().map((pracovnik, index) => (
                                        <tr key={index}>
                                            
                                            <td>
                                                <div className="products">
                                                    
                                                    <div>
                                                        <h6><Link to={"#"}>{pracovnik.name}</Link></h6>
                                                        
                                                    </div>	
                                                </div>
                                            </td>
                                            
                                                
                                            {/* <td><Link to={"#"} className="text-primary">{pracovnik.email}</Link></td> */}
                                            <td>
                                                <span>{pracovnik.gender}</span>
                                            </td>
                                            <td>
  {pracovnik.ubytovna !== "-" ? (
    <span className="badge badge-success light border-0">{pracovnik.ubytovna}</span>
  ) : (
    <span className="badge badge-danger light border-0">Neubytovan</span>
  )}
</td>
<td>
                                                <span>{pracovnik.country}</span>
                                            </td>		
                                            <td>
                                                <span>{pracovnik.mobile}</span>
                                            </td>

                                            <td>
                          <div className="d-flex" style={{justifyContent: 'flex-end'}} >  
                            {/* <Link
                              to={"#"}
                              className="btn btn-primary shadow btn-xs sharp me-1" data-bs-toggle="offcanvas" onClick={() => handleEdit(room)}
                            >
                              <i className="fas fa-pencil-alt"></i>
                            </Link> */}
                            <Link
                              to={"#"}
                              className="btn btn-danger shadow btn-xs sharp"
                              onClick={() => handleDeletePracovnik(pracovnik.email)}
                            >
                              <i className="fa fa-trash"></i>
                            </Link>
                          </div>
                        </td>
                                        </tr>
                                    ))}
                                </tbody>                                
                            </table>
                            <div className="d-sm-flex text-center justify-content-between align-items-center">
                                <div className='dataTables_info'>
                                    {/* Showing {lastIndex-recordsPage + 1} to{" "}
                                    {tableData.length < lastIndex ? tableData.length : lastIndex}
                                    {" "}of {tableData.length} entries */}
                                </div>
                                {/* <div
                                    className="dataTables_paginate paging_simple_numbers justify-content-center"
                                    id="example2_paginate"
                                >
                                    <Link
                                        className="paginate_button previous disabled"
                                        to="#"                                        
                                        onClick={prePage}
                                    >
                                        <i className="fa-solid fa-angle-left" />
                                    </Link>
                                    <span>                                      
                                        {number.map((n , i )=>(
                                            <Link className={`paginate_button ${currentPage === n ? 'current' :  '' } `} key={i}                                            
                                                onClick={()=>changeCPage(n)}
                                            > 
                                                {n}  
                                            </Link>
                                        ))}
                                    </span>
                                    <Link
                                        className="paginate_button next"
                                        to="#"                                        
                                        onClick={nextPage}
                                    >
                                        <i className="fa-solid fa-angle-right" />
                                    </Link>
                                </div> */}
                            </div> 
                        </div>
                    </div>
                </div>
            </div>           
            <PracovnikyOffcanvas 
                ref={tovarna}
                Title="Zamestnat"
                setDataUpdateTrigger={setDataUpdateTrigger}
                selectedTovarna={selectedTovarna}
            />

        
        </>
    );
};


export default ProfileTovarnaTableList;