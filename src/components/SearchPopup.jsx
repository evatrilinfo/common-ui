import React, { useEffect, useRef } from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import { MdLocationOn, MdLocationCity } from 'react-icons/md';

const SearchPopup = ({ showSearchInput,
  setShowSearchInput,
  searchText,
  setSearchText,
  categories,
  filteredTrending,
  handleVenueSelect, }) => {

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.blur(); // Force unfocus
  }, []);
  return (
    <>
      {/* Background Overlay */}
      <div className="fixed inset-0 z-[9998] bg-black/70"></div>

      {/* Main Panel */}
      <div className="h-[75vh] w-[60vw] fixed inset-0 left-1/5 top-15 hidden lg:block  z-[9999] shadow-sm bg-white text-gray-900">
        {/* Categories */}
        <div className="flex items-center gap-0 px-3 shadow-sm overflow-x-auto py-2 border-t border-gray-300">
          <div
            onClick={() => {
              setTimeout(() => setShowSearchInput(false), 150);
            }}
            className="inline-flex items-center justify-center p-2 rounded-full active:bg-gray-200 transition duration-150 cursor-pointer"
          >
            <FaArrowLeft className="text-lg" />
          </div>
          <span className="font-semibold">Search</span>
        </div>

        <div className="flex flex-col mx-2 mt-3 mb-2.5">
          <input
            type="text"
            placeholder="Search for Venues..."
            className="border border-gray-400 px-2 outline-none rounded-sm py-2.5 w-full text-[14px]"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {/* Trending Title */}
        <h2 className="text-[15px] md:text-[17px] bg-gray-200 text-red-500 font-medium my-2 px-3 py-2">
          Popular/Trending Searches
        </h2>

        {/* Scrollable section */}
        <div className="flex-1 overflow-y-auto scrollbar-hide max-h-[calc(70vh-160px)]">
          <div className="divide-y divide-gray-200">
            {filteredTrending.length > 0 ? (
              filteredTrending.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center px-3 py-3 hover:bg-gray-50 cursor-pointer"
                >
                  <span className="text-[14px] md:text-[15px] md:px-2 px-0 truncate w-[85%]">
                    {item.name}
                  </span>
                  <span className="text-gray-400 text-xl">{item.icon}</span>
                </div>
              ))
            ) : (
              <div className="px-3 py-3 text-gray-400 text-sm">No results found.</div>
            )}
          </div>
        </div>
      </div>



      <div className="h-[100vh] fixed inset-0 block lg:hidden top-0 left-0 w-full z-9999   shadow-sm bg-white text-gray-900">
        {/* Categories................................................ */}
        <div className="flex items-center gap-0 px-2.5  shadow-sm overflow-x-auto py-2 border-t border-gray-300">
          <div
            onClick={() => {
              setTimeout(() => setShowSearchInput(false), 150);
            }}
            className="inline-flex items-center justify-center p-2  rounded-full active:bg-gray-200 transition duration-150 cursor-pointer"
          >
            <FaArrowLeft className="text-lg" />
          </div>
          <span className='font-semibold'>Search</span>
        </div>
        <div className='flex flex-col mx-2 my-2.5'>
          <input
            type="text"
            placeholder="Search for Venues..."
            className="border border-gray-400 px-2 text-gray-700  outline-none rounded-sm py-3 w-[100%] text-[14px]"
            value={searchText}
            ref={inputRef}
            autoFocus
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {/* Trending Title */}
        <h2 className="text-[15px] md:text-[17px] bg-gray-200 text-red-500 font-medium   px-3 py-2">
          Popular/Trending Searches
        </h2>
        <div className="divide-y divide-gray-200">
          {filteredTrending.length > 0 ? (
            filteredTrending.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center px-3 py-3 hover:bg-gray-50 cursor-pointer"
              >
                <span className="text-[14px] md:text-[15px] md:px-2 px-0 truncate w-[85%]">{item.name}</span>
                <span className="text-gray-400 text-xl">{item.icon}</span>
              </div>
            ))
          ) : (
            <div className="px-3 py-3 text-gray-400 text-sm">No results found.</div>
          )}
        </div>

      </div>
    </>
  )
}

export default SearchPopup