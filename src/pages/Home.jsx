import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";

const Home = () => {
  const [eventList, setEventList] = useState([]);
  const [paginationData, setPaginationData] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const clearFilter = () => {
    setSearch("");
    setCategory("");
    setLocation("");
  };

  const handleSearch = (query) => {
    setSearch(query);
    setPage(1);
  }

  useEffect(() => {
    const getEventList = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/events/?search=${search}&&location=${location}&&category=${category}&&page=${page}&&limit=${limit}`

        );
        const responseData = await response.json();
        if (responseData.success) {
          setEventList(responseData.data.events);
          setPaginationData(responseData.data.pagination);
        } else {
          console.log(responseData.message);
        }
      } catch (error) {
        console.error("Get Event List Error: ", error);
      }
    };
    getEventList();
  }, [search, category, location, page]);
  return (
    <div className="min-h-screen w-full px-4">
      <Navbar />
      <Filter
        search={search}
        setSearch={handleSearch}
        category={category}
        setCategory={setCategory}
        location={location}
        setLocation={setLocation}
        clearFilter={clearFilter}
      />
      <div className="w-full max-w-6xl mx-auto">
        <ul className="list-none grid grid-cols-1 gap-4 md:grid-cols-3 md:items-end mt-4">
          {eventList.map((each) => (
            <li key={each._id}><Link to={`/events/${each._id}`}><EventCard event={each} /> </Link></li>
          ))}
        </ul>
      </div>
      <Pagination page={paginationData?.page} totalPages={paginationData?.totalPages} setPage={setPage} />
    </div>
  );
};

export default Home;
