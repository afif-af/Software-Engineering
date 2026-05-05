import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

import banner3 from "../../assets/banner/1771681525_storage-banner.webp";
import banner4 from "../../assets/banner/1776014377_Back_To_School_HPMC.jpg.webp";
import BannerBoxV2 from "../BannerBoxv2/index.jsx";

const AdsBannerSliderV2 = () => {
    return (
        <div className="mt-2 w-full">

            <Swiper
                slidesPerView={4}
                spaceBetween={15}
                navigation={true}
                modules={[Navigation]}
            >

                <SwiperSlide>
                    <BannerBoxV2 info="left" image={banner3} link="/" />
                </SwiperSlide>

                <SwiperSlide>
                    <BannerBoxV2 info="left" image={banner4} link="/" />
                </SwiperSlide>

                <SwiperSlide>
                    <BannerBoxV2 info="left" image={banner3} link="/" />
                </SwiperSlide>

                <SwiperSlide>
                    <BannerBoxV2 info="left" image={banner3} link="/" />
                </SwiperSlide>

                <SwiperSlide>
                    <BannerBoxV2 info="left" image={banner4} link="/" />
                </SwiperSlide>

                <SwiperSlide>
                    <BannerBoxV2 info="left" image={banner3} link="/" />
                </SwiperSlide>

                <SwiperSlide>
                    <BannerBoxV2 info="left" image={banner3} link="/" />
                </SwiperSlide>

                <SwiperSlide>
                    <BannerBoxV2 info="left" image={banner4} link="/" />
                </SwiperSlide>

            </Swiper>

        </div>
    );
};

export default AdsBannerSliderV2;