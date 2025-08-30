import { useEffect } from 'react'
import NewsLetterBox from '../components/NewsLetterBox'
import {assets} from './../assets/assets'
import Title from './../components/Title'

const Contact = () => {

  useEffect(() => {
        document.title = "LuxeBay | Contact";
      }, []);

  return (
    <div className='border-t border-gray-300'>
      <Title title ={'CONTACT US'} />
      <div className='my-10 flex flex-col sm:flex-row justify-center'>
        <div className='w-full sm:w-[35%] rounded-[10px] overflow-hidden'>
          <img className='w-full aspect-square object-cover' src={assets.contact} alt="" />
        </div>
        <div className='w-full sm:w-[40%] text-base leading-5.5 flex flex-col items-start justify-center sm:px-10 py-5 sm:py-15 font-medium text-gray-500'>
          <p className='text-black text-lg font-semibold pb-3'>LuxeBay Store</p>
          <p className='pb-6'>Shop No. 12, First Floor, <br />
            Galaxy Mall Complex, <br />
            Near Bank More, Hirapur, <br />
            Dhanbad – 826001, <br />
            Jharkhand, India
          </p>
          <p className='text-black'>Tel: +91-123-456-7890</p>
          <p className='text-black'>Email: contact@luxebuy.com</p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default Contact