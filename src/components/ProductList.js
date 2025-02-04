import { useFilterContext } from "../contexts/filtercontext"
import {GridView} from "../components/GridView"
import{ListView} from "../components/ListView"
export const ProductList=()=>{

    const {filter_data,grid_view}=useFilterContext();
    if(grid_view)return <GridView products={filter_data}/>;
    if(!grid_view)return <ListView products={filter_data}/>;
}