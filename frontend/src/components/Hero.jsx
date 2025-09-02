import {assets} from "../assets/assets"
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-between md:h-100 bg-[#F2F0F1] '>
      {/*Hero Left*/}
      <div className="p-5 md:p-10 flex flex-col justify-between">
        <div className='flex flex-col'>
          <h1 className='font-black montserrat-regular text-4xl md:text-5xl'>FIND CLOTHES </h1>
          <h1 className='font-black montserrat-regular text-4xl md:text-5xl'>THAT MATCHES </h1>
          <h1 className='font-black montserrat-regular text-4xl md:text-5xl'>YOUR STYLE </h1>
        </div>
        <Link to='/collections'><button className='bg-black text-white rounded-full px-8 py-3 cursor-pointer md:w-40 mt-5 mb-5 font-light'>Shop Now</button></Link>
        <div className='flex flex-row'>
          <div className='flex flex-col pr-2 sm:pr-5'>
            <h3 className='font-bold text-xl sm:text-2xl'>100+</h3>
            <p className='text-sm text-gray-500'>International Brands</p>
          </div>
          <div className='flex flex-col border-l-2 border-gray-300 pl-2 pr-2 sm:pl-5 sm:pr-5'>
            <h3 className='font-bold text-xl sm:text-2xl'>2,000+</h3>
            <p className='text-sm text-gray-500'>High-Quality Products </p>
          </div>
          <div className='flex flex-col border-l-2 border-gray-300 pl-2 sm:pl-5'>
            <h3 className='font-bold text-xl sm:text-2xl'>30,000+</h3>
            <p className='text-sm text-gray-500'>Happy Customers</p>
          </div>
        </div>
      </div>
      {/* Hero Right */}
      <div className="pr-4 h-1/3 md:h-full">
        <img src={assets.hero} className="h-full w-full flex justify-items-start"/>
      </div>
    </div>
  )
}

export default Hero