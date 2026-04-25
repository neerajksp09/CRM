import React, { useEffect, useState } from 'react'
import bg1 from "../assets/bg1.jpg"
import "./councprofile.css"
import axios from 'axios'
// import "../assets/bg1.jpg"
import avtar from '../assets/avtar.png'
import a1 from '../assets/a2.jpg'
import { toast } from 'react-toastify'
function CounProfile() {
   const [name, setName] = useState('')
   const [userdata, setUserdata] = useState('')
   const [check, setCheck] = useState(false)
   const [qual, setQual] = useState('')
   const [exp, setExp] = useState('')
   const [add, setAdd] = useState('')
   const [skill, setSkill] = useState('')

   async function getuser() {
      const res = await axios.get(`http://localhost:5000/api/user/${localStorage.getItem('counselor')}`)
      if (res.data.msg == "Success") {
         console.log('username', res.data.user)
         setUserdata(res.data.user)
         setSkill(res.data.user.skill)
         setAdd(res.data.user.add)
         setExp(res.data.user.exp)
         setQual(res.data.user.qual)
         const name = res.data.user.name
         setName(name)
      }


   }

   async function updateProfile() {
      console.log(check)
      if (check) {
         const datauser = { qual, exp, add, skill }
         const res = await axios.put(`http://localhost:5000/api/user/${localStorage.getItem('counselor')}`, datauser)
         if (res.data.msg == "Success") {
            toast.success("Update Success")
            getuser()
         }
         else {
            toast.error("Something went Wrong")
         }
      }

   }
   async function uploadPic(p) {
      const formdata = new FormData()
      //   console.log(p)
      if (p) {
         const res = await axios.patch(`http://localhost:5000/api/user/${localStorage.getItem('counselor')}`,{ 'profilePic': p })
         console.log(res)
         if (res.data.msg == "Success") {
            toast.success("Pic Uploaded")
         }
         else{
            toast.error("Something Went Wrong")
         }
      }
      else{
         toast.error("No image Selected")
      }

   }

   useEffect(() => {
      getuser()
   }, [])
   return (
      <>


         <div className="container-fluid">
            <div className="row changeprofile-bg " >
               <div className="col-md-6 h-100  p-3 ">
                  <div className="card h-100 shadow-lg p-4 " style={{ overflow: "auto" }}>
                     <div className='position-relative text-center'>
                        <img src={a1} alt="" className=' shadow-lg' style={{ height: "200px", width: "200px", borderRadius: "50%", margin: "0px auto" }} />
                        <label htmlFor="profilePic">
                           <i className="fa-solid fa-pen-to-square text-primary" style={{ position: "absolute", top: "77%", right: "33%", fontSize: "1.3rem" }}></i>
                        </label>

                        <input type="file" onChange={(e) => uploadPic(e.target.files[0])} style={{ display: "none" }} id='profilePic' />
                     </div>
                     <p className='my-2'>Name: <strong>{name}</strong> </p>
                     <p className=''>Email: <strong>{userdata.email}</strong> </p>
                     <p className=''>Mobile: <strong>{userdata.number}</strong> </p>
                     <p className=''>Center: <strong>{userdata.center}</strong> </p>
                     <p className=''>Mobile: <strong>{userdata.role}</strong> </p>
                     <p className=''>Qualification: <strong>{check ? <input value={qual} type="text" className='form-control mt-2 ' onChange={(e) => setQual(e.target.value)} /> : qual || "---"}</strong> </p>
                     <p className=''>Skill: <strong>{check ? <input type="text" value={skill} className='form-control mt-2 ' onChange={(e) => setSkill(e.target.value)} /> : skill || "---"}</strong> </p>
                     <p className=''>Experience: <strong>{check ? <input type="text" value={exp} className='form-control mt-2 ' onChange={(e) => setExp(e.target.value)} /> : exp || "---"}</strong> </p>
                     <p className=''>Address: <strong>{check ? <input type="text" value={add} className='form-control mt-2' onChange={(e) => setAdd(e.target.value)} /> : add || "---"}</strong> </p>
                     <button className='btn btn-warning mt-5' onClick={() => { setCheck(!check); updateProfile() }}>{!check ? "Update" : "Submit"}</button>



                  </div>
               </div>
               <div className="col-md-6 p-3">
                  <div className="card  shadow-lg my-3" style={{ height: "45%" }}>

                  </div>
                  <div className="card shadow-lg my-3" style={{ height: "45%" }}>

                  </div>
               </div>
            </div>
         </div>



      </>
   )
}

export default CounProfile
