import React from 'react'

function Overviewbox(p) {
    return (
        <>
            <div className="overview-box p-3">
                <p>{p.heading}</p>
                <h6 className='fw-bolder'>{p.num}</h6>
                <p>{p.res} <span>{p.span}</span></p>
            </div>
        </>
    )
}

export default Overviewbox
