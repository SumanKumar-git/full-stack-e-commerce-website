import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext"
import { FaArrowRight } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";


const PlaceOrder = () => {

  const [method, setMethod] = useState('');
  const {currency,platform_fee,delivery_fee,getCartAmount, navigate, backendUrl, token, cartItems, setCartItems, products} = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    deliveryInstruction : '',
  });

  useEffect(() => {
      document.title = "Delivery Option";
    }, []);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data => ({...data, [name]: value}));
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try{
      let orderItems = [];
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0){
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if(itemInfo){
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee + platform_fee,
      }
      const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers: {token}});
      if(response.data.success){
        setCartItems({});
        navigate('/orders');
      }
      else{
        toast.error(response.data.mesage);
      }
    }
    catch(error){
      console.error(error);
    }

  }

  return (
    <form onSubmit={onSubmitHandler} className=' flex flex-col sm:flex-row mt-18 mb-40 justify-between gap-10 sm:gap-0 '>
      <div className="w-full sm:w-fit">
        <h3 className="text-2xl font-bold pb-5">DELIVERY INFORMATION</h3>
        <div className="flex flex-col gap-3" >
          <div className="flex flex-row gap-3">
            <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className="border border-gray-300 rounded-[2px] p-2 w-[50%] outline-none placeholder:text-gray-400 placeholder:font-medium placeholder:text-sm text-base" type="text" placeholder="First name" />
            <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className="border border-gray-300 rounded-[2px] p-2 w-[50%] outline-none placeholder:text-gray-400 placeholder:font-medium placeholder:text-sm text-base" type="text" placeholder="Last name" />
          </div>
            <input required onChange={onChangeHandler} name='email' value={formData.email} className="border border-gray-300 rounded-[2px] p-2 outline-none placeholder:text-gray-400 placeholder:text-sm placeholder:font-medium text-base" type="email" placeholder="Email address" />
            <input required onChange={onChangeHandler} name='phone' value={formData.phone} className="border border-gray-300 rounded-[2px] p-2 outline-none placeholder:text-gray-400 placeholder:text-sm placeholder:font-medium text-base" type="number" placeholder="Phone number"  />
            <input required onChange={onChangeHandler} name='street' value={formData.street} className="border border-gray-300 rounded-[2px] p-2 outline-none placeholder:text-gray-400 placeholder:text-sm placeholder:font-medium text-base" type="text" placeholder="Street"  />
          <div className="flex gap-3">
            <input required onChange={onChangeHandler} name='city' value={formData.city} className="border border-gray-300 rounded-[2px] p-2 w-[50%] outline-none placeholder:text-gray-400 placeholder:font-medium placeholder:text-sm text-base" type="text" placeholder="City" />
            <input required onChange={onChangeHandler} name='state' value={formData.state} className="border border-gray-300 rounded-[2px] p-2 w-[50%] outline-none placeholder:text-gray-400 placeholder:font-medium placeholder:text-sm text-base" type="text" placeholder="State"/>
          </div>
          <div className="flex gap-3">
            <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className="border border-gray-300 rounded-[2px] p-2 w-[50%] outline-none placeholder:text-gray-400 placeholder:font-medium placeholder:text-sm text-base" type="number" placeholder="ZIP Code"/>
            <input required onChange={onChangeHandler} name='country' value={formData.country} className="border border-gray-300 rounded-[2px] p-2 w-[50%] outline-none placeholder:text-gray-400 placeholder:font-medium placeholder:text-sm text-base" type="text" placeholder="Country"/>
          </div>
          <textarea required onChange={onChangeHandler} name='deliveryInstruction' value={formData.deliveryInstruction} className="border border-gray-300 rounded-[2px] p-2 outline-none placeholder:text-gray-400 placeholder:font-medium placeholder:text-sm text-base resize-none " placeholder="Delivery instructions"></textarea>
        </div>
      </div>
      {/* Cart Total */}
      <div className="w-full sm:w-[35%]">
        <h3 className="text-2xl font-bold pb-5">CART TOTAL</h3>
        <div className='flex justify-between pb-3'>
          <p className='text-lg text-gray-500 font-normal'>Subtotal</p>
          <p className='text-xl font-semibold'>{currency} {getCartAmount()}.00</p>
        </div>
        <div className='flex justify-between pb-3'>
          <p className='text-lg text-gray-500 font-normal'>Delivery Fee</p>
          <p className='text-xl font-semibold'>{currency} {delivery_fee}.00</p>
        </div>
        <div className='flex justify-between border-b border-gray-300 pb-4'>
          <p className='text-lg text-gray-500 font-normal'>Platform Fee</p>
          <p className='text-xl font-semibold'>{currency} {platform_fee}.00</p>
        </div>
        <div className='flex justify-between pt-4'>
          <p className='text-xl text-gray-500 font-normal'>Total</p>
          <p className='text-2xl font-semibold'>{currency} {getCartAmount() === 0 ?  0: getCartAmount() + delivery_fee + platform_fee }</p>
        </div>
        <div className="py-2">
          <h3 className="text-lg font-semibold pb-2">PAYMENT METHOD</h3>
          <div onClick={() => setMethod('cod')} className="flex justify-center items-center cursor-pointer border rounded-[2px] border-gray-300 w-fit py-2 px-4 gap-2">
            <p className={`border rounded-full border-gray-300 w-3 h-3 ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
            <p className="text-sm text-gray-600 font-medium">CASH ON DELIVERY</p>
          </div>
        </div>
        <button type='submit' className='flex items-center justify-center font-medium my-2 py-4 gap-4 bg-black text-white w-full rounded-full cursor-pointer hover:bg-white border-2 hover:text-black transition-all ease-in-out '>Place Order <FaArrowRight className='text-xl' /> </button>
      </div>
    </form>
  )
}

export default PlaceOrder