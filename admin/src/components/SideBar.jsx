import {NavLink} from 'react-router-dom';
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdChecklist } from "react-icons/md";
import { PiShoppingBagOpen } from "react-icons/pi";

const SideBar = () => {
  return (
    <div className='w-[15%] min-h-screen border-r border-gray-300'>
        <div className='flex flex-col gap-4 pt-6'>
            <NavLink to="/add" className='flex gap-3 sm:py-2 sm:px-3 aspect-square sm:aspect-auto p-1 justify-center items-center sm:justify-start border border-gray-300 mx-3 rounded '>
                <IoIosAddCircleOutline className='text-2xl' />
                <p className='hidden md:block font-medium'>Add Items</p>
            </NavLink>
            <NavLink to="/list" className='flex gap-3 sm:py-2 sm:px-3 aspect-square sm:aspect-auto border items-center justify-center sm:justify-start border-gray-300 mx-3 rounded '>
                <MdChecklist className='text-2xl' />
                <p className='hidden md:block font-medium'>List Items</p>
            </NavLink>
            <NavLink to="/orders" className='flex gap-3 sm:py-2 sm:px-3 aspect-square sm:aspect-auto items-center justify-center sm:justify-start border border-gray-300 mx-3 rounded '>
                <PiShoppingBagOpen className='text-2xl' />
                <p className='hidden md:block font-medium'>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default SideBar