import React, { useState } from 'react'
import Formcard from '../Component/Formcard';
import { Link } from 'react-router-dom';
import axios from "axios"
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'

function Home() {
  const [fullName, setFullName] = useState("");
  const [collage, setCollage] = useState("");
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState("");
  const [role, setRole] = useState("student");
  const [center, setCenter] = useState("");
  const [status, setStatus] = useState("");
  const [remarks, setRemaks] = useState("");
  const [adress, setAddress] = useState("");
  const [centers, setCenters] = useState([]);



  const getcenter = async () => {
    const res = await axios.get('http://localhost:5000/api/center');
    if (res.data.msg == "Success") {
      let x = res.data.center;
      x = x.filter((e) => e.status == "Active");
      console.log(x)
      setCenters(x);
    }

  }

  const addenq = async (e) => {
    e.preventDefault();

    try {


      if (role === "student") {

        const enq = {
          fullName,
          collage,
          course,
          branch,
          year,
          contactNumber,
          email,
          purpose,
          role,
          center
        };

        const res = await axios.post("http://localhost:5000/api/enq", enq);

        if (res.data.msg === "Success") {
          Swal.fire({
            title: "Data Added!",
            icon: "success",
            draggable: true
          });
        }
      }


      else {

        let visitor = {
          fullName,
          contactNumber,
          visitorType: role,
          center
        };

        if (role === "visitorOff") {
          visitor = {
            ...visitor,
            email,
            purpose,
            remarks
          };
        }

        if (role === "visitorPer") {
          visitor = {
            ...visitor,
            address: adress
          };
        }

        const res = await axios.post("http://localhost:5000/api/vis", visitor);

        if (res.data.msg === "Success") {
          toast.success('Visitor Added Successfully')
          console.log(res)

        }
      }

      setFullName("");
      setCollage("");
      setCourse("");
      setBranch("");
      setYear("");
      setContactNumber("");
      setEmail("");
      setPurpose("");
      setRemaks("");
      setAddress("");
      setCenter("");

    } catch (err) {
      console.log(err);
      toast.error('Error')
    }
  };
  useEffect(() => {
    getcenter();
  }, []);
  let forminput;
  if (role == "student") {
    forminput = (
      <>
        <div className="visitor-form p-4 my-4">
          <h5><i className="fa-solid fa-clipboard-user"></i> Student Information</h5>
          <div className="row g-3">
            <div className="col-md-6 ">
              <label forHTML="fname" className="form-label">Full Name</label> <br />

              <div className="input-box d-flex">
                <div className="icon"><i className="fa-regular fa-user mt-2 mx-2"></i></div>
                <input type="text" className="form-control" id="fname" value={fullName} onChange={(e) => { setFullName(e.target.value) }} placeholder='e.g., Aman VermaVisitor Name' />
              </div>
            </div>
            <div className="col-md-6">
              <label forHTML="collage" className="form-label" >College</label>
              <div className="input-box d-flex">
                <div className="icon"><i className="fa-regular fa-building mt-2 mx-2"></i></div>
                <input type="text" className="form-control" id="collage" placeholder='Your college name' value={collage} onChange={(e) => { setCollage(e.target.value) }} />
              </div>

            </div>
            <div className="col-md-6">
              <label forHTML="course" className="form-label">Course</label>
              <div className="input-box d-flex">
                <div className="icon"><i className="fa-solid fa-graduation-cap mt-2 mx-2"></i></div>
                <input type="text" className="form-control" id="name" placeholder='e.g., B.Tech / BCA / MCA' value={course} onChange={(e) => { setCourse(e.target.value) }} />
              </div>

            </div>
            <div className="col-md-6">
              <label forHTML="branch" className="form-label">Branch</label>
              <div className="input-box d-flex">
                <div className="icon"><i className="fa-solid fa-chart-diagram mt-2 mx-2"></i></div>
                <input type="text" className="form-control" id="contact" placeholder='e.g., CSE / IT / ECE' value={branch} onChange={(e) => { setBranch(e.target.value) }} />
              </div>

            </div>
            <div className="col-md-6">
              <label forHTML="year" className="form-label">Year</label>
              <div className="input-box d-flex">
                <div className="icon"><i className="fa-regular fa-calendar-days mt-2 mx-2"></i></div>
                <input type="text" className="form-control" id="name" placeholder='e.g., 2nd Year' value={year} onChange={(e) => { setYear(e.target.value) }} />
              </div>
            </div>
            <div className="col-md-6">
              <label forHTML="contact" className="form-label">Contact Number</label>
              <div className="input-box d-flex">
                <div className="icon"><i className="fa-solid fa-phone mt-2 mx-2"></i></div>
                <input type="number" className="form-control" id="contact" placeholder='10-digit mobile' value={contactNumber} onChange={(e) => { setContactNumber(e.target.value) }} />
              </div>

            </div>
            <div className="col-md-6">
              <label forHTML="email" className="form-label">Email</label>
              <div className="input-box d-flex">
                <div className="icon"><i className="fa-regular fa-envelope mt-2 mx-2"></i></div>
                <input type="email" className="form-control" id="email" placeholder='name@example.com' value={email} onChange={(e) => { setEmail(e.target.value) }} />
              </div>

            </div>
            <div className="col-md-6">
              <label forHTML="purpose" className="form-label">Purpose</label>
              <div className="input-box d-flex">
                <div className="icon"><i className="fa-solid fa-grip mt-2 mx-2"></i></div>
                <select className='form-select' value={purpose} onChange={(e) => { setPurpose(e.target.value) }}>
                  <option >-- Select Purpose --</option>
                  <option> Enquiry</option>
                  <option>
                    Registration  </option>
                  <option>Reporting</option>

                  <option>Certificate Work
                  </option>
                </select>
              </div>

            </div>


            <div className="col-12 text-end">
              <button type="submit" className="btn  px-4 py-2"> <i className="fa-solid fa-user-check"></i> Submit Details</button>
            </div>
          </div>
        </div>

      </>
    )

  }
  else if (role == "visitorOff") {
    forminput = (
      <>
        <div className="visitor-form p-4 my-4">
          <h5><i className="fa-solid fa-clipboard-user"></i> Visitor Information</h5>
          <div className="row g-3">
            <div className="col-md-6 ">
              <label forHTML="fname" className="form-label">Full Name</label> <br />

              <div className="input-box d-flex">
                <div className="icon"><i className="fa-regular fa-user mt-2 mx-2"></i></div>
                <input type="text" className="form-control" id="fname" value={fullName} onChange={(e) => { setFullName(e.target.value) }} placeholder='e.g., Aman VermaVisitor Name' />
              </div>
            </div>
            <div className="col-md-6">
              <label forHTML="contact" className="form-label">Contact Number</label>
              <div className="input-box d-flex">
                <div className="icon"><i className="fa-solid fa-phone mt-2 mx-2"></i></div>
                <input type="number" className="form-control" id="contact" placeholder='10-digit mobile' value={contactNumber} onChange={(e) => { setContactNumber(e.target.value) }} />
              </div>

            </div>

            <div className="col-md-6">
              <label forHTML="email" className="form-label">Email</label>
              <div className="input-box d-flex">
                <div className="icon"><i className="fa-regular fa-envelope mt-2 mx-2"></i></div>
                <input type="email" className="form-control" id="email" placeholder='name@example.com' value={email} onChange={(e) => { setEmail(e.target.value) }} />
              </div>

            </div>

            <div className="col-md-6">
              <label forHTML="purpose" className="form-label">Purpose</label>
              <div className="input-box d-flex">
                <div className="icon"><i className="fa-solid fa-grip mt-2 mx-2"></i></div>
                <select className='form-control' value={purpose} onChange={(e) => { setPurpose(e.target.value) }}>
                  <option >-- Select Purpose --</option>
                  <option> Enquiry</option>
                  <option>
                    Registration  </option>
                  <option>Reporting</option>

                  <option>Certificate Work
                  </option>
                </select>
              </div>

            </div>

            <div className="col-md-12">
              <label forHTML="course" className="form-label">Remarks</label>
              <div className="input-box d-flex">
                <div className="icon"><i className="fa-solid fa-graduation-cap mt-2 mx-2"></i></div>
                <input type="text" className="form-control" id="name" placeholder='Any Remarks (Optionals)' value={remarks} onChange={(e) => { setRemaks(e.target.value) }} />
              </div>

            </div>
            <div className="col-12 text-end">
              <button type="submit" className="btn  px-4 py-2"> <i className="fa-solid fa-user-check"></i> Submit Details</button>
            </div>
          </div>
        </div>

      </>
    )
  }
  else if (role == "visitorPer") {
    forminput = (
      <>
        <div className="visitor-form p-4 my-4">
          <h5><i className="fa-solid fa-clipboard-user"></i> Visitor Information</h5>
          <div className="row g-3">
            <div className="col-md-6 ">
              <label forHTML="fname" className="form-label">Full Name</label> <br />

              <div className="input-box d-flex">
                <div className="icon"><i className="fa-regular fa-user mt-2 mx-2"></i></div>
                <input type="text" className="form-control" id="fname" value={fullName} onChange={(e) => { setFullName(e.target.value) }} placeholder='e.g., Aman VermaVisitor Name' />
              </div>
            </div>
            <div className="col-md-6">
              <label forHTML="contact" className="form-label">Contact Number</label>
              <div className="input-box d-flex">
                <div className="icon"><i className="fa-solid fa-phone mt-2 mx-2"></i></div>
                <input type="number" className="form-control" id="contact" placeholder='10-digit mobile' value={contactNumber} onChange={(e) => { setContactNumber(e.target.value) }} />
              </div>

            </div>



            <div className="col-md-12">
              <label forHTML="course" className="form-label">Adreess</label>
              <div className="input-box d-flex">
                <div className="icon"><i className="fa-solid fa-graduation-cap mt-2 mx-2"></i></div>
                <input type="text" className="form-control" id="name" placeholder='Any Remarks (Optionals)' value={adress} onChange={(e) => { setAddress(e.target.value) }} />
              </div>

            </div>
            <div className="col-12 text-end">
              <button type="submit" className="btn  px-4 py-2"> <i className="fa-solid fa-user-check"></i> Submit Details</button>
            </div>
          </div>
        </div>
      </>
    )
  }


  return (
    <>
      <nav>
        <div className="row home-nav-row">
          <div className="col-md-9 mx-auto text-md-center">
            <div className="row">
              <div className="col-md-6 home-nav-left py-4">
                <div className="img-cont">
                  <img src="./src/assets/spi.png" alt="" />
                </div>
                <div className="text-cont mx-3">
                  <h5 className='mt-3 text-white'>Softpro India Computer Technologies (P) Ltd.</h5>
                </div>
              </div>
              <div className="col-md-6 home-nav-right py-md-4 pb-5" >
                <div className="nav-text p-2">
                  <h6>A Company Founded by Technocrats from IIT & IET</h6>
                </div>
                <div className="nav-button mx-4">
                  <Link to="/log"><button className='btn btn-primary  rounded-pill px-4'> Login </button></Link>

                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="row form-section-row">
        <div className="col-md-9 mx-auto ">
          <div className="form-section my-5 p-4">
            <div className="row">
              <div className="col-md-4 form-section-left">
                <h4>Contact Us</h4>
                <p><i className="fa-solid fa-phone-volume fa-shake"></i> Call: +91 7080102006, 7080462022</p>
                <p><i className="fa-solid fa-envelope fa-bounce"></i> Email: hr@softproindia.in</p>
                <Formcard heading="Softpro Head Office" name="Softpro Tower, Near New Hanuman" add1="Temple, Kapoorthala, Aliganj," add2="Lucknow - 226006." contact="+91 7080102007" />
                <Formcard heading=" Softpro House Lucknow" name="3/213, Sector J, Jankipuram, Kursi Rd" add1="Near Gudamba Thana, Lucknow" add2="Uttar Pradesh-226026." contact="+91 7080462022" />
                <Formcard heading=" Softpro Full Stack Academy" add1="1/6, Vastu Khand, Gomtinagar," add2="Lucknow -226010." contact="+91 7080422022" />
                <Formcard heading=" Softpro Noida Office" name="Creatons Business Park," add1="Ground Floor, H - 35, Sec 63," add2="Noida Gautam Buddha Nagar, UP - 201301." contact=" +91 7080102006" />

              </div>
              <div className="col-md-8 ">
                <form onSubmit={addenq} method='action'>
                  <div className="equiry-form p-4 my-4">
                    <div className="enq-sec p-3">
                      <h2><i className="fa-regular fa-message"></i> Enquiry Form</h2>
                      <hr />
                      <label forHTML="" className='label-control mt-3'>You are a ?</label>
                      <div className="input-box d-flex">
                        <div className="icon"><i className="fa-solid fa-grip mt-2 mx-2"></i></div>
                        <select className='form-select w-100' value={role} onChange={(e) => { setRole(e.target.value) }}>
                          <option value="student"> Student</option>
                          <option value="visitorOff"> Visitor Official</option>
                          <option value="visitorPer"> Visitor Personal</option>
                        </select>
                      </div>

                      <label forHTML="" className='label-control mt-3' >You are at ?</label>
                      <div className="input-box d-flex">
                        <div className="icon"><i className="fa-solid fa-grip mt-2 mx-2"></i></div>
                        <select name="center" id="stu" className='form-control' value={center} onChange={(e) => { setCenter(e.target.value) }}>
                          <option > --Select Center--</option>
                          {
                            centers.map((c) => (
                              <option key={c._id} value={c.name}>
                                {c.name}
                              </option>
                            ))
                          }

                        </select>
                      </div>

                    </div>


                    {forminput}





                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="row">
          <div className="col-sm-12 fw-bold text-center py-4 fs-5 footer-col">
            2025 © Copyright Softpro India Computer Technologies (P) Ltd. All rights Reserved.
          </div>
        </div>
      </footer>
    </>
  )
}

export default Home
