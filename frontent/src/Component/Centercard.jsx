import React from 'react'

function Centercard(p) {
  return (
   <>
   <div className="center-card p-3">
                <div className="row">
                  <div className="col-6 p-2">
                    <h5>{p.heading}</h5>
                  </div>
                  <div className="col-6 p-3">
                    <div className="l text-center">
                      <p className='m-0'>Closed</p>
                      <p className='fw-bolder m-0'>{p.cirnum}</p>
                      <p className='m-0'>{p.cirper}</p>
                    </div>
                    <div className="r">
                      <div className="r-circle">
                        <strong>{p.cir}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row my-2">
                  <div className="col-6">
                    <div className="num-box p-2">
                      <p className='fw-bolder'>{p.assi}</p>
                      <p>Assigned</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="num-box p-2">
                      <p className='fw-bolder'>{p.follow}</p>
                      <p>Follow-ups</p>
                    </div>
                  </div>
                   <div className="col-12">
                    <div className="num-box p-2 mt-3">
                      <p className='fw-bolder'>{p.enq}</p>
                      <p>Enquiries</p>
                    </div>
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col-12">
                    <button className='btn' type='button'>Open Enquiries</button>
                    <button className='btn ms-3' type='button'>Timeline </button>
                  </div>
                   <p style={{border:"1px solid whitesmoke" , borderRadius:"5px"}} className='p-2 mt-3'>{p.rec}</p>

                </div>
                 <div className="row">
                    <div className="col-12 ">
                        <div className="enqurie-table" style={{height:"auto", width:"100%", overflow:"scroll"}}>
                            <div className="row">
                                <div className="col-7">
                                   <h5>{p.followupname}</h5>
                                    <p>{p.followby} <strong className=''>{p.fdate}</strong></p>
                                    
                                </div>
                                <div className="col-5">
                                  <span>{p.followtype}</span>                       
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
              </div>
   </>
  )
}

export default Centercard
