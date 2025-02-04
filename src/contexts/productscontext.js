import{createContext ,useContext, useEffect, useReducer} from "react"
import axios from 'axios';

import reducer from "../reducer/productReducer"
const AppContext=createContext();
const API="https://api.pujakaitem.com/api/products"
const initialState={
    isLoading:false,
    isError:false,
    products:[],
    featuredProducts: [],
    isSingleLoading:false,
    singleProduct:{}
}
const AppProvider=({children})=>{

    const[state,dispatch]=useReducer(reducer,initialState);

    const getProducts=async(url)=>{
        dispatch({type:"SET_LOADING"})
        try {
            const res=await axios.get(url);
            const products =await res.data;
            console.log(products)
            dispatch({type:"SET_API_DATA" ,payload:products})
        } catch (error) {
            console.log(error);
            
            dispatch({type:"SET_ERROR"})
        }
    }

    const getSingleProduct=async(url)=>{
        dispatch({type:"SINGLE_LOADING"})
        try {
            const res=await axios.get(url);
            const singleProduct =await res.data;
            // console.log(products)
            dispatch({type:"SINGLE_PRODUCT_DATA" ,payload:singleProduct})
        } catch (error) {
            dispatch({type:"SINGLE_ERROR"})
        }
    }
    useEffect(()=>{
        getProducts(API);
    },[])

    return(<AppContext.Provider value={{...state,getSingleProduct}}>
        {children}
    </AppContext.Provider>)
}

const useProductContext=()=>{
    return useContext(AppContext)
}

export{useProductContext,AppProvider,AppContext};