import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import {ShopContext} from "../context/ShopContext"
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'


const SearchBar = () => {
  const {search, setSearch, showSearch, setShowSearch}=useContext(ShopContext);
  const [visible, setVisible] =useState(false);

  const location =useLocation();
  useEffect(()=>{
    if(location.pathname.includes("collection")){
      setVisible(true);
    }
    else
    {
      setVisible(false);
    }

  },[location]);

  return showSearch && visible ? (
  <div className="border-b border-gray-300 py-2">
    <div className="flex items-center">
      
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 outline-none bg-inherit text-sm"
        type="text"
        placeholder="Search"
      />

      <img
        className="w-4 cursor-pointer"
        src={assets.search_icon}
        alt="Search"
      />

      <img
        onClick={() => setShowSearch(false)}
        className="w-3 ml-4 cursor-pointer"
        src={assets.cross_icon}
        alt="Close"
      />

    </div>
  </div>
) : null;
};

export default SearchBar