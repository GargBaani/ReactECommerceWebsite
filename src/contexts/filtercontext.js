import { createContext, useEffect,useContext, useReducer } from "react";
import {useProductContext} from "./productscontext"
import reducer from "../reducer/filterReducer";
const FilterContext=createContext();
const initialState={
    filter_data:[],
    all_data:[],
    grid_view:false,
    sorting_value:"lowest",
    filters:{
        text:"",
        category:"all",
        company:"all",
        color:"all",
        price:0,
        minPrice:0,
        maxPrice:0
    }
}

export const FilterContextProvider=({children})=>{
    const{products}=useProductContext();
    const[state,dispatch]=useReducer(reducer,initialState);

    // for grid view
    const setGridView=()=>{
       return  dispatch({type:'SET_GRID_VIEW'})
    }

    // for list view
    const setListView=()=>{
        return  dispatch({type:'SET_LIST_VIEW' })
    }


   

    // for sorting 
    const sorting=(event)=>{
        let val=event.target.value;
        return dispatch({type:"GET_SORTED_DATA" ,payload:val})
    }

    // to update the name value
    const updateFilterValue=(event)=>{
       let name= event.target.name;
       let value=event.target.value;
       console.log("Enter into the getuique func ncbebcwkcjcjc" ,name );
       return dispatch({type:"GET_FILTER_VALUE" ,payload:{name,value}})
    }
    const clearFilter=()=>{
        console.log("Enetred to the conetxt of filter");
        
         dispatch({type:"CLEAR_FILTERS"})
    }

    useEffect(()=>{
        // console.log("ENtered into the useEffect hook")
        dispatch({type:"FILTER_PRODUCTS"})
        dispatch({type:"SORTING_VALUE" , payload:products} )
        },[products,state.sorting_value,state.filters]);
    // useEffect(() => {
    //     dispatch({ type: "SORTING_VALUE", payload:products });
    //     dispatch({ type: "FILTER_PRODUCTS" });
    // }, [products, state.sorting_value, state.filters]);
    

    useEffect(()=>{
        dispatch({type:"SET_VALUE" ,payload:products})
    },[products])

    return <FilterContext.Provider value={{...state,filter_data:state.filter_data,setGridView,setListView,sorting,updateFilterValue,clearFilter} } >{children}</FilterContext.Provider>
}

export const useFilterContext=()=>{
    return useContext(FilterContext);
}