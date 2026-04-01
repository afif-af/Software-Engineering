import React from "react";
import "../Search/style.css";
import { Button } from "@mui/material";
import { IoSearch } from "react-icons/io5";

const Search = () => {
    return (
        <div className="searchBox w-full h-[50px] bg-white border border-gray-300 rounded-full flex items-center px-3 shadow-sm hover:shadow-md transition">

            {/* Icon (left) */}
            <IoSearch className="text-gray-500 text-[20px] mr-2" />

            {/* Input */}
            <input
                type="text"
                placeholder="Search for products..."
                className="w-full h-full bg-transparent outline-none text-[14px]"
            />

            {/* Button */}
            <Button className="!min-w-[40px] !w-[40px] h-[40px] !rounded-full !bg-blue-600 hover:!bg-blue-700 transition">
                <IoSearch className="text-white text-[18px]" />
            </Button>
        </div>
    );
};

export default Search;




// import React from 'react';
// import '../Search/style.css'
// import {Button} from "@mui/material";
// import {IoSearch} from "react-icons/io5"
//
// const Search = () => {
//     return (
//         <div className="searchBox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative">
//             <input type='text' placeholder='Search for product...'
//                    className='w-full h-[35px]  focus:outline-none focus:shadow-outline bg-inherit p-2 text-[15px] '/>
//             <Button className="!absolute top-[8px] right-[5px] z-50 !w-[35px] !min-w-[37px] h-[37px] !rounded-full ">
//                 <IoSearch className='text-[#4e4e4e] text-[22px]'/>
//             </Button>
//         </div>
//     );
// };
//
// export default Search;