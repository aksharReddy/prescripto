import React from 'react'
import home_icon from '../assets/home_icon.svg'
import add_icon from '../assets/add_icon.svg'
import people_icon from '../assets/people_icon.svg'
import appointment_icon from '../assets/appointment_icon.svg'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-md text-gray-600 ${
      isActive ? 'bg-blue-100 font-semibold text-blue-600' : 'hover:bg-blue-50'
    }`;

  return (
    <div className='min-h-screen bg-white border-r py-4'>
      {
        aToken && <ul className='flex flex-col gap-1'>
          <NavLink to='/admin-dashboard' className={linkClass}>
            <img src={home_icon} alt="Home" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink to='/all-appointments' className={linkClass}>
            <img src={appointment_icon} alt="Appointments" />
            <p>Appointments</p>
          </NavLink>
          <NavLink to='/add-doctor' className={linkClass}>
            <img src={add_icon} alt="Add Doctor" />
            <p>Add Doctor</p>
          </NavLink>
          <NavLink to='/doctors-list' className={linkClass}>
            <img src={people_icon} alt="Doctors List" />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      }
       {
        dToken && <ul className='flex flex-col gap-1'>
          <NavLink to='/doctor-dashboard' className={linkClass}>
            <img src={home_icon} alt="Home" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink to='/doctor-appointments' className={linkClass}>
            <img src={appointment_icon} alt="Appointments" />
            <p>Appointments</p>
          </NavLink>
          
          <NavLink to='/doctor-profile' className={linkClass}>
            <img src={people_icon} alt="Doctors List" />
            <p>Profile</p>
          </NavLink>
        </ul>
      }
    </div>
  )
}

export default Sidebar
