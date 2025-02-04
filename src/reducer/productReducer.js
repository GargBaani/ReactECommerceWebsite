// import SingleProduct from "../SingleProduct";

 const ProductReducer=(state,action)=>{
    switch (action.type) {
        case "SET_LOADING":
            return{
                ...state,
                isLoading:true
            }
        case "SET_API_DATA":
            const featureData=action.payload.filter((currElm)=>{
                
               return currElm.featured===true;
            })
            console.log(featureData);
            return{
                ...state,
                isLoading:false,
                products: action.payload,
                featuredProducts:featureData,
                
            }
        case "API_ERROR":
            return{
                ...state,
                isLoading:false,
                isError:true
            }
        case "SINGLE_LOADING":
                return{
                    ...state,
                    isSingleLoading:true
                }
        case "SINGLE_PRODUCT_DATA":
                    const Data=action.payload;
                    // console.log(featureData);
                    return{
                        ...state,
                        isSingleLoading:false,
                        // products: action.payload,
                        singleProduct:Data,
                        
                    }
                case "SINGLE_ERROR":
                    return{
                        ...state,
                        isSingleLoading:false,
                        isError:true
                    }
        default:
            return state;
    }
}
export default ProductReducer;