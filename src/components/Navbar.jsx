// import React, { useState } from 'react';

// const Navbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [activeItem, setActiveItem] = useState('Home');

//   const navItems = [
//     { name: 'Home', url: 'https://evatril.com' },
//     { name: 'Menu', url: 'https://menu.evatril.com' },
//     { name: 'Venue', url: 'https://venue.evatril.com' },
//     { name: 'Services', url: 'https://services.evatril.com' },
//     { name: 'Invitation', url: 'https://invitation.evatril.com' }
//   ];

//   const handleNavigation = (item) => {
//     setActiveItem(item.name);
//       window.open(item.url, '_self'); // opens in the same tab
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <nav className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <span className="text-white text-xl font-bold cursor-pointer">
//               Evatril
//             </span>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex space-x-1">
//             {navItems.map((item, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleNavigation(item)}
//                 className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
//                   activeItem === item.name
//                     ? 'bg-white text-purple-600 shadow-lg'
//                     : 'text-white hover:bg-white hover:bg-opacity-10 hover:-translate-y-0.5'
//                 }`}
//               >
//                 {item.name}
//               </button>
//             ))}
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button
//               onClick={toggleMobileMenu}
//               className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white hover:bg-opacity-10 focus:outline-none"
//             >
//               <div className="space-y-1">
//                 <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
//                 <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
//                 <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
//               </div>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
//           <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-to-r from-purple-700 to-blue-700 rounded-lg mt-2 shadow-lg">
//             {navItems.map((item, index) => (
//               <button
//                 key={index}
//                 onClick={() => {
//                   handleNavigation(item);
//                   setIsMobileMenuOpen(false);
//                 }}
//                 className={`block w-full text-left px-4 py-3 rounded-md text-base font-medium transition-all duration-300 hover:pl-6 border-b border-white border-opacity-10 last:border-b-0 ${
//                   activeItem === item.name
//                     ? 'bg-white text-purple-600'
//                     : 'text-white hover:bg-white hover:bg-opacity-10'
//                 }`}
//               >
//                 {item.name}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities, setSelectedCity } from '../store/Slices/CitySlice/citySlice';
import { FiUser, FiSearch } from 'react-icons/fi';
import { FaMapMarkerAlt, FaChevronDown, FaSearch, FaHome, FaUtensils, FaConciergeBell, FaUser, FaSort, FaFilter, FaArrowLeft,FaEnvelopeOpenText } from 'react-icons/fa';
import { MdEventSeat, MdTheaters, MdOutlineTheaterComedy } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoNotificationsOutline } from 'react-icons/io5';
import { IoIosSearch } from 'react-icons/io'
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FiX } from "react-icons/fi";
import SearchPopup from './SearchPopup';
import LocationPopup from '../components/LocationPopup';
// import NavComponent from './NavComponent';
import { matchPath } from 'react-router-dom';
import { MdLocationOn, MdLocationCity } from 'react-icons/md';
import { RxCross2 } from "react-icons/rx";
import { useCityFilter } from '../Context/CityFilterContext';

import {
  FaUserCircle,
  FaShoppingBag,
  FaFilm,
  FaCreditCard,
  FaQuestionCircle,
  FaCog,
  FaGift,
  FaRegNewspaper
} from "react-icons/fa";
//  import { useSelector } from 'react-redux';


