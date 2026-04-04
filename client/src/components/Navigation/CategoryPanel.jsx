import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { IoCloseSharp } from "react-icons/io5";
import { FaRegSquarePlus, FaMinus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./style.css";

const CategoryPanel = ({ isOpenCatPanel, setIsOpenCatPanel }) => {

    const [submenuIndex, setSubmenuIndex] = React.useState(null);
    const [innerSubmenuIndex, setInnerSubmenuIndex] = React.useState(null);

    const toggleDrawer = (open) => () => {
        setIsOpenCatPanel(open);
    };

    const openSubmenu = (index) => {
        setSubmenuIndex(prev => (prev === index ? null : index));
        setInnerSubmenuIndex(null); // reset inner
    };

    const openInnerSubmenu = (index) => {
        setInnerSubmenuIndex(prev => (prev === index ? null : index));
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

                <div className="scroll">
                    <ul>

                        {/* MAIN CATEGORY */}
                        <li className="list-none">

                            <div className="flex items-center justify-between px-3">
                                <Link to="/" className="w-full">
                                    <Button className="!justify-start w-full !text-[rgba(0,0,0,0.8)]">
                                        Fashion
                                    </Button>
                                </Link>

                                {submenuIndex === 0 ? (
                                    <FaMinus
                                        className="cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openSubmenu(0);
                                        }}
                                    />
                                ) : (
                                    <FaRegSquarePlus
                                        className="cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openSubmenu(0);
                                        }}
                                    />
                                )}
                            </div>

                            {/* SUBMENU */}
                            {submenuIndex === 0 && (
                                <ul className="pl-4 mt-1">

                                    <li className="list-none">

                                        <div className="flex items-center justify-between px-2">
                                            <Link to="/" className="w-full">
                                                <Button className="!justify-start !w-full !text-[rgba(0,0,0,0.8)]">
                                                    Apparel
                                                </Button>
                                            </Link>

                                            {innerSubmenuIndex === 0 ? (
                                                <FaMinus
                                                    className="cursor-pointer"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        openInnerSubmenu(0);
                                                    }}
                                                />
                                            ) : (
                                                <FaRegSquarePlus
                                                    className="cursor-pointer"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        openInnerSubmenu(0);
                                                    }}
                                                />
                                            )}
                                        </div>

                                        {/* INNER SUBMENU */}
                                        {innerSubmenuIndex === 0 && (
                                            <ul className="pl-6 mt-1">
                                                <li className="mb-2">
                                                    <Link to="/" className="link text-[14px] block px-3">
                                                        Smart Tablet
                                                    </Link>
                                                </li>
                                                <li className="mb-2">
                                                    <Link to="/" className="link text-[14px] block px-3">
                                                        Crepe T-Shirt
                                                    </Link>
                                                </li>
                                                <li className="mb-2">
                                                    <Link to="/" className="link text-[14px] block px-3">
                                                        Leather Watch
                                                    </Link>
                                                </li>
                                                <li className="mb-2">
                                                    <Link to="/" className="link text-[14px] block px-3">
                                                        Rolling Diamond
                                                    </Link>
                                                </li>
                                            </ul>
                                        )}

                                    </li>

                                </ul>
                            )}

                        </li>


                        <li className="list-none">

                            <div className="flex items-center justify-between px-3">
                                <Link to="/" className="w-full">
                                    <Button className="!justify-start w-full !text-[rgba(0,0,0,0.8)]">
                                        Outwear
                                    </Button>
                                </Link>

                                {submenuIndex === 1 ? (
                                    <FaMinus
                                        className="cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openSubmenu(1);
                                        }}
                                    />
                                ) : (
                                    <FaRegSquarePlus
                                        className="cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openSubmenu(1);
                                        }}
                                    />
                                )}
                            </div>

                            {/* SUBMENU */}
                            {submenuIndex === 1 && (
                                <ul className="pl-4 mt-1">

                                    <li className="list-none">

                                        <div className="flex items-center justify-between px-2">
                                            <Link to="/" className="w-full">
                                                <Button className="!justify-start w-full text-[rgba(0,0,0,0.8)]">
                                                    Apparel
                                                </Button>
                                            </Link>

                                            {innerSubmenuIndex === 1 ? (
                                                <FaMinus
                                                    className="cursor-pointer"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        openInnerSubmenu(1);
                                                    }}
                                                />
                                            ) : (
                                                <FaRegSquarePlus
                                                    className="cursor-pointer"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        openInnerSubmenu(1);
                                                    }}
                                                />
                                            )}
                                        </div>


                                        {/* INNER SUBMENU */}
                                        {innerSubmenuIndex === 1 && (
                                            <ul className="pl-6 mt-1">
                                                <li className="mb-2">
                                                    <Link to="/" className="link text-[14px] block px-3">
                                                        Smart Tablet
                                                    </Link>
                                                </li>
                                                <li className="mb-2">
                                                    <Link to="/" className="link text-[14px] block px-3">
                                                        Crepe T-Shirt
                                                    </Link>
                                                </li>
                                                <li className="mb-2">
                                                    <Link to="/" className="link text-[14px] block px-3">
                                                        Leather Watch
                                                    </Link>
                                                </li>
                                                <li className="mb-2">
                                                    <Link to="/" className="link text-[14px] block px-3">
                                                        Rolling Diamond
                                                    </Link>
                                                </li>
                                            </ul>
                                        )}

                                    </li>

                                </ul>
                            )}

                        </li>





                    </ul>
                </div>

            </Box>
        </Drawer>
    );
};

export default CategoryPanel;