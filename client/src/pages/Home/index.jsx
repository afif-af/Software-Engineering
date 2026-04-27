import React from 'react';
import HomeSlider from "../../components/HomeSlider/index.jsx";
import HomeCatSlider from "../../components/CatSlider/index.jsx";
import {LiaShippingFastSolid} from "react-icons/lia";
import AdsBannerSlider from "../../components/AdsBannerSlider/index.jsx";

import Tabs from '@mui/material/Tabs'
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./style.css"
import ProductSlider from "../../components/ProductSlider/index.jsx";

const Home = () => {
    const [value, setValue] = React.useState(0);
    const handleChange=(event, newValue)=>
    {
        setValue(newValue);
    };




    return (
        <div>
            <HomeSlider/>
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

                <ProductSlider items={5}/>

            </section>

            <section className="py-16 bg-white ">
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

                   <AdsBannerSlider items={4}/>

               </div>
            </section>


            <br/> <br/><br/> <br/><br/> <br/><br/> <br/><br/> <br/>



        </div>
    );
};

export default Home;