import React, { useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import productItem1 from '../../assets/tshirt/t1.webp'
import productItem2 from '../../assets/tshirt/t2.webp'
import productItem3 from '../../assets/tshirt/t3.webp'
import productItem4 from '../../assets/tshirt/t4.webp'
import productItem5 from '../../assets/tshirt/t5.webp'
import productItem6 from '../../assets/tshirt/t6.webp'

import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "./style.css"

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
            <div className="w-[15%] ">
                <Swiper
                    direction="vertical"
                    navigation={true}
                    modules={[Navigation]}
                    slidesPerView={4}
                    spaceBetween={0}
                    ref={thumbRef}
                    className="!h-[500px] overflow-hidden zoomProductSliderThumbs "
                >

                    <SwiperSlide>
                        <div
                            onClick={() => goto(0)}
                            className={`item rounded-md overflow-hidden cursor-pointer border 
                                        ${slideIndex === 0 ? "opacity-100 border-blue-500" : "opacity-40"}`}
                        >
                            <img src={productItem1} alt="" className="!w-full !h-[100px]" />
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div
                            onClick={() => goto(1)}
                            className={`item rounded-md overflow-hidden cursor-pointer border 
                                        ${slideIndex === 1 ? "opacity-100 border-blue-500" : "opacity-40"}`}
                        >
                            <img src={productItem2} alt="" className="!w-full !h-[100px]" />
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div
                            onClick={() => goto(2)}
                            className={`item rounded-md overflow-hidden cursor-pointer border 
                                        ${slideIndex === 2 ? "opacity-100 border-blue-500" : "opacity-40"}`}
                        >
                            <img src={productItem3} alt="" className="!w-full !h-[100px]" />
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div
                            onClick={() => goto(3)}
                            className={`item rounded-md overflow-hidden cursor-pointer border 
                                        ${slideIndex === 3 ? "opacity-100 border-blue-500" : "opacity-40"}`}
                        >
                            <img src={productItem4} alt="" className="w-full !h-[100px]" />
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div
                            onClick={() => goto(4)}
                            className={`item rounded-md overflow-hidden cursor-pointer border 
                                    ${slideIndex === 4 ? "opacity-100 border-blue-500" : "opacity-40"}`}
                        >
                            <img src={productItem5} alt="" className="w-full !h-[100px]" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div
                            onClick={() => goto(5)}
                            className={`item rounded-md overflow-hidden cursor-pointer border 
                                    ${slideIndex === 5 ? "opacity-100 border-blue-500" : "opacity-40"}`}
                        >
                            <img src={productItem6} alt="" className="w-full !h-[100px]" />
                        </div>
                    </SwiperSlide>



                </Swiper>
            </div>

            <div className="!w-[85%] !h-[520px] overflow-hidden">
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
                            src={productItem1}
                            zoomSrc={productItem1}
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
                            src={productItem3}
                            zoomSrc={productItem3}
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <InnerImageZoom
                            zoomType="hover"
                            zoomScale={1.5}
                            src={productItem4}
                            zoomSrc={productItem4}
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <InnerImageZoom
                            zoomType="hover"
                            zoomScale={1.5}
                            src={productItem5}
                            zoomSrc={productItem5}
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <InnerImageZoom
                            zoomType="hover"
                            zoomScale={1.5}
                            src={productItem6}
                            zoomSrc={productItem6}
                        />
                    </SwiperSlide>
                </Swiper>
            </div>

        </div>
    );
};

export default ProductZoom;
