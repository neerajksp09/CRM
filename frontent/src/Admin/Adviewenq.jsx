import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "../Manager/Menq.css"
import { toast } from 'react-toastify';

function Adviewenq() {
    const [enq, setEnq] = useState([]);
    const [editId, setEditId] = useState(null);
    const [rem, setRem] = useState('')
    const [search, setSearch] = useState('');
    const [user, setUser] = useState([]);
    const [filteruser, setFilteruser] = useState([])
    const [uid, setUid] = useState('');
    const [status,setStatus]=useState('')
    const [filterfollowup, setFilterfollowup] = useState([])
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        contactNumber: "",
        collage: "",
        course: "",
        branch: "",
        year: "",
        purpose: "",
       staus:""
    });
    const [selectedEnq, setSelectedEnq] = useState([]);

    const getenq = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/enq')
            if (response.data.msg == "Success") {
              const enq =response.data.enq
                setEnq(enq);
            }
        } catch (err) {
            console.log(err);
            toast.error("Failed to fetch enquiries");
        }
    }

    const getuser = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/user')
            if (response.data.msg == "Success") {
                setUser(response.data.user);
            }
        } catch (err) {
            console.log(err);
            toast.error("Failed to fetch users");
        }
    }

    const deleteEnq = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/enq/${id}`);
            if (res.data.msg === "Success") {
                toast.success("Deleted Successfully");
                getenq();
            }
        } catch (err) {
            console.log(err);
            toast.error("Delete Error");
        }
    };

    const handleEdit = (data) => {
        setFormData(data);
        setEditId(data._id);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const updateEnq = async (e) => {
        e.preventDefault();
        const d = Date()
        const data = { "assignto": uid, "assignby": localStorage.getItem('admin'), assigndate: d }

        try {
            const res = await axios.put(
                `http://localhost:5000/api/enq/${editId}`,
                data
            );
            const assigndata = { enqid: editId, assignto: uid, assignby: localStorage.getItem('admin'), assignbyModel: "admin", remark: rem };
            const res2 = await axios.post(`http://localhost:5000/api/assignmodel`, assigndata);

            if (res.data.msg === "Success" && res2.data.msg == "Success") {
                toast.success("Updated Successfully");
                setEditId(null);
                setUid("");
                setRem("")
                getenq();
            }
            else {
                toast.error("Something went wrong")
            }
        } catch (err) {
            console.log(err);
            toast.error("Update Failed");
        }
    };

    const filteredenq = enq.filter((e) => {
        return (
            e.fullName?.toLowerCase().includes(search.toLowerCase()) ||
            e.email?.toLowerCase().includes(search.toLowerCase()) ||
            e.contactNumber?.toLowerCase().includes(search.toLowerCase()) ||
            e.course?.toLowerCase().includes(search.toLowerCase()) ||
            e.center?.toLowerCase().includes(search.toLowerCase())
        )
    })

    const assignfun = (e) => {
        console.log(e);
        setEditId(e._id);
        var fu = user.filter((u) => {
            if (e.assignto && e.assignto._id == u._id) {
                return false
            }
            else {
                return u.center?.includes(e.center);
            }
        })
        setFilteruser(fu)
        console.log("Enq center:", e.center);
        console.log("User centers:", user.map(u => u.center));
    }

    const handleRowClick = (data) => {
        setSelectedEnq(data);
        setEditId(data._id);
        getfollowup(data._id)

        const modal = new window.bootstrap.Modal(document.getElementById('exampleModal1'));
        modal.show();
    };

    const getfollowup = async (id) => {
        try {
            const res = await axios.get('http://localhost:5000/api/followup');

            if (res.data.msg == "Success") {
                const followupdata = res.data.followup;
                const fd = followupdata.filter((f) => {
                    return f.enqid._id == id;
                })
                setFilterfollowup(fd)
            }
        } catch (err) {
            console.log(err);
            toast.error("Failed to fetch followups");
        }
    }

    useEffect(() => {
        getenq();
        getuser();
    }, [])


    return (
        <>





            <div className="row menq-row">
                <div className="col-sm-12 p-4">
                    <div className="menq-con p-4">
                        <div className="row">
                            <div className="col-md-3 p-2">
                                <h4 className='mt-5'>Enquiries</h4>
                                <div className="btn-group mt-4" role="group" aria-label="Basic radio toggle button group">
                                    <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked />
                                    <label className="btn btn-outline-primary" for="btnradio1">Table</label>

                                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autocomplete="off" />
                                    <label className="btn btn-outline-primary" for="btnradio2">Card</label>
                                </div>

                            </div>
                            <div className="col-md-9 d-flex gap-3 justify-content-between flex-md-wrap p-2">
                                <div className="menq-num p-4 card w-25">
                                    <p>Total Enquiries</p>
                                    <h2>{enq.length}</h2>

                                </div>
                                <div className="menq-num p-4 card w-25">
                                    <p>Assigned</p>
                                    <h2>{enq.filter((e)=>e.assignto).length}</h2>

                                </div>
                                <div className="menq-num p-4 card w-25">
                                    <p>Not Assigned</p>
                                    <h2>{enq.length-enq.filter((e)=>e.assignto).length}</h2>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 p-4 enq-form-sec">
                        {

                            <form action="" className='p-4'>

                                <div className="row">
                                    <div className="col-md-2 p-2">
                                        <label htmlFor="" className='label-control'>Search</label>
                                        <input type="Serch" className='form-control' placeholder='Name,Mobile,Email' />
                                    </div>
                                    <div className="col-md-2 p-2">
                                        <label htmlFor="" className='label-control'>Status</label>
                                        <select className='form-select' >
                                            <option value="">All</option>
                                            <option value="">Active</option>
                                            <option value="">Deactive</option>
                                        </select>
                                    </div>
                                    <div className="col-md-2 p-2">
                                        <label htmlFor="" className='label-control'>Assign To</label>
                                        <select className='form-select' >
                                            <option value="">All</option>
                                            <option value="">Manager</option>
                                            <option value="">Councelor</option>
                                        </select>
                                    </div>
                                    <div className="col-md-2 p-2">
                                        <label htmlFor="" className='label-control'>Center</label>
                                        <select className='form-select' >
                                            <option value="">All</option>
                                            <option value="">Active</option>
                                            <option value="">Deactive</option>
                                        </select>
                                    </div>
                                    <div className="col-md-2 p-2">
                                        <label htmlFor="" className='label-control'>Source</label>
                                        <select className='form-select' >
                                            <option value="">All</option>
                                            <option value="">Walked In</option>
                                            <option value="">Online</option>
                                        </select>
                                    </div>
                                    <div className="col-md-2 p-2">
                                        <label htmlFor="" className='label-control'>Session</label>
                                        <select className='form-select' >
                                            <option value="">All</option>
                                            <option value="">Active</option>
                                            <option value="">Deactive</option>
                                        </select>
                                    </div>
                                    <div className="col-md-2 p-2">
                                        <label htmlFor="" className='label-control'>Next Fallow-up</label>
                                        <select className='form-select' >
                                            <option value="">All</option>
                                            <option value="">Active</option>
                                            <option value="">Deactive</option>
                                        </select>
                                    </div>
                                    <div className="col-md-2 p-2">
                                        <label htmlFor="" className='label-control'>From</label>
                                        <input type="date" className='form-control' />
                                    </div>
                                    <div className="col-md-2 p-2">
                                        <label htmlFor="" className='label-control'>to</label>
                                        <input type="date" className='form-control' />
                                    </div>

                                    <div className="col-md-2 p-2">

                                        <input type="submit" className='btn btn-light border border-1 border-dark px-5 py-2 mt-4' value={"Reset"} />
                                    </div>
                                </div>
                            </form>

                        }
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12 p-4">
                        <div className="menq-btn-row">
                            <div className="row">
                                <div className="col-md-6 d-flex gap-3 flex-wrap">
                                    <button className='p-2'>Copy</button>
                                    <button className='p-2'>Excel</button>
                                    <button className='p-2'>Pdf</button>
                                    <select className='p-2'  >
                                        <option value="">Column Visibility <i className="fa-solid fa-caret-down"></i></option>
                                    </select>
                                    <select className='p-2'  >
                                        <option value="">Show 10 Rows <i className="fa-solid fa-caret-down"></i></option>
                                    </select>
                                </div>
                                <div className="col-md-6 text-end ">
                                    <label htmlFor="" className='px-2'>Search :  </label>
                                    <input type="search" className='py-2' onChange={(e) => setSearch(e.target.value)} />
                                </div>
                            </div>
                        </div>


                        <div className="m-enq-table p-4 my-4 table-responsive">
                            <table className='table'>
                                <thead className='enq-table-head'>
                                    <tr >
                                        <th>S.no</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                        <th>Source</th>
                                        <th>Name</th>
                                        <th>Collage</th>
                                        <th>Center</th>
                                        <th>For Program</th>
                                        <th>Assigned</th>
                                        <th>Status</th>
                                        <th>Next Follow-up</th>
                                    </tr>
                                </thead>
                                <tbody className='enq-table-body'>
                                    {
                                        filteredenq.map((e, i) => (
                                            <tr key={i} onClick={() => handleRowClick(e)} style={{ cursor: "pointer" }} >
                                                <td>{i + 1}</td>
                                                <td>{e.createdAt.split('T')[0]}</td>
                                                <td>

                                                    <div className="div-line d-flex gap-2">
                                                        <a href={`https://api.whatsapp.com/send?${e.contactNumber}`} className=" btn btn-outline-warning rounded-4 h-25 mt-2" target='_blank' onClick={(e) => e.stopPropagation()}>WA</a>
                                                        <a href={`https://api.whatsapp.com/send?${e.contactNumber}`} className=" btn btn-outline-success rounded-4 mt-2 h-25" target='blank' onClick={(e) => e.stopPropagation()} >Copy</a>

                                                        <div className="dropdown-center p-2 " >
                                                            <button className="btn btn-outline-secondary rounded-5" type="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={(e) => e.stopPropagation()}>
                                                                <i className="fa-solid fa-ellipsis"></i>
                                                            </button>
                                                            <ul className="dropdown-menu mt-2 "  >
                                                               
                                                                <li className='text-center'><button className='btn btn-outline-primary m-1 rounded-5' onClick={(c) => { deleteEnq(e._id); c.stopPropagation(); }}>Delete</button>
                                                                </li>
                                                               {
                                                                e.status=="u" &&
                                                                 <li className='text-center'>

                                                                    <button type="button" className="btn btn-outline-danger m-1 rounded-5" data-bs-toggle="modal" data-bs-target="#exampleModal12" data-bs-whatever="@mdo" onClick={(c) => { assignfun(e); c.stopPropagation(); }}>Assign</button>
                                                                </li>
                                                               }
                                                                <li>





                                                                </li>

                                                            </ul>
                                                        </div>
                                                    </div>

                                                </td>
                                                <td >
                                                    <div className='bg-secondary rounded-3 p-2 text-nowrap text-light mt-1'>{e.source}</div>
                                                </td>
                                                <td>
                                                    <h4>{e.fullName}</h4>
                                                    <p className='my-0'>{e.contactNumber}</p>
                                                    <p className='my-0'>{e.email}</p>
                                                    <p className='my-0'>{e.course}</p>
                                                </td>
                                                <td>
                                                    {e.collage}
                                                </td>
                                                <td>
                                                    {e.center}
                                                </td>
                                                <td>
                                                    {e.forprogram || "-"}
                                                </td>
                                                <td>
                                                    {e.assignto ? e.assignto.name : "Not-Assigned"}
                                                </td>
                                                <td className={e.status=="u"?"text-success":"text-danger"}>
                                                    {e.status=="u"?"Active":"Deactive"}
                                                </td>
                                                <td>
                                                    {e.followupdate || "-"}
                                                </td>
                                            </tr>
                                        ))
                                    }





                                </tbody>
                            </table>
                        </div>

                        {/* form modal */}
                        <div className="assign-modal">
                            <div className="modal fade" id="exampleModal12" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Assign Enquiry</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <form onSubmit={updateEnq}>
                                            <div className="modal-body">

                                                <div className="mb-3">
                                                    <label for="recipient-name" className="col-form-label">Assign/Transfer:</label>
                                                    {/* <input type="text" value={editId} /> */}
                                                    <select className='form-select' value={uid} onChange={(e) => setUid(e.target.value)}>
                                                        <option value="">--Not Assigned--</option>

                                                        {
                                                            filteruser.map((u) => (
                                                                <option key={u._id} value={u._id}  >{u.name} <b> <i> {u.role == "manager" ? "(M)" : "(C)"} </i></b> </option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label for="message-text" className="col-form-label">Message:</label>
                                                    <textarea className="form-control" id="message-text" value={rem} onChange={(e) => setRem(e.target.value)}></textarea>
                                                </div>

                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="submit" className="btn btn-primary">Assign</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* modal  */}
                        <div className="modal fade" id="exampleModal1" tabIndex="-1">
                            <div className="modal-dialog modal-xl modal-dialog-centered">
                                <div className="modal-content">

                                    {/* HEADER */}
                                    <div className="modal-header">
                                        <div>
                                            <h5 className="modal-title">
                                                Enquiry #{selectedEnq?._id?.slice(-4)} - {selectedEnq?.fullName}
                                            </h5>
                                            <small className="text-muted">
                                                {selectedEnq?.course} • {selectedEnq?.center}
                                            </small>
                                        </div>
                                        <button className="btn-close" data-bs-dismiss="modal"></button>
                                    </div>

                                    {/* FILTER SECTION */}
                                    <div className="px-3 pt-2 d-flex gap-2">
                                        <input type="date" className="form-control" />
                                        <input type="date" className="form-control" />
                                        <button className="btn btn-warning">Apply Date Filter</button>
                                        <button className="btn btn-outline-secondary">Reset</button>
                                    </div>

                                    {/* STATUS CARDS */}
                                    <div className="row px-3 mt-3">
                                        <div className="col-md-3">
                                            <div className="card p-2">
                                                <small>Assigned To</small>
                                                <b>{selectedEnq?.assignto?.name || "Not Assigned"}</b>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="card p-2">
                                                <small>Status</small>
                                                <b>{selectedEnq?.status || "New"}</b>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="card p-2">
                                                <small>Next Follow-up</small>
                                                <b>{selectedEnq?.nextfollowupdate || "-"}</b>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="card p-2">
                                                <small>Total Followups</small>
                                                <b>0</b>
                                            </div>
                                        </div>
                                    </div>

                                    {/* MAIN CONTENT */}
                                    <div className="row p-3">

                                        {/* LEFT SIDE - USER INFO */}
                                        <div className="col-md-5">
                                            <div className="card p-3">
                                                <h5>
                                                    {selectedEnq?.fullName}
                                                    <span className="badge bg-warning ms-2">New</span>
                                                </h5>

                                                <hr />

                                                <p><b>Mobile:</b> {selectedEnq?.contactNumber}</p>
                                                <p><b>Email:</b> {selectedEnq?.email}</p>
                                                <p><b>Course:</b> {selectedEnq?.course}</p>
                                                <p><b>Center:</b> {selectedEnq?.center}</p>
                                                <p><b>Created:</b> {selectedEnq?.createdAt?.split("T")[0]}</p>

                                                <div className="d-flex gap-2 mt-3">
                                                    <a
                                                        href={`tel:${selectedEnq?.contactNumber}`}
                                                        className="btn btn-outline-primary w-50"
                                                    >
                                                        Call
                                                    </a>

                                                    <a
                                                        href={`https://api.whatsapp.com/send/?phone=${selectedEnq?.contactNumber}`}
                                                        target="_blank"
                                                        className="btn btn-outline-success w-50"
                                                    >
                                                        WhatsApp
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        {/* RIGHT SIDE - TIMELINE */}
                                        <div className="col-md-7">
                                            <div className="card p-3">
                                                <div className="d-flex justify-content-between">
                                                    <h6>Follow-up Timeline</h6>
                                                    <button className="btn btn-sm btn-outline-secondary">Refresh</button>
                                                </div>

                                                {
                                                    filterfollowup.map((f) => (
                                                        <div className='mt-4'>
                                                            <div className='d-flex justify-content-between'>
                                                                <span className={`text-light mt-2 ${f.status == "Hot Enquiry" ? "bg-danger" : f.status == "Warm Enquiry" ? "bg-warning" : f.status == "Cold Enquiry" ? "bg-success" : "bg-info"} rounded-5 px-2 py-1`}>
                                                                    {f.status}
                                                                </span>
                                                                <span className='mt-2'>
                                                                    {f.createdAt.split('.')[0]}
                                                                </span>
                                                            </div>
                                                            <p className='p-2'>By <strong className='text-muted '>{f.uid.name}</strong></p>
                                                            <p className='px-2 py-0'>{f.remark}</p>
                                                            <p className='px-2 py-0'>Next date:  <strong className='text-muted '>{f.nextdate}</strong></p>

                                                        </div>

                                                    ))
                                                }


                                            </div>
                                        </div>

                                    </div>

                                    {/* ASSIGN SECTION */}
                                    <form onSubmit={updateEnq}>
                                        <div className="p-3 border-top">

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Assign To</label>
                                                    <select
                                                        className="form-control"
                                                        value={uid}
                                                        onChange={(e) => setUid(e.target.value)}
                                                    >
                                                        <option value="">-- Not Assigned --</option>
                                                        {user.map((u) => (
                                                            <option key={u._id} value={u._id}>
                                                                {u.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="col-md-6">
                                                    <label>Note</label>
                                                    <textarea
                                                        className="form-control"
                                                        value={rem}
                                                        onChange={(e) => setRem(e.target.value)}
                                                    ></textarea>
                                                </div>
                                            </div>

                                            <div className="text-end mt-3">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary"
                                                    data-bs-dismiss="modal"
                                                >
                                                    Assign Enquiry
                                                </button>
                                            </div>

                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                <footer >
                    <p className='text-center py-2'>Design and developed by <strong style={{ color: 'rgb(244, 117, 1)' }}>Neeraj kashyap</strong> </p>
                </footer>

            </div>















        </>
    )
}

export default Adviewenq
