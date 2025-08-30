import {assets} from '../assets/assets'

const NavBar = ({setToken}) => {
  return (
    <div className='flex items-center justify-between py-5 font-medium sticky top-0 bg-white z-10'>
        <img src={assets.logo} className='w-36' alt="" />
        <button onClick ={() => setToken('')} className='bg-black text-white py-2 px-6 rounded-[5px] font-medium hover:bg-white border-2 hover:border-2 hover:text-black cursor-pointer'>Logout</button>
    </div>
  )
}

export default NavBar