import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { CiShoppingCart } from "react-icons/ci";

const ProductItem = ({id,image,name,price,brand}) => {

    const {currency} = useContext(ShopContext);

    return (
        <Link to = {`/product/${id}`}>
            {/* outside div */}
            <div className='overflow-hidden rounded-2xl border-[1.7px] border-gray-200'>
                {/* Image div */}
                <div className='overflow-hidden'>
                    <img className='hover:scale-105 transition ease-in-out' src={image[0]} alt="" />
                </div>
                {/* Info div */}
                <div className='border-t-[1.7px] border-gray-200 p-2'>
                    <div>
                        <p className='text-sm sm:text-md truncate font-semibold'>{brand}</p>
                        <p className='text-xs pb-1 sm:text-sm truncate whitespace-nowrap'>{name}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-md font-semibold pt-0.5'>{currency} {price}</p>
                        <div className='bg-black p-1 sm:p-2 rounded-[8px] sm:rounded-[12px]'>
                            <CiShoppingCart className='text-white text-2xl' />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductItem