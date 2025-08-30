import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import { IoIosArrowForward } from "react-icons/io";
import ProductItem from "../components/ProductItem"


const Collections = () => {
  const {products,search,showSearch} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevent');

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item !== e.target.value));
    }
    else{
      setCategory(prev => [...prev,e.target.value]);
    }
  };
    const toggleSubCategory = (e) => {
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    }
    else{
      setSubCategory(prev => [...prev,e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    if(subCategory.length > 0){
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }
    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch(sortType){
      case 'low-high' : setFilterProducts(fpCopy.sort((a,b) => (a.price - b.price)));
      break;
      case 'high-low' : setFilterProducts(fpCopy.sort((a,b) => (b.price - a.price)));
      break;
      default : applyFilter();
      break;
    }
  }

  useEffect(() => {
    applyFilter();
  },[category,subCategory,search,showSearch,products]);

  useEffect(() => {
    sortProduct();
  },[sortType])

  useEffect(() => {
        document.title = "LuxeBay | Collections";
      }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 border-t border-gray-300">
      {/* Filter options */}
      <div className=" pt-4 px-3 min-w-60 sm:border-r border-gray-300">
        <p onClick={() => setShowFilter(!showFilter)} className="ml-1 text-xl flex item-center cursor-pointer gap-2 pt-4">FILTERS
          <IoIosArrowForward className={`text-2xl text-gray-500 sm:hidden ${showFilter ? 'rotate-90' :''} font-semibold cursor-pointer`}/>
        </p>
        {/* Category Filter */}
        <div className={ `border-b border-gray-300 pl-5 py-3 ${showFilter ? "" : 'hidden'} sm:block`}>
          <p className="pb-2 font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2 font-normal">
              <input type="checkbox" className="w-3 accent-black" value={'men'} onChange={toggleCategory} />Men
            </p>
            <p className="flex gap-2 font-normal">
              <input type="checkbox" className="w-3 accent-black" value={'women'} onChange={toggleCategory} />Women
            </p>
            <p className="flex gap-2 font-normal">
              <input type="checkbox" className="w-3 accent-black" value={'kids'} onChange={toggleCategory} />Kids
            </p>
          </div>
        </div>
        <div className={ `pl-5 py-3 ${showFilter ? "" : 'hidden'} sm:block`}>
          <p className="pb-2 font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2 font-normal">
              <input type="checkbox" className="w-3 accent-black" value={'topwear'} onChange={toggleSubCategory} />Topwear
            </p>
            <p className="flex gap-2 font-normal">
              <input type="checkbox" className="w-3 accent-black" value={'bottomwear'} onChange={toggleSubCategory} />Bottomwear
            </p>
            <p className="flex gap-2 font-normal">
              <input type="checkbox" className="w-3 accent-black" value={'winterwear'} onChange={toggleSubCategory} />Winterwear
            </p>
            <p className="flex gap-2 font-normal">
              <input type="checkbox" className="w-3 accent-black" value={'footwear'} onChange={toggleSubCategory} />Footwear
            </p>
          </div>
        </div>
      </div>
      {/* Products */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between text-base sm:text-2xl mt-6 mb-6">
          <h2 className="text-3xl font-extrabold">ALL COLLECTIONS</h2>
          {/* Product sort */}
          <select onChange={(e)=>setSortType(e.target.value)} className="w-42 sm:w-auto border rounded-md border-gray-300 text-sm py-2 px-2 text-gray-700 font-medium bg-gray-100">
            <option value="relavent">Sort by : Relavent</option>
            <option value="low-high">Sort by : Low-High</option>
            <option value="high-low">Sort by : High-Low</option>
          </select>
        </div>
        {/* All product display */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} id={item._id} name={item.name} brand={item.brand} price={item.price} image={item.image} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collections