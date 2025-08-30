import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";



const Orders = () => {

  const {backendUrl,token,currency ,navigate} = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try{
      if(!token){
        return null;
      }
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, {headers: {token}});
      if(response.data.success){
        let allOrderItem =[];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrderItem.push(item);
          })
        })
        setOrderData(allOrderItem.reverse());
      }
    }
    catch(error){
      console.error(error);
    }
  }

  useEffect(() => {
    document.title = "My Orders";
  }, []);

  useEffect(() => {
    loadOrderData();
  },[token])


  return (
    <div className="my-10">
      <h2 className="font-bold text-3xl pb-5 ">MY ORDERS</h2>
      <div className="flex flex-col gap-2">
        {orderData.map((item,index) => (
          <div key={index} className="flex justify-between  gap-2 items-center p-2 w-full border border-gray-300">
            <div className="w-22 overflow-hidden">
              <img className="object-fit overflow-hidden" src={item.image[0]} alt="product_image" />
            </div>
            <div className="flex justify-between  items-center w-full">
              <div className="w-[25%] flex flex-col justify-between gap-2">
                <p className="text-base font-semibold">{item.name}</p>
                <div className="flex gap-3">
                  <p className="text-sm text-gray-600">Size: <span className="text-gray-500 font-medium">{item.size}</span></p>
                  <p className="text-sm text-gray-600">Quantity: <span className="text-gray-500 font-medium">{item.quantity}</span></p>
                </div>
                <p className="text-sm text-gray-600">Order Date : <span className="text-gray-500 font-medium">{new Date(item.date).toDateString()}</span></p>
                <p className="text-sm font-medium">{currency} {item.price}</p>
              </div>
              <div className="w-[25%] flex justify-center items-center gap-2">
                <p className="bg-green-400 w-2 h-2 rounded-full border-none"></p>
                <p className="text-xs font-medium text-gray-600">Order Placed</p>
              </div>
              <div className="w-[25%] flex justify-center items-center gap-2">
                <p className="text-xs font-medium text-gray-600">Mode of Payment: {item.paymentMethod}</p>
              </div>
              <div className="sm:w-[25%] flex justify-end cursor-pointer">
                <p onClick={() => navigate(`/product/${item._id}`)} className="text-xs font-medium hidden sm:block border text-gray-600 text-center p-2 border-gray-300 hover:bg-black hover:text-white transition-all ease-in-out">View Product</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders