import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const { setdToken } = useContext(DoctorContext)
  const { setaToken } = useContext(AdminContext)
  
  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (state === 'Admin') {
        console.log('Trying admin login with:', email, password);
        const { data } = await axios.post(backendUrl + 'api/admin/login', { email, password })
        if (data.success) {
          localStorage.setItem('aToken', data.token)
          setaToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
      else{
        console.log('Trying doctor login with:', email, password);

          const {data} = await axios.post(backendUrl + 'api/doctor/login', { email, password })
          if(data.success){
            localStorage.setItem('dToken', data.token)
            setdToken(data.token)
            console.log(data.token)
            
          }else{
            toast.error(data.message)
          }
      }
    } catch (error) {
      console.error("Login error:", error)
      toast.error("Login failed")
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'>
          <span className='text-primary'>{state}</span> Login
        </p>

        {/* Email */}
        <div className='w-full'>
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type='email'
            required
          />
        </div>

        {/* Password with eye toggle */}
        <div className='w-full relative'>
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='border border-[#DADADA] rounded w-full p-2 mt-1 pr-10'
            type={showPassword ? 'text' : 'password'}
            required
          />
          <span
            className='absolute right-3 top-[38px] cursor-pointer text-gray-600'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button className='bg-blue-500 text-white w-full py-2 rounded-md text-base'>Login</button>

        {state === 'Admin' ? (
          <p>
            Doctor Login?{' '}
            <span onClick={() => setState('Doctor')} className='text-blue-500 underline cursor-pointer'>
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{' '}
            <span onClick={() => setState('Admin')} className='text-blue-500 underline cursor-pointer'>
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  )
}

export default Login
