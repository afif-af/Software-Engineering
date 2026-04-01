import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {IoCloseSharp} from "react-icons/io5";



const CategoryPanel = ({ isOpenCatPanel, setIsOpenCatPanel }) => {

    const toggleDrawer = (open) => () => {
        setIsOpenCatPanel(open);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation"  onClick={toggleDrawer(false)}
             onKeyDown={toggleDrawer(false)}>

            <h3 className="p-3 text=[16px] font-[500] flex items-center justify-between">
                Shop By Categories
                <IoCloseSharp onClick={toggleDrawer(false)} className="cursor-pointer text-[20px]" />
            </h3>
            <Divider />



        </Box>
    );


    return (
        <div>

            <Drawer
                anchor="left"
                open={isOpenCatPanel}
                onClose={toggleDrawer(false)}
            >
                {DrawerList}
            </Drawer>
        </div>
    );
};

export default CategoryPanel;