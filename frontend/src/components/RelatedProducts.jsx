import { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';


const RelatedProducts = ({category, subCategory}) => {

    const {products} = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if(products.length > 0){

            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item) => category === item.category);
            productsCopy = productsCopy.filter((item) => subCategory === item.subcategory);
            setRelated(productsCopy.slice(0,5));
        }
    },[products])

  return (
    <div>
        <Title title={'YOU MIGHT ALSO LIKE'} />
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {related.map((item) => <ProductItem id={item._id} brand={item.brand} name={item.name} price={item.price} image={item.image}  />)}
        </div>
    </div>
  )
}

export default RelatedProducts