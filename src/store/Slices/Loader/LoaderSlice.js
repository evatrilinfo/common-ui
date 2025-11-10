import {createSlice } from "@reduxjs/toolkit"

const initialState={
    isLoading:false,
}
const LoaderReducer=createSlice({
    name:'loader',
    initialState,
    reducers:{
        setLoader:(state)=>{
            state.isLoading=true;
        },
        unsetLoader:(state)=>{
            state.isLoading=false;
        }
    }
})
export const {setLoader,unsetLoader}=LoaderReducer.actions
export default LoaderReducer.reducer