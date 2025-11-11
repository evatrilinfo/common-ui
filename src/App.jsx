import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter } from 'react-router-dom'
import { CityFilterProvider } from './Context/CityFilterContext'
// import { BrowserRouter } from 'react-router-dom'
// import { CityFilterProvider } from './Context/CityFilterContext'

const App = () => {
  return (
    <BrowserRouter>
      <CityFilterProvider>
        <Navbar />
      </CityFilterProvider>
     </BrowserRouter>
  );
};

export default App



// menu.evatril.com/src/App.jsx
// import React from 'react';
// import { Provider } from 'react-redux';
// import store from './store/Store';
 
// import { CityFilterProvider } from './Context/CityFilterContext';
// import Navbar from './components/Navbar';

// const App = () => {
//   return (
//     <Provider store={store}>
//       <CityFilterProvider>
//         <Navbar />
//       </CityFilterProvider>
//     </Provider>
//   );
// };

// export default App;
