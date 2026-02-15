import React from 'react'
import { FiSearch, FiGrid, FiMapPin, FiXCircle } from 'react-icons/fi'

const CATEGORY_OPTIONS = [
  'Technology',
  'Business',
  'Sports',
  'Workshop',
  'Food',
  'Music',
  'Conference',
  'Education',
  'Literature',
  'Career',
  'Environment',
  'Health',
  'Finance',
  'Entertainment',
  'Hackathon',
  'Marketing'
]

const LOCATION_OPTIONS = [
  'Bengaluru Convention Center', 'Mumbai Tech Hub', 'Delhi Sports Arena', 'Pune Innovation Loft',
  'Hyderabad Exhibition Grounds', 'Goa Beach Amphitheatre', 'Chennai Business Center',
  'Jaipur Art House', 'Noida Co-Work Arena', 'Kolkata Town Hall', 'Ahmedabad Learning Center',
  'Surat Expo Center', 'Bhopal Tech Park', 'Rishikesh Riverside Camp', 'Gurugram Finance Plaza',
  'Lucknow Open Grounds', 'Kochi Innovation Hub', 'Indore Media Center'
]

const Filter = ({
  search,
  setSearch,
  category,
  setCategory,
  location,
  setLocation,
  clearFilter
}) => {
  return (
    <div className='mt-4 w-full max-w-6xl mx-auto'>
      <div className='rounded-2xl border border-black/10 bg-white p-4 shadow-sm'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-12 md:items-end'>
          <label className='flex-1 flex flex-col gap-2 md:col-span-6'>
            <span className='text-sm font-medium'>Search</span>
            <div className='relative'>
              <FiSearch className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/50' />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type='search'
                placeholder='Search events'
                className='h-11 w-full rounded-xl border border-black/20 bg-white pl-10 pr-4 outline-none focus:ring-2 focus:ring-black/15'
              />
            </div>
          </label>

          <label className='flex flex-col gap-2 md:col-span-2'>
            <span className='text-sm font-medium'>Category</span>
            <div className='relative'>
              <FiGrid className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/50' />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='h-11 w-full rounded-xl border border-black/20 bg-white pl-10 pr-4 outline-none focus:ring-2 focus:ring-black/15'
              >
                <option value=''>All categories</option>
                {CATEGORY_OPTIONS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <label className='flex flex-col gap-2 md:col-span-2'>
            <span className='text-sm font-medium'>Location</span>
            <div className='relative'>
              <FiMapPin className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/50' />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className='h-11 w-full rounded-xl border border-black/20 bg-white pl-10 pr-4 outline-none focus:ring-2 focus:ring-black/15'
              >
                <option value=''>All locations</option>
                {LOCATION_OPTIONS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <button
            type='button'
            onClick={clearFilter}
            className='h-11 rounded-xl border border-black bg-white px-2 font-medium cursor-pointer md:col-span-2 inline-flex items-center justify-center gap-2'
          >
            <FiXCircle />
            Clear filter
          </button>
        </div>
      </div>
    </div>
  )
}

export default Filter