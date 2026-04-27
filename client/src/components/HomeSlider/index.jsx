import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination, Autoplay } from 'swiper/modules';

import Banner1 from "../../assets/image/slideBanner1.jpg";
import Banner2 from "../../assets/image/slideBanner2.jpg";

const HomeSlider = () => {
    return (
        <div className="w-full h-[200px] md:h-[400px]">
            <Swiper
                spaceBetween={10}
                sliderPerview={1.2}
                centeredSlides={true}
                loop={true} // 🔥 important
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                }}
                pagination={{ dynamicBullets: true }}
                modules={[Pagination, Autoplay]}
            >
                <SwiperSlide>
                    <img src={Banner1} className="w-full h-full object-cover" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={Banner2} className="w-full h-full object-cover" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={Banner1} className="w-full h-full object-cover" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={Banner2} className="w-full h-full object-cover" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default HomeSlider;



// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
//
// // styles
// import "swiper/css";
// import "swiper/css/pagination";
//
// // modules
// import { Pagination, Autoplay } from "swiper/modules";
//
// // images (নিজের path ঠিক রাখবা)
// import Banner1 from "../../assets/image/slideBanner1.jpg";
// import Banner2 from "../../assets/image/slideBanner2.jpg";
//
// const HomeSlider = () => {
//     return (
//         // 🔥 VERY IMPORTANT: overflow-visible
//         <div className="w-full h-[220px] md:h-[400px] px-4 overflow-visible">
//
//             <Swiper
//                 slidesPerView={1.2}          // 👈 side show করবে
//                 centeredSlides={true}        // 👈 center focus
//                 spaceBetween={20}            // 👈 gap
//                 loop={true}
//                 autoplay={{
//                     delay: 2000,
//                     disableOnInteraction: false,
//                 }}
//                 pagination={{ clickable: true }}
//                 modules={[Pagination, Autoplay]}
//                 className="!overflow-visible"
//
//                 // responsive
//                 breakpoints={{
//                     640: {
//                         slidesPerView: 1.2,
//                     },
//                     768: {
//                         slidesPerView: 1.5,
//                     },
//                     1024: {
//                         slidesPerView: 2,
//                     },
//                 }}
//             >
//
//                 {/* Slide 1 */}
//                 <SwiperSlide>
//                     <div className="h-full">
//                         <img
//                             src={Banner1}
//                             alt="banner1"
//                             className="w-full h-full object-cover rounded-2xl"
//                         />
//                     </div>
//                 </SwiperSlide>
//
//                 {/* Slide 2 */}
//                 <SwiperSlide>
//                     <div className="h-full">
//                         <img
//                             src={Banner2}
//                             alt="banner2"
//                             className="w-full h-full object-cover rounded-2xl"
//                         />
//                     </div>
//                 </SwiperSlide>
//
//                 {/* Slide 3 */}
//                 <SwiperSlide>
//                     <div className="h-full">
//                         <img
//                             src={Banner1}
//                             alt="banner3"
//                             className="w-full h-full object-cover rounded-2xl"
//                         />
//                     </div>
//                 </SwiperSlide>
//
//                 {/* Slide 4 */}
//                 <SwiperSlide>
//                     <div className="h-full">
//                         <img
//                             src={Banner2}
//                             alt="banner4"
//                             className="w-full h-full object-cover rounded-2xl"
//                         />
//                     </div>
//                 </SwiperSlide>
//
//             </Swiper>
//         </div>
//     );
// };
//
// export default HomeSlider;