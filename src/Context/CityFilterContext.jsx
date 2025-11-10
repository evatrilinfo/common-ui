import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { fetchCities, setSelectedCity } from '../store/Slices/CitySlice/citySlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";

const CityFilterContext = createContext();

export const CityFilterProvider = ({ children }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const { selectedCity, cities, loading: citiesLoading } = useSelector((state) => state.city);

  const [mockCities] = useState([
    { id: '123', name: 'Puri', slug: 'puri' },
    { id: '124', name: 'Bhubaneswar', slug: 'bhubaneswar' },
    { id: '125', name: 'Delhi', slug: 'delhi' },
    { id: '126', name: 'Mumbai', slug: 'mumbai' },
    { id: '127', name: 'Bangalore', slug: 'bangalore' },
    { id: '128', name: 'Hyderabad', slug: 'hyderabad' },
    { id: '129', name: 'Chennai', slug: 'chennai' },
    { id: '130', name: 'Kolkata', slug: 'kolkata' },
  ]);

  const [popularCities] = useState(['Puri', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata']);

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownSearchValue, setDropdownSearchValue] = useState('');
  const [showAllCities, setShowAllCities] = useState(false);
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [ClearFilter,setClearFilter]=useState(false)

  const [filterData, setFilterData] = useState({
    selectedVenueTypes: [],
    selectedCities: [],
  });


  const filteredCities = useMemo(() => {
    const cityList = cities.length ? cities : mockCities;
    return cityList.filter((city) =>
      city.name.toLowerCase().includes(dropdownSearchValue.toLowerCase())
    );
  }, [cities, mockCities, dropdownSearchValue]);

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  useEffect(() => {
    const pathSlug = location.pathname.split('/')[1];
    const cityQuery = new URLSearchParams(location.search).get('city');
    
    if (pathSlug && cities.some(c => c.slug === pathSlug)) {
      const matchedCity = cities.find((c) => c.slug === pathSlug);
      if (matchedCity && (!selectedCity || selectedCity.slug !== pathSlug)) {
        dispatch(setSelectedCity(matchedCity));
      }
    } else if (cityQuery && cities.some(c => c.slug === cityQuery)) {
      const matchedCity = cities.find((c) => c.slug === cityQuery);
      if (matchedCity && (!selectedCity || selectedCity.slug !== cityQuery)) {
        dispatch(setSelectedCity(matchedCity));
      }
    } else {
      dispatch(setSelectedCity(null));
    }
  }, [location.pathname, location.search, cities, selectedCity, dispatch]);

  const handleCitySelect = (city) => {
     
    dispatch(setSelectedCity(city));
    setIsOpen(false);
    setShowLocationPopup(false);
    setDropdownSearchValue('');
    

    const currentPath = location.pathname;
    const searchParams = new URLSearchParams(location.search);
    let newPath;

    const pathSegments = currentPath.split('/').filter(Boolean);
    let basePath = currentPath;
    if (pathSegments[0] && cities.some(c => c.slug === pathSegments[0])) {
      basePath = `/${pathSegments.slice(1).join('/')}`;
    }

    const cityRoutes = [
      'venues',
      'venuedetails',
      'subnavcards',
      'catagoryCardDetails',
      'cardDetails',
      'profilepage',
      'checkout',
      'locationpage',
      'notification',
      'reviews',
      'popular',
      'confirmation',
    ];

    if (basePath.startsWith('/bookinglist') || basePath.startsWith('/booking/bookingdetails')) {
      if (city && city.id) {
        searchParams.set('city', city.slug);
      } else {
        searchParams.delete('city');
      }
      newPath = `${basePath}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    } else if (cityRoutes.some(route => basePath.includes(route)) || basePath === '/') {
      newPath = city && city.id ? `/${city.slug}${basePath === '/' ? '' : basePath}` : basePath;
      searchParams.delete('city');
      if (searchParams.toString()) {
        newPath += `?${searchParams.toString()}`;
      }
    } else {
      newPath = city && city.id ? `/${city.slug}` : '/';
      searchParams.delete('city');
      if (searchParams.toString()) {
        newPath += `?${searchParams.toString()}`;
      }
    }

    navigate(newPath, { replace: true });
     setClearFilter(true)
   
  };

  

  return (
    <CityFilterContext.Provider
      value={{
        filterData,
        setFilterData,
        mockCities,
        popularCities,
        isOpen,
        setIsOpen,
        showAllCities,
        setShowAllCities,
        filteredCities,
        selectedCity,
        handleCitySelect,
        citiesLoading,
        cities,
        showLocationPopup,
        setShowLocationPopup,

        dropdownSearchValue,
        setDropdownSearchValue,
        setClearFilter,
        ClearFilter
      }}
    >
      {children}
    </CityFilterContext.Provider>
  );
};


export const useCityFilter = () => {
  const context = useContext(CityFilterContext);
  if (!context) {
    throw new Error('useCityFilter must be used within a CityFilterProvider');
  }
  return context;
};
