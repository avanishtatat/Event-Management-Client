import { Link, useNavigate } from 'react-router-dom'
import { FiCalendar, FiMapPin, FiTag, FiUser, FiUsers } from 'react-icons/fi'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { toastInfo, toastSuccess } from '../utils/toast'

const EventCard = ({ event, showButton = false, availableSeats = false }) => {
  const navigate = useNavigate()
  const { user, token } = useContext(AuthContext)
  const formattedDate = event?.date
    ? new Date(event.date).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
    : 'Date TBA'

  const handleRegister = async () => {
    try {
      const option = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ eventId: event._id })
      }
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/registration/`, option)
      const responseData = await response.json()
      if (responseData.success) {
        toastSuccess(responseData.message)
      }
      else {
        toastInfo(responseData.message)
      }
    } catch (error) {
      console.error('Registration Error: ', error)
    }
  }

  return (
    <div className='mb-6 mr-6 w-full h-68'>
      <div className='group block h-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300'
      >
        <div className='flex h-full flex-col'>
          <div className='mb-4 flex items-center justify-between gap-3'>
            <span className='inline-flex items-center gap-1 rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700'>
              <FiTag className='text-sm' />
              {event.category || 'General'}
            </span>
            <span className='inline-flex items-center gap-1 text-sm text-gray-600'>
              <FiCalendar className='text-base' />
              {formattedDate}
            </span>
          </div>

          <h2 className='mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-gray-700'>
            {event.name}
          </h2>

          <p
            className='mb-4 text-sm leading-6 text-gray-600'
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {event.description || 'No description available for this event yet.'}
          </p>

          <div className='flex justify-between'>

            <div className='mt-auto space-y-2 border-t border-gray-100 pt-4 text-sm text-gray-700'>
              <p className='flex items-center gap-2'>
                <FiUser className='text-base text-gray-500' />
                <span className='font-medium'>Organizer:</span>
                <span className='truncate'>{event.organizer || 'TBA'}</span>
              </p>
              <p className='flex items-center gap-2'>
                <FiMapPin className='text-base text-gray-500' />
                <span className='font-medium'>Location:</span>
                <span className='truncate'>{event.location || 'Venue TBA'}</span>
              </p>
              <p className='flex items-center gap-2'>
                <FiUsers className='text-base text-gray-500' />
                <span className='font-medium'>Capacity:</span>
                <span>{event.capacity || 'Open'}</span>
              </p>
            </div>
            <div className='my-4 self-end'>
              {user && showButton ? (
                availableSeats && availableSeats > 0 ? (
                  <button onClick={handleRegister} className="bg-blue-500 text-white p-2 rounded-sm cursor-pointer">
                    Register Now
                  </button>
                ) : (
                  <p className="text-red-500">Sold Out</p>
                )
              ) : (
                showButton ? <button className='bg-green-500 text-white p-2 rounded-sm cursor-pointer' onClick={() => navigate('/login')}>Login to Register</button> : null
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCard