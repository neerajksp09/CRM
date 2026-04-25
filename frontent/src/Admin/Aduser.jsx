import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function Aduser() {

    const [users, setUsers] = useState([]);
    const [centers, setCenters] = useState([]);
    const [name, setName] = useState("");
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [role, setRole] = useState("")
    const [center, setCenter] = useState("")
    const [search, setSearch] = useState("");
    const [editId, setEditId] = useState(null);
    const [selectedCenters, setSelectedCenters] = useState([]);

    const addusercode = async (e) => {
        e.preventDefault();
        try {
            const user = { name, number, email, role, password, center: selectedCenters };

            const res = await axios.post('http://localhost:5000/api/user', user);

            if (res.data.msg === "Success") {
                alert("User Added Successfully");
                setName("");
                setEmail("");
                setNumber("");
                setRole("");
                setPassword("");
                setSelectedCenters([]);
                getUsers();
            } else {
                alert("Something went wrong");
            }
        } catch (err) {
            console.log(err);
            alert("Server Error");
        }
    };

    const handleCenterCheckbox = (e) => {
        try {
            const { value, checked } = e.target;

            if (checked) {
                setSelectedCenters([...selectedCenters, value]);
            } else {
                setSelectedCenters(
                    selectedCenters.filter((item) => item !== value)
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    async function changeStatus(id, st) {
        try {
            const res = await axios.put(`http://localhost:5000/api/user/${id}/${st}`);
            if (res.data.msg == "Success") {
                toast.success("Status Updated")
                getUsers();
            }
            else {
                toast.error("something went wrong")
            }
        } catch (err) {
            console.log(err);
            toast.error("Server Error");
        }
    }

    const getcenter = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/center');
            if (res.data.msg == "Success") {
                let x = res.data.center;
                x = x.filter((e) => e.status == "Active");
                setCenters(x);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getUsers = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/user');
            if (res.data.msg === "Success") {
                setUsers(res.data.user);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const deletecenter = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/user/${id}`);
            if (response.data.msg == "Success") {
                toast.success('Delete Successfull')
                getUsers();
            }
        } catch (err) {
            console.log(err);
            toast.error("Delete Failed");
        }
    }

    const handleEdit = (user) => {
        try {
            setName(user.name);
            setEmail(user.email);
            setNumber(user.number);
            setRole(user.role);
            setSelectedCenters(user.center || []);
            setEditId(user._id);
        } catch (err) {
            console.log(err);
        }
    };

    const updateCenter = async (e) => {
        e.preventDefault();
        try {
            const user = { name, email, number, role, center: selectedCenters };

            const response = await axios.put(`http://localhost:5000/api/user/${editId}`, user);

            if (response.data.msg === "Success") {
                alert("Updated Successfully");

                setEditId(null);
                setName('');
                setEmail('');
                setRole('');
                setCenter('')
                setNumber('')

                getUsers();
            } else {
                alert("Error");
            }
        } catch (err) {
            console.log(err);
            alert("Update Failed");
        }
    };

    const filteredUsers = users.filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.email?.toLowerCase().includes(search.toLowerCase()) ||
        item.number?.toLowerCase().includes(search.toLowerCase()) ||
        item.role?.toLowerCase().includes(search.toLowerCase()) ||
        item.center?.join(", ").toLowerCase().includes(search.toLowerCase()) ||
        item.status?.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        try {
            getcenter();
            getUsers();
        } catch (err) {
            console.log(err);
        }
    }, [])

    return (
        <>
            <div className="row center-container">
                <div className="col-12">

                    <div className="row">
                        <div className="col-12 p-3 center-form">
                            <form className='p-4' onSubmit={editId ? updateCenter : addusercode}>
                                <h4 className='py-2'>Create New User</h4>

                                <div className="row">
                                    <div className="col-md-3">
                                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name"/>
                                    </div>

                                    <div className="col-md-3">
                                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                                    </div>

                                    <div className="col-md-2">
                                        <input type="number" className="form-control" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Mobile"/>
                                    </div>

                                    <div className="col-md-2">
                                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                                    </div>

                                    <div className="col-md-2">
                                        <select className='form-control' value={role} onChange={(e) => setRole(e.target.value)}>
                                            <option value="">--Role--</option>
                                            <option value="manager">Manager</option>
                                            <option value="counselor">Counselor</option>
                                        </select>
                                    </div>

                                    <div className="col-md-12 p-3">
                                        {centers.map((c) => (
                                            <div key={c._id}>
                                                <input
                                                    type="checkbox"
                                                    value={c.name}
                                                    checked={selectedCenters.includes(c.name)}
                                                    onChange={handleCenterCheckbox}
                                                />
                                                <span>{c.name}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <input type="submit" value={editId ? "Update User" : "Create User"} className='btn btn-info' />
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Aduser;