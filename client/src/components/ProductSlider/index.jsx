import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import { Link } from "react-router-dom";
import ProductItem from "../ProductItem/index.jsx";

const ProductsSlider = (props) => {
    return (
        <div className="product-slider">

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

                <SwiperSlide> <ProductItem/> </SwiperSlide>


            </Swiper>
        </div>
    );
};

export default ProductsSlider;