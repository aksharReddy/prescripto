import React from 'react';
import group_profiles from '../assets/group_profiles.png';
import header_image from '../assets/header_img.png';
import arrow_icon from '../assets/arrow_icon.svg';

const Header = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-center bg-blue-500 rounded-lg px-6 md:px-10 lg:px-20 min-h-[500px]">
      {/* Left side */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </p>

        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img
            src={group_profiles}
            alt="Group Profiles"
            className="w-28"
          />
          <p className="text-white text-sm text-center md:text-left">
            Simply browse through our extensive list of trusted doctors, <br />
            schedule your appointments hassle-free.
          </p>
        </div>

        <a
          href="#speciality"
          className="flex items-center gap-2 bg-white px-4 py-3 rounded-full text-gray-600 text-sm mt-6 hover:scale-105 transition-all duration-300"
        >
          Book appointment <img className="w-3" src={arrow_icon} alt="Arrow icon" />
        </a>
      </div>

      <div className="md:w-1/2">
  <img
    src={header_image}
    alt="Header"
    className="hidden md:block absolute bottom-0 right-10 w-auto h-[80%] object-contain"
  />
</div>



      
    </div>
  );
}

export default Header;
