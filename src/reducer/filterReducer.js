const reducer=(state ,action)=>{
    switch (action.type) {

        
        case "SET_VALUE":
            let priceArr=action.payload.map((curElm)=>{
                return curElm.price;
            })

            // Math.max.apply(undefined,priceArr);
            // priceArr.reducer((intitialVal,curElm)=>Math.max(intitialVal,curElm),0);
            let maxPrice=Math.max(...priceArr)
            // let minPrice=Math.min(...priceArr)
            return{
                ...state,
                all_data:[...action.payload],
                filter_data:[...action.payload],
                filters:{...state.filters,maxPrice,price:maxPrice}
            }
            case "SET_GRID_VIEW":
                return{
                    ...state,
                    grid_view:true
                }
                case "SET_LIST_VIEW":
                return{
                    ...state,
                    grid_view:false
                }
                case "GET_SORTED_DATA":
                    // let userSortValue=document.getElementById("sort");
                    // let sorted_value=userSortValue.options[userSortValue.selectedIndex].value;
                    let sorted_value=action.payload;
                    return {
                        ...state,
                        sorting_value:sorted_value
                    }
                case "SORTING_VALUE":
                    let newSortData;
                    // let tempSortProduct=[...action.payload];
                    let tempSortProduct=[...state.filter_data]
                    // if(state.sorting_value==="a-z"){
                    //     newSortData=tempSortProduct.sort((a,b)=>{
                    //         return a.name.localeCompare(b.name);
                    //     })
                    // }
                    // if(state.sorting_value==="z-a"){
                    //     newSortData=tempSortProduct.sort((a,b)=>{
                    //         return b.name.localeCompare(a.name);
                    //     })
                    // }
                    // if(state.sorting_value==="lowest"){
                    //     newSortData=(a,b)=>{
                    //         return a.price-b.price;
                    //     }
                    // }
                    // if(state.sorting_value==="highest"){
                    //     const sortingProducts=(a,b)=>{
                    //         return b.price-a.price;
                    //     }
                    //     newSortData=tempSortProduct.sort(sortingProducts)
                    // }
                    const sortingProducts=(a,b)=>{
                        if(state.sorting_value==="a-z"){
                            return a.name.localeCompare(b.name);
                        }
                        if(state.sorting_value==="z-a"){
                            return b.name.localeCompare(a.name);
                        } 
                        if(state.sorting_value==="lowest"){
                            return a.price-b.price;
                        }
                        if(state.sorting_value==="highest"){
                            return b.price-a.price;
                    }
                    
                }
                console.log("heyyyyyyyy i am products",tempSortProduct);
                
                newSortData=tempSortProduct.sort(sortingProducts)
                    return {
                        ...state,
                        filter_data:newSortData
                    }
                case "GET_FILTER_VALUE":
                    const{name,value}=action.payload;
                    console.log("setting under the function of dispatch");
                    return{
                        ...state,
                        filters:{
                            ...state.filters,
                            [name]:value,
                        }
                    }
                case "FILTER_PRODUCTS":
                    let {all_data,sorting_value}=state;
                    let tempFilterProduct=[...all_data];
                    const {text,category,company,color,price}=state.filters;
                    console.log("Enter into the categpry wise jscjsnjcnsjkvbjh,dabjv, func");
                    if(text){
                        console.log("Entered to text");
                        tempFilterProduct=tempFilterProduct.filter((curElm)=>{
                            return curElm.name && curElm.name.toLowerCase().includes(text.toLowerCase())
                        })
                    }
                    if(category!=='all'){
                        console.log("Entered to category");
                        console.log("chl ja categoryy ho ja filter");
                        
                        tempFilterProduct=tempFilterProduct.filter((curElm)=>{
                            console.log("aa  arha huuuuuuuuuuuuuu",curElm.category);
                            
                            // console.log("data nfkjen",curElm.category);
                            
                            return curElm.category.trim().toLowerCase() === category.trim().toLowerCase();

                        })
                    }
                    if(company!=='all'){
                        console.log("Entered to company");
                        tempFilterProduct=tempFilterProduct.filter((curElm)=>{
                            console.log("jnskdusn",curElm.company);
                        
                            return curElm.company.toLowerCase()===company.toLowerCase()
                        })
                        console.log("After filtering:", tempFilterProduct);
                    
                    }
                    if(color!=='all'){
                        console.log("Entered to color");
                        tempFilterProduct=tempFilterProduct.filter((curElm)=>{
                            return curElm.colors.includes(color)
                        })
                    }
                    // if(price==0){
                    //     return tempFilterProduct=tempFilterProduct.filter((curElm)=>{
                    //         return curElm.price<=price;
                    //     })
                    if(price){
                        tempFilterProduct=tempFilterProduct.filter((curElm)=>{
                            return curElm.price<=price;
                        })
                    }

                    if (sorting_value) {
                        tempFilterProduct = tempFilterProduct.sort((a, b) => {
                            if (sorting_value === "a-z") {
                                return a.name.localeCompare(b.name);
                            }
                            if (sorting_value === "z-a") {
                                return b.name.localeCompare(a.name);
                            }
                            if (sorting_value === "lowest") {
                                return a.price - b.price;
                            }
                            if (sorting_value === "highest") {
                                return b.price - a.price;
                            }
                            return 0;
                        });
                    }


                    return{
                        ...state,
                        filter_data:tempFilterProduct
                    }
                    case "CLEAR_FILTERS":
                        console.log(("Entered"));
                        
                        return({
                            ...state,
                            filters:{
                                ...state.filters,
                                text: "",
                                category: "all",
                                company: "all",
                                color: "all",
                                maxPrice: 0,
                                price: state.filters.maxPrice,
                                minPrice: state.filters.maxPrice,

                            }
                        })
                    
        default:
            return state;
    }
}
export default reducer;