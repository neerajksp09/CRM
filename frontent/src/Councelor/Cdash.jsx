import React from 'react'
import Centercard from '../Component/Centercard'
import Overviewbox from '../Component/Overviewbox'

function Cdash() {
  return (
   <>
   <div className="row dash-row p-3">
        <div className="col-sm-12">


          {/* nav start */}
          

          {/* report section */}
          <div className="row mt-3 complete-report p-3">
            <div className="col-sm-5  ">
              <h6>Complete Reports</h6>
              <p>Quick snapshot of progress - what you did & what's next</p>
            </div>
            <div className="col-sm-7 pt-3">
              <form action="" className='d-flex justify-content-between'>
                <select name="year" id="year">
                  <option value="">Year</option>
                  <option value="">2026</option>
                  <option value="">2025</option>
                  <option value="">2024</option>
                  <option value="">2023</option>
                  <option value="">2022</option>
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

          {/* admin-welcome */}
          <div className="row admin-welcome-row mt-3 ">
            <div className="col-sm-8 ps-0 ">
              <div className='admin-welcome-left p-3'>
                <div className="row">
                  <div className="col-md-6">
                    <p>Welcome <strong>Councelor</strong> </p>
                    <p>Overview</p>
                    <p> <strong>12</strong> enquiries </p>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-2">
                        <p className='m-0 mt-3'>Assigned</p>
                        <h6 className='fw-bolder text-end m-0'> 2</h6>
                      </div>
                      <div className="col-10  px-4">
                        <p className=' m-0' >Progress</p>
                        <input type="range" className='w-100' />
                        <p className='text-end'>33% Assigned</p>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="row">
                  <div className="col-sm-3 col-md-6  col-lg-3">
                    <Overviewbox heading="Today's follow-ups" num="0" res="Over due:" span="2" />
                  </div>
                  <div className="col-sm-3 col-md-6 col-lg-3">
                    <Overviewbox heading="Workshop student" num="0" res="Recent: 0" />
                  </div>
                  <div className="col-sm-3 col-md-6 col-lg-3">
                    <Overviewbox heading="Registered" num="2" res="Total conversions" />
                  </div>
                  <div className="col-sm-3 col-md-6 col-lg-3">
                    <Overviewbox heading="Centers" num="4" res="Active centers" />
                  </div>
                </div>



              </div>
            </div>

            <div className="col-sm-4">
              <div className="p-3 admin-welcome-right">
                <div className="row">
                  <div className="col-6">
                    <h6 className='fw-bolder'>Action Items</h6>
                  </div>
                  <div className="col-6">
                    <p className='text-end'>What to do next</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="leads p-3">
                      <div className="row">
                        <div className="col-3 d-flex justify-content-center align-items-center">
                          <p>leads</p>
                        </div>
                        <div className="col-5">
                          <h5 className='fs-bold'>2 assigned</h5>
                          <p>Assigned across your centers</p>
                        </div>
                        <div className="col-4 d-flex justify-content-center align-items-center">
                          <div className="inq-box p-4 text-center">
                            View Enquires
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-12">
                    <div className="today p-3">
                      <div className="row">
                        <div className="col-3 d-flex justify-content-center align-items-center">
                          <p>Today</p>
                        </div>
                        <div className="col-5">
                          <h5 className='fs-bold'>0 cells due</h5>
                          <p>prioritise overdue first</p>
                        </div>
                        <div className="col-4 d-flex justify-content-center align-items-center">
                          <button type='button' className='btn '>Start Calls</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>


          <p className='fw-bolder'>Centers</p>

          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 p-2">
              <Centercard heading="Softpro Noida Office" cirnum="0" cirper="(0%)" cir="0%" assi="1" follow="0" enq="8" rec="No recent follow-ups"/>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 p-2">
            
            </div>
          </div>

        </div>
      </div>
   </>
  )
}

export default Cdash
