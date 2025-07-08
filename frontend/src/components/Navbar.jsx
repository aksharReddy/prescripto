import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import profile_pic from '../assets/profile_pic.png';
import dropdown_icon from '../assets/dropdown_icon.svg';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);
 

  return (
    <div className="flex items-center justify-between p-4 border-b shadow-sm">
      
      <img
        src={logo}
        alt="Logo"
        className="h-12 cursor-pointer"
        onClick={() => navigate('/')}
      />

      
      <ul className="flex space-x-8 font-medium">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-blue-500 pb-1"
                : "pb-1 hover:text-blue-400"
            }
          >
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-blue-500 pb-1"
                : "pb-1 hover:text-blue-400"
            }
          >
            ALL DOCTORS
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-blue-500 pb-1"
                : "pb-1 hover:text-blue-400"
            }
          >
            ABOUT
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-blue-500 pb-1"
                : "pb-1 hover:text-blue-400"
            }
          >
            CONTACT
          </NavLink>
        </li>
      </ul>

      {/* Right-side: profile or login */}
      <div className="flex items-center gap-4 relative">
        {token ? (
          <div className="flex items-center gap-2">
            <img
              src={profile_pic}
              alt="Profile"
              className="h-10 w-10 rounded-full cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            />
            <img
              src={dropdown_icon}
              alt="Dropdown"
              className="h-4 w-4 cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            />

            {showMenu && (
              <div className="absolute top-12 right-0 bg-white shadow-md rounded w-48 z-50">
                <div className="flex flex-col text-left p-2">
                  <p
                    className="cursor-pointer hover:bg-gray-100 hover:text-blue-500 p-2 rounded"
                    onClick={() => {
                      setShowMenu(false);
                      navigate('/my-profile');
                    }}
                  >
                    My Profile
                  </p>
                  <p
                    className="cursor-pointer hover:bg-gray-100 hover:text-blue-500 p-2 rounded"
                    onClick={() => {
                      setShowMenu(false);
                      navigate('/my-appointments');
                    }}
                  >
                    My Appointments
                  </p>
                  <p
                    className="cursor-pointer hover:bg-gray-100 hover:text-blue-500 p-2 rounded"
                    onClick={() => {
                      setShowMenu(false);
                      setToken(false);
                    }}
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={
                () => {
                    navigate('/login')
                    
                }
            }
            className="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded-full"
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;