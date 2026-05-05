import React from 'react';
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import {FaMinus, FaRegSquarePlus} from "react-icons/fa6";

const CategoryCollapse = () => {
    const [submenuIndex, setSubmenuIndex] = React.useState(null);
    const [innerSubmenuIndex, setInnerSubmenuIndex] = React.useState(null);

    const openSubmenu = (index) => {
        setSubmenuIndex(prev => (prev === index ? null : index));
        setInnerSubmenuIndex(null); // reset inner
    };

    const openInnerSubmenu = (index) => {
        setInnerSubmenuIndex(prev => (prev === index ? null : index));
    };

    return (
        <>
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

        </>
    );
};

export default CategoryCollapse;