import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import {Pagination, Autoplay, EffectFade , Navigation} from 'swiper/modules';

import Banner1 from "../../assets/image/banner3.jpg";
import Banner2 from "../../assets/image/banner4.jpg";
import {Button} from "@mui/material";
import "./style.css"


const HomeBannerV2 = () => {
    return (
        <div className="w-full h-[200px] md:h-[400px]">
            <Swiper
                spaceBetween={10}
                slidesPerView={1.2}
                centeredSlides={true}
                navigation={true}
                loop={true} // 🔥 important
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                }}
                pagination={{ dynamicBullets: true }}
                modules={[EffectFade,Pagination, Autoplay,  Navigation]}
                className="homesliderv2"
            >
                <SwiperSlide>
                    <div className="item w-full rounded-md overflow-hidden">
                        <img src={Banner1} alt="Banner 1 - Big Saving Days Sale" className="w-full h-full object-cover" />

                        <div className="info absolute top-0 -right-[100%] w-[50%] h-[100%] opacity-0 transition-all duration-700  z-50 p-8 flex items-center flex-col justify-center">
                            <h4 className="text-[18px] font-[500] w-full text-left mb-3 ">Big Saving Days Sale

                            </h4>
                            <h2 className="text-[35px] font-[700] w-full text-left mb-3  relative -right-[100] opacity-0 ">
                                Big Saving Round Green T-Shirt
                            </h2>
                            <h3 className="flex items-center gap-3 text-[18px] font-[500] w-full text-left mt-3 mb-3 ">
                                Starting At Only <span className="text-primary text-[30px] font-[700]">
                                $59.00
                            </span>
                            </h3>
                            <div className="w-full relative -bottom-[100%] opacity-0 btn_">
                                <Button className="btn-org"> SHOP NOW</Button>
                            </div>
                        </div>
                    </div>

                </SwiperSlide>

                <SwiperSlide>
                    <div className="item w-full rounded-md overflow-hidden">
                        <img src={Banner2} alt="Banner 2 - Big Saving Days Sale" className="w-full h-full object-cover" />

                        <div className="info absolute top-0 -right-[100%] w-[50%] h-[100%] opacity-0 transition-all duration-700  z-50 p-8 flex items-center flex-col justify-center">
                            <h4 className="text-[18px] font-[500] w-full text-left mb-3 ">Big Saving Days Sale

                            </h4>
                            <h2 className="text-[35px] font-[700] w-full text-left mb-3  relative -right-[100] opacity-0 ">
                                Big Saving Round Green T-Shirt
                            </h2>
                            <h3 className="flex items-center gap-3 text-[18px] font-[500] w-full text-left mt-3 mb-3 ">
                                Starting At Only <span className="text-primary text-[30px] font-[700]">
                                $59.00
                            </span>
                            </h3>
                            <div className="w-full relative -bottom-[100%] opacity-0 btn_">
                                <Button className="btn-org"> SHOP NOW</Button>
                            </div>
                        </div>
                    </div>

                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default HomeBannerV2;