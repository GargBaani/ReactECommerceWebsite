 const cartReducer=(state,action)=>{
    if(action.type==="ADD_TO_CART"){
        let {id,color,amount,product}=action.payload;

        const existingValue=state.cart.find((curElm)=>curElm.id===id+color)
        if(existingValue){

            const updatedCartValue=state.cart.map((curElm)=>{
                if(curElm.id===id+color){
                    let newAmount=curElm.amount+amount
                    if(newAmount>=curElm.max){
                        newAmount=curElm.max
                    }
                    console.log("Enteres to add the sam eitem");
                    
                    return{
                        ...curElm,
                        amount:newAmount
                    }
                }else{
                    return curElm
                }
            })
            return {
                ...state,
                cart:updatedCartValue
            }
        }else
        {
        let  cartProduct;
        cartProduct={
            id:id+color,
            name:product.name,
            amount,color,
            image:product.image[0].url,
            price:product.price,
            max:product.stock,
        }
       
        return {
            ...state,
            cart:[...state.cart,cartProduct],
        }}
        
    }
    if(action.type==="REMOVE_ITEM"){
        let updatedCart=state.cart.filter((curElm)=>{
            return curElm.id!==action.payload.id
        })
        return{
            ...state,
            cart:updatedCart
        }
    }
    if(action.type==="CLEAR_CART"){
        return {
            ...state,
            cart:[]
        }
    }
    if(action.type==="SET_INCREMENT"){
        let updateProduct=state.cart.map((curElm)=>{
            if(curElm.id===action.payload){
                let incAmount=curElm.amount+1
            
            if(incAmount>=curElm.max){
                incAmount=curElm.max;
            }
            return{
                ...curElm,
                amount:incAmount
            }
        }else{
            return curElm
        }
        });
        return{
            ...state,
            cart:updateProduct
        }
    }

    if(action.type==="SET_DECREMENT"){
        let updateProduct=state.cart.map((curElm)=>{
            if(curElm.id===action.payload){
                let decAmount=curElm.amount-1;
            
            if(decAmount<1){
                decAmount=curElm.min;
            }
            return {
                ...curElm,
                amount:decAmount
            }}else{
                return curElm;
            }
        });
        return{
            ...state,
            cart:updateProduct
        }
    }
    if(action.type==="SET_CART_VALUE"){
        let updatedCart=state.cart.reduce((initialState,curElm)=>{
            let{amount}=curElm;
            initialState=initialState+amount
            return initialState;
        },0);
        return{
            ...state,
            total_items:updatedCart
        }
        
       
    }
    if(action.type==="TOTAL_CART_VALUE"){
        let total_value=state.cart.reduce((initialState,curElm)=>{
            let{amount,price}=curElm
            initialState=initialState+(amount*price)
            return initialState;
        },0)
        return {
            ...state,
            total_price:total_value
        }
    }


    // if(action.type==="BOTH_IN_ONE_CART_TOTAL"){
    //     let{total_items,total_price}=state.cart.reduce((accum,curElm)=>{
    //         let{amount,price}=curElm;
    //         accum.total_items+=amount;
    //         accum.total_price+=price*amount;
    //         return accum;
    //     },{
    //         total_items:0,
    //         total_price:0
    //     })
    // return{
    //     ...state,
    //     total_items,total_price

    // }
    // }

    return state
}
export default cartReducer;