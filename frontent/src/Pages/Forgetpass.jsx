import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Forgetpass() {
    const [email, setEmail]  =useState('')
    const [otp, setOtp] =useState('')
    const [password, setPassword]  =useState('')
    const [conpass, setConpass]  =useState('')
    const [step,setStep]=useState(1)
    const navigate =useNavigate()

    
    const sedOtp =async(e)=>{
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/api/otp/send_otp',{email})

        if(res.data.msg=="Success"){
            toast.success("OTP Send Successfully")
            setStep(2)
        }
        else{
            toast.error(res.data.msg || "OTP not send")
        }
    }
    async function varifyOtp(e) {
        e.preventDefault();
         const res = await axios.post('http://localhost:5000/api/otp/varify_otp',{email,otp})
        if(res.data.msg=="Success"){
            toast.success("Varification Done")
            setStep(3)
        }
        else{
            toast.error(res.data.msg || "Not Varified")
        }

    }
    async function resetPassword(e) {
        e.preventDefault()
       if(password !==conpass){
        return toast.error("Password Not Match")
       }
        const res = await axios.post('http://localhost:5000/api/otp/create_pass',{email,conpass})
        if(res.data.msg=="Success"){
            toast.success("New Password Created")
            navigate('/log')

        }
        else{
             toast.error(res.data.msg || "Password Not Created")
        }
        
    }

  return (
    <div className="row">
        <div className="col-md-6 mx-auto mt-4 p-3">
            <h5>Forget Password</h5>
            {
                step==1 &&(
                    <form action="" className="shadow-lg p-4 rounded-2 mt-2" onSubmit={sedOtp}>
                   <label htmlFor="" className='label-control'>Enter Your Email</label>
                   <input type="email" className='form-control' value={email} onChange={(e)=>setEmail(e.target.value)} />
                   <button className="btn btn-primary mt-4 w-100">Send OTP</button>
            </form>
                )
            }
            {
                step==2 &&(
                   <form action="" className="shadow-lg p-4 rounded-2 mt-2" onSubmit={varifyOtp}>
                   <label htmlFor="" className='label-control'>Enter Your Otp</label>
                   <input type="text" className='form-control'  value={otp} onChange={(e)=>setOtp(e.target.value)}/>
                   <button className="btn btn-primary mt-4 w-100" type='submit'>Varify OTP</button>
            </form> 
                )
            }
            {
                step==3 &&(
                    <form action="" className="shadow-lg p-4 rounded-2 mt-2" onSubmit={resetPassword}>
                   <label htmlFor="" className='label-control'>Enter Your Password</label>
                   <input type="password" className='form-control'  value={password} onChange={(e)=>setPassword(e.target.value)}/>
                   <label htmlFor="" className='label-control'>Enter Your Confirm Password</label>
                   <input type="password" className='form-control'  value={conpass} onChange={(e)=>setConpass(e.target.value)}/>
                   <button className="btn btn-primary mt-4 w-100" type='submit'>Change Password</button>
            </form>
                )
            }

        </div>
    </div>
  )
}

export default Forgetpass
