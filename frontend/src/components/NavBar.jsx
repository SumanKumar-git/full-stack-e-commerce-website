import {assets} from "../assets/assets";
import { NavLink, Link } from "react-router-dom";
import { CiUser,CiSearch,CiShoppingCart,CiMenuFries } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const NavBar = () => {

  const [visible, setVisible] = useState(false);
  const {setShowSearch, getCartCount, navigate, token, setToken, setCartItems} = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    navigate('/login');
  }

  return (
    <div className = 'flex items-center justify-between py-5 font-medium sticky top-0 bg-white z-10' >
      <Link to='/'><img src={assets.LuxeBay} className='w-36' alt="logo" /></Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to= '/' className="flex flex-col items-center gap-1">
          <p className="border rounded-full py-2 px-3 border-gray-300">HOME</p>
        </NavLink>
        <NavLink to= '/collections' className="flex flex-col items-center gap-1">
          <p className="border rounded-full py-2 px-3 border-gray-300">COLLECTIONS</p>
        </NavLink>
        <NavLink to= '/about' className="flex flex-col items-center gap-1">
          <p className="border rounded-full py-2 px-3 border-gray-300">ABOUT</p>
        </NavLink>
        <NavLink to= '/contact' className="flex flex-col items-center gap-1">
          <p className="border rounded-full py-2 px-3 border-gray-300">CONTACT</p>
        </NavLink>

      </ul>
      <div className="flex items-center gap-6">
        <CiSearch onClick={() => setShowSearch(true)} className="text-3xl cursor-pointer" />
        <div className="group relative">
          <CiUser onClick={() => token ? null : navigate('/login')} className="text-3xl font-bold cursor-pointer" />
          {
            token && <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div  className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
              <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
          }
        </div>
        <Link to ='/cart' className= "relative">
        <CiShoppingCart className="text-3xl font-bold cursor-pointer" />
        <p className="absolute right-[-5px] bottom-[-5px] p-0.5 text-center w-4 leadin-4 bg-black text-white aspect-square rounded-full text-[8px]">{getCartCount()}</p>
        </Link >
        <CiMenuFries onClick={() => setVisible(true)} className="text-3xl font-bold cursor-pointer sm:hidden" />
      </div>
      <div className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className="flex flex-col text-gray-600">
          <div onClick={() => setVisible(false)} className="flex item-center gap-4 p-3 cursor-pointer">
            <IoIosArrowForward className="text-2xl font-bold cursor-pointer rotate-180"/>
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collections'>COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
        </div>
      </div>
    </div>
  )
}

export default NavBar