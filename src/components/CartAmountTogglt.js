import {Button} from "../styles/Button"
import { FaMinus, FaPlus } from "react-icons/fa";
export const CartAmountToggle=({amount,setDecrease,setIncrease})=>{
    return <div className="cart-button">
        <div className="amount-toggle">
            <button onClick={()=>{setDecrease()}}>
            <FaMinus />
            </button>
            <div>{amount}</div>
            <button  onClick={()=>{setIncrease()}}><FaPlus /></button>
        </div>
    </div>
    
}