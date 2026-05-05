import React, {useState} from 'react';
import {Breadcrumbs} from "@mui/material";
import {Link} from "@mui/material";
import {ProductZoom} from "../../components/ProductZoom";
import {Rating} from "@mui/material";
import {Button} from "@mui/material";

import {MdOutlineShoppingCart}  from "react-icons/md";
import {FaRegHeart}  from "react-icons/fa6";
import {IoGitCompareOutline} from "react-icons/io5";
import {TextField} from "@mui/material";
import ProductSlider from "../../components/ProductSlider";
import ProductDetailsComponents from "../../components/ProductDetails/index.jsx";

const ProductDetails = () => {
    const [activeTab, setActiveTab] = useState(0)


    return (
        <>
            <div className="py-5">
                <div className="container">
                    <Breadcrumbs aria-label="breadcrumb">
                    </Breadcrumbs>
                </div>
            </div>

            <section className="bg-white py-5">
                 <div className="container flex gap-8 items-center">
                     <div className="productZoomContainer w-[40%]">
                         <ProductZoom/>
                     </div>

                     <div className="productContent w-[60%] pr-10 pl-10">
                         <ProductDetailsComponents />
                     </div>
                 </div>

                <div className="container pt-10">
                    <div className="flex items-center gap-8 mb-5">

                    </div>
                </div>
                {activeTab === 0 && (

                )
                }

            </section>

        </>
    );
};

export default ProductDetails;