import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { IoCloseSharp } from "react-icons/io5";
import { FaRegSquarePlus, FaMinus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./style.css";
import CategoryCollapse from "../CategoryCollapse/index.jsx";

const CategoryPanel = ({ isOpenCatPanel, setIsOpenCatPanel }) => {

    const toggleDrawer = (open) => () => {
        setIsOpenCatPanel(open);
    };


    return (
        <Drawer
            anchor="left"
            open={isOpenCatPanel}
            onClose={toggleDrawer(false)}
        >
            <Box sx={{ width: 260 }} className="categoryPanel">

                {/* HEADER */}
                <h3 className="p-3 flex items-center justify-between text-[16px] font-[500]">
                    Shop By Categories
                    <IoCloseSharp
                        onClick={toggleDrawer(false)}
                        className="cursor-pointer text-[20px]"
                    />
                </h3>

                <Divider />

                <CategoryCollapse/>

            </Box>
        </Drawer>
    );
};

export default CategoryPanel;