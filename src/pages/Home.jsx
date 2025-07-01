import React from 'react';
import group_profiles from '../assets/group_profiles.png';
import arrow_icon from '../assets/arrow_icon.svg';
import header_image from '../assets/header_img.png';

const Header = () => {
  return (
    <div className="flex flex-col flex-row flex-wrap items-center bg-blue-500 rounded-lg px-6 ms:px-10p-8 lg:px-20">
      
      {/* Left side */}
      <div className="md:w-1/2 flecx flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight md:leading-tight lg:leading-tight ">
          Book Appointment <br /> With Trusted Doctors
        </p>

        <div className="flex flex-col md:flex-row items-center mb-6">
          <img
            src={group_profiles}
            alt="Group Profiles"
            className="h-12 mb-4 md:mb-0 md:mr-4"
          />
          <p className="text-white text-sm text-center md:text-left">
            Simply browse through our extensive list of trusted doctors, <br />
            schedule your appointments hassle-free.
          </p>
        </div>

        <button className="flex items-center bg-white text-blue-500 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition">
          Book Appointment <img src={arrow_icon} alt="Arrow Icon" className="h-5 ml-2" />
        </button>
      </div>

      {/* Right side */}
      <div className="flex-1 flex items-end justify-center h-full">
  <img src={header_image} alt="Header" className="w-full max-w-md object-contain h-full" />
</div>

    </div>
  );
};

export default Header;
