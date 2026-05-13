import React, {useContext} from 'react';
import './style.css'
import productItem2 from '../../assets/tshirt/t5.webp'
import productItem1 from '../../assets/tshirt/t1.webp'

import {Link} from "react-router-dom";
import {Button, Rating} from "@mui/material";
import {MdOutlineShoppingCart, MdZoomOutMap} from "react-icons/md";
import {IoGitCompareOutline} from "react-icons/io5";
import {FaRegHeart} from "react-icons/fa6";
import {MyContext} from "../../App.jsx";


const ProductItemListV = () => {

    const context =useContext(MyContext);

    return (
        <div className="productItem rounded-md shadow-lg overflow-hidden border-1 border-[rgba(0,0,0,0.1)]
        flex items-center" >
            <div className="group imageWrapper w-[25%] min-w-[25%] overflow-hidden rounded-md relative">
                <Link to="/product/85758">

                <div className="img !h-[250px] w-full overflow-hidden">
                        <img src={productItem1} alt="Product" className="-full h-full object-cover" />

                        <img src={productItem2} alt="Product" className="w-full
                        transition-all duration-700 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-105" />


                    </div>

                </Link>

                <span className="discount flex p-1  text-[12px]  font-[500] items-center absolute top-[10px] lef-[10px] z-50 bg-primary text-white rounded-lg">
                     10%
                 </span>

                <div className="actions flex-col w-[50px] absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 transition-all duration-300
                group-hover:top-[15px] opacity-0 group-hover:opacity-100  ">

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white
                        text-black hover:!bg-primary hover:text-white group"
                            onclick={()=>context.setOpenProductDetailsModal(true)}

                    >



                        <MdZoomOutMap className="text-[18px]"/>
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white
                        text-black hover:!bg-primary hover:text-white group" >
                        <IoGitCompareOutline className="text-[18px] !text-black group-hover:text-white hover:!text-white"/>
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white
                        text-black hover:!bg-primary hover:text-white group" >
                        <FaRegHeart className="text-[18px] !text-black group-hover:text-white hover:!text-white"/>
                    </Button>



                </div>


            </div>


            <div className="info p-3 px-8 py-5 w-[75%]  ">
                <h6 className="text-[15px]">
                    <Link to="/product/85758" className="link transition-all">
                        Regular Fit Digital Print T-Shirt
                    </Link>
                </h6>
                <h3 className="text-[18px] mb-1 title mt-2 font-[500] text-[rgba(0,0,0,0.9)]">
                    <Link to="/product/85758" className="link transition-all">
                        Regular Fit Digital Print T-Shirt
                    </Link>
                </h3>

                <p className="text-[14px]"> We fsdj sadfljhfs sdfajhasl;fk sdfkj asdlfkjsd flk jhsdf
                sdfajkhjk sadfl;as asdsdfajkdsjkfla sfowe saldfkjaskjf sdlkjopa dsfjh
                ajkfg dsfj0e sd;af asd
                </p>

                <Rating name="size-small" defaultValue={4} readOnly size="small"/>
                <div className="flex items-center gap-4">
                    <span className="oldPrice line-through text-gray-500 text-[15px] font-[500] ">$2300</span>
                    <span className="Price text-primary font-[600] text-[15px]">$1800</span>

                </div>

                <div className="mt-3">
                    <Button className="btn-org flex gap-2" > <MdOutlineShoppingCart className="text-[16px]"/> Add to cart</Button>

                </div>

            </div>

        </div>
    );
};

export default ProductItemListV;