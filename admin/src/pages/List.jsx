import { useEffect, useState } from "react"
import { backendUrl,currency } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";


const List = ({token}) => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try{
      const response = await axios.get(backendUrl + '/api/product/list');
      if(response.data.success){
        setList(response.data.products);
      }
      else{
        toast.error(response.data.message);
      }
    }
    catch(error){
      console.error(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try{
      const response = await axios.post(backendUrl + "/api/product/remove", {id}, {headers: {token}});
      if(response.data.success){
        toast.success(response.data.message);
        await fetchList();
      }
      else{
        toast.error(response.data.message);
      }
    }
    catch(error){
      console.error(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchList();
  },[]);

  return (
    <>
      <p className="pb-2 text-2xl font-medium">All Products List</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-300 bg-gray-100 text-sm">
          <b className="text-gray-600">Image</b>
          <b className="text-gray-600">Brand</b>
          <b className="text-gray-600">Name</b>
          <b className="text-gray-600">Category</b>
          <b className="text-gray-600">Price</b>
          <b className="text-gray-600 text-center">Action</b>
        </div>
        {
          list.map((item, index) => (
            <div key={index} className="border border-gray-300 p-1 grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_1fr_3fr_1fr_1fr_1fr] items-center">
              <div className="w-13"><img src={item.image[0]} alt="" /></div>
              <p className="text-sm font-medium text-gray-600">{item.brand}</p>
              <p className="text-sm font-medium text-gray-600">{item.name}</p>
              <p className="text-sm font-medium text-gray-600 capitalize">{item.category}</p>
              <p className="text-sm font-medium text-gray-600">{currency} {item.price}</p>
              <div className="flex justify-center items-center"><IoMdClose onClick={() => removeProduct(item._id)} className="text-red-600 cursor-pointer text-lg" /></div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default List