import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Visitor() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/vis");
      if (res.data.msg === "Success") {
        setData(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      getData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <div className="row visitor-row">
        <div className="col-sm-12 p-4">
          <h3 className='py-3'>Visitors Enquiries</h3>
          <div className="visitor-table table-responsive ">
            <table className='table table-light'>
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Enquiry Date</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Center</th>
                  <th>Purpose</th>
                  <th>Remark</th>
                  <th>Enqury type</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((v, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{v.createdAt?.split("T")[0]}</td>
                      <td>{v.fullName}</td>
                      <td>{v.contactNumber}</td>
                      <td>{v.email || "-"}</td>
                      <td>{v.center}</td>
                      <td>{v.purpose || "-"}</td>
                      <td>{v.remarks || v.address || "-"}</td>

                      <td>
                        <span className={`px-3 py-1 rounded-2 text-white ${v.visitorType === "visitorOff" ? "bg-primary" : "bg-success"}`}>
                          {v.visitorType === "visitorOff" ? "Official" : "Personal"}
                        </span>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>

        <footer>
          <p className='text-center py-3'>Design and developed by <strong>Neeraj kashyap</strong></p>
        </footer>

      </div>
    </>
  )
}

export default Visitor