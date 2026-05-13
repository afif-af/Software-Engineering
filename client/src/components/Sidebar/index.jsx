import React, {useState} from 'react';

import "./style.css"
import CategoryCollapse from "../CategoryCollapse/index.jsx";
import {Button, FormControlLabel, Rating, Checkbox} from "@mui/material";

import {Collapse} from "react-collapse";
import {FaAngleDown, FaAngleUp} from "react-icons/fa6";
import RangeSlider from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css'





const Sidebar = () => {

    const [isOpenCategoryFilter, setIsOpenCategoryFilter] =useState(true);
    const [isOpenAvailFilter, setIsOpenAvailFilter] =useState(true)
    const [isOpenSizeFilter, setIsOpenSizeFilter] =useState(true)


    return (
        <aside className="sidebar py-5">
            <div className="box">
                <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">Shop by category</h3>
                    <Button className=" text-black !w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto"
                            onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}>
                        {
                            isOpenCategoryFilter ===true ? <FaAngleUp/> : <FaAngleDown/>
                        }

                    </Button>
                    <Collapse isOpened={isOpenCategoryFilter}>

                        <div className="scroll px-4 relative -left-[13px]">
                             <FormControlLabel control={ <Checkbox/>}
                                               label="Fashion"
                                               className="w-full"
                                               size="small"/>
                             <FormControlLabel control={ <Checkbox/>}
                                               label="Electronics"
                                               className="w-full"
                                               size="small"/>
                             <FormControlLabel control={ <Checkbox/>}
                                               label="Bags"
                                               className="w-full"
                                               size="small"/>

                             <FormControlLabel control={ <Checkbox/>}
                                               label="Footwear"
                                               className="w-full"
                                               size="small"/>

                             <FormControlLabel control={ <Checkbox/>}
                                               label="Groceries"
                                               className="w-full"
                                               size="small"/>

                             <FormControlLabel control={ <Checkbox/>} label="Beauty" className="w-full" size="small"/>
                             <FormControlLabel control={ <Checkbox/>} label="Wellness" className="w-full" size="small"/>
                             <FormControlLabel control={ <Checkbox/>} label="Jewellery" className="w-full" size="small"/>

                        </div>
                    </Collapse>
            </div>
            <div className="box">
                <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">Availability</h3>
                <Button className=" text-black !w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto"
                        onClick={() => setIsOpenAvailFilter(!isOpenAvailFilter)}>
                    {
                        isOpenAvailFilter ===true ? <FaAngleUp/> : <FaAngleDown/>
                    }

                </Button>
                <Collapse isOpened={isOpenAvailFilter}>

                    <div className="scroll px-4 relative -left-[13px]">
                        <FormControlLabel control={ <Checkbox/>}
                                          label="Available (17)"
                                          className="w-full"
                                          size="small"/>
                        <FormControlLabel control={ <Checkbox/>}
                                          label="In stock (7)"
                                          className="w-full"
                                          size="small"/>
                        <FormControlLabel control={ <Checkbox/>}
                                          label="Not Available (1)"
                                          className="w-full"
                                          size="small"/>



                    </div>
                </Collapse>
            </div>


            <div className="box">
                <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">Size</h3>
                <Button className=" text-black !w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto"
                        onClick={() => setIsOpenSizeFilter(!isOpenSizeFilter)}>
                    {
                        isOpenSizeFilter ===true ? <FaAngleUp/> : <FaAngleDown/>
                    }

                </Button>
                <Collapse isOpened={isOpenSizeFilter}>

                    <div className="scroll px-4 relative -left-[13px]">
                        <FormControlLabel control={ <Checkbox/>}
                                          label="Small"
                                          className="w-full"
                                          size="small"/>
                        <FormControlLabel control={ <Checkbox/>}
                                          label="Medium"
                                          className="w-full"
                                          size="small"/>
                        <FormControlLabel control={ <Checkbox/>}
                                          label="Large"
                                          className="w-full"
                                          size="small"/>
                        <FormControlLabel control={ <Checkbox/>}
                                          label="XL"
                                          className="w-full"
                                          size="small"/>
                        <FormControlLabel control={ <Checkbox/>}
                                          label="XLL"
                                          className="w-full"
                                          size="small"/>



                    </div>
                </Collapse>
            </div>


            <div className="box mt-4 ">
                <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">
                    Price Range
                </h3>

                <RangeSlider />
                <div className="flex pt-4 pb-2 priceRnage">
                    <span className="text-[13px]">
                        From : <strong className="text-dark">Tk: {100}</strong>
                    </span>
                    <span className="ml-auto text-[13px]">
                        To: <strong className="text-dark">Tk: {10000}</strong>
                    </span>
                </div>

            </div>


            <div className="box mt-4 ">
                <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">
                    Filter By Rating
                </h3>

                <div className="w-full">
                    <Rating name="size-small" defaultValue={5} size="small" readOnly className="cursor-pointer"/>

                </div>

                <div className="w-full">
                    <Rating name="size-small" defaultValue={4} size="small" readOnly className="cursor-pointer"/>

                </div>
                <div className="w-full">
                    <Rating name="size-small" defaultValue={3} size="small" readOnly className="cursor-pointer"/>

                </div>
                <div className="w-full">
                    <Rating name="size-small" defaultValue={2} size="small" readOnly className="cursor-pointer"/>

                </div>
                <div className="w-full">
                    <Rating name="size-small" defaultValue={1} size="small" readOnly className="cursor-pointer"/>

                </div>

            </div>





        </aside>
    );
};

export default Sidebar;