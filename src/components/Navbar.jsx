import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoMdPerson } from "react-icons/io"
import { AuthContext } from '../context/authContext'

const Navbar = () => {
  const { logout, user } = useContext(AuthContext)
  const dropdownRef = useRef(null);
  const { pathname } = useLocation()

  const [open, setOpen] = useState(false)

  const currentPageLabel =
    pathname === '/'
      ? 'Home'
      : pathname.startsWith('/events/')
        ? 'Event Details'
        : pathname === '/dashboard'
          ? 'Dashboard'
          : pathname === '/login'
            ? 'Login'
            : pathname === '/signup'
              ? 'Signup'
              : 'Page'

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className='w-full max-w-6xl mx-auto px-4 py-4 shadow-md font-sans flex justify-between items-center sticky top-0 rounded-2xl bg-white z-40'>
      <Link to='/'>
        <p className='font-medium text-xl cursor-pointer'>Event Mangement</p>
        <p className='text-sm font-semibold text-gray-600'>{currentPageLabel}</p>
      </Link>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
        >
          <IoMdPerson className="w-5 h-5 text-gray-700" />
        </button>

        {open && user && (
          <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">

            <div className="px-4 py-3 border-b border-gray-200">
              <p className="text-sm text-gray-500">Signed in as</p>
              <p className="text-sm font-semibold text-gray-800 truncate">
                {user.name}
              </p>
            </div>

            <div className="flex flex-col">
              <Link
                to="/dashboard"
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
              >
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar