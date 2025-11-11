// import React, { useEffect } from 'react'
// import { Link, useLocation, useParams } from 'react-router-dom';
// import { IoIosSearch } from "react-icons/io";
// import { FiUser } from 'react-icons/fi';
// import { MdKeyboardArrowDown } from "react-icons/md";
// import { IoNotificationsOutline } from "react-icons/io5";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { FiX } from "react-icons/fi";
// import { RxCross2 } from "react-icons/rx";
// import { FiSearch } from 'react-icons/fi';
// import { useSelector } from 'react-redux';



// import {

//   FaChevronDown,FaSearch

// } from 'react-icons/fa';
// import SearchPopup from './SearchPopup';
// import LocationPopup from './LocationPopup';



// const NavComponent = ({  tabs,
//   activeTab,
//   handleTabClick,
//   setShowSearchInput,
//   handleNavigateSearch,
//   searchRef,
//   dropdownRef,
//   toggleDropdown,
//   isOpen,
//   dropdownSearchValue,
//   setDropdownSearchValue,
//   cities,
//   filteredCities,
//   handleCitySelect,
//   citiesLoading,
//   showLocationPopup,
//   popularCities,
//   mockCities,
//   showAllCities,
//   setShowAllCities,
//   setShowLocationPopup,
//   toggleMobileMenu,
//   isMobileMenuOpen,
//   setIsOpen,
//   mobileMenuRef,
//   selectedCity,}) => {

//     useEffect(()=>{
//       if (isOpen ||  showLocationPopup ) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = '';
//     }
//     return () => {
//       document.body.style.overflow = '';
//     };
//     },[isOpen, showLocationPopup])

// const location = useLocation();
// console.log(selectedCity);


// const storedCity = useSelector((state) => state.city.selectedCity);
// console.log(selectedCity);
// console.log(storedCity);


// const {slug}=useParams()
// console.log(slug);



// const stored = localStorage.getItem("selectedCity");
// const parsed = stored ? JSON.parse(stored) : null;
// // console.log("storeddddd",parsed.value.name);

// // const storedCity = useSelector((state) => state.city.selectedCity);


//   return (
//     <>


//   <nav className="fixed top-0 left-0 w-full h-[55px] md:h-[65px] flex space-x-0 items-center lg:shadow-sm md:px-6 lg:px-10 px-3 py-3 z-[99] bg-white backdrop-blur-md">
//             <div className="flex items-center w-full justify-between md:justify-between">
//               <div className="flex w-[34%] md:w-[60%] md:gap-6 lg:gap-12 xl:gap-12 2xl:gap-14">
//                 <Link to={storedCity ? `/${storedCity.slug}` : '/'}>
//                 <img src="/evatril_logo.jpg" alt="logo" className="md:w-[100px] w-[84px] md:h-9 h-7 flex" />
//                 </Link>
//                 <div className="navigation-links hidden md:flex gap-4">
//                   {tabs
//                     .filter((tab) => !tab.mobileOnly)
//                     .map((tab) => (
//                       <button
//                         key={tab.name}
//                         className={`text-gray-500 font-medium cursor-pointer px-0 py-1 transition ${activeTab === tab.name ? 'text-gray-900 border-b-2 border-red-600' : 'hover:text-red-600'}`}
//                         onClick={() => handleTabClick(tab)}
//                       >
//                         {tab.name}
//                       </button>
//                     ))}
//                 </div>
//               </div>
//               <div className="flex items-center justify-end md:space-x-3 lg:space-x-4">
//                 <div className="hidden md:flex">
//                   <div
//                     onClick={() => setTimeout(() => handleNavigateSearch(), 120)}
//                     className="cursor-pointer p-1 rounded-md active:bg-gray-200 active:scale-95 transition duration-100"
//                   >
//                     <IoIosSearch className="text-[22px] text-gray-700" />
//                   </div>
//                 </div>
//                 <div className="hidden md:flex lg:flex lg:flex-col relative w-[120px] h-10" ref={dropdownRef}>
//                   <div
//                     className="nav-dropdown-city flex items-center rounded-md px-2 justify-center py-2 text-gray-700 cursor-pointer active:bg-gray-100 active:scale-99 transition duration-100"
//                     onClick={() => setTimeout(() => toggleDropdown(), 120)}
//                   >
//                     <span className="text-gray-500 truncate w-24 text-md text-center overflow-hidden">
//                       {selectedCity?.name  || 'All Cities'}
//                     </span>
//                     <FaChevronDown className={`text-gray-500 text-sm transition-transform ${isOpen ? 'rotate-180' : ''}`} />
//                   </div>
//                   {isOpen && (
//                     <LocationPopup
//                       // show={showLocationPopup}
//           setIsOpen={setIsOpen}
//           onClose={() => setShowLocationPopup(false)}
//           dropdownSearchValue={dropdownSearchValue}
//           setDropdownSearchValue={setDropdownSearchValue}
//           popularCities={popularCities}
//           cities={cities}
//           mockCities={mockCities}
//           filteredCities={filteredCities}
//           handleCitySelect={handleCitySelect}
//           showAllCities={showAllCities}
//           setShowAllCities={setShowAllCities}
//           citiesLoading={citiesLoading}
//           setShowLocationPopup={setShowLocationPopup}
//                     />
//                   )}
//                 </div>
//                 <div className="h-8 w-8 mr-1 md:mr-0 mb-1 md:mb-0 border border-gray-500 rounded-full md:flex hidden items-center justify-center cursor-pointer hover:bg-gray-100 active:bg-gray-200 active:scale-99 transition duration-100">
//                   <FiUser className="text-xl text-black" />
//                 </div>
//                 <div className="flex md:hidden flex-col w-[130px] relative z-10">
//                   <div
//                     className="flex items-center justify-end  pr-4 active:scale-99 active:bg-gray-100 rounded-md w-full py-2 text-gray-700 cursor-pointer transition-transform duration-100"

//                     onClick={() => setTimeout(() => handleNavigateToLocationPage(), 120)}
//                   >
//                     <div className="max-w-[90px] overflow-hidden whitespace-nowrap text-ellipsis text-[13px] text-gray-700" title={selectedCity?.name}>
//                       {selectedCity?.name && selectedCity.name.trim() !== ''
//                         ? selectedCity.name.length > 10
//                           ? `${selectedCity.name.slice(0, 10)}...`
//                           : selectedCity.name
//                         : 'All Cities'}
//                     </div>
//                     <MdKeyboardArrowDown className="text-[21px] text-black font-bold" />
//                   </div>
//                 </div>
//                 <div className="flex md:hidden items-center justify-end gap-3.5">
//                   <div
//                     onClick={() => setTimeout(() => handleNavigateSearch(), 150)}
//                     className="cursor-pointer active:scale-99 rounded-full active:bg-gray-100 transition-transform duration-100"
//                   >
//                     <IoIosSearch className="text-[22px]" />
//                   </div>
//                   <div
//                     className="flex md:hidden items-center justify-center rounded-full cursor-pointer active:bg-gray-100 active:scale-99 transition duration-100"
//                     onClick={() => setTimeout(() => handleNavigateNotification(), 120)}
//                   >
//                     <IoNotificationsOutline className="text-[21px] text-gray-800" />
//                   </div>
//                   <div
//                     onClick={toggleMobileMenu}
//                     className="p-0 cursor-pointer z-50 relative active:bg-gray-100 active:scale-99 transition duration-100 rounded"
//                   >
//                     {isMobileMenuOpen ? (
//                       <FiX className="text-[24px] text-gray-800" />
//                     ) : (
//                       <GiHamburgerMenu className="text-[24px] text-gray-800" />
//                     )}
//                   </div>
//                   <div
//                     className={`fixed top-0 right-0 h-full w-50 shadow-lg z-40 transition-transform duration-300 ease-in-out transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
//                     ref={mobileMenuRef}
//                   >
//                     <div className="py-4 px-3 min-h-[40vh] bg-gray-50">
//                       <h2 className="text-[16px] font-semibold mb-4">Menu</h2>
//                       <ul className="space-y-4">
//                         <li className="text-gray-700">Blog</li>
//                         <li className="text-gray-700">Login/Register</li>
//                         <li className="text-gray-700">FAQ</li>
//                         <li className="text-gray-700">Contact Us</li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </nav>

//     </>
//   )
// }

// export default NavComponent



import React from 'react'

 const NavComponent = ({  tabs,
  activeTab,
  handleTabClick,
  setShowSearchInput,
  handleNavigateSearch,
  searchRef,
  dropdownRef,
  toggleDropdown,
  isOpen,
  dropdownSearchValue,
  setDropdownSearchValue,
  cities,
  filteredCities,
  handleCitySelect,
  citiesLoading,
  showLocationPopup,
  popularCities,
  mockCities,
  showAllCities,
  setShowAllCities,
  setShowLocationPopup,
  toggleMobileMenu,
  isMobileMenuOpen,
  setIsOpen,
  mobileMenuRef,
  selectedCity,})  => {
  return (
    <div>
      <h1>Nav Component</h1>
    </div>
  )
}

export default NavComponent
