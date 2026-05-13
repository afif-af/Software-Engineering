import React from 'react';
import Sidebar from "../../components/Sidebar/index.jsx";
import {Breadcrumbs, Typography, Link, Button} from "@mui/material";
import ProductItem from "../../components/ProductItem/index.jsx";
import {IoGridSharp} from "react-icons/io5";
import {LuMenu} from "react-icons/lu";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ProductItemListView from "../../components/ProductIItemListView/index.jsx";
import ProductItemListV from "../../components/ProductItem/ProductItemListV.jsx";
import Pagination from "@mui/material/Pagination";

const ProductListing = () => {

    const [itemView, setItemView] = React.useState('grid');

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <section className="py-5 pb-0">
            <div role="container " >
                <Breadcrumbs aria-label="breadcrumbs">

                    <Link underline="hover" color="inherit" href="/"
                        className="link transition">
                        Home
                    </Link>

                    <Link underline="hover"
                          color="inherit"
                          href="/material-ui/getting-started/installation/"
                          className="link">
                        Fashion
                    </Link>

                </Breadcrumbs>
            </div>

            <div className="bg-white py-2 mt-4">
                <div className="container flex gap-3">
                    <div className="sidebarWrapper w-[20%] h-full bg-white p-3">
                        <Sidebar />
                    </div>

                    <div className="rightContent w-[80%]  py-3  ">
                        <div className="bg-[#f1f1f1] p-2 w-full rounded-md mb-4  flex items-center justify-between">

                           <div className="col1 flex items-center gap-3 itemViewActions">
                               <Button

                                   className={"!w-[40px] !h-[40px] !min-w[40px] !rounded-full !text-[#000] " +
                                       ` ${itemView === 'list' && 'active'}`}
                               onClick={()=>setItemView('list')}
                               >

                                   <LuMenu/>
                               </Button>
                               <Button className={"!w-[40px] !h-[40px] !min-w[40px] !rounded-full !text-[#000] " +
                                   " ${itemView === 'grid' && 'active'} "

                               }

                                onClick={()=>setItemView('grid')}
                               >
                                   <IoGridSharp/>
                               </Button>


                               <span className="text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]">
                                   There are 27 products
                               </span>

                           </div>





                            <div className="col2 ml-auto flex items-center justify-end">
                            <span className="text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]"
                            >
                                Sort By
                            </span>

                                <Button
                                    id="demo-positioned-button"
                                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                    onClick={handleClick}
                                    className="!bg-white !text=[12px] !text-[#000] !capitalize !border-2 !border-[#000]"

                                >
                                    Sales, highest to lowest
                                </Button>

                                <Menu
                                    id="demo-positioned-menu"
                                    aria-labelledby="demo-positioned-button"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                >
                                    <MenuItem onClick={handleClose} className="!text=[13px] !text-[#000] !capitalize ">Sales, high to low</MenuItem>
                                    <MenuItem onClick={handleClose}  className="!text=[13px] !text-[#000] !capitalize ">Relavence</MenuItem>

                                    <MenuItem onClick={handleClose} className="!text=[13px] !text-[#000] !capitalize ">Name A to Z</MenuItem>
                                    <MenuItem onClick={handleClose} className="!text=[13px] !text-[#000] !capitalize ">Name Z to A</MenuItem>
                                    <MenuItem onClick={handleClose} className="!text=[13px] !text-[#000] !capitalize ">Price: High To Low</MenuItem>
                                    <MenuItem onClick={handleClose} className="!text=[13px] !text-[#000] !capitalize ">Price: low To High</MenuItem>
                                </Menu>

                            </div>


                        </div>




                        <div
                            className={`grid ${
                                itemView === 'grid'
                                    ? 'grid-cols-4 md:grid-cols-4'
                                    : 'grid-cols-1 md:grid-cols-1'
                            } gap-4`}
                        >

                            {
                                itemView === 'grid' ?
                                    <>
                                        <ProductItem/>
                                        <ProductItem/>
                                        <ProductItem/>
                                        <ProductItem/>
                                        <ProductItem/>
                                        <ProductItem/>
                                        <ProductItem/>
                                        <ProductItem/>


                                    </>
                                    :
                                    <>
                                        <ProductItemListV/>
                                        <ProductItemListV/>
                                        <ProductItemListV/>
                                        <ProductItemListV/>
                                        <ProductItemListV/>
                                        <ProductItemListV/>

                                    </>


                            }

                        </div>


                        <div className="flex items-center justify-center mt-10">
                            <Pagination count={10} showFirstButton showLastButton />
                        </div>



                    </div>



                </div>
            </div>
        </section>
    );
};

export default ProductListing;