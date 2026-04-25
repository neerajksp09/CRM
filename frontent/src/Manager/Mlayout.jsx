import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';



function Mlayout() {


    const navigate = useNavigate();

    const handleLogout = () => {

       
        localStorage.removeItem("manager");
         navigate("/log");
       toast.success("Logout Success")
       
    }
    function validate(){
    if(!localStorage.getItem('manager')){
        toast.error("Please Login First")
        navigate('/log')
    }
    }

    useEffect(() => {
        validate()
    }, [])

    return (
        <>
            <nav className='navtag'>
                <div className="row nav-row p-4">
                    <div className="col-6 nav-left">
                        <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><i className="fa-solid fa-bars"></i></button>

                        <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                            <div className="offcanvas-header p-0 ">
                                <p className='text-center w-100'> <img src="/src/assets/spi.png" alt="" /></p>
                                <button type="button" className="btn-close mb-5 me-4 " data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <ul>
                                    <li><Link to={""}  ><i className="fa-solid fa-chart-line"></i> Dashboard</Link></li>
                                    <li><Link to={'menq'}><i className="fa-solid fa-phone-volume"></i> Enquiries</Link></li>

                                    <li><Link to={'mvis'}><i className="fa-solid fa-people-group"></i> Visitors </Link></li>
                                    <li><Link to={'maddenq'}><i className="fa-solid fa-phone-volume"></i> Add Enquiries</Link></li>





                                </ul>
                                <button type='button' className='ms-4' onClick={handleLogout} >LogOut</button>
                            </div>
                        </div>
                        <Link href="" className='mx-4 '><i className="fa-regular fa-bell"></i></Link>
                    </div>
                    <div className="col-6 nav-right text-end">
                       <div class="dropdown">
                            <button class="btn btn-outline-warning rounded-5 py-2 px-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              <img src="/src/assets/navpic.png"alt=""/>
                            </button>
                            <ul class="dropdown-menu">
                                <li><Link class="dropdown-item" href="#">Profile</Link></li>
                                <li><Link class="dropdown-item" href="#">Change Password</Link></li>
                                <li><Link class="dropdown-item" to={'/log'}  onClick={handleLogout} ><i class="fa-solid fa-right-from-bracket" style={{color:"rgb(244, 117, 1)"}}></i> Logout</Link></li>
                            </ul>
                        </div>



                    </div>
                </div>
                <Outlet />
            </nav>
        </>
    )
}

export default Mlayout
