import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
 
function Login() {
    const [username, setUserName] = useState('');
    const [password,setPassword] = useState('')
    const navigate = useNavigate();
    // const [logadmin,setLogadmin] =useState('');
    const logcode =async (e)=>{
      e.preventDefault();
      const admin ={username,password};
      console.log("username",admin)
    const res = await axios.post('https://crm-xwea.onrender.com/admin/log',admin)
     if(res.data.msg=="Success"){
        toast.success('Login SuccessFullly')
        localStorage.setItem(res.data.role, res.data.id);
        setUserName("");
        setPassword("");
        if(res.data.role=="admin"){
            navigate('/admin')
        }
        else if(res.data.role=="manager"){
            navigate('/Mdash')
        }
        else{
            navigate('/Cdash')
        }
     }
     else{
        toast.error(res.data.msg);
        setPassword('')
     }
    }

    function showpass(){
        // console.log(eye);
       const t= document.querySelector('input[name=password]');
        if(t.type=="password"){
            t.type="text"
            eye.className="fa-solid fa-eye"
        }
        else{
            t.type="password"
            eye.className="fa-solid fa-eye-slash"
        }
    }

    const validate= ()=>{
        if(localStorage.getItem('admin')){
            localStorage.removeItem('admin');
        }
        if(localStorage.getItem('manager')){
            localStorage.removeItem('manager');
        }
        if(localStorage.getItem('counselor')){
            localStorage.removeItem('counselor');
        }
    }

    useEffect(()=>{
        validate();
    },[]);

    return (
        <>
            <div className="row login-row">
                <div className="col-sm-12 d-flex justify-content-center align-items-center">
                    <div className="login-form">
                        <form action="" className='p-4' onSubmit={logcode}>
                            <div className="logo-cont text-center my-4">
                                 <img src="./src/assets/spi.png" alt="" />
                                 <h5 className='my-2'>CRM</h5>
                            </div>
                            <h5>Welcome Back 👋</h5>
                            <p>Sign in to continue</p>
                            <div className="input-section">
                                <label htmlFor="userName" className='label-control py-2'>Username*</label>
                                <input type="text" className='form-control'  placeholder='Enter username' id='userName' value={username} onChange={(e)=>setUserName(e.target.value)} />

                                 <label htmlFor="c-pass" className='label-control py-2' >Password *</label>
                                <input type="password" className='form-control' name='password'  placeholder='Enter password' id='c-pass' value={password} onChange={(e)=>setPassword(e.target.value)} />
                                <i onClick={showpass} id='eye' className="fa-solid fa-eye"> </i>
                                <small><Link to={"/forget-password"}>Forget Password?</Link></small>
                                <button className='btn w-100 my-3 py-2 text-white fw-bold' type='submit'> <i className="fa-solid fa-arrow-right-to-bracket"></i> Sign-In </button>
                            </div>
                            <div className="form-footer  p-3 text-center">
                                Designed & Developed By <strong>Softpro India Computer Technologies (P). Ltd.</strong>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
