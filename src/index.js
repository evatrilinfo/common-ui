// src/index.js
import Navbar from "../src/components/Navbar";
import { CityFilterProvider, useCityFilter } from "../src/Context/CityFilterContext";
import cityReducer from "../src/store/Slices/CitySlice/citySlice";

export { Navbar,CityFilterProvider,useCityFilter,cityReducer  };
export default Navbar;
