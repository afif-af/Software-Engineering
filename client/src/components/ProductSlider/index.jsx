import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Link } from "react-router-dom";
import ProductItem from "../ProductItem/index.jsx";
import './style.css'

const ProductsSlider = (props) => {
    return (
        <div className="product-slider py-3">

            <Swiper
                slidesPerView={props.items}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
                // breakpoints={{
                //     320: { slidesPerView: 2 },
                //     640: { slidesPerView: 3 },
                //     768: { slidesPerView: 5 },
                //     1024: { slidesPerView: 8 },
                // }}
            >

                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>

                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>

                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>

                <SwiperSlide>
                <ProductItem/>
            </SwiperSlide>

                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>

                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>

                <SwiperSlide>
                <ProductItem/>
            </SwiperSlide>
                <SwiperSlide>
                    <ProductItem/>
                </SwiperSlide>
                <SwiperSlide>
                <ProductItem/>
            </SwiperSlide>
                <SwiperSlide>
                <ProductItem/>
            </SwiperSlide>
                <SwiperSlide>
                <ProductItem/>
            </SwiperSlide>


            </Swiper>
        </div>
    );
};

export default ProductsSlider;

//
// import React from 'react';
// import './style.css'
// import productItem from '../../assets/product/imitation-jewellery-20240820.png'
// import {Link} from "react-router-dom";
// import {Button, Rating} from "@mui/material";
// import {MdZoomOutMap} from "react-icons/md";
// import {IoGitCompareOutline} from "react-icons/io5";
// import {FaRegHeart} from "react-icons/fa6";
//
//
// const ProductItem = () => {
//
//
//
//     return (
//         <div className="productItem rounded-md shadow-lg overflow-hidden border-1 border-[rgba(0,0,0,0.1)]" >
//             <div className="group imageWrapper w-[100%] h-[250px] overflow-hidden rounded-md relative">
//
//                 <img src={productItem} alt="Product" className="w-full" />
//
//                 <span className="discount flex p-1  text-[12px]  font-[500] items-center absolute top-[10px] lef-[10px] z-50 bg-primary text-white rounded-lg">
//                      10%
//                  </span>
//
//
//                 <div className="actions flex-col w-[50px] absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 transition-all duration-300
//                 group-hover:top-[15px] opacity-0 group-hover:opacity-100  ">
//
//
//
//                     <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full">
//                         <MdZoomOutMap className="text-[18px]"/>
//                     </Button>
//
//                     <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full">
//                         <IoGitCompareOutline className="text-[18px]"/>
//                     </Button>
//
//                     <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full">
//                         <FaRegHeart className="text-[18px]"/>
//                     </Button>
//
//
//
//                 </div>
//
//
//             </div>
//             <div className="info p-3 py-5 ">
//                 <h6 className="text-[13px]">
//                     <Link to="/" className="link transition-all">Soylent Green
//                     </Link>
//                 </h6>
//                 <h3 className="text-[13px] mb-1 title mt-1 font-[500] text-[rgba(0,0,0,0.9)]">
//                     <Link to="/" className="link transition-all">
//                         Siril Gorgette pink color saree with tshirt piece
//                     </Link>
//                 </h3>
//
//                 <Rating name="size-small" defaultValue={4} readOnly size="small"/>
//                 <div className="flex items-center gap-4">
//                     <span className="oldPrice line-through text-gray-500 text-[15px] font-[500] ">$2300</span>
//                     <span className="Price text-primary font-[600] text-[15px]">$1800</span>
//
//                 </div>
//             </div>
//
//         </div>
//     );
// };
//
// export default ProductItem;