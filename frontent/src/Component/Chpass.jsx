import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Chpass(p) {
    const [cpass, setCpass] = useState('')
    const [npass, setNpass] = useState('')
    const [conpass, setConpass] = useState('')
    const [user, setUser] = useState({});
    const navigate = useNavigate()
    const chcode = async (e) => {
        e.preventDefault()
        console.log(p)
        if (p.role != "admin") {
            const res = await axios.get(`http://localhost:5000/api/user/${p.id}`)
            if (res.data.msg == "Success") {
                setUser(res.data.user)
                console.log(res.data.user)
                var opass = res.data.user.password
            }
            // else{
            //     console.log("Nahi Nahi")
            // }


            if (opass && opass != cpass) {
                toast.error("wrong Password")
                setCpass('')
                setNpass('')
                setConpass('')
            }
            else if (opass == npass) {
                toast.error("Dont Use Privious password")
                setNpass('')
                setConpass('')
            }
            else if (npass != conpass) {
                toast.error("Confirm Password Not Match")
                setNpass('')
                setConpass('')
            }
            else {
                if (p.role!= "admin") {
                    const data = {"password":npass }
                    console.log(data)
                    const res2 = await axios.put(`http://localhost:5000/api/user/${p.id}`,data)
                    if (res2.data.msg == "Success") {
                      toast.success("Password Changed Success")
                      navigate('/log')
                    }
                    else {
                        toast.error("Somthing went wrong")
                        setCpass('')
                        setNpass('')
                        setConpass('')
                    }
                }
            }
        }
    }


    return (
        <>
            <div className="row">
                <div className="col-sm-12">
                    <form action="" onSubmit={chcode} className=' mx-auto w-50 bg-danger rounded-4 p-4'>
                        <h4 className='text-center mb-4 text-white'>Change Password</h4>
                        <input type="password" className='form-control' value={cpass} onChange={(e) => setCpass(e.target.value)} placeholder='Current Password' /> <br />
                        <input type="password" className='form-control' value={npass} onChange={(e) => setNpass(e.target.value)} placeholder='New Password' /> <br />
                        <input type="password" className='form-control' value={conpass} onChange={(e) => setConpass(e.target.value)} placeholder='Confirm Password' /> <br />
                        <div className="bt text-center">
                            <input type="submit" value="Change Password" className='btn btn-success w-50' />
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default Chpass
