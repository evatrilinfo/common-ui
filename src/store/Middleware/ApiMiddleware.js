
import axios from "axios";
// import { toast } from "react-toastify";
// import LoadingToast from "../../Toasts/LoadingToast";
// import SuccessToast from "../../Toasts/SuccessToast";
import Swal from "sweetalert2";
const base_url = import.meta.env.VITE_BASE_URL;
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
const getAuthHeaders = (token) => {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};
export const getData = async (endPoint, params) => {
  try {
    const response = await axios.get(`${base_url}${endPoint}`, {
      params: params,
    });

    console.log("response in gateway", response.data);
    console.log("base url and endpoint", `${base_url}${endPoint}`);

    if (response.status === 200) return response.data;
  } catch (err) {
    console.log("error", err);

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.message || "Something went wrong while fetching data.",
      confirmButtonColor: "#F55255"
    });

    return err;
  }
};
export const getDataById = async (endPoint, id) => {
  try {
    const response = await axios.get(`${base_url}${endPoint}/${id}`);
    console.log("response in gateway", response);
    if (response.status == 200) return response;
  } catch (err) {
    console.log("error", err);
  }
};
export const getDataByIdWithAuth = async (endPoint, id, token) => {
  const headers = getAuthHeaders(token);
  try {
    const response = await axios.get(`${base_url}${endPoint}/${id}`, {
      headers,
    });
    if (response.status == 200) return response;
  } catch (err) {
    console.log("error", err);
  }
};

// In ApiMiddleware.js - Update getDataWithAuth

export const getDataWithAuth = async (endPoint, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.get(`${base_url}${endPoint}`, { headers });
    console.log("api middleware response.data",response.data);
    return response.data;
  } catch (err) {
    console.error("API Error:", {
      url: `${base_url}${endPoint}`,
      status: err.response?.status,
      error: err.message,
    });
    throw err;
  }
};

export const postData=async(endPoint,formData)=>{
    const headers={
        Accept: "multipart/form-data",
        "Content-Type": "application/json",
    }
    try{
        console.log('endpoint',endPoint)
     const response=await axios.post(`${base_url}${endPoint}`,formData)
     if(response.status==200) return response;
    }catch(err){
        console.log('error',err)
        return err
    }
    }

export const postDataWithAuth = async (endPoint, slug, formData, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Only set Content-Type for non-FormData payloads
  if (!(formData instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  } else {
    delete headers["Content-Type"];
  }

  const url = slug
    ? `${base_url}${endPoint}/${slug}`
    : `${base_url}${endPoint}`;

  try {
    const response = await axios.post(url, formData, { headers });

    return response.data;
  } catch (err) {
    throw err;
  }
};

// export const postDataWithAuth = async (endPoint, data, token) => {
//   const headers = {
//     Authorization: `Bearer ${token}`,
//   };

//   if (!(data instanceof FormData)) {
//     headers["Content-Type"] = "application/json";
//   }

//   const url = `${base_url}${endPoint}`; // endpoint already contains slug

//   try {
//     const response = await axios.post(url, data, { headers });
//     return response.data;
//   } catch (err) {
//     throw err;
//   }
// };

export const postDataById = async (endPoint, formData, token) => {
  const headers = getAuthHeaders(token);

  // Remove Content-Type for FormData to let the browser set it automatically
  if (formData instanceof FormData) {
    delete headers["Content-Type"];
  } else {
    headers["Content-Type"] = "application/json";
  }

  try {
    const response = await axios.post(`${base_url}${endPoint}`, formData, { headers });
    if (response.status === 200) {
      return response.data; // Return the full response for better debugging
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (err) {
    console.error("[postDataById] Error:", err);
    throw err; // Re-throw the error so it can be caught by the caller
  }
};

export const deleteDataWithAuth = async (endPoint, token) => {
  const headers = getAuthHeaders(token);
  const url = `${base_url}${endPoint}`;
  try {
    const response = await axios.delete(url, { headers });
    if (response.status === 200 || response.status === 204) {
      console.log("[Delete Success]:", response.data);
      Swal.fire({
        icon: "success",
        title: "Deleted successfully",
        showConfirmButton: false,
        timer: 1200,
      });
      return response;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (err) {
    console.error("[Delete Error]:", {
      url,
      status: err.response?.status,
      error: err.message,
    });
    Swal.fire({
      icon: "error",
      title: "Failed to delete",
      text: err.response?.data?.message || err.message,
    });
    throw err;
  }
};

