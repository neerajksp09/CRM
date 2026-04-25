import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function Center() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [status, setStatus] = useState('')
    const [search, setSearch] = useState('');
    const [editId,setEditId]=useState(null);

    const [centers, setCenters] = useState([]);

    const addcenter = async (e) => {
        e.preventDefault();
        const center = { name, address, status }
        try {
            const response = await axios.post('http://localhost:5000/api/center', center)

            if (response.data.msg == "Success") {
                toast.success("Center Data Submited Success")
                setName('');
                setAddress('');
                setStatus('')
                console.log("CenterData", center)
                getcenter();
            }
            else {
                toast.error("Something Went Wrong")
            }
        } catch (err) {
            console.log(err);
            toast.error("Server Error");
        }
    }

    const getcenter = async (e) => {
        try {
            const response = await axios.get('http://localhost:5000/api/center');
            if (response.data.msg == "Success") {
                setCenters(response.data.center);
            }
        } catch (err) {
            console.log(err);
            toast.error("Fetch Error");
        }
    }

    const deletecenter = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/center/${id}`);
            if (response.data.msg == "Success") {
                toast.success('Delete Successfull')
                getcenter();
            }
        } catch (err) {
            console.log(err);
            toast.error("Delete Failed");
        }
    }

    const handleEdit = (center) => {
        setName(center.name);
        setAddress(center.address);
        setStatus(center.status);
        setEditId(center._id);
    };

    const updateCenter = async (e) => {
        e.preventDefault();

        const center = { name, address, status };

        try {
            const response = await axios.put(
                `http://localhost:5000/api/center/${editId}`,
                center
            );

            if (response.data.msg === "Success") {
                alert("Updated Successfully");

                setEditId(null);
                setName('');
                setAddress('');
                setStatus('');

                getcenter();
            } else {
                alert("Error");
            }
        } catch (err) {
            console.log(err);
            alert("Update Failed");
        }
    };

    const filteredCenters = centers
        .filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.address.toLowerCase().includes(search.toLowerCase()) ||
            item.status.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            const aMatch = a.name.toLowerCase().includes(search.toLowerCase());
            const bMatch = b.name.toLowerCase().includes(search.toLowerCase());
            return bMatch - aMatch;
        });

    async function changeStatus(id,st){
        try {
            const res= await axios.put(`http://localhost:5000/api/center/${id}/${st}`)
            if(res.data.msg=="Success"){
                toast.success("Status Added Success")
                getcenter();
            }
            else{
                toast.error("Error")
            }
        } catch (err) {
            console.log(err);
            toast.error("Status Update Failed");
        }
    }

    useEffect(() => {
        getcenter();
    }, [])

    return (
        <>

            <div className="row center-container  ">
                <div className="col-12">
                    <div className="row">
                        <div className="col-12 p-3 center-form">
                            <form action="" className=' p-4 ' onSubmit={editId?updateCenter:addcenter}>
                                <h4 className='py-2'>Create New Center</h4>
                                <div className="row">
                                    <div className="col-md-4">
                                        <label className="label-control py-2">Center name:</label>
                                        <input type="text" className="form-control p-2" value={name} placeholder='enter your name' onChange={(e) => setName(e.target.value)} />
                                    </div>

                                    <div className="col-md-4">
                                        <label className="label-control p-2">Location:</label>
                                        <input type="text" className="form-control p-2" placeholder='enter your name' value={address} onChange={(e) => setAddress(e.target.value)} />
                                    </div>

                                    <div className="col-md-4 d-flex">
                                        <div className="inp-btn w-50 px-3">
                                            <label className="label-control p-2"> Status:</label>
                                            <select className=' form-control p-2' value={status} onChange={(e) => setStatus(e.target.value)} >
                                                <option value="">--Select--</option>
                                                <option value="Active">Active</option>
                                                <option value="Deactive">Deactive</option>
                                            </select>
                                        </div>
                                        <input type="submit" value={editId?"Update Center":"Save Center"} className='btn btn-info form-control w-50 ' />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-11 mx-auto center-table p-4">
                            <h4 className='mt-3'>Existing Center</h4>
                            <div className="row my-4">
                                <div className="col-sm-6 d-flex gap-3">
                                    <button className='px-3 py-2'>Copy </button>
                                    <button className='px-3 py-2'>Excel </button>
                                    <button className='px-3 py-2'>Pdf </button>
                                    <select className='px-3 py-2' >
                                        <option value="">Column Visibility <i className="fa-solid fa-sort-down"></i></option>
                                    </select>
                                    <select className='px-3 py-2' >
                                        <option value="">Show 10 row <i className="fa-solid fa-sort-down"></i></option>
                                    </select>
                                </div>
                                <div className="col-sm-6 text-end">
                                    <label className='fs-5 mx-2'>Search: </label>
                                    <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} />
                                </div>
                            </div>
                            <div className="center-table-scroll">
                                <table border={1} className=''>
                                    <thead>
                                        <tr>
                                            <th>Sr.no <i className="fa-solid fa-up-down"></i></th>
                                            <th>Name <i className="fa-solid fa-up-down"></i></th>
                                            <th>Location <i className="fa-solid fa-up-down"></i></th>
                                            <th colSpan={2}>Status <i className="fa-solid fa-up-down"></i></th>
                                            <th >Action <i className="fa-solid fa-up-down"></i>  </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            centers
                                                .filter((item) =>
                                                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                                                    item.address.toLowerCase().includes(search.toLowerCase()) ||
                                                    item.status.toLowerCase().includes(search.toLowerCase())
                                                )
                                                .map((e, i) => (
                                                    <tr key={e._id}>
                                                        <td>{i + 1}</td>
                                                        <td>{e.name}</td>
                                                        <td>{e.address}</td>
                                                        <td >
                                                             <span className='' style={{color:`${e.status=="Active"?"green":"red"}`}}>{e.status}</span>
                                                        </td>
                                                        <td>
                                                            <button className='btn text-white p-2' style={{backgroundColor:`${e.status=="Active"?"red":"green"}`}} onClick={()=>{changeStatus(e._id,e.status)}}>{e.status=="Active"?"Deactive":"Active"}</button>
                                                        </td>
                                                        <td className='d-flex gap-3'><button className='btn btn-outline-warning' onClick={() => handleEdit(e)}>Edit</button> <button className='btn btn-outline-danger' onClick={()=>deletecenter(e._id)}>Delete</button></td>
                                                    </tr>
                                                ))
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <p className='py-3 d-flex justify-content-between table-down-text'>
                                <div> Showing 1 to 4 of 4 entities</div>
                                <div className='d-flex gap-4' > <button>Prevous</button> <span>1</span> <button>Next</button> </div>
                            </p>
                        </div>
                    </div>

                </div>

                <footer className='text-center py-4 center-footer'>
                    <p>Design and develop by <strong>Neeraj Kashyap</strong> </p>
                </footer>

            </div>

        </>
    )
}

export default Center