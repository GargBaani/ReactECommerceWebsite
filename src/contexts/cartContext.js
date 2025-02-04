import {  useContext,createContext, useReducer, useEffect } from "react";
import reducer from "../reducer/cartReducer"
const CartContext=createContext();
const getLocalData=()=>{
    const localData=localStorage.getItem("cart");
    if (!localData || localData.length === 0) return [];

    else return  JSON.parse(localData)
}
const initialState={
    cart:getLocalData(),
    total_items:"",
    total_price:"",
    shippingFee:50000
}
const CartProvider=({children})=>{

    const[state,dispatch]=useReducer(reducer,initialState);

    const addToCart=(id, color, amount, product)=>{
     dispatch({type:"ADD_TO_CART", payload:{id, color, amount, product}})
        
    }
    const removeItem=(id)=>{
        dispatch({type:"REMOVE_ITEM" ,payload:{id}})
    }
    const clearCart=()=>{
        dispatch({type:"CLEAR_CART" })
    }
    const setDecrease=(id)=>{
        dispatch({type:"SET_DECREMENT",payload:id})
    }
    const setIncrease=(id)=>{
        dispatch({type:"SET_INCREMENT",payload:id})
    }
    useEffect(()=>{
        dispatch({type:"TOTAL_CART_VALUE"});
        dispatch({type:"SET_CART_VALUE"});
        localStorage.setItem("cart",JSON.stringify(state.cart))
    },[state.cart])
    return <CartContext.Provider value={{...state,addToCart,removeItem,clearCart,setDecrease,setIncrease}}>{children}</CartContext.Provider>
}

const useCartContext=()=>{
    return useContext(CartContext);
}
export {useCartContext,CartProvider};