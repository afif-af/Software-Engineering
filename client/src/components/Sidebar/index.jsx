import React, {useState} from 'react';

import "./style.css"
import CategoryCollapse from "../CategoryCollapse/index.jsx";
import {Button, FormControlLabel} from "@mui/material";
import {CheckBox} from "@mui/icons-material";
import {Collapse} from "react-collapse";
import {FaAngleDown, FaAngleUp} from "react-icons/fa6";


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
                             <FormControlLabel control={ <CheckBox/>}
                                               label="Fashion"
                                               className="w-full"
                                               size="small"/>
                             <FormControlLabel control={ <CheckBox/>}
                                               label="Electronics"
                                               className="w-full"
                                               size="small"/>
                             <FormControlLabel control={ <CheckBox/>}
                                               label="Bags"
                                               className="w-full"
                                               size="small"/>

                             <FormControlLabel control={ <CheckBox/>}
                                               label="Footwear"
                                               className="w-full"
                                               size="small"/>

                             <FormControlLabel control={ <CheckBox/>}
                                               label="Groceries"
                                               className="w-full"
                                               size="small"/>

                             <FormControlLabel control={ <CheckBox/>} label="Beauty" className="w-full" size="small"/>
                             <FormControlLabel control={ <CheckBox/>} label="Wellness" className="w-full" size="small"/>
                             <FormControlLabel control={ <CheckBox/>} label="Jewellery" className="w-full" size="small"/>

                        </div>
                    </Collapse>
            </div>
            <div className="box">
                <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">Availability</h3>
                <Button className=" text-black !w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto"
                        onClick={() => setIsOpenAvailFilter(!isOpenCategoryFilter)}>
                    {
                        isOpenAvailFilter ===true ? <FaAngleUp/> : <FaAngleDown/>
                    }

                </Button>
                <Collapse isOpened={isOpenAvailFilter}>

                    <div className="scroll px-4 relative -left-[13px]">
                        <FormControlLabel control={ <CheckBox/>}
                                          label="Available (17)"
                                          className="w-full"
                                          size="small"/>
                        <FormControlLabel control={ <CheckBox/>}
                                          label="In stock (7)"
                                          className="w-full"
                                          size="small"/>
                        <FormControlLabel control={ <CheckBox/>}
                                          label="Not Available (1)"
                                          className="w-full"
                                          size="small"/>



                    </div>
                </Collapse>
            </div>


            <div className="box">
                <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">Availability</h3>
                <Button className=" text-black !w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto"
                        onClick={() => setIsOpenSizeFilter(!isOpenCategoryFilter)}>
                    {
                        isOpenSizeFilter ===true ? <FaAngleUp/> : <FaAngleDown/>
                    }

                </Button>
                <Collapse isOpened={isOpenSizeFilter}>

                    <div className="scroll px-4 relative -left-[13px]">
                        <FormControlLabel control={ <CheckBox/>}
                                          label="Available (17)"
                                          className="w-full"
                                          size="small"/>
                        <FormControlLabel control={ <CheckBox/>}
                                          label="In stock (7)"
                                          className="w-full"
                                          size="small"/>
                        <FormControlLabel control={ <CheckBox/>}
                                          label="Not Available (1)"
                                          className="w-full"
                                          size="small"/>



                    </div>
                </Collapse>
            </div>



        </aside>
    );
};

export default Sidebar;