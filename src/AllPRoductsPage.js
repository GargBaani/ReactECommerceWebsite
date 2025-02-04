import styled from "styled-components";
// import{useFilterContext} from "./contexts/filtercontext"
import { ProductList } from "./components/ProductList";
import {Sort} from "./components/Sort"
import  {FilterSection}  from "./components/FilterSection";
const Products = () => {
    // const {filter_data}=useFilterContext();
    return (
      <Wrapper>
        {/* {console.log("jhfuyrbfehf" ,filter_data)} */}
        <div className="container grid grid-filter-column">
          <div>
            <FilterSection />
          </div>
  
          <section className="product-view--sort">
            <div className="sort-filter">
              <Sort />
            </div>
            <div className="main-product">
              <ProductList  />
            </div>
          </section>
        </div>
      </Wrapper>
    );
  };

  const Wrapper = styled.section`
  .grid-filter-column {
    grid-template-columns: 0.2fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-filter-column {
      grid-template-columns: 1fr;
    }
  }
`;

export default Products;
  