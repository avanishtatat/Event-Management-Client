import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import EventCard from '../components/EventCard'

const EventDetails = () => {
  const [event, setEvent] = useState()
  const [loading, setLoading] = useState(false)
  const [availableSeats, setAvailableSeats] = useState()
  const param = useParams()
  const { eventId } = param
  useEffect(() => {
    const getEvent = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/events/${eventId}`)
        const responseData = await response.json()
        if (responseData.success) {
          setEvent(responseData.data)
          setAvailableSeats(responseData.availableSeats)
        }
      } catch (error) {
        console.error('Event Details Error: ', error)
      } finally {
        setLoading(false)
      }
    }
    getEvent()
  }, [])

  return (
    <div className='min-h-screen w-full px-4'>
      <Navbar />
      {!loading && event && <div className='mt-4 w-full max-w-6xl mx-auto'><EventCard event={event} showButton={true} availableSeats={availableSeats} /></div>}
    </div>
  )
}

export default EventDetails