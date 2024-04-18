import { useEffect, useState } from 'react';
import { productItemModel } from '../../../Interfaces';
import ProductItemCard from './ProductItemCard';
import { useGetProductItemsQuery } from '../../../Apis/productItemApi';
import { setProductItem } from '../../../Storage/Redux/productItemSlice';
import { useDispatch } from 'react-redux';
import { MainLoader } from '../Common';

function ProductItemList() {

    const dispatch = useDispatch();
    const [pageOptions, setPageOptions] = useState({
      pageNumber: 1,
      pageSize: 10,
      sortDirection: 0
    });

    const {data, isLoading} = useGetProductItemsQuery({
      pageNumber: pageOptions.pageNumber, 
      pageSize: pageOptions.pageSize, 
      SortDirection: pageOptions.sortDirection
    });
    

    useEffect(() => {
      if (!isLoading){
        dispatch(setProductItem(data.result));
      }
    }, [isLoading]);

    if (isLoading) {
      return <MainLoader/>;        
    }

  return (
    <div >      
      {data && data?.itemsTo > 0 &&
        data?.items.map((productItem: productItemModel, index: number) =>(
          <ProductItemCard productItem = {productItem} key= {index} />
        ))
      }
    </div>
  );
}

export default ProductItemList