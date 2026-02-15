import React from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const Pagination = ({ page, totalPages, setPage }) => {
  const currentPage = Number(page) || 1
  const pagesCount = Number(totalPages) || 1

  if (pagesCount <= 1) {
    return null
  }

  const changePage = (nextPage) => {
    if (nextPage < 1 || nextPage > pagesCount || nextPage === currentPage) {
      return
    }
    setPage(nextPage)
  }

  const pageNumbers = Array.from({ length: pagesCount }, (_, index) => index + 1)

  return (
    <nav className='w-full max-w-6xl mx-auto px-4 pb-8 flex items-center justify-between gap-3'>
      <button
        type='button'
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
        className='h-10 px-4 rounded-xl border border-gray-300 bg-white text-sm font-medium text-gray-700 inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer'
      >
        <FiChevronLeft />
        Previous
      </button>

      <div className='flex items-center gap-2 flex-wrap justify-center'>
        {pageNumbers.map((item) => {
          const isActive = item === currentPage

          return (
            <button
              key={item}
              type='button'
              onClick={() => changePage(item)}
              className={`h-10 min-w-10 px-3 rounded-xl border text-sm font-semibold cursor-pointer transition ${isActive
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
                }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {item}
            </button>
          )
        })}
      </div>

      <button
        type='button'
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === pagesCount}
        className='h-10 px-4 rounded-xl border border-gray-300 bg-white text-sm font-medium text-gray-700 inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer'
      >
        Next
        <FiChevronRight />
      </button>
    </nav>
  )
}

export default Pagination