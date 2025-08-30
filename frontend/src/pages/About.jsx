import Title from './../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'
import { useEffect } from 'react'

const About = () => {

  useEffect(() => {
    document.title = "LuxeBay | About Us ";
  }, []);

  return (
    <div className='border-t border-gray-300'>
        <Title title={'ABOUT US'} />
        <div className='flex flex-col sm:flex-row justify-between'>
          <div className='w-full sm:w-[35%] rounded-[10px] overflow-hidden'>
            <img className='w-full aspect-square object-cover' src={assets.about} alt="" />
          </div>
          <div className='text-sm w-full sm:w-[60%] flex flex-col text-justify my-5 sm:my-22 justify-between font-medium text-gray-500 gap-4 leading-5'>
            <p>LuxeBay was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
            <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
            <h4 className='font-semibold text-black text-lg'>OUR MISSION</h4>
            <p>Our mission at LuxeBay is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
          </div>
        </div>
        <h3 className='mt-5 sm:mt-15 mb-5 font-extrabold text-2xl'>WHY CHOOSE US</h3>
        <div className='mb-10 sm:mb-20 flex flex-col sm:flex-row border rounded-xl border-gray-300'>
          <div className='border-b sm:border-b-0 sm:border-r border-gray-300 m-3 px-10 py-8 sm:py-15 font-normal text-sm'>
            <p className='text-lg font-semibold pb-5'>Quality Assurance:</p>
            <p className='text-gray-500'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className='border-b sm:border-b-0 sm:border-r border-gray-300 m-3 px-10 py-8 sm:py-15 font-normal text-sm'>
            <p className='text-lg font-semibold pb-5'>Convenience:</p>
            <p className='text-gray-500'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>
          <div className=' m-3 px-10 py-8 sm:py-15 font-normal text-sm'>
            <p className='text-lg font-semibold pb-5'>Exceptional Customer Service:</p>
            <p className='text-gray-500'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
          </div>
        </div>
        <NewsLetterBox />
    </div>
  )
}

export default About