import React from 'react';
import appointment_img from '../assets/appointment_img.png';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col md:flex-row items-center bg-blue-500 rounded-lg overflow-visible px-6 sm:px-8 md:px-10 mt-10 mb-4 md:mx-6">
      {/* ------- Left Side ------- */}
      <div className="flex-1 max-w-lg py-6 sm:py-8 md:py-10 lg:py-12 lg:pl-5 z-10">
        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
          <p>Book Appointment</p>
          <p className="mt-2 md:mt-3">With 100+ Trusted Doctors</p>
        </div>
        <button
          onClick={() => {
            navigate('/login');
            scrollTo(0, 0);
          }}
          className="bg-white text-gray-700 font-medium text-sm sm:text-base px-6 py-2 rounded-full mt-5 shadow hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          Create Account →
        </button>
      </div>

      {/* ------- Right Side Image ------- */}
      {/* ------- Right Side Image ------- */}
<div className="hidden md:flex md:w-1/2 lg:w-[370px] justify-end items-end relative overflow-visible">
  <img
    className="w-[280px] max-w-none translate-y-[-40px]"  // pushes it a bit outside the container
    src={appointment_img}
    alt=""
  />
</div>

    </div>
  );
};

export default Banner;
