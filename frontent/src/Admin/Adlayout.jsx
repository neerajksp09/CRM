import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function Adlayout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        try {
            localStorage.removeItem("admin");
            navigate("/log");
            toast.success("Logout Success")
        } catch (err) {
            console.log(err);
            toast.error("Error in Logout");
        }
    }

    function validate() {
        try {
            if (!localStorage.getItem('admin')) {
                toast.error("Please Login First")
                navigate('/log')
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        try {
            validate()
        } catch (err) {
            console.log(err);
        }
    }, [])

    return (
        <>
            <nav className='navtag'>
                <div className="row nav-row p-4">
                    <div className="col-6 nav-left">
                        <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions">
                            <i className="fa-solid fa-bars"></i>
                        </button>

                        <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions">
                            <div className="offcanvas-header p-0 ">
                                <p className='text-center w-100'>
                                    <img src="/src/assets/spi.png" alt="" />
                                </p>
                                <button type="button" className="btn-close mb-5 me-4" data-bs-dismiss="offcanvas"></button>
                            </div>

                            <div className="offcanvas-body">
                                <ul>
                                    <li><Link to={""}><i className="fa-solid fa-chart-line"></i> Dashboard</Link></li>
                                    <li><Link to={'center'}><i className="fa-solid fa-phone-volume"></i> Centers</Link></li>
                                    <li><Link to={'user'}><i className="fa-solid fa-people-group"></i> User</Link></li>
                                    <li><Link to={'viewenq'}><i className="fa-solid fa-phone-volume"></i> Enquiry</Link></li>
                                    <li><Link to={'addenq'}><i className="fa-solid fa-phone-volume"></i> Add Enquiries</Link></li>
                                    <li><Link to={'visitor'}><i className="fa-solid fa-people-group"></i> Visitor</Link></li>
                                </ul>

                                <button type='button' className='ms-4' onClick={handleLogout}>LogOut</button>
                            </div>
                        </div>

                        <Link className='mx-4 '><i className="fa-regular fa-bell"></i></Link>
                    </div>

                    <div className="col-6 nav-right text-end">
                        <div className="dropdown">
                            <button className="btn btn-outline-warning rounded-5 py-2 px-2" type="button" data-bs-toggle="dropdown">
                                <img src="/src/assets/navpic.png" alt="" />
                            </button>

                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item">Profile</Link></li>
                                <li><Link className="dropdown-item">Change Password</Link></li>
                                <li>
                                    <Link className="dropdown-item" to={'/log'} onClick={handleLogout}>
                                        <i className="fa-solid fa-right-from-bracket" style={{ color: "rgb(244, 117, 1)" }}></i> Logout
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <Outlet />
        </>
    )
}

export default Adlayout