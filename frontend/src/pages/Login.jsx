import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";


const Login = () => {



  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up'){
        const response = await axios.post(backendUrl + '/api/user/register', {name,email,password});
        if(response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        }
        else {
          toast.error(response.data.message);
        }
      }
      else {
        const response = await axios.post(backendUrl + '/api/user/login', {email,password});
        if(response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        }
        else {
          toast.error(response.data.message);
        }
      }
    }catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if(token){
      navigate('/');
    }
  },[token])

  useEffect(() => {
    document.title = "Sign Up / Login";
  }, []);

  return (
    <div className="mt-5 mb-60 flex justify-center items-center">
      <form onSubmit={onSubmitHandler} action="submit" className="w-full sm:w-[30%]">
        <h2 className="text-4xl py-10 text-center font-extrabold">{currentState}</h2>
        {
          currentState === 'Login' ? '' : <div className="flex flex-col">
          <label className="text-base pb-1 font-semibold" htmlFor="name">Name</label>
          <input className="border outline-none text-base border-gray-300 p-2.5 rounded-[7px] placeholder:text-sm placeholder:font-medium placeholder:text-gray-400" onChange = {(e) => setName(e.target.value)} value = {name} type="text" name="name" id="name" placeholder="Name" required/>
        </div>
        }
        <div className="flex flex-col pt-3">
          <label className="text-base pb-1 font-semibold" htmlFor="email">Email</label>
          <input className="border outline-none text-base border-gray-300 p-2.5 rounded-[7px] placeholder:text-sm placeholder:font-medium placeholder:text-gray-400" onChange = {(e) => setEmail(e.target.value)} value = {email} type="email" name="email" id="email" placeholder="Email address" required/>
        </div>
        <div className="flex flex-col pt-3">
          <label className="text-base pb-1 font-semibold" htmlFor="password">Password</label>
          <input className="border outline-none text-base border-gray-300 p-2.5 rounded-[7px] placeholder:text-sm placeholder:font-medium placeholder:text-gray-400" onChange = {(e) => setPassword(e.target.value)} value = {password} type="password" name="password" id="password" placeholder="Password" required/>
        </div>
        <button className="bg-black cursor-pointer text-white w-full rounded-[7px] mt-7 py-2.5">{currentState}</button>
        {
          currentState === 'Login' ? <p className="pt-3 text-gray-500 font-medium text-sm text-center">Don't have an account? <span onClick={() => setCurrentState('Sign Up')} className="text-black cursor-pointer text-base font-semibold">Sign up for free</span></p> : <p className="pt-3 text-gray-500 font-medium text-sm text-center">Already have an account? <span onClick={() => setCurrentState('Login')} className="text-black cursor-pointer text-base font-semibold">Login Here</span></p>
        }
      </form>
    </div>
  )
}

export default Login