import React from 'react';
import {IoIosArrowForward, IoMdTime} from "react-icons/io";
import blogImage from "../../assets/banner/1776014240_Mumbai_Muskmelon.jpeg";

import {Link} from "react-router-dom";

const BlogItem = () => {
    return (
        <div className="blogItem group">

            <div className="imgWrapper relative w-full overflow-hidden rounded-md cursor-pointer ">
                <img src={blogImage} className="w-full transition-all group-hover:scale-105" alt="blogImage" />

                <span className="flex items-center justify-center text-white absolute bottom-[15px] right-[15px] z-50 bg-primary rounded-md p-1 text-[11px] font-[500] "><IoMdTime className="text-[16px] "/> 5 April 2026 </span>
            </div>
            <div className="info py-4 ">
                <h2 className="text-[15px] font-[600] text-black">
                    <Link to="/">
                          Nullam ullicomper  orner odf
                    </Link>
                </h2>
                <p className="text-[14px] font-[400] mb-4 text-[rgba(0,0,0,0.8)]">
                    leorjhkdsfg kjhsdf kjfh ssdffjhlsdhjkkjhfffffffffff
                    wui
                </p>

                <Link to="/" className="link font-[500] text-[14px] flex items-center gap-1  " > Read More <IoIosArrowForward/> </Link>

            </div>
        </div>
    );
};

export default BlogItem;