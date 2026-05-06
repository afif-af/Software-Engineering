import React  from 'react';
import "../ProductItem/style.css"
import {Link} from 'react-router-dom'
import {Button} from "@mui/material";
import {MdZoomOutMap} from "react-icons/md";
import {IoGitCompareOutline} from "react-icons/io5";
import img1 from "../../assets/saree1.jpg"
import img2 from "../../assets/saree2.webp"




const ProductItemListView = () => {
    // const context =useContext(MyContext);
    return (
        <div className="productItem p-4 shadow-md bg-[#f1f1f1] rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)] flex items-center">
            <div className="group imageWrapper w-[25%] overflow-hidden rounded-md relative" >
                <Link to="/product/85758">
                    <div className="img h-[220px] overflow-hidden">
                      <img src={img1} className="w-full" />
                        <img src={img2} className="w-full transition-all duration-700 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-105"/>



                    </div>
                </Link>
                <span className="discount flext items-center absolute top-[10px] right -[10px] z=50">
                    10%
                </span>
                <div className="actions top-[-20px] right-[5px] z-50 flext items-center gap-2 flex-col w-[50px] transition-all duration-300 group-hover:top-[15px] opacity-0 group-hover:opacity-100">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black
                    hover:!bg-primary hover:text-white group" >
                        {/*onClick={()=>*/}
                        {/*contextOpenProductDetailsModdal(true)*/}
                        <MdZoomOutMap className="text-[18px] !text-black group-hover:text-white
                        hover:!text-white"/>

                    </Button>
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black
                    hover:!bg-primary hover:text-white group">
                        <IoGitCompareOutline className="text-[18px] !text-black group-hover:text-white
                        hover:!text-white"/>
                    </Button>
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black
                    hover:!bg-primary hover:text-white group">
                        Wishlist
                    </Button>
                </div>


            </div>
            
        </div>
    );
};

export default ProductItemListView;