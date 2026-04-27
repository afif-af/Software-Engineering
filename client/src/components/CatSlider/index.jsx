import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import "./catSlider.css";

import { Navigation } from 'swiper/modules';
import { Link } from "react-router-dom";


import chair from "../../assets/items/chair.jpg";
import tablet from "../../assets/items/tablet.jpg";
import diamond from "../../assets/items/rolingDiamond.jpg";
import shoes from "../../assets/items/snacker.jpg";
import shirt from "../../assets/items/tshirt.png";
import watch from "../../assets/items/watch.jpg";



const HomeCatSlider = () => {
    return (
        <div className="homeCatSlider py-5 px-3 bg-gray-100 relative">

            <Swiper
                slidesPerView={8}
                spaceBetween={15}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
                breakpoints={{
                    320: { slidesPerView: 2 },
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 5 },
                    1024: { slidesPerView: 8 },
                }}
            >

                {/* 1 */}
                <SwiperSlide>
                    <Link to="/">
                        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 py-4 px-2 flex flex-col items-center justify-center group cursor-pointer">
                            <img src={tablet} alt="" className="w-[70px] h-[70px] object-contain group-hover:scale-110 transition duration-300"/>
                            <h3 className="text-sm font-semibold mt-3 text-gray-700 group-hover:text-blue-500">Tablet</h3>
                        </div>
                    </Link>
                </SwiperSlide>

                {/* 2 */}
                <SwiperSlide>
                    <Link to="/">
                        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 py-4 px-2 flex flex-col items-center justify-center group cursor-pointer">
                            <img src={shoes} alt="" className="w-[70px] h-[70px] object-contain group-hover:scale-110 transition duration-300"/>
                            <h3 className="text-sm font-semibold mt-3 text-gray-700 group-hover:text-blue-500">Shoes</h3>
                        </div>
                    </Link>
                </SwiperSlide>

                {/* 3 */}
                <SwiperSlide>
                    <Link to="/">
                        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 py-4 px-2 flex flex-col items-center justify-center group cursor-pointer">
                            <img src={shirt} alt="" className="w-[70px] h-[70px] object-contain group-hover:scale-110 transition duration-300"/>
                            <h3 className="text-sm font-semibold mt-3 text-gray-700 group-hover:text-blue-500">Shirt</h3>
                        </div>
                    </Link>
                </SwiperSlide>

                {/* 4 */}
                <SwiperSlide>
                    <Link to="/">
                        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 py-4 px-2 flex flex-col items-center justify-center group cursor-pointer">
                            <img src={watch} alt="" className="w-[70px] h-[70px] object-contain group-hover:scale-110 transition duration-300"/>
                            <h3 className="text-sm font-semibold mt-3 text-gray-700 group-hover:text-blue-500">Watch</h3>
                        </div>
                    </Link>
                </SwiperSlide>

                {/* 5 */}
                <SwiperSlide>
                    <Link to="/">
                        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 py-4 px-2 flex flex-col items-center justify-center group cursor-pointer">
                            <img src={chair} alt="" className="w-[70px] h-[70px] object-contain group-hover:scale-110 transition duration-300"/>
                            <h3 className="text-sm font-semibold mt-3 text-gray-700 group-hover:text-blue-500">Chair</h3>
                        </div>
                    </Link>
                </SwiperSlide>

                {/* 6 */}
                <SwiperSlide>
                    <Link to="/">
                        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 py-4 px-2 flex flex-col items-center justify-center group cursor-pointer">
                            <img src={diamond} alt="" className="w-[70px] h-[70px] object-contain group-hover:scale-110 transition duration-300"/>
                            <h3 className="text-sm font-semibold mt-3 text-gray-700 group-hover:text-blue-500">Diamond</h3>
                        </div>
                    </Link>
                </SwiperSlide>

                {/* duplicate for smooth scroll */}
                <SwiperSlide>
                    <Link to="/">
                        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 py-4 px-2 flex flex-col items-center justify-center group cursor-pointer">
                            <img src={tablet} alt="" className="w-[70px] h-[70px] object-contain group-hover:scale-110 transition duration-300"/>
                            <h3 className="text-sm font-semibold mt-3 text-gray-700 group-hover:text-blue-500">Tablet</h3>
                        </div>
                    </Link>
                </SwiperSlide>

                <SwiperSlide>
                    <Link to="/">
                        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 py-4 px-2 flex flex-col items-center justify-center group cursor-pointer">
                            <img src={tablet} alt="" className="w-[70px] h-[70px] object-contain group-hover:scale-110 transition duration-300"/>
                            <h3 className="text-sm font-semibold mt-3 text-gray-700 group-hover:text-blue-500">Tablet</h3>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to="/">
                        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 py-4 px-2 flex flex-col items-center justify-center group cursor-pointer">
                            <img src={tablet} alt="" className="w-[70px] h-[70px] object-contain group-hover:scale-110 transition duration-300"/>
                            <h3 className="text-sm font-semibold mt-3 text-gray-700 group-hover:text-blue-500">Tablet</h3>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to="/">
                        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 py-4 px-2 flex flex-col items-center justify-center group cursor-pointer">
                            <img src={tablet} alt="" className="w-[70px] h-[70px] object-contain group-hover:scale-110 transition duration-300"/>
                            <h3 className="text-sm font-semibold mt-3 text-gray-700 group-hover:text-blue-500">Tablet</h3>
                        </div>
                    </Link>
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default HomeCatSlider;