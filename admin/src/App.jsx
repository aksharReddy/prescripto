import React from 'react'
import Login from './pages/Login';
import { ToastContainer, toast } from 'react-toastify';
import {useContext} from 'react';
import { AdminContext } from './context/AdminContext';
import { DoctorContext } from './context/DoctorContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/admin/Dashboard';
import AllAppointments from './pages/admin/AllAppointments';
import AddDoctor from './pages/admin/AddDoctor';
import DoctorsList from './pages/admin/DoctorsList';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import Doctorsappointments from './pages/Doctor/Doctorappointments';
const App = () => {

  const {aToken} =useContext(AdminContext);
  const {dToken} = useContext(DoctorContext);
  return aToken||dToken? (
    <div className='bg-[F8F9FD]'>
      
       <ToastContainer/>
       <Navbar />
       <div className='flex items-start'>
        <Sidebar/>
        <div className='flex-1 p-4'>
       <Routes>
        <Route path='/' element={<></>} />
        <Route path='/admin-dashboard' element={<Dashboard />} />
        <Route path='/all-appointments' element={<AllAppointments />} />
        <Route path='/add-doctor' element={<AddDoctor />} />
        <Route path='/doctors-list' element={<DoctorsList />} />
        {/* doctor routes */}
        <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
        <Route path='/doctor-appointments' element={<Doctorsappointments />} />
        <Route path='/doctor-profile' element={<DoctorProfile />} />
       </Routes>
       </div>
       </div>

    </div>
   
  ):(
    <>
    <Login />
    <ToastContainer/>
    </>
  )
}

export default App;