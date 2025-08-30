import NavBar from "./components/NavBar"
import SideBar from "./components/SideBar"
import { Routes, Route } from "react-router-dom"
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import { useEffect, useState } from "react"
import Login from "./components/Login"
import { ToastContainer } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '₹';


const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token'):'');

  useEffect(() => {
    localStorage.setItem('token', token);
  },[token])


  return (
    <div className = 'px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] relative'>
      <ToastContainer />
      {token === ""
      ? <Login setToken={setToken} /> :
    <>
    <NavBar setToken ={setToken} />
    <hr className="text-gray-300" />
    <div className="flex w-full">
      <SideBar />
      <div className="w-[80%] py-5 pl-5 sm:pl-15 sm:py-10">
        <Routes>
          <Route path='/add' element={<Add token={token} />} />
          <Route path='/list' element={<List token={token}/>} />
          <Route path='/orders' element={<Orders token={token}/>} />
        </Routes>
      </div>
    </div>
    </>
    }
    </div>
  )
}

export default App