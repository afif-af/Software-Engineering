import { useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import {Routes, Route} from 'react-router-dom'
import List from './pages/List'
import Add from './pages/Add'
import Orders from './pages/Orders'
import Login from './components/Login'
import AllUsers from './pages/AllUsers'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'


export const backendUrl = import.meta.env.VITE_BACKEND_URL
console.log ("Bakcend URL:", backendUrl);
export const currency ="৳";



const App =()=> {
  const [token, setToken] =useState(localStorage.getItem('token')?localStorage.getItem('token'):'');
  useEffect(()=>{
    localStorage.setItem('token', token)

  },[token])

 

  return (
    <div className="bg-gray-50 min-h-screen">
       <ToastContainer />


      {token === ''?(
        <Login setToken={setToken}/>

        ): (
        <>
          <div className='flex w-full'>
            <Sidebar />
            <div className='flex-1 mx-8 my-8 text-gray-700 text-base'>
              <Routes>
                <Route path='/list' element={<List token={token} />} />
                <Route path='/add' element={<Add token={token}  />} />
                <Route path='/order' element={<Orders token={token} />} />
                <Route path='/allusers' element={<AllUsers token={token} />} />
                
              </Routes>
            </div>
          </div>
        </>
      )}
      
      
    </div>
  )
}

export default App
