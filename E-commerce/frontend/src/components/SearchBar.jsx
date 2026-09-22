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



  return showSearch && visible ?(
    <div>
      <div>
        <input value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className='flex-1 outline-none bg-inherit text-sm'
        type='text'
        placeholder='Search'
        />
        <img className='w-4' src={assets.search_icon} />
      </div>
      <img onClick={()=>setShowSearch(false)}
          className='inline w-3 cursor-pointer'
          src={assets.cross_icon} />

    </div>
  ): null
};

export default SearchBar