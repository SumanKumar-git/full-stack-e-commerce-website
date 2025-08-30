import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 text-sm'>
        <div className='flex flex-col justify-between'>
          <img src={assets.LuxeBay} className='w-35' />
          <p className='w-full md:w-2/3 text-gray-600'>We have clothes that suits your style and which you’re proud to wear. From women to men.</p>
          <p className='w-full md:w-2/3 font-medium text-gray-600'>Copyright 2025@ luxebuy.com - All Rights Reserved.</p>
        </div>
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col font-medium gap-1 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col font-medium gap-1 text-gray-600'>
            <li>+91-123-456-7890</li>
            <li>contact@luxebuy.com</li>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default Footer