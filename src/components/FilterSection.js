import { useFilterContext } from "../contexts/filtercontext";
import styled from "styled-components";
import { Button } from "../styles/Button";

import { FaCheck } from "react-icons/fa";
import { FormatPrice } from "../Helpers/FormatPrice";
export const FilterSection=()=>{
  const {clearFilter,filters:{text,category,company,color,price,minPrice,maxPrice},updateFilterValue,all_data}=useFilterContext();
    
  const getUniqueData=(data,property)=>{
    console.log("Enter into the getuique func");
    
      let newVal=data.map((curElm)=>{
          return curElm[property];
      })
      if(property==='colors'){


        // return (newVal=['All',...new Set([].concat(...newVal))])
        
        
        newVal=newVal.flat();
        console.log(newVal);
      }
      newVal=["All", ...new Set(newVal)]
      return newVal;
      // console.log("hujbhbjhbjhbjb",newVal);
      
  }

    const categoryOnlyData=getUniqueData(all_data,"category");
    const companyData=getUniqueData(all_data,"company");
    const colorsData=getUniqueData(all_data,"colors");
    return (
        <Wrapper>
            <div className="filter-search">
            <form onSubmit={(e)=>e.preventDefault()}>
                <input placeholder="search " type="text" name="text" value={text} onChange={updateFilterValue}/>
            </form>
            </div>
            <div className="filter-category">
              <h3>Category</h3>
              <div>
                {
                  categoryOnlyData.map((curElm,index)=>{
                    // console.log(curElm);
                    console.log("Entered into the map function of category");
                    
                    return (
                      <button 
                      key={index}
                      type="button"
                      name="category"
                      value={curElm}
                      onClick={() => updateFilterValue({ target: { name: "category", value: curElm } })}
                    >{curElm}</button>
                    )
                  })
                }
                </div>
                </div>
                <div className="filter-company">
                  <h3>Company</h3>
                  <form action='#'>
                      <select 
                      value={company}
                      name="company"
                      id="company"
                      className="filter-company--select"
                      onChange={updateFilterValue}
                      >
                        {
                         companyData.map((curElm,index)=>{
                          return(
                            <option name="company" key={index} value={curElm}>{curElm}</option>
                          )
                         }) 
                        }
                      </select>
                  </form>
                </div>
                <div className="filter-colors colors">
                  <h3>Colors</h3>
                  <div className="filter-color-style">{
                    colorsData.map((curColor,index)=>{
                      if(curColor.toLowerCase()==="all"){
                        return(<button
                        name="color"
                        type="button"
                        key={index} 
                        value={curColor} 
                        // onClick={updateFilterValue}
                        style={{backgroundColor:"transparent" , color:"black"}}
                        className="color-all--style"
                        onClick={updateFilterValue}>
                        all
                        </button>)
                      }
                      return(<button
                      name="color"
                      type="button"
                      key={index} 
                      value={curColor} 
                      onClick={updateFilterValue}
                      style={{backgroundColor:curColor}}
                      className={color===curColor?"btnStyle active":"btnStyle"}>
                      {color===curColor?<FaCheck className="checkStyle" />:null}
                      </button>)
                    })
                    }</div>
                </div>
                    <div className="filter_price">
                      <h3>Price</h3>
                      <p><FormatPrice price={price}/></p>
                      <input
                      type="range"
                      name="price"
                      min={minPrice}
                      max={maxPrice}
                      value={price}
                      onChange={updateFilterValue} 
                      ></input>
                    </div>
                <div className="filter-clear">
                  <Button className="btn" onClick={clearFilter}>Clear Filters </Button>
                </div>
        </Wrapper>
    )
}


const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h3 {
    padding: 2rem 0;
    font-size: bold;
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }
  
  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;

      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }

      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }

  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }

  .filter-color-style {
    display: flex;
    flex-direction:row;
    gap:1rem;
  }

  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }

  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;