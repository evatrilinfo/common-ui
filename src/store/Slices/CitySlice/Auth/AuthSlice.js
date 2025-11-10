
import { createSlice } from "@reduxjs/toolkit"
import { postData, postDataWithAuth } from "../../../Middleware/ApiMiddleware"
import { setLoader, unsetLoader } from "../../../Slices/Loader/LoaderSlice"
import { encryptData } from "../../../Util/Util";

const initialState = {
    token: '',
    userDetails: {}
}
const AuthReducer = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        storeAuthDetails: (state, action) => {
            state.token = action.payload?.token,
                state.userDetails = action.payload?.userDetails
        },
        // logOut: (state) => {
        //     state.token = '';
        //     state.userDetails = {}
        //     // localStorage.removeItem('order');
        // }
        logOut: (state) => {
            state.token = '';
            state.userDetails = {};
            localStorage.removeItem('auth');
        }
    }
})
export const { storeAuthDetails, logOut } = AuthReducer.actions
export const generateOtp = (formData) => {

    return async (dispatch) => {
        const endPoint = 'send-otp'
        try {
            const response = await postData(endPoint, formData)
            console.log('response otp', response)
            return response
        } catch (err) {
            console.log('error', err)
        }
    }
}
export const validateOtp = (formData) => {
    return async (dispatch) => {
        const endPoint = 'verify-otp'
        try {
            dispatch(setLoader())
            const response = await postData(endPoint, formData)
            //    localStorage.setItem("token", encryptData(response.data.token));
            localStorage.setItem("auth", encryptData({
                token: response.data.token,
                userDetails: response.data.userDetails
            }));

            console.log("respondss", response)
            dispatch(storeAuthDetails(response.data));
            console.log('response otp storeb work done', response)
            return response
        } catch (err) {
            return err
        } finally {
            dispatch(unsetLoader())
        }
    }

}
export const generateOtpForMobileChange = (formData, token) => {
    return async (dispatch) => {
        const endPoint = 'generate-otp'
        try {
            const response = await postDataWithAuth(endPoint, formData, token)
            console.log('response otp', response)
            return response
        } catch (err) {
            return err
        }
    }
}
export const updateMobile = (formData, token) => {
    return async (dispatch) => {
        const endPoint = 'update-mobile'
        try {
            const response = await postDataWithAuth(endPoint, formData, token)
            console.log('response otp', response)
            return response
        } catch (err) {
            return err
        }
    }
}
/* export const logOut=()=>{
    return async(dispatch)=>{
        dispatch(removeToken())
    }
} */
export default AuthReducer.reducer
