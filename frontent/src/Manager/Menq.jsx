import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "../Manager/Menq.css"
import { toast } from 'react-toastify';

function Menq() {
    const [enq, setEnq] = useState([]);
    const [editId, setEditId] = useState(null);
    const [rem, setRem] = useState('')
    const [d, setd] = useState('')
    const [search, setSearch] = useState('');
    const [user, setUser] = useState([]);
    const [filteruser, setFilteruser] = useState([])
    const [uid, setUid] = useState('')
    const [status, setStatus] = useState('')
    const [nextdate, setNextdate] = useState('');
    const [programme, setProgramme] = useState('');
    const [remark, setRemak] = useState('');
    const [filterfollowup, setFilterfollowup] = useState([]);
    const [mydata,setMydata]=useState({})


    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        contactNumber: "",
        collage: "",
        course: "",
        branch: "",
        year: "",
        purpose: ""
    });
    const [selectedEnq, setSelectedEnq] = useState(null);

    const getenq = async () => {
        const response = await axios.get('http://localhost:5000/api/enq')
        const response2 = await axios.get(`http://localhost:5000/api/user/${localStorage.getItem('manager')}`)
        if (response.data.msg == "Success" && response2.data.msg == "Success") {
            setEnq(response.data.enq);
            
            setMydata(response2.data.enq)
            // console.log(setMydata)
            var enquiries = response.data.enq.filter((a) => {
                // return a.assignto ? a.assignto._id == localStorage.getItem('manager') : true;
            //    return a.center.includes(response2.data.user.center)
               return a.center ==response2.data.user.center
            })
            // console.log(enquiries);
            setEnq(enquiries);
            // console.log(response.data.enq)
        }
    }
    const getuser = async () => {
        const response = await axios.get('http://localhost:5000/api/user')
        if (response.data.msg == "Success") {
            setUser(response.data.user);
        }
    }
    //delete 
    const deleteEnq = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/enq/${id}`);
            if (res.data.msg === "Success") {
                alert("Deleted Successfully");
                getenq(); // refresh
            }
        } catch (err) {
            console.log(err);
            alert("Delete Error");
        }
    };
    //edit
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




    //update
    const updateEnq = async (e) => {
        e.preventDefault();
        const d = Date()
        const data = { "assignto": uid, "assignby": localStorage.getItem('admin'), assigndate: d }
        // try {
        const res = await axios.put(
            `http://localhost:5000/api/enq/${editId}`,
            data
        );
        const assigndata = { enqid: editId, assignto: uid, assignby: localStorage.getItem('manager'), assignbyModel: "user", remark: rem };
        const res2 = await axios.post(`http://localhost:5000/api/assignmodel`, assigndata);

        if (res.data.msg === "Success" && res2.data.msg == "Success") {
            alert("Updated Successfully");
            setEditId(null);
            setUid("");
            setRem("")
            getenq();
        }
        // } catch (err) {
        //     console.log(err);
        //     alert("Update Error");
        // }
    };

    //for Search value 
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
            if (localStorage.getItem('manager') == u._id) {
                return false;
            }
            else {
                return u.center?.includes(e.center);
            }

        })
        setFilteruser(fu)
        // console.log(u)
        console.log("Enq center:", e.center);
        console.log("User centers:", user.map(u => u.center));
    }

    const handleRowClick = (data) => {
        setSelectedEnq(data);
        if(data.assignto && data.assignto._id==localStorage.getItem('manager')){
            setd(false)
        }
        else{
            setd(true)
        }
        const offcanvas = new window.bootstrap.Offcanvas(
            document.getElementById("enqOffcanvas")
        );
        getfollowup(data._id)
        offcanvas.show();
    };


    async function addfollowup(fdata) {
        fdata.preventDefault();
        const followupdata = { 'enqid': selectedEnq._id, "uid": localStorage.getItem('manager'), status, nextdate, remark, programme }
        const res = await axios.post('http://localhost:5000/api/followup', followupdata)
        if (res.data.msg == "Success") {
            toast.success("Follow Up data Added Success");
            setStatus("");
            setNextdate("");
            setRemak("");
            setProgramme("")
        }
        else {
            toast.success("Something went Wrong")
        }

    }

    const getfollowup = async (id) => {
        const res = await axios.get('http://localhost:5000/api/followup');

        if (res.data.msg == "Success") {
            const followupdata = res.data.followup;
            const fd = followupdata.filter((f) => {
                return f.enqid._id == id;
            })
            setFilterfollowup(fd)
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
                                    <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" defaultChecked />
                                    <label className="btn btn-outline-primary" htmlFor="btnradio1">Table</label>

                                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />
                                    <label className="btn btn-outline-primary" htmlFor="btnradio2">Card</label>
                                </div>

                            </div>
                            <div className="col-md-9 d-flex gap-3 justify-content-between flex-md-wrap p-2">
                                <div className="menq-num p-4 card w-25">
                                    <p>Total Enquiries</p>
                                    <h2>10</h2>

                                </div>
                                <div className="menq-num p-4 card w-25">
                                    <p>Assigned</p>
                                    <h2>2</h2>

                                </div>
                                <div className="menq-num p-4 card w-25">
                                    <p>Not Assigned</p>
                                    <h2>8</h2>

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
                                            <tr key={i} onClick={() => {e.status=="u"?handleRowClick(e):toast.error("Enquiry is Deactive")}} style={{ cursor: "pointer" }}>
                                                <td>{i + 1}</td>
                                                <td>{e.createdAt.split('T')[0]}</td>
                                                <td>

                                                    <div className="div-line d-flex gap-2">
                                                        <a href={`https://api.whatsapp.com/send?${e.contactNumber}`} target='_blank' onClick={(e) => e.stopPropagation()} className=" btn btn-outline-warning rounded-5" >
                                                            WA
                                                        </a>
                                                        <a href={`https://api.whatsapp.com/send?${e.contactNumber}`} className=" btn btn-outline-success rounded-5 " onClick={(e) => e.stopPropagation()}>
                                                            Copy
                                                        </a>


                                                    </div>

                                                </td>
                                                <td>
                                                    <span className='bg-secondary rounded-5 text-light p-1'>{e.source}</span>
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
                                                <td>
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
                        {/* mModal */}
                        <div className="assign-modal">
                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Assign Enquiry</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <form onSubmit={updateEnq}>
                                            <div className="modal-body">

                                                <div className="mb-3">
                                                    <label htmlFor="recipient-name" className="col-form-label">Assign/Transfer:</label>
                                                    {/* <input type="text" value={editId} /> */}
                                                    <select className='form-select' value={uid} onChange={(e) => setUid(e.target.value)}>
                                                        <option value="">--Not Assigned--</option>

                                                        {
                                                            filteruser.map((u) => (
                                                                <option key={u._id} value={u._id} >{u.name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="message-text" className="col-form-label">Message:</label>
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

                        {/* MOffCanvas */}
                        {/* <div class="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptionsM" aria-labelledby="offcanvasWithBothOptionsLabel">
                            <div class="offcanvas-header">
                                <h5 class="offcanvas-title d-flex justify-content-between w-100" id="offcanvasWithBothOptionsLabel">
                                    <div>
                                        <h6>Enquiry Detail</h6>
                                        <p className='fs-6'>MBA Softpro House</p>
                                    </div>
                                    <button  className='btn' style={{backgroundColor:"Orange"}}>New</button>

                                </h5>

                                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div class="offcanvas-body">
                                <table className='table'>
                                  <tr>
                                    <td>Mobile</td>
                                    <td>8888888</td>
                                  </tr>
                                  <tr>
                                    <td>Email</td>
                                    <td>993</td>
                                  </tr>
                                  <tr>
                                    <td>Course</td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td>Center</td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td>Assigned</td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td>Created</td>
                                    <td></td>
                                  </tr>
                                </table>

                                <hr />
                                <div className="row">
                                    
                                </div>
                            </div>
                        </div> */}

                    </div>
                </div>


                <div
                    className="offcanvas offcanvas-end"
                    tabIndex="-1"
                    id="enqOffcanvas"
                    style={{ width: "420px" }}
                >
                    <div className="offcanvas-header border-bottom">
                        <div>
                            <h5 className="mb-0">Enquiry Details</h5>
                            <small className="text-muted">
                                {selectedEnq?.course} • {selectedEnq?.center}
                            </small>
                        </div>

                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="offcanvas"
                        ></button>
                    </div>

                    <div className="offcanvas-body">

                        {selectedEnq && (
                            <>
                                {/* USER HEADER */}
                                <div className="mb-3">
                                    <h6 className="mb-0">{selectedEnq.fullName}</h6>
                                    <small className="text-muted">
                                        {selectedEnq.course} • {selectedEnq.center}
                                    </small>

                                    <span className="badge bg-warning float-end">New</span>
                                </div>

                                <hr />

                                {/* DETAILS */}
                                <div className="mb-3">
                                    <p className="mb-1"><b>Mobile:</b> {selectedEnq.contactNumber}</p>
                                    <p className="mb-1"><b>Email:</b> {selectedEnq.email || "-"}</p>
                                    <p className="mb-1"><b>Course:</b> {selectedEnq.course}</p>
                                    <p className="mb-1"><b>Center:</b> {selectedEnq.center}</p>
                                    <p className="mb-1">
                                        <b>Assigned:</b> {selectedEnq.assignto?.name || "Not Assigned"}
                                    </p>
                                    <p className="mb-1">
                                        <b>Created:</b> {selectedEnq.createdAt?.split("T")[0]}
                                    </p>
                                </div>

                                {/* ACTION BUTTONS */}
                                
                                    <div className="d-flex gap-2 mb-3">
                                    <a
                                        href={`tel:${selectedEnq.contactNumber}`}
                                        className="btn btn-outline-primary w-100"
                                    >
                                        Call
                                    </a>

                                    <a
                                        href={`https://api.whatsapp.com/send/?phone=${selectedEnq.contactNumber}`}
                                        target="_blank"
                                        className="btn btn-outline-success w-100"
                                    >
                                        WhatsApp
                                    </a>
                                    <button type="button" className="btn btn-outline-warning w-100 " data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onClick={() => { assignfun(selectedEnq) }}>Transfer</button>


                                    </div>
                              

                                <hr />
 
                                {/* FOLLOW-UP SECTION */}
                                <h6>Add Follow-Up</h6>
                                   <form action="" onSubmit={addfollowup} >
                                    <div className="mb-2">
                                        <label>Status</label>
                                        <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                                            <option>Follow Up</option>
                                            <option>Warm Enquiry</option>
                                            <option>Hot Enquiry</option>
                                            <option>Cold Enquiry</option>
                                            <option>Not intrested</option>
                                            <option>Register</option>
                                        </select>
                                    </div>

                                    <div className="mb-2">
                                        <label>Next Follow-Up Date</label>
                                        <input type="date" className="form-control" value={nextdate} onChange={(e) => setNextdate(e.target.value)} />
                                    </div>

                                    <div className="mb-2">
                                        <label>For Programme</label>
                                        <select className="form-control" value={programme} onChange={(e) => setProgramme(e.target.value)}>
                                            <option>Select Programme</option>
                                            <option>Summer Traning</option>
                                            <option>Vocational Traning</option>
                                            <option>Industrial Traning</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label>Remark</label>
                                        <textarea
                                            className="form-control"
                                            placeholder="Write exact conversation notes..." value={remark} onChange={(e) => setRemak(e.target.value)}></textarea>
                                    </div>
                                    <input type="submit" value={"Save Follow-Up"} className="btn btn-warning w-100 mb-3" />
                                    {/* <button >
                                        
                                    </button> */}

                                    <hr />
                                </form>

                                {/* TIMELINE */}
                                <div className="d-flex justify-content-between align-items-center">
                                    <h6>Follow-Up Timeline</h6>
                                    <button className="btn btn-sm btn-outline-secondary">
                                        Refresh
                                    </button>
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

                            </>
                        )}

                    </div>
                </div>



                <footer >
                    <p className='text-center py-2'>Design and developed by <strong style={{ color: 'rgb(244, 117, 1)' }}>Neeraj kashyap</strong> </p>
                </footer>

            </div>















        </>
    )
}

export default Menq
