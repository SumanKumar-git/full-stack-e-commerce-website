import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import { FaArrowRight } from "react-icons/fa6";


const CartSummary = () => {

    const {currency,platform_fee,delivery_fee,getCartAmount, navigate} = useContext(ShopContext);

    return (
    <div className='w-full sm:w-[45%] h-90 p-6 border-1 border-gray-300 flex flex-col justify-between rounded-xl'>
            <div>
                <h2 className='font-semibold text-2xl pb-3'>Order Summary</h2>
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
            </div>
                <button onClick = {() => navigate('/place-order')} className='flex items-center justify-center font-medium py-4 gap-4 bg-black text-white w-full rounded-full cursor-pointer hover:bg-white border-2 hover:text-black transition-all ease-in-out '>Go to Checkout <FaArrowRight className='text-xl' /> </button>
            </div>
    )
}

export default CartSummary