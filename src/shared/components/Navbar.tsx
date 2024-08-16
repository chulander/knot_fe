import { useState } from 'react';
import { Link } from 'react-router-dom';
import { KnotsLogo } from './KnotsLogo';
import { useAuth } from '../hooks/use-auth';

export const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-green flex items-center justify-between px-4 py-4">
      {/* Left Side - Logo */}
      <div className="flex items-center space-x-2">
        <Link to="/" className="font-semibold text-white">
          <KnotsLogo />
        </Link>
      </div>

      {/* Center - Products Dropdown */}
      {isLoggedIn && (
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center font-semibold text-gray-800 hover:text-black">
            Products
            <svg
              className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-0' : 'rotate-180'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute left-1/2 mt-2 w-80 -translate-x-1/2 transform rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <Link
                  to="/contacts"
                  onClick={() => {
                    setIsDropdownOpen(false);
                  }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                    {/* Icon placeholder, replace with actual icon if available */}
                    <svg
                      data-v-0a848e75=""
                      width="60"
                      height="60"
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="">
                      <circle data-v-0a848e75="" cx="30" cy="30" r="25" fill="white"></circle>
                      <path
                        data-v-0a848e75=""
                        d="M25 33C25.5523 33 26 32.5523 26 32C26 31.4477 25.5523 31 25 31C24.4477 31 24 31.4477 24 32C24 32.5523 24.4477 33 25 33Z"
                        fill="#272727"
                        stroke="#272727"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"></path>
                      <path
                        data-v-0a848e75=""
                        d="M20 27V23.6C20 23.2686 20.2686 23 20.6 23H39.4C39.7314 23 40 23.2686 40 23.6V27M20 27V36.4C20 36.7314 20.2686 37 20.6 37H39.4C39.7314 37 40 36.7314 40 36.4V27M20 27H40"
                        stroke="#272727"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">Contacts Adder</p>
                    <p className="text-sm text-gray-500">Add contacts like never before</p>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Right Side - Login and Button */}
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <Link to="/logout" className="text-gray-800 hover:text-black">
            Logout
          </Link>
        ) : (
          <Link to="/login" className="text-gray-800 hover:text-black">
            Login
          </Link>
        )}
        <button
          onClick={() => {
            window.location.href = 'https://www.knotapi.com/contact';
          }}
          className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800">
          Schedule a Demo
        </button>
      </div>
    </nav>
  );
};
