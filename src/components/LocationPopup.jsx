
import React, { useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { useCityFilter } from "../Context/CityFilterContext";

const LocationPopup = () => {
  const { 
        mockCities,
         popularCities,
          filterData, 
          setFilterData ,
          isOpen,
          setIsOpen,
          dropdownSearchValue,
          setDropdownSearchValue,
          filteredCities,
          handleCitySelect,
          showAllCities,
          setShowAllCities,
          citiesLoading,
          cities,
          selectedCity,
          showLocationPopup,
          setShowLocationPopup,
        } = useCityFilter();

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.blur(); // Force unfocus on mobile
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setShowLocationPopup(false);
  };

  return (
    <div className="fixed inset-0 z-50 h-[100vh] bg-black/60 w-full transition-all duration-200">
      {/* Mobile View */}
      <div className="fixed md:hidden block top-0 left-1/2 transform -translate-x-1/2 w-full h-[100vh] bg-white border-t border-gray-300 shadow-md z-50">
        <div className="flex items-center justify-between py-3 bg-[#F7F7F7] px-2">
          <h2 className="text-[16px] font-medium ml-2">Select Your City</h2>
          <RxCross2
            className="rounded-full text-3xl active:bg-gray-300 p-1 active:scale-102 transition-transform duration-100 cursor-pointer"
            onClick={handleClose}
          />
        </div>

        <div className="flex items-center rounded-md px-3 py-2 mx-3 bg-gray-50 border border-gray-200 my-2">
          <input
            type="text"
            placeholder="Search city..."
            value={dropdownSearchValue}
            onChange={(e) => setDropdownSearchValue(e.target.value)}
            className="flex-1 text-[14px] outline-none text-gray-700 bg-transparent"
            ref={inputRef}
          />
          <FiSearch className="text-gray-400 ml-2" />
        </div>

        <div className="pb-3 h-[70%] overflow-y-auto scrollbar-hide">
          <div className="px-4">
            <h3 className="text-center text-[14px] font-medium text-gray-600 mb-2">Popular Cities</h3>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {popularCities.map((cityName) => {
                const city = (cities.length ? cities : mockCities).find((c) => c.name === cityName);
                return city ? (
                  <div
                    key={city.id}
                    className="px-3 py-2 text-gray-700 text-[13px] bg-gray-50 rounded hover:bg-gray-100 cursor-pointer text-center"
                    onClick={() => handleCitySelect(city)}
                  >
                    {city.name}
                  </div>
                ) : null;
              })}
            </div>
          </div>

          {filteredCities.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-100">
              <h3 className="text-center text-[14px] font-medium text-gray-600 mb-2">Other Cities</h3>
              <div className="grid grid-cols-2 gap-2 max-h-[250px] overflow-y-auto scrollbar-hide">
                {filteredCities.map((city) => (
                  <div
                    key={city.id}
                    className="px-3 py-2 text-gray-700 text-[13px] bg-gray-50 rounded hover:bg-gray-100 cursor-pointer text-center"
                    onClick={() => handleCitySelect(city)}
                  >
                    {city.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredCities.length === 0 && !citiesLoading && (
            <div className="px-4 py-3 text-gray-500 text-[12px] text-center">
              No cities found
            </div>
          )}
        </div>
      </div>

      {/* Desktop View */}
      <div className="fixed md:block hidden top-15 left-1/2 transform -translate-x-1/2 w-[75%] min-h-max bg-white border-t border-gray-300 shadow-md z-50">
        <div className="flex items-center justify-between py-3 bg-[#F7F7F7] px-2">
          <h2 className="text-[16px] font-medium ml-2">Select Your City</h2>
          <RxCross2
            className="rounded-full text-3xl active:bg-gray-300 p-1 active:scale-102 transition-transform duration-100 cursor-pointer"
            onClick={handleClose}
          />
        </div>

        <div className="flex items-center rounded-md px-3 py-2 mx-3 bg-gray-50 border border-gray-200 my-2">
          <input
            type="text"
            placeholder="Search city..."
            value={dropdownSearchValue}
            onChange={(e) => setDropdownSearchValue(e.target.value)}
            className="flex-1 text-[14px] outline-none text-gray-700 bg-transparent"
            autoFocus
          />
          <FiSearch className="text-gray-400 ml-2" />
        </div>

        <div className="pb-3 h-[70%] overflow-y-auto scrollbar-hide">
          <div className="px-4">
            <h3 className="text-center text-[14px] font-medium text-gray-600 mb-2">Popular Cities</h3>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {popularCities.map((cityName) => {
                const city = (cities.length ? cities : mockCities).find((c) => c.name === cityName);
                return city ? (
                  <div
                    key={city.id}
                    className="px-3 py-2 text-gray-700 text-[13px] bg-gray-50 rounded hover:bg-gray-100 cursor-pointer text-center"
                    onClick={() => handleCitySelect(city)}
                  >
                    {city.name}
                  </div>
                ) : null;
              })}
            </div>
          </div>

          {showAllCities && filteredCities.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-100">
              <h3 className="text-center text-[14px] font-medium text-gray-600 mb-2">Other Cities</h3>
              <div className="grid grid-cols-4 gap-2 max-h-[200px] overflow-y-auto scrollbar-hide">
                {filteredCities.map((city) => (
                  <div
                    key={city.id}
                    className="px-3 py-2 text-gray-700 text-[13px] bg-gray-50 rounded hover:bg-gray-100 cursor-pointer text-center"
                    onClick={() => handleCitySelect(city)}
                  >
                    {city.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredCities.length > 0 && (
            <div className="flex justify-center mt-3">
              <button
                onClick={() => setShowAllCities(!showAllCities)}
                className="text-[13px] text-blue-500 underline hover:text-blue-700 cursor-pointer"
              >
                {showAllCities ? "View Less" : "View More"}
              </button>
            </div>
          )}

          {filteredCities.length === 0 && !citiesLoading && (
            <div className="px-4 py-3 text-gray-500 text-[12px] text-center">
              No cities found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationPopup;