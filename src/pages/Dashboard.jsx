import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/authContext";
import EventCard from "../components/EventCard";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([])

  if (!token) {
    return <Navigate to="/" replace />
  }

  const handleSort = (value) => {
    let filteredEvents;

    if (value === "upcoming") {
      filteredEvents = registeredEvents.filter(event => new Date(event.date) > new Date())
    } else if (value === "past") {
      filteredEvents = registeredEvents.filter(event => new Date(event.date) < new Date())
    } else {
      filteredEvents = registeredEvents;
    }
    setFilteredEvents(filteredEvents)
  }

  useEffect(() => {
    const getRegisteredEvents = async () => {
      try {
        const option = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/registration/`,
          option,
        );
        const responseData = await response.json();
        if (responseData.success) {
          setRegisteredEvents(responseData.registeredEvents);
          setFilteredEvents(responseData.registeredEvents)
        }
      } catch (error) {
        console.error("Get Registered Events: ", error);
      }
    };
    getRegisteredEvents();
  }, []);
  return (
    <div className="min-h-screen w-full px-4 max-w-6xl mx-auto">
      <Navbar />
      <div className="flex justify-end items-center mt-4 gap-2">
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" className="rounded-xl border border-black/20 bg-white outline-none focus:ring-2 focus:ring-black/15" onChange={(e) => handleSort(e.target.value)}>
          <option value="">Select</option>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </select>
      </div>
      {filteredEvents.length > 0 && (
        <ul className="list-none grid grid-cols-1 gap-4 md:grid-cols-3 md:items-end mt-4">
          {filteredEvents.map((each) => (
            <li key={each._id}>
              <EventCard event={each} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
