
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/Store';
import { CityFilterProvider } from './Context/CityFilterContext';
// import { BrowserRouter } from 'react-router-dom';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <BrowserRouter> */}
        <CityFilterProvider>
          <App />
        </CityFilterProvider>
      {/* </BrowserRouter> */}
    </Provider>
  </React.StrictMode>

);