import React from 'react';
import HomeSlider from "../../components/HomeSlider/index.jsx";
import HomeCatSlider from "../../components/CatSlider/index.jsx";
import {LiaShippingFastSolid} from "react-icons/lia";
import AdsBannerSlider from "../../components/AdsBannerSlider/index.jsx";

import Tabs from '@mui/material/Tabs'
import Tab from "@mui/material/Tab";
import "./style.css"
import ProductSlider from "../../components/ProductSlider/index.jsx";
import Chatbot from "../../components/Chatbot/index.jsx";


import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation"
import BlogItem from "../../components/BlogItem/index.jsx";
import Footer from "../../components/Footer/index.jsx";
import HomeBannerV2 from "../../components/HomeSliderV2/index.jsx";
import BannerBoxv2 from "../../components/BannerBoxv2/index.jsx";

import Banner1 from "../../assets/image/banner2.jpg";
import Banner2 from "../../assets/image/banner1.jpg";
import AdsBannerSliderV2 from "../../components/AdsBannerSliderV2/index.jsx";

const Home = () => {
    const [value, setValue] = React.useState(0);
    const handleChange=(event, newValue)=>
    {
        setValue(newValue);
    };


    return (
        <div>
            {/*<HomeSlider/>*/}
            <section className="py-5">
                <div className="container flex gap-3 ">
                    <div className="part1 w-[70%]">
                        <HomeBannerV2/>
                    </div>

                    <div className="part2 w-[30%] flex items-center  gap-5 justify-between flex-col">
                        <BannerBoxv2 info="left" image={Banner1}/>
                        <BannerBoxv2 info="right" image={Banner2}/>
                    </div>
                </div>
            </section>

            <HomeCatSlider/>


            <section className="bg-white py-8">
                <div className="container">
                    <div className="flex items-center justify-between">
                        <div className="leftSec ">
                            <h3 className="text-[22px]m font-[600]">Populer Products</h3>
                            <p className="text-[15px] font-[500]">Do not miss the current offers until the end of March.</p>



                        </div>

                        <div className="rightSec w-[60%] ">
                              <Tabs
                                  value={value}
                                  onChange={handleChange}
                                  variant="srcollable"
                                  scrollButtons="auto"
                                  aria-label="scrollable auto tabs example"

                              >
                                    <Tab label="Fashion" />
                                    <Tab label="Electronics" />
                                    <Tab label="Bags" />
                                    <Tab label="Footware" />
                                    <Tab label="Groceries" />
                                    <Tab label="Beauty" />
                                    <Tab label="Wellness" />
                                    <Tab label="Jewellery" />

                              </Tabs>


                        </div>
                    </div>
                </div>

                <ProductSlider items={6}/>

            </section>

            <section className="py-4 pt-2  bg-white ">
               <div className="container">
                   <div className="freeShipping w-[80%] m-auto p-4 !border-2 !border-[#ff5252]
                   flex items-center justify-between rounded-md mb-7">
                     <div className="coll flex items-center ">
                         <LiaShippingFastSolid className="text-[50px]" />
                         <span className="text-[20px] font-[600] ">FREE SHIPPING</span>

                     </div>

                       <div className="col2">
                           <p className="mb-0 font-[500]"> Free Delivery Now on Your First Order and over $200</p>
                       </div>

                       <p className="font-bold text-[25px]">-Only $200</p>

                   </div>

                   <AdsBannerSliderV2 items={4}/>

               </div>
            </section>

            <section className="py-5 bg-white ">
                <div className="container">
                    <h2 className="text-[20px] font-[600]">Latest Products</h2>

                    <ProductSlider items={6}/>

                    <AdsBannerSlider items={4}/>

                </div>
            </section>

            <section className="py-5 bg-white ">
                <div className="container">
                    <h2 className="text-[20px] font-[600]">Featured Products</h2>

                    <ProductSlider items={6}/>
                    <AdsBannerSlider items={3}/>

                </div>
            </section>








            <section className="py-5 pt-0 pb-8  bg-white blogSection">
                <h2 className="text-[20px] font-[600] mb-4">From The Blogs</h2>
                <div className="py-5">
                    <Swiper slidesPerView={3}
                            spaceBetween={20}
                            navigation={true}
                            modules={[Navigation]}
                            className="blogSlider">

                        <SwiperSlide>
                            <BlogItem/>
                        </SwiperSlide>

                        <SwiperSlide>
                            <BlogItem/>
                        </SwiperSlide>

                        <SwiperSlide>
                        <BlogItem/>
                    </SwiperSlide>

                        <SwiperSlide>
                        <BlogItem/>
                    </SwiperSlide>

                    </Swiper>

                </div>

            </section>


            <Chatbot />

        </div>
    );
};

export default Home;