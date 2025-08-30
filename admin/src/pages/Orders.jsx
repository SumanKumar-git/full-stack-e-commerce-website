import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios';
import {backendUrl, currency} from '../App'
import { toast } from 'react-toastify';
import { BsBox2Fill } from "react-icons/bs";

const Orders = ({token}) => {

  const [orders,setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token){
      return null;
    }
    try{
      const response = await axios.post(backendUrl + '/api/order/list', {} , {headers: {token}});
      if(response.data.success){
        setOrders(response.data.orders.reverse());
      }
      else{
        toast.error(response.data.message);
      }
    }
    catch(error){
      console.log(error);
      toast.error(error.message);
    }

  }

  useEffect(() => {
    fetchAllOrders();
  },[token])

  return (
    <div>
      <h3 className="pb-2 text-2xl font-medium">Order Page</h3>
      <div className='flex flex-col gap-4'>
        {
          orders.map((order,index) => (
            <div key={index} className='border border-gray-300 grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1.5fr_0.3fr] gap-2 justify-between px-5 py-5 text-sm font-medium text-gray-600'>
              <div className='flex items-center'>
                <BsBox2Fill className='text-5xl text-gray-700'/>
              </div>
              <div className='flex flex-col gap-2'>
                <div>
                {order.items.map((item,index) => {
                  if(index === order.items.length-1){
                    return <p className='pb-1' key={index}>{item.name} x {item.quantity} <span className='text-xs font-semibold'>(Size : {item.size})</span></p>
                  }
                  else{
                    return <p className='pb-1' key={index}>{item.name} x {item.quantity} <span className='text-xs font-semibold'>(Size : {item.size})</span>,</p>
                  }
                })}
              </div>
              <p className=' text-gray-800'>{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p>Phone : {order.address.phone}</p>
              </div>
              <div className='flex flex-col gap-1.5'>
                <p>Items : {order.items.length}</p>
                <p>Method : {order.paymentMethod}</p>
                <p >Payment : {order.payment ? 'Done': 'Pending'}</p>
                <p >Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p>{currency} {order.amount}</p>
            </div>

          ))
        }
      </div>
    </div>
  )
}

export default Orders