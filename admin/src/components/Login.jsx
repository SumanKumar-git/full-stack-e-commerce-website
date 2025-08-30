import axios from 'axios'
import { useState } from "react";
import { backendUrl } from '../App';
import { toast } from 'react-toastify';


const Login = ({setToken}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const onSubmitHandler = async (e) => {
        try{
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin', {email,password});
            if(response.data.success){
                setToken(response.data.token);
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

    return (
    <div className="flex justify-center items-center min-h-screen w-full">
        <form onSubmit={onSubmitHandler} action="submit" className="w-full sm:w-[25%]">
        <h2 className="text-4xl py-10 text-center font-bold">Admin Panel</h2>
        <div className="flex flex-col pt-3">
            <label className="text-base pb-1 font-semibold" htmlFor="email">Email</label>
            <input onChange ={(e) => setEmail(e.target.value)} value={email} className="border outline-none text-base border-gray-300 p-2.5 rounded-[7px] placeholder:text-sm placeholder:font-medium placeholder:text-gray-400" type="email" name="email" id="email" placeholder="Email address" required/>
        </div>
        <div className="flex flex-col pt-3">
            <label className="text-base pb-1 font-semibold" htmlFor="password">Password</label>
            <input onChange ={(e) => setPassword(e.target.value)} value={password} className="border outline-none text-base border-gray-300 p-2.5 rounded-[7px] placeholder:text-sm placeholder:font-medium placeholder:text-gray-400" type="password" name="password" id="password" placeholder="Password" required/>
        </div>
        <button className="bg-black cursor-pointer text-white w-full rounded-[7px] mt-7 py-2.5">Login</button>
        </form>
    </div>
    )
}

export default Login