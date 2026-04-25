import React from 'react'
import Chpass from '../Component/Chpass'

function CounChpass() {
  return (
    <>
   <Chpass id={localStorage.getItem("counselor")} role="counselor" />
    </>
  )
}

export default CounChpass
