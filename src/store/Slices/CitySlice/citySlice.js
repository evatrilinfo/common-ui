import { createSlice } from '@reduxjs/toolkit';
import { getData } from '../../Middleware/ApiMiddleware';

const initialState = {
  selectedCity: null, // { id, name, slug }
  cities: [],
  loading: false,
  error: null,
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload;
    },
    setCities: (state, action) => {
      state.cities = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCitiesLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setCitiesError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setSelectedCity, setCities, setCitiesLoading, setCitiesError } = citySlice.actions;

// Async thunk to fetch cities
export const fetchCities = () => async (dispatch) => {
  dispatch(setCitiesLoading());
  const response = await getData('settings');
  if (response.cities) {
    dispatch(setCities(response.cities))
  } else {
        dispatch(setCitiesError(response.error));

  }
};

export default citySlice.reducer;


