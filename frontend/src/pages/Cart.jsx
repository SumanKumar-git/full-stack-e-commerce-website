import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { MdDelete } from "react-icons/md";
import NewsLetterBox from './../components/NewsLetterBox'
import { BsFillHandbagFill } from "react-icons/bs";
import CartSummary from '../components/CartSummary';

const Cart = () => {

  const {products, currency, cartItems, updateQuantity,getCartAmount} = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  console.log(getCartAmount());

  useEffect(() => {

    if(products.length > 0) {
      const tempData = [];
      for(const items in cartItems){
      for(const item in cartItems[items]){
        if(cartItems[items][item] > 0){
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          })
        }
      }
    }
    setCartData(tempData);
    }

  },[cartItems,products])

  useEffect(() => {
      document.title = "Shopping Cart";
    }, []);

  return (
    <div className='border-t-1 border-gray-300'>
      <h2 className='py-7 text-3xl font-black'>YOUR CART</h2>
      <div className='flex flex-col sm:flex-row justify-between gap-4 sm:gap-4 mb-15'>
      <div className='w-full sm:w-[50%] h-fit border-1 border-gray-300 rounded-xl'>
        {
          cartData.length > 0 ? (cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          return (
            <div key={index} className='flex flex-row justify-between p-1 pb-3 border-b m-2 border-gray-300 nth-last-1:border-none'>
              <div className='overflow-hidden w-auto'>
                <img className='w-22 object-cover rounded-[7px]' src={productData.image[0]} alt="" />
              </div>
              <div className='pl-3 md:pl-0 w-[65%] flex flex-col justify-between'>
                <div>
                  <h3 className='text-base font-normal text-gray-500'>{productData.brand}</h3>
                  <h3 className='text-lg font-semibold'>{productData.name}</h3>
                  <p className='text-sm text-gray-500 font-normal'>Size: {item.size}</p>
                </div>
                <p className='font-semibold text-xl'>{currency} {productData.price}</p>
              </div>
              <div className='w-[15%] flex flex-col justify-between items-end'>
                <MdDelete onClick = {() => updateQuantity(item._id, item.size, 0)} className='text-2xl text-orange-600 cursor-pointer ' />
                <p className='flex gap-1'>Qty: <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value)) } className='w-12 px-1 outline-none border bg-gray-100 rounded-[4px] border-gray-400' min={1} max={10} defaultValue = {item.quantity} type="number" name="" id="" /></p>
              </div>
            </div>
          )
        }  )) : (<div className='flex flex-col justify-center items-center py-24'>
            <BsFillHandbagFill className='text-8xl text-gray-200 mb-7' />
            <p className='text-gray-400 text-sm font-medium'>Hey, it feels so light!</p>
            <p className='text-xs sm:text-sm text-center pt-2 font-semibold text-gray-700'>There is nothing in your bag. Let's add some items.</p>
        </div>)
                }
              </div>
       {/* Cart Summary */}
      <CartSummary />
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default Cart