
import { BrowserRouter, Routes, Route } from "react-router-dom"

import './App.css'
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Addas from "./Admin/Addas"
import Adviewenq from "./Admin/Adviewenq"
import Adlayout from "./Admin/Adlayout"
import Addenq from "./Admin/Addenq"
import Center from "./Admin/Center"
import Visitor from "./Admin/Visitor"
import Aduser from "./Admin/Aduser"
import Cdash from "./Councelor/Cdash"
import Mandash from "./Manager/Mandash"
import Mlayout from "./Manager/Mlayout"
import Menq from "./Manager/Menq"
import Mvis from "./Manager/Mvis"
import Maddenq from "./Manager/Maddenq"
import Clayout from "./Councelor/Clayout"
import Cenq from "./Councelor/Cenq"
import Cvis from "./Councelor/Cvis"
import Caddenq from "./Councelor/Caddenq"
import { ToastContainer } from "react-toastify"
import CounChpass from "./Councelor/CounChpass"
import CounProfile from "./Councelor/CounProfile"
import Forgetpass from "./Pages/Forgetpass"



function App() {

  return (
    <>
      <div className="container-fluid">
         <ToastContainer/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/log" element={<Login />} />
            <Route path="/forget-password" element={<Forgetpass />} />
            <Route path="/admin/" element={<Adlayout />} >
             
              <Route path="" element={<Addas />} />
              <Route path="viewenq" element={<Adviewenq />} />
              <Route path="addenq" element={<Addenq />} />
              <Route path="center" element={<Center />} />
              <Route path="Visitor" element={<Visitor />} />
              <Route path="user" element={<Aduser />} />

            </Route>
            <Route path="/Mdash" element={<Mlayout />}>
              <Route path="" element={<Mandash />} />
              <Route path="menq" element={<Menq />} />
              <Route path="mvis" element={<Mvis />} />
              <Route path="maddenq" element={<Maddenq />} />
            </Route>
            <Route path="/Cdash" element={<Clayout />} >
              
              <Route path="" element={<Cdash />} />
              <Route path="cenq" element={<Cenq />} />
              <Route path="cvis" element={<Cvis />} />
              <Route path="caddenq" element={<Caddenq />} />
              <Route path="changepass" element={<CounChpass />} />
              <Route path="myprofile" element={<CounProfile />} />
            </Route>

          </Routes>
        </BrowserRouter>
       
      
      </div>
    </>
  )
}

export default App
