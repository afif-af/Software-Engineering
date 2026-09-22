import { useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import {Routes, Route} from 'react-router-dom'
import List from './pages/List'
import Add from './pages/Add'
import Orders from './pages/Orders'
import Login from './components/Login'
import AllUsers from './pages/AllUsers'
// import {ToastContainer} from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'



function App() {
 

  return (
    <div className="bg-gray-50 min-h-screen">
       {/* <ToastContainer /> */}
       
       <div className='flex w-full'>
        <Sidebar />
        <div className='flex-1 mx-8 my-8 text-gray-700 text-base'>
          <Routes>
            <Route path='/list' element={<List />} />
            <Route path='/add' element={<Add />} />
            <Route path='/order' element={<Orders />} />
            <Route path='/allusers' element={<AllUsers/>}/>
            

          </Routes>
        </div>

       </div>
      
      
    </div>
  )
}

export default App
