import React, { useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import productItem from '../../assets/saree1.jpg'
import productItem2 from '../../assets/saree2.webp'

import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

const ProductZoom = () => {
    const [slideIndex, setSlideIndex] = useState(0);

    const thumbRef = useRef(null);
    const mainRef = useRef(null);

    const goto = (index) => {
        setSlideIndex(index);

        if (thumbRef.current) {
            thumbRef.current.swiper.slideTo(index);
        }

        if (mainRef.current) {
            mainRef.current.swiper.slideTo(index);
        }
    };

    return (
        <div className="flex gap-3">

            {/* 🔹 LEFT THUMB SLIDER */}
            <div className="w-[15%]">
                <Swiper
                    direction="vertical"
                    navigation={true}
                    modules={[Navigation]}
                    slidesPerView={4}
                    spaceBetween={0}
                    ref={thumbRef}
                    className="h-[500px] overflow-hidden zoomProductSliderThumbs "
                >

                    <SwiperSlide>
                        <div
                            onClick={() => goto(0)}
                            className={`rounded-md overflow-hidden cursor-pointer border 
              ${slideIndex === 0 ? "opacity-100 border-blue-500" : "opacity-40"}`}
                        >
                            <img src={productItem} alt="" className="w-full" />
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div
                            onClick={() => goto(1)}
                            className={`rounded-md overflow-hidden cursor-pointer border 
              ${slideIndex === 1 ? "opacity-100 border-blue-500" : "opacity-40"}`}
                        >
                            <img src={productItem2} alt="" className="w-full" />
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div
                            onClick={() => goto(2)}
                            className={`rounded-md overflow-hidden cursor-pointer border 
              ${slideIndex === 2 ? "opacity-100 border-blue-500" : "opacity-40"}`}
                        >
                            <img src={productItem} alt="" className="w-full" />
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div
                            onClick={() => goto(3)}
                            className={`rounded-md overflow-hidden cursor-pointer border 
              ${slideIndex === 3 ? "opacity-100 border-blue-500" : "opacity-40"}`}
                        >
                            <img src={productItem2} alt="" className="w-full" />
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div
                            onClick={() => goto(4)}
                            className={`rounded-md overflow-hidden cursor-pointer border 
              ${slideIndex === 4 ? "opacity-100 border-blue-500" : "opacity-40"}`}
                        >
                            <img src={productItem} alt="" className="w-full" />
                        </div>
                    </SwiperSlide>

                    <SwiperSlide></SwiperSlide>

                </Swiper>
            </div>

            <div className="w-[85%] h-[520px] overflow-hidden">
                <Swiper
                    slidesPerView={1}
                    ref={mainRef}
                    onSlideChange={(swiper) =>
                        setSlideIndex(swiper.activeIndex)
                    }
                >
                    <SwiperSlide>
                        <InnerImageZoom
                            zoomType="hover"
                            zoomScale={1.5}
                            src={productItem}
                            zoomSrc={productItem}
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <InnerImageZoom
                            zoomType="hover"
                            zoomScale={1.5}
                            src={productItem2}
                            zoomSrc={productItem2}
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <InnerImageZoom
                            zoomType="hover"
                            zoomScale={1.5}
                            src={productItem}
                            zoomSrc={productItem}
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <InnerImageZoom
                            zoomType="hover"
                            zoomScale={1.5}
                            src={productItem2}
                            zoomSrc={productItem2}
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <InnerImageZoom
                            zoomType="hover"
                            zoomScale={1.5}
                            src={productItem}
                            zoomSrc={productItem}
                        />
                    </SwiperSlide>
                </Swiper>
            </div>

        </div>
    );
};

export default ProductZoom;