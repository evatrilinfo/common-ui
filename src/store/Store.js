
import { configureStore } from "@reduxjs/toolkit"
import { decryptData } from "./Util/Util"
import root from './index'
// const getFromLocalStorage = () => {
//   try {
//     const encrypted = localStorage.getItem('auth');
//     if (!encrypted) return undefined;

//     const decrypted = decryptData(encrypted);
    
//     return {
//        auth: {
//         token: decrypted.token,
//         userDetails: decrypted.userDetails,
//       }
//     };
//   } catch (err) {
//     console.error("Failed to load state:", err);
//     return undefined;
//   }
// }

const getFromLocalStorage = () => {
  try {
    const encrypted = localStorage.getItem('auth');
    if (!encrypted) return undefined;

    const decrypted = decryptData(encrypted);
    if (!decrypted) {
      console.warn("LocalStorage data is invalid or corrupt — clearing it");
      localStorage.removeItem('auth');
      return undefined;
    }

    return {
      auth: {
        token: decrypted.token || null,
        userDetails: decrypted.userDetails || null,
      },
    };
  } catch (err) {
    console.error("Failed to load state:", err);
    return undefined;
  }
};


const persistedState = getFromLocalStorage();

const store = configureStore({
  reducer: root,
  preloadedState: persistedState,
})

export default store;
