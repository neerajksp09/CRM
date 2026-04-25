import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function Addenq() {
  const [center, setCenter] = useState('')
  const [centers, setCenters] = useState([])
  const [source, setSource] = useState('')
  const [fullName, setFullName] = useState('')
  const [collage, setCollage] = useState('')
  const [course, setCourse] = useState('')
  const [branch, setBranch] = useState('')
  const [year, setYear] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [email, setEmail] = useState('')
  const [forprogram, setForprogram] = useState('')

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

  const addenq = async (e) => {
    e.preventDefault()
    try {
      const enq = {
        fullName,
        collage,
        course,
        branch,
        year,
        contactNumber,
        email,
        forprogram,
        center: center
      };

      const res = await axios.post("http://localhost:5000/api/enq", enq);
      if (res.data.msg == "Success") {
        toast.success('Data added SuccessFully')
      }
      else {
        toast.error('Something went wrong')
      }
    } catch (err) {
      console.log(err);
      toast.error('Server Error')
    }
  }

  useEffect(() => {
    try {
      getcenter()
    } catch (err) {
      console.log(err);
    }
  }, [])

  return (
    <>
      <div className="row add-enq-row">
        <div className="col-sm-8 mx-auto ">
          <form className='my-4 p-4 ' onSubmit={addenq}>
            <h3 className='text-center my-3'>Add Student Enquiry</h3>

            <div className="row">
              <div className="col-md-6 p-3">
                <select className='form-control' value={center} onChange={(e) => setCenter(e.target.value)}>
                  <option value="">--Select Center--</option>
                  {centers.map((c) => (
                    <option key={c._id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 p-3">
                <select className='form-control' value={source} onChange={(e) => setSource(e.target.value)} >
                  <option value="">--Walk-in--</option>
                </select>
              </div>

              <div className="col-md-6 p-3">
                <input type="text" placeholder='Full Name' className='form-control' value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>

              <div className="col-md-6 p-3">
                <input type="text" placeholder='Collage' className='form-control' value={collage} onChange={(e) => setCollage(e.target.value)} />
              </div>

              <div className="col-md-6 p-3">
                <input type="text" placeholder='Course' className='form-control' value={course} onChange={(e) => setCourse(e.target.value)} />
              </div>

              <div className="col-md-6 p-3">
                <input type="text" placeholder='Branch' className='form-control' value={branch} onChange={(e) => setBranch(e.target.value)} />
              </div>

              <div className="col-md-6 p-3">
                <input type="text" placeholder='Year' className='form-control' value={year} onChange={(e) => setYear(e.target.value)} />
              </div>

              <div className="col-md-6 p-3">
                <input type="Number" placeholder='Contact Number' className='form-control' value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
              </div>

              <div className="col-md-6 p-3">
                <input type="text" placeholder='Email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="col-md-6 p-3">
                <select className='form-control ' value={forprogram} onChange={(e) => setForprogram(e.target.value)}>
                  <option value="">--Select Program--</option>
                  <option value="fullstack">Full Stack</option>
                </select>
              </div>

              <div className="col-md-12 text-center">
                <button className='px-5 py-3 my-4' type='submit'>Save Enquiry</button>
              </div>
            </div>

          </form>

          <footer>
            <p className='my-4 text-center'>Design and Devleped by <strong>Neeraj Kashyap</strong></p>
          </footer>
        </div>
      </div>
    </>
  )
}

export default Addenq