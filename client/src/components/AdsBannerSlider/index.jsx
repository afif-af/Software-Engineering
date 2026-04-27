import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

import BannerBox from "../BannerBox";

import banner3 from "../../assets/banner/1771681525_storage-banner.webp";
import banner4 from "../../assets/banner/1776014377_Back_To_School_HPMC.jpg.webp";

const AdsBannerSlider = () => {
    return (
        <div className="mt-2 w-full">

            <Swiper
                slidesPerView={4}
                spaceBetween={15}
                navigation={true}
                modules={[Navigation]}
            >

                <SwiperSlide>
                    <BannerBox img={banner3} link="/" />
                </SwiperSlide>

                <SwiperSlide>
                    <BannerBox img={banner4} link="/" />
                </SwiperSlide>

                <SwiperSlide>
                    <BannerBox img={banner3} link="/" />
                </SwiperSlide>

                <SwiperSlide>
                    <BannerBox img={banner3} link="/" />
                </SwiperSlide>

                <SwiperSlide>
                    <BannerBox img={banner4} link="/" />
                </SwiperSlide>

                <SwiperSlide>
                    <BannerBox img={banner3} link="/" />
                </SwiperSlide>

                <SwiperSlide>
                    <BannerBox img={banner3} link="/" />
                </SwiperSlide>

                <SwiperSlide>
                    <BannerBox img={banner4} link="/" />
                </SwiperSlide>

            </Swiper>

        </div>
    );
};

export default AdsBannerSlider;