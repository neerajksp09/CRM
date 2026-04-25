import React from 'react'

function Formcard(P) {
    return (
        <>
            <div className="form-card my-4 p-3">
                <h4><i className="fa-solid fa-location-dot"></i>  {P.heading}</h4>
                <hr />
                <p>{P.name}</p>
                <p>{P.add1}</p>
                <p>{P.add2}</p>
                <p> <strong>Mobile Number:</strong> {P.contact}</p>
            </div>
        </>
    )
}

export default Formcard
