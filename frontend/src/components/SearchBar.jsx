import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { CiSearch } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const [visible, setVisible] = useState(false)
    const location = useLocation();
    useEffect(() => {
        if(location.pathname.includes('collections')){
            setVisible(true);
        }
        else{
            setVisible(false);
        }
    },[location]);

    return showSearch && visible ? (
    <div className='border-t flex border-gray-300 text-center justify-center items-center'>
        <div className='inline-flex items-center justify-between border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
            <input value={search} onChange={(e) => setSearch(e.target.value)} className='w-3/4 outline-none' type="text" placeholder='Search'/>
            <CiSearch className='text-2xl' />
        </div>
        <AiOutlineClose onClick={() => setShowSearch(false)} className='text-xl cursor-pointer text-gray-700' />
    </div>
    ) : '';
}

export default SearchBar