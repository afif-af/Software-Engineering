import React, {useState} from 'react';
import {Button, Rating} from "@mui/material";
import {MdOutlineShoppingCart} from "react-icons/md";
import {FaRegHeart} from "react-icons/fa6";
import {IoGitCompareOutline} from "react-icons/io5";
import {QtyBox} from "../../components/QtyBox"


const ProductDetailsComponents = () => {
    const[productActionIndex, setProductActionIndex] =useState(null)

    return (
        <>
            <h1 className="text-[24px] font-[600] mb-2">
                Siril Poly silk white & beige colo saree with t short pice | saree for women | stee |sare
            </h1>
            <div className="flex items-center gap-3">
                             <span className="text-gray-400 text[13px]">
                                 Brands : {""}
                                 <span className="font-[500] text-black opacity-75">
                                     House of Chikankiri
                                 </span>
                             </span>

                <Rating
                    name="size-small"
                    defaultValue={4}
                    size="small"
                    readOnly/>
                <span className="text -[13px] cursor-pointer "> Review (5)</span>
            </div>


            <div className="flex items-center gap-4 mt-4">

                <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">$58.00</span>
                <span className="price text-[14px] font-[600]">$58.00</span>

                <span className="text-[14px] ">
                                 Available in Stock : {" "}
                    <span className="text-green-600 text-[14px] font-bold">
                                     147 Items
                                 </span>
                             </span>

            </div>

            <p className="mt-3 pr-10 mb-5">
                Lorem Ipsum is simply dummy text of the printing
                and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum
                passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of
                Lorem Ipsum.

            </p>

            <div className="flex items-center gap-5">
                <span className="text-[16px]">Size:</span>
                <div className="flex items-center gap-1 actions">

                    <Button className={`${
                        productActionIndex ===0 ?" bg-primary !text-white ": ""
                    }`}
                            onClick={() => {setProductActionIndex(0)}}
                    >
                        S
                    </Button>

                    <Button className={`${
                        productActionIndex ===1 ?" bg-primary !text-white ": ""
                    }`}
                            onClick={() => {setProductActionIndex(1)}}
                    >
                        M
                    </Button>
                    <Button className={`${
                        productActionIndex ===2 ?" bg-primary !text-white ": ""
                    }`}
                            onClick={() => {setProductActionIndex(2)}}
                    >
                        L
                    </Button>

                    <Button className={`${
                        productActionIndex ===3 ?" bg-primary !text-white ": ""
                    }`}
                            onClick={() => {setProductActionIndex(3)}}
                    >
                        Xl
                    </Button>
                </div>


            </div>

            <p className="text-[14px] mt-5 mb-2 text=[#000]">
                Free Shipping (Est. Delivery Time 2-3 Days
            </p>



            <div className="flex items-center gap-4 py-4">
                <div className="qtyBoxWrapper w-[70px]">
                    <QtyBox/>
                </div>
            </div>

            <Button className="btn-org flex gap-2">
                <MdOutlineShoppingCart className="text-[22px]"/> Add to Cart

            </Button>
            <div className="flex items-center gap-4 mt-4">
                             <span className="flex items-center gap-2 text-[15px] link cursor-pointer font-[500]">
                                 <FaRegHeart className="text-[18px]">Add to Wishlist</FaRegHeart>
                             </span>

                <span className="flex items-center gap-2 text-[15px] link cursor-pointer font-[500]">
                                 <IoGitCompareOutline className="text-[18px]"/> Add to Compare
                             </span>

            </div>

        </>
    );
};

export default ProductDetailsComponents;