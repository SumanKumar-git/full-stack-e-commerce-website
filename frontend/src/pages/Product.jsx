import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ShopContext } from "../context/ShopContext";
import { FaStar } from "react-icons/fa";
import RelatedProducts from "../components/RelatedProducts";


const Product = () => {

  const {productId} = useParams();
  const {products, currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = async () => {
    products.map((item) => {
      if(item._id === productId){
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    })
  };

  useEffect(() => {
    fetchProductData();
  },[productId, products]);

  useEffect(() => {
      document.title = "LuxeBay";
    }, []);

  return productData ? (
    <div>
      <div className="flex flex-col sm:flex-row py-3 sm:py-6">
        {/* Image-Section */}
        <div className=" w-full sm:w-[42%] flex flex-col-reverse sm:flex-row ">
          {/* Side Small Image section */}
          <div className="sm:w-[20%] flex flex-row sm:flex-col object-center justify-between overflow-hidden sm:my-1">
            {productData.image.map((item,index) => <div key={index} className="w-[24%] sm:w-full sm:my-1 overflow-hidden rounded-sm"><img onClick={() => setImage(item)} key={index} className="rounded-sm object-cover cursor-pointer hover:scale-105 " src={item}/></div>)}
          </div>
          {/* Main Image Section */}
          <div className="h-130 sm:h-auto sm:w-[80%] overflow-hidden flex object-center my-2 sm:m-2">
            <img className="h-130 sm:h-full w-full object-cover rounded-[5px]" src={image} alt="" />
          </div>
        </div>
        {/* Product Details Section */}
        <div className=" w-full sm:w-[58%] flex flex-col pt-2 sm:pt-0 sm:m-2 sm:pl-15 justify-between">
        {/* Product Name */}
        <div className="flex flex-col">
          <h3 className="text-2xl font-extrabold sm:pb-2">{productData.brand}</h3>
          <h2 className=" text-3xl sm:text-4xl font-extrabold pb-3 sm:pb-5">{productData.name}</h2>
          {/* Star Ratings */}
          <div className="flex items-center gap-3 pb-3 sm:pb-5">
            <div className="flex gap-1 text-yellow-400">
              <FaStar className="text-base"/>
              <FaStar className="text-base"/>
              <FaStar className="text-base"/>
              <FaStar className="text-base"/>
              <FaStar className="text-base text-gray-300"/>
            </div>
            <p className="text-base">(1.5k)</p>
            {productData.bestseller ? <div className="bg-gray-200 rounded-full py-0.5 px-5 text-sm text-gray-500">Bestseller</div> : <div></div> }
          </div>
          <p className="text-sm sm:text-base font-medium text-gray-500">{productData.description}</p>
        </div>
        <p className="text-4xl font-bold py-3">
          {currency} {productData.price}
        </p>
        {/* Size section */}
        <div className="pb-4 sm:pb-0">
          <p className="text-base font-medium pb-1 sm:pb-3">Available Size</p>
          <div className="flex gap-2">
            {productData.sizes.map((item, index) => <button onClick={() => setSize(item)} className={`border-1 border-gray-400 cursor-pointer py-0.5 px-6 rounded-full font-semibold text-base ${item === size ? 'bg-black text-white' : ''} `} key={index}>{item}</button>)}
          </div>
        </div>
        <div className="text-xs sm:text-sm text-gray-500 font-medium sm:font-normal flex flex-col pb-3 sm:pb-0 sm:gap-1">
          <p>100% Original product</p>
          <p>Cash on delivery is available on this product</p>
          <p>Easy 10 days returns and exchanges</p>
        </div>
        <div className="flex gap-5 border-b-1 border-gray-500 pb-10">
          <div className="w-full sm:w-auto border-2 cursor-pointer text-center sm:px-10 py-2 rounded-full text-base font-medium bg-black text-white active:bg-white active:text-black">BUY NOW</div>
          <div onClick={() => addToCart(productData._id,size)} className="w-full sm:w-auto border-2 cursor-pointer text-center sm:px-10 py-2 rounded-full text-base font-medium active:bg-black active:text-white">ADD TO CART</div>
        </div>
        </div>
      </div>
      {/* Related Products */}
      <RelatedProducts category ={productData.category} subCategory ={productData.subcategory}/>
    </div>
  ) : <div className="opacity-0"></div>
}

export default Product