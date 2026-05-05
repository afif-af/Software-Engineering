import React, {useState} from 'react';

import "./style.css"
import CategoryCollapse from "../CategoryCollapse/index.jsx";
import {Button, FormControlLabel} from "@mui/material";
import {CheckBox} from "@mui/icons-material";
import {Collapse} from "react-collapse";
import {FaAngleDown} from "react-icons/fa6";


const Sidebar = () => {

    const [isOpenCategoryFilter, setIsOpenCategoryFilter] =useState(true);

    return (
        <aside className="sidebar py-5">
            <div className="box">
                <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">Shop by category</h3>
                    <Button className=" text-black !w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto" onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}>
                        <FaAngleDown/>
                    </Button>
                    <Collapse isOpened={isOpenCategoryFilter}>

                        <div className="scroll px-3 relative -left-[10px]">
                             <FormControlLabel control={ <CheckBox/>} label="Fashion" className="w-full" size="small"/>
                             <FormControlLabel control={ <CheckBox/>} label="Electronics" className="w-full" size="small"/>
                             <FormControlLabel control={ <CheckBox/>} label="Bags" className="w-full" size="small"/>

                             <FormControlLabel control={ <CheckBox/>} label="Footwear" className="w-full" size="small"/>

                             <FormControlLabel control={ <CheckBox/>} label="Groceries" className="w-full" size="small"/>

                             <FormControlLabel control={ <CheckBox/>} label="Beauty" className="w-full" size="small"/>
                             <FormControlLabel control={ <CheckBox/>} label="Wellness" className="w-full" size="small"/>
                             <FormControlLabel control={ <CheckBox/>} label="Jewellery" className="w-full" size="small"/>

                        </div>
                    </Collapse>
            </div>
        </aside>
    );
};

export default Sidebar;