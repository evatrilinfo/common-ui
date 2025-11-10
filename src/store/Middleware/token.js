// src/helpers/tokenHelper.js
import { decryptData } from "../Util/Util";

export const getToken = () => {
  try {
    const encryptedToken = localStorage.getItem("auth");
    if (!encryptedToken) return null;

    // const token = decryptData(encryptedToken);
    // return token;
     const token = decryptData(encryptedToken);
    return token?.token;
  } catch (error) {
    console.error("Failed to retrieve or decrypt token:", error);
    return null;
  }
};
