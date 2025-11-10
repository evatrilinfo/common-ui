
import { combineReducers } from "@reduxjs/toolkit"
import AuthSlice from '../store/Slices/CitySlice/Auth/AuthSlice'
import LoaderSlice from '../store/Slices/Loader/LoaderSlice'
import cityReducer from './Slices/CitySlice/citySlice';


const rootReducer = combineReducers(
    {
        auth: AuthSlice,
        loader: LoaderSlice,
        city: cityReducer,
    
    }
)
export default rootReducer