const Navbar = () => {
  const {
    mockCities,
    popularCities,
    filterData,
    setFilterData,
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



  // const [showAllCities, setShowAllCities] = useState(false);
  const [activeTab, setActiveTab] = useState('Venue');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchText, setSearchText] = useState('');
  const storedCity = useSelector((state) => state.city.selectedCity);
  const [showSortFilter, setShowSortFilter] = useState(false);
  const lastScrollY = useRef(0);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const slug = useParams()
  const location = useLocation();
  const currentPath = location.pathname.replace(/\/+$/, '');
  

  console.log("citiessss", cities)


  // Fetch cities on mount
  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);



  // Handle scroll for sort/filter bar
  useEffect(() => {
    if (currentPath === '/catagoryCardDetails') {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
          setShowSortFilter(true);
        } else if (currentScrollY < lastScrollY.current) {
          setShowSortFilter(false);
        }
        lastScrollY.current = currentScrollY;
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setShowSortFilter(false);
    }
  }, [currentPath]);

  useEffect(() => {
    if (isOpen || isMobileMenuOpen || showLocationPopup || showSearchInput) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isMobileMenuOpen, showLocationPopup, showSearchInput]);

  const tabs = [
    { name: 'Home', path: storedCity ? `/${storedCity.slug}` : 'https://evatril.com', icon: <FaHome className='text-lg mb-1' /> },
    { name: 'Venue', path: 'https://venue.evatril.com', icon: <MdEventSeat className='text-lg mb-1' /> },
    { name: 'Menu', path: 'https://menu.evatril.com/', icon: <FaUtensils className='text-lg mb-1' /> },
    // { name: 'Services', path: '/services', icon: <FaConciergeBell className='text-lg mb-1' /> },
     { name: "Invitation", icon: <FaEnvelopeOpenText className="text-lg mb-1" />, path: "https://curesoon.in" },
    { name: 'Profile', path: '/profilepage', icon: <FaUser className='text-xl mb-1' />, mobileOnly: true },
  ];

  const sortFilterTabs = [
    { name: 'Sort', icon: <FaSort className='text-lg mb-1' /> },
    { name: 'Filter', icon: <FaFilter className='text-lg mb-1' /> },
  ];


  const trendingSearches = [
    { id: '1', name: 'Banquet Halls', icon: <MdLocationCity /> },
    { id: '2', name: 'Lawns', icon: <MdLocationOn /> },
    { id: '3', name: 'Destination Wedding', icon: <MdLocationCity /> },
    { id: '4', name: 'Resorts', icon: <MdLocationOn /> },
    { id: '5', name: 'Hotels', icon: <MdLocationCity /> },
    { id: '6', name: 'Community Halls', icon: <MdLocationOn /> },
    { id: '7', name: 'kalyana Mandapams', icon: <MdLocationCity /> },
    { id: '8', name: 'Hill Station Venues', icon: <MdLocationOn /> },
  ];


  const categories = [
    { name: 'Movies', color: 'red-500' },
    { name: 'Stream', color: 'red-500' },
    { name: 'Events', color: 'red-500' },
    { name: 'Plays', color: 'red-500' },
  ];

  const filteredTrending = trendingSearches.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );


  const handleTabClick = (tab) => {
    setActiveTab(tab.name);
    if (tab.path?.startsWith('http')) {
      // window.location.href = tab.path;
      window.location.assign(tab.path);
    } else {
      navigate(tab.path);
    }
    setIsMobileMenuOpen(false);
  };

  const handleSortFilterClick = (name) => {
    setActiveTab(name);
  };


  const handleNavigateSearch = () => {
    setShowSearchInput(true);
  };

  const handleNavigateNotification = () => {
    navigate('/notification');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const handleVenueSelect = (venue) => {
    setShowSearchInput(false);
    setSearchText('');
    console.log("Selected venue:", venue);
  };

  const user = "User";




  const pathParts = location.pathname.split('/').filter(Boolean);


  const isVenueDetails = matchPath('/venuedetails/:slug', currentPath) || matchPath('/:city/venuedetails/:slug', currentPath);
  const isSubNav = currentPath.includes('/subnavcards');
  const isCatagoryCard = currentPath.includes('/catagoryCardDetails');

  const isCardDetails = matchPath('/venuedetails/card-details/:slug', currentPath) || matchPath('/:citySlug/venuedetails/card-details/:slug', currentPath); const isProfile = currentPath.includes('/profilepage');
  const isBooking = matchPath('/venues/checkout/:slug', currentPath)
  const isCheckout = matchPath('/venuedetails/checkout/:slug', currentPath) || matchPath('/:citySlug/venuedetails/checkout/:slug', currentPath) || matchPath('/:citySlug/venuedetails/card-details/checkout/:slug', currentPath) || matchPath('/venuedetails/card-details/checkout/:slug', currentPath)
  const isAllVenues = currentPath.includes('/venues');

const isDestinationPage=currentPath.includes('/destination-venues')
  const isLocation = currentPath.includes('/locationpage');
  // const isDestinationPage = currentPath.includes('/destinationpage')


  useEffect(() => {
    // Close popup on route change
    setShowLocationPopup(false);
  }, [location.pathname]);

  // console.log("showlocation popup is"+showLocationPopup);
  // console.log("ISOPEN is"+isOpen);
  // console.log(isBooking);
  // console.log(currentPath.includes("/checkout"));
  // console.log(isBooking);
  // console.log("checkout condition is",checkout.pattern.end);
  console.log(currentPath);

  const { selectedVenue } = location.state || {}
  // console.log(selectedVenue.name);

  const initialFromRef = useRef(location.state?.from || null);

  // Keep the original from if it was passed in once
  useEffect(() => {
    if (!initialFromRef.current && location.state?.from) {
      initialFromRef.current = location.state.from;
    }
  }, [location.state]);

  const handleBack = () => {
    if (initialFromRef.current) {
      navigate(initialFromRef.current);
    } else {
      navigate(-1);
    }
  };

  return (
    <>

      {(isVenueDetails || isSubNav || isCatagoryCard || isCardDetails || isProfile || isCheckout ||isDestinationPage|| isAllVenues || isLocation) ? (
        <>
          <NavComponent
            tabs={tabs}
            activeTab={activeTab}
            handleTabClick={handleTabClick}
            setShowSearchInput={setShowSearchInput}
            handleNavigateSearch={handleNavigateSearch}
            searchRef={searchRef}
            dropdownRef={dropdownRef}
            toggleDropdown={toggleDropdown}
            isOpen={isOpen}
            dropdownSearchValue={dropdownSearchValue}
            setDropdownSearchValue={setDropdownSearchValue}
            cities={cities}
            filteredCities={filteredCities}
            handleCitySelect={handleCitySelect}
            citiesLoading={citiesLoading}
            selectedCity={selectedCity}
            showLocationPopup={showLocationPopup}
            mockCities={mockCities}
            showAllCities={showAllCities}
            setShowAllCities={setShowAllCities}
            setShowLocationPopup={setShowLocationPopup}
            popularCities={popularCities}
            toggleMobileMenu={toggleMobileMenu}
            isMobileMenuOpen={isMobileMenuOpen}
            mobileMenuRef={mobileMenuRef}
            setIsOpen={setIsOpen}
          />

          <nav className="fixed top-0 left-0 w-full h-[55px] text-gray-700 font-bold text-[16px] sm:pl-2 flex md:hidden items-center shadow-sm md:px-10 lg:px-10 px-4 py-3.5 z-[99999] bg-white backdrop-blur-md">
            <div
              onClick={() => setTimeout(handleBack, 150)}
              className="rounded-full active:bg-gray-300 transition duration-150 ease-in-out cursor-pointer"
            >
              <p className="h-7.5 w-7.5 p-1 text-black font-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-full h-full"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </p>
            </div>

            <p className="font-normal pl-2 text-black">
              {currentPath === '/subnavcards' ? 'Venue Type' :
                isVenueDetails ? 'Venue Details' :
                  currentPath === '/catagoryCardDetails' ? 'Photography' :
                    isCardDetails
                      ? (
                        <span className="font-semibold text-[18px]">
                          {(selectedVenue?.name ?? "Card Details").length > 15
                            ? `${(selectedVenue?.name ?? "Card Details").slice(0, 15)}...`
                            : (selectedVenue?.name ?? "Card Details")}
                        </span>
                      )
                      :
                      currentPath === '/profilepage' ? ` Hi ${user}` :

                        isCheckout ? 'Checkout' :
                        isDestinationPage ? 'Destination Wedding' :
                          currentPath === '/venues' || ':city/venues' ? `Venues` :
                            currentPath === '/locationpage' ? (selectedCity?.name || 'Location') :
                              ''}
            </p>

          </nav>
        </>
      ) : (

        <nav className="fixed top-0 left-0 w-full h-[55px] md:h-[65px] flex space-x-0 items-center shadow-sm md:px-6 lg:px-10 px-3 py-3 z-[9] bg-white backdrop-blur-md">
          <div className="flex items-center w-full justify-between md:justify-between">
            <div className="flex w-[34%] md:w-[60%] md:gap-6 lg:gap-12 xl:gap-12 2xl:gap-14">
              <Link to={storedCity ? `/${storedCity.slug}` : '/'}>
                <img src="/evatril_logo.jpg" alt="logo" className="md:w-[100px] w-[84px] md:h-9 h-7 flex" />
              </Link>
              <div className="navigation-links hidden md:flex gap-4">
                {tabs
                  .filter((tab) => !tab.mobileOnly)
                  .map((tab) => (
                    <button
                      key={tab.name}
                      className={`font-medium cursor-pointer px-0 py-1 transition ${activeTab === tab.name ? 'text-[#f55253]  border-b-2 border-[#f55253]' : 'hover:text-red-600'}`}
                      onClick={() => handleTabClick(tab)}
                    >
                      {tab.name}
                    </button>
                  ))}
              </div>
            </div>
            <div className="flex items-center justify-end md:space-x-3 lg:space-x-4">
              <div className="hidden md:flex">
                <div
                  onClick={() => setTimeout(() => handleNavigateSearch(), 120)}
                  className="cursor-pointer p-1 rounded-md active:bg-gray-200 active:scale-95 transition duration-100"
                >
                  <IoIosSearch className="text-[22px] text-gray-700" />
                </div>
              </div>
              <div className="hidden md:flex lg:flex lg:flex-col relative w-[120px] h-10" ref={dropdownRef}>
                <div
                  className="nav-dropdown-city flex items-center rounded-md px-2 justify-center py-2 text-gray-700 cursor-pointer active:bg-gray-100 active:scale-99 transition duration-100"
                  onClick={() => setTimeout(() => toggleDropdown(), 120)}
                >
                  <span className="text-gray-500 truncate w-24 text-md text-center overflow-hidden">
                    {selectedCity?.name || 'All Cities'}
                  </span>
                  <FaChevronDown className={`text-gray-500 text-sm transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
                {isOpen && (
                  <LocationPopup
                    // show={showLocationPopup}
                    setIsOpen={setIsOpen}

                    onClose={() => setShowLocationPopup(false)}
                    dropdownSearchValue={dropdownSearchValue}
                    setDropdownSearchValue={setDropdownSearchValue}
                    popularCities={popularCities}
                    cities={cities}
                    mockCities={mockCities}
                    filteredCities={filteredCities}
                    handleCitySelect={handleCitySelect}
                    showAllCities={showAllCities}
                    setShowAllCities={setShowAllCities}
                    citiesLoading={citiesLoading}
                    setShowLocationPopup={setShowLocationPopup}
                  />
                )}
              </div>
              <div className="h-8 w-8 mr-1 md:mr-0 mb-1 md:mb-0 border border-gray-500 rounded-full md:flex hidden items-center justify-center cursor-pointer hover:bg-gray-100 active:bg-gray-200 active:scale-99 transition duration-100">
                <FiUser className="text-xl text-black" />
              </div>
              <div className="flex md:hidden flex-col w-[130px] relative z-10">
                <div
                  className="flex items-center justify-end  pr-4 active:scale-99 active:bg-gray-100 rounded-md w-full py-2 text-gray-700 cursor-pointer transition-transform duration-100"
                  // onClick={() => setTimeout(() => handleNavigateToLocationPage(), 120)}
                  // onClick={()=>toggleDropdown()}
                  onClick={() => setIsOpen(true)}
                >
                  <div className="max-w-[90px] overflow-hidden whitespace-nowrap text-ellipsis text-[13px] text-gray-700" title={selectedCity?.name}>
                    {selectedCity?.name && selectedCity.name.trim() !== ''
                      ? selectedCity.name.length > 10
                        ? `${selectedCity.name.slice(0, 10)}...`
                        : selectedCity.name
                      : 'All Cities'}
                  </div>
                  <MdKeyboardArrowDown className="text-[21px] text-black font-bold" />
                </div>
                {isOpen && (

                  <LocationPopup
                    setIsOpen={setIsOpen}
                    onClose={() => setIsOpen(false)}
                    dropdownSearchValue={dropdownSearchValue}
                    setDropdownSearchValue={setDropdownSearchValue}
                    popularCities={popularCities}
                    cities={cities}
                    mockCities={mockCities}
                    filteredCities={filteredCities}
                    handleCitySelect={handleCitySelect}
                    showAllCities={showAllCities}
                    setShowAllCities={setShowAllCities}
                    citiesLoading={citiesLoading}
                    setShowLocationPopup={setShowLocationPopup}
                  />
                )}
              </div>
              <div className="flex md:hidden items-center justify-end gap-3.5">
                <div
                  onClick={() => setTimeout(() => handleNavigateSearch(), 150)}
                  className="cursor-pointer active:scale-99 rounded-full p-1 active:bg-gray-100 transition-transform duration-100"
                >
                  <IoIosSearch className="text-[24px]" />
                </div>
                <div
                  className="flex md:hidden items-center justify-center rounded-full cursor-pointer active:bg-gray-100 active:scale-99 transition duration-100"
                  onClick={() => setTimeout(() => handleNavigateNotification(), 120)}
                >
                  <IoNotificationsOutline className="text-[21px] text-gray-800" />
                </div>
                <div
                  // onClick={toggleMobileMenu}
                  className="p-0 cursor-pointer z-5 relative active:bg-gray-100 active:scale-99 transition duration-100 rounded"
                >
                  {isMobileMenuOpen ? (
                    <FiX className="text-[24px] text-gray-800" />
                  ) : (
                    <GiHamburgerMenu className="text-[24px] text-gray-800" />
                  )}
                </div>
                <div
                  className={`fixed top-0 right-0 h-full w-[100vw] shadow-lg z-40 transition-transform duration-300 ease-in-out transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                  ref={mobileMenuRef}
                >
                  <div className="py-4 px-3 min-h-[100vh] bg-gray-50">
                    <h2 className="text-[16px] font-semibold mb-4">Hi User!</h2>

                    <ul className="space-y-4">
                      <li className="flex items-start border-b border-gray-200 space-x-3">
                        <FaRegNewspaper className="text-[18px] mt-1 text-gray-600" />
                        <div>
                          <p className="font-medium text-[14px]">Blog</p>
                          <p className="text-[12px] pb-1 text-gray-500">Read our latest news & stories</p>
                        </div>
                      </li>

                      <li className="flex items-start space-x-3 border-b border-gray-200">
                        <FaShoppingBag className="text-[18px] mt-1 text-gray-600" />
                        <div>
                          <p className="font-medium text-[14px]">Your Orders</p>
                          <p className="text-[12px] pb-1 text-gray-500">View all your bookings & purchases</p>
                        </div>
                      </li>

                      <li className="flex items-start border-b border-gray-200 space-x-3">
                        <FaFilm className="text-[18px] mt-1 text-gray-600" />
                        <div>
                          <p className="font-medium text-[14px]">Stream Library</p>
                          <p className="text-[12px] pb-1 text-gray-500">Rented & Purchased Movies</p>
                        </div>
                      </li>

                      <li className="flex items-start space-x-3 border-b border-gray-200">
                        <FaCreditCard className="text-[18px] mt-1 text-gray-600" />
                        <div>
                          <p className="font-medium text-[14px]">Play Credit Card</p>
                          <p className="text-[12px] pb-1 text-gray-500">View your Play Credit Card details and offers</p>
                        </div>
                      </li>

                      <li className="flex items-start space-x-3 border-b border-gray-200">
                        <FaQuestionCircle className="text-[18px] mt-1 text-gray-600" />
                        <div>
                          <p className="font-medium text-[14px]">Help & Support</p>
                          <p className="text-[12px] pb-1 text-gray-500">View commonly asked queries and Chat</p>
                        </div>
                      </li>

                      <li className="flex items-start space-x-3 border-b border-gray-200">
                        <FaCog className="text-[18px] mt-1 text-gray-600" />
                        <div>
                          <p className="font-medium text-[14px]">Accounts & Settings</p>
                          <p className="text-[12px] pb-1 text-gray-500">Location, Payments, Permissions & More</p>
                        </div>
                      </li>

                      <li className="flex items-start space-x-3 ">
                        <FaGift className="text-[18px] mt-1 text-gray-600" />
                        <div>
                          <p className="font-medium text-[14px]">Rewards</p>
                          <p className="text-[12px] pb-1 text-gray-500">View your rewards & unlock new ones</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}

      {showSearchInput && (

        <SearchPopup
          showSearchInput={showSearchInput}
          setShowSearchInput={setShowSearchInput}
          searchText={searchText}
          setSearchText={setSearchText}
          categories={categories}
          filteredTrending={filteredTrending}
          handleVenueSelect={handleVenueSelect}
        />
      )}

      {showLocationPopup && (
        <LocationPopup
          show={showLocationPopup}
          setIsOpen={setIsOpen}
          onClose={() => setShowLocationPopup(false)}
          dropdownSearchValue={dropdownSearchValue}
          setDropdownSearchValue={setDropdownSearchValue}
          popularCities={popularCities}
          cities={cities}
          mockCities={mockCities}
          filteredCities={filteredCities}
          handleCitySelect={handleCitySelect}
          showAllCities={showAllCities}
          setShowAllCities={setShowAllCities}
          citiesLoading={citiesLoading}
          setShowLocationPopup={setShowLocationPopup}

        />
      )}

      {showSearchInput && (

        <SearchPopup
          showSearchInput={showSearchInput}
          setShowSearchInput={setShowSearchInput}
          searchText={searchText}
          setSearchText={setSearchText}
          categories={categories}
          filteredTrending={filteredTrending}
          handleVenueSelect={handleVenueSelect}
        />
      )}



      {currentPath === '/catagoryCardDetails' && (
        <div
          className={`fixed left-0 w-full bg-white border-t border-gray-200 shadow-md flex justify-around items-center md:hidden z-[98] h-[55px] transition-transform duration-300 ease-in-out ${showSortFilter ? 'translate-y-0' : 'translate-y-[60px]'}`}
        >
          {sortFilterTabs.map((tab) => (
            <button
              key={tab.name}
              className={`flex flex-col items-center justify-center text-[12px] md:text-[14px] ${activeTab === tab.name ? 'text-red-600' : 'text-gray-500'}`}
              onClick={() => handleSortFilterClick(tab.name)}
            >
              {tab.icon}
              <span className="text-gray-500 text-[12px] md:text-[16px]">{tab.name}</span>
            </button>
          ))}
        </div>
      )}

      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md flex justify-around items-center md:hidden z-[98] h-[60px]">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`flex flex-col items-center justify-center text-[12px] md:text-[14px] ${activeTab === tab.name ? 'text-red-600' : 'text-gray-500'}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default Navbar;