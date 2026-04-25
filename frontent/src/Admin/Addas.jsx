import React, { useEffect } from 'react'
import Overviewbox from '../Component/Overviewbox'
import Centercard from '../Component/Centercard'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';

function Addas() {
  const [name, setName] = useState('');
  const [asenq, setAsenq] = useState('')
  const [activecenter, setActivecenter] = useState([])
  const [center, setCenter] = useState('')
  const [allenq, setAllenq] = useState('')
  const [followup, setFollowup] = useState([])

  const getadmin = async () => {
    try {
      const res = await axios.get('http://localhost:5000/admin/stats')
      if (res.data.msg == "Success") {
        const name = res.data.admin
        const allenq = res.data.allenq
        const center = res.data.center
        const followup = res.data.followup;

        setFollowup(followup)
        setCenter(center)
        setName(name)
        setAllenq(allenq)

        const asenq = allenq.filter((e) => e.assignto)
        setAsenq(asenq)

        const activecenter = center.filter((e) => e.status == "Active")
        setActivecenter(activecenter)
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    try {
      getadmin();
    } catch (err) {
      console.log(err);
    }
  }, [])

  return (
    <>
      <div className="row dash-row p-3">
        <div className="col-sm-12">

          <div className="row mt-3 complete-report p-3">
            <div className="col-sm-5  ">
              <h6>Complete Reports</h6>
              <p>Quick snapshot of progress - what you did & what's next</p>
            </div>
            <div className="col-sm-7 pt-3">
              <form className='d-flex justify-content-between'>
                <select name="year">
                  <option value="">Year</option>
                  <option>2026</option>
                  <option>2025</option>
                  <option>2024</option>
                  <option>2023</option>
                  <option>2022</option>
                </select>

                <input type="date" />
                <input type="date" />
                <div className="report-btn">
                  <button className='btn '>Apply</button>
                  <button className='btn'>Reset</button>
                </div>
              </form>
            </div>
          </div>

          <div className="row admin-welcome-row mt-3 ">
            <div className="col-sm-8 ps-0 ">
              <div className='admin-welcome-left p-3'>
                <div className="row">
                  <div className="col-md-6">
                    <p>Welcome <strong>{name}</strong> </p>
                    <p>Overview</p>
                    <p> <strong>{allenq.length}</strong> enquiries </p>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-2">
                        <p className='m-0 mt-3'>Assigned</p>
                        <h6 className='fw-bolder text-end m-0'>{asenq.length}</h6>
                      </div>
                      <div className="col-10  px-4">
                        <p className=' m-0' >Progress</p>
                        <div className="progress my-2">
                          <div className="progress-bar"
                            style={{ width: `${(asenq.length / allenq.length) * 100}%` }}>
                          </div>
                        </div>
                        <p className='text-end'>
                          {Math.floor((asenq.length / allenq.length) * 100)}% Assigned
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row ">
                  <div className="col-sm-3 col-md-6 col-lg-3">
                    <Overviewbox heading="Today's follow-ups" num={followup.length} res="Over due:" span="0" />
                  </div>

                  <div className="col-sm-3 col-md-6 col-lg-3">
                    <Overviewbox
                      heading="Registered"
                      num={followup.filter((e) => e.status == "Register").length}
                      res="Total conversions"
                    />
                  </div>

                  <div className="col-sm-3 col-md-6 col-lg-3">
                    <Overviewbox heading="Centers" num={activecenter.length} res="Active centers" />
                  </div>
                </div>

              </div>
            </div>

            <div className="col-sm-4">
              <div className="p-3 admin-welcome-right">
                <h6 className='fw-bolder'>Action Items</h6>
                <p className='text-end'>What to do next</p>

                <div className="leads p-3">
                  <h5>{asenq.length} assigned</h5>
                </div>

                <div className="today p-3 mt-3">
                  <h5>0 calls due</h5>
                </div>
              </div>
            </div>
          </div>

          <p className='fw-bolder'>Centers</p>

          <div className="row">
            {
              activecenter.map((u, i) => (
                <div key={i} className="col-sm-12 col-md-6 col-lg-4 col-xl-3 p-2">
                  <Centercard
                    heading={u.name}
                    assi={allenq.filter((e) => e.assignto && e.center == u.name).length}
                    follow={followup.filter((e) => e.enqid && e.enqid.center == u.name).length}
                    enq={allenq.filter((e) => e.center == u.name).length}
                  />
                </div>
              ))
            }
          </div>

        </div>
      </div>
    </>
  )
}

export default Addas