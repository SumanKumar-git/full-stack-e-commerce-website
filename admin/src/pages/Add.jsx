import { useState } from "react"
import { assets } from "../assets/assets"
import axios from 'axios'
import {backendUrl} from '../App'
import { toast } from "react-toastify"

const Add = ({token}) => {

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("men");
  const [subCategory, setSubCategory] = useState("topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try{
      const formData = new FormData();
      formData.append("brand",brand);
      formData.append("name",name);
      formData.append("description",description);
      formData.append("price",price);
      formData.append("category",category);
      formData.append("subCategory",subCategory);
      formData.append("bestseller",bestseller);
      formData.append("sizes",JSON.stringify(sizes));
      image1 && formData.append("image1",image1);
      image2 && formData.append("image2",image2);
      image3 && formData.append("image3",image3);
      image4 && formData.append("image4",image4);

      const response = await axios.post(backendUrl + "/api/product/add",formData ,{headers:{token}});

      if(response.data.success){
        toast.success(response.data.message);
        setBrand('');
        setName('');
        setDescription('');
        setPrice('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
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
      <form onSubmit={onSubmitHandler} action="" className="w-full flex flex-col gap-3">
      <div>
        <p className="text-sm font-medium pb-1">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img className="w-20 aspect-square object-cover" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} />
            <input onChange = {(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden/>
          </label>
          <label htmlFor="image2">
            <img className="w-20 aspect-square object-cover" src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} />
            <input onChange = {(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden/>
          </label>
          <label htmlFor="image3">
            <img className="w-20 aspect-square object-cover" src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} />
            <input onChange = {(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden/>
          </label>
          <label htmlFor="image4">
            <img className="w-20 aspect-square object-cover" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} />
            <input onChange = {(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden/>
          </label>
        </div>
      </div>
      <div className=" font-medium text-base">
          <label htmlFor="">
            <p className="text-sm font-medium pb-1">Product Brand</p>
            <input onChange={(e) => setBrand(e.target.value)} value={brand} className="border py-2 px-2 w-full sm:w-[55%] border-gray-300 rounded-[3px] placeholder:text-base placeholder:font-medium placeholder:text-gray-400" type="text" placeholder="Type here" required/>
          </label>
      </div>
      <div className="font-medium text-base">
          <label htmlFor="">
            <p className="text-sm font-medium pb-1">Product Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} className="border py-2 px-2 w-full sm:w-[55%] border-gray-300 rounded-[3px] placeholder:text-base placeholder:font-medium placeholder:text-gray-400" type="text" placeholder="Type here" required/>
          </label>
      </div>
      <div className=" font-medium text-base">
          <label htmlFor="">
            <p className="text-sm font-medium pb-1">Product Description</p>
            <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="border py-2 px-2 w-full sm:w-[55%] border-gray-300 rounded-[3px] placeholder:text-base placeholder:font-medium placeholder:text-gray-400 resize-none" type="text" placeholder="Write content here" required/>
          </label>
      </div>
      <div className="flex flex-col sm:flex-row gap-5">
        <div>
          <p className="text-sm font-medium pb-1">Product Category</p>
          <select onChange={(e) => setCategory(e.target.value)} className="border w-full py-2 px-2 border-gray-300 rounded-[3px] placeholder:text-base placeholder:font-medium placeholder:text-gray-400" required>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="text-sm font-medium pb-1">Product Type</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className="border w-full py-2 px-2 border-gray-300 rounded-[3px] placeholder:text-base placeholder:font-medium placeholder:text-gray-400" required>
            <option value="topwear">Topwear</option>
            <option value="bottomwear">Bottomwear</option>
            <option value="winterwear">Winterwear</option>
            <option value="footwear">Footwear</option>
          </select>
        </div>
        <div>
          <p className="text-sm font-medium pb-1">Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" className="border w-full py-2 px-2 border-gray-300 rounded-[3px] placeholder:text-base placeholder:font-medium placeholder:text-gray-400" placeholder="499" required/>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium pb-1">Product Sizes</p>
        <div className="flex gap-2">
          <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])} className={`${sizes.includes("S") ? "bg-black text-white" : ""} border border-gray-300 px-4 py-2 rounded-[3px] cursor-pointer`}>
            <p className="font-medium">S</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])} className={`${sizes.includes("M") ? "bg-black text-white" : ""} border border-gray-300 px-4 py-2 rounded-[3px] cursor-pointer`}>
            <p className="font-medium">M</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])} className={`${sizes.includes("L") ? "bg-black text-white" : ""} border border-gray-300 px-4 py-2 rounded-[3px] cursor-pointer`}>
            <p className="font-medium">L</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])} className={`${sizes.includes("XL") ? "bg-black text-white" : ""} border border-gray-300 px-4 py-2 rounded-[3px] cursor-pointer`}>
            <p className="font-medium">XL</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])} className={`${sizes.includes("XXL") ? "bg-black text-white" : ""} border border-gray-300 px-4 py-2 rounded-[3px] cursor-pointer`}>
            <p className="font-medium">XXL</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-3 pt-2 items-center">
        <input onChange={() => setBestseller(prev => !prev)} checked ={bestseller} type="checkbox" id="bestseller" className="cursor-pointer" />
        <label htmlFor="bestseller" className="cursor-pointer text-sm font-medium">Add to bestseller</label>
      </div>
      <button type="submit" className="bg-black text-white py-2 px-7 w-fit rounded-[3px] cursor-pointer">ADD</button>
    </form>
  )
}

export default Add