import React from 'react'

const NewsLetterBox = () => {

    const onSubmitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <div className='bg-black  rounded-2xl flex flex-col sm:flex-row p-4 px-12 justify-between gap-5 sm:gap-0'>
            {/* Left */}
            <div className='flex items-center sm:w-1/2'>
                <h1 className='text-white font-black text-3xl sm:text-4xl'>STAY UPTO DATE ABOUT OUR LATEST OFFERS</h1>
            </div>
            {/* Right */}
            <div>
                <form onSubmit={onSubmitHandler} className='flex flex-col justify-between gap-4'>
                    <input type="email"required className='bg-white text-sm font-medium text-center text-gray-600 px-5 sm:px-20 py-3 rounded-full' placeholder='Enter your email address' />
                    <button type='submit' className='bg-white text-black font-medium w-full sm:px-20 py-3 rounded-full cursor-pointer'>Subscribe to Newsletter</button>
                </form>
            </div>
        </div>
    )
}

export default NewsLetterBox