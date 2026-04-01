import React from 'react';
import {Button} from "@mui/material";
import { RiMenu2Fill } from "react-icons/ri";
import {LiaAngleDownSolid} from "react-icons/lia";
import {Link} from "react-router-dom";
import {GoRocket} from "react-icons/go";
import CategoryPanel from "./CategoryPanel.jsx";


const Navigation = () => {

    const [isOpenCatPanel, setIsOpenCatPanel] = React.useState(false);

    const openCategoryPanel = () => {
        setIsOpenCatPanel(true);
    }

    return (
        <>
            <nav className="py-2 ">
                <div className="container flex item-center justify-end gap-8">
                    <div className="col_1 w-[20%]">
                        <Button className="!text-black gap-2 w-full
                         " onClick={openCategoryPanel}>
                            <RiMenu2Fill className="text-[18px]"/>
                            Shop By Categories
                            <LiaAngleDownSolid className="text-[13px]"/>
                        </Button>
                    </div>

                    <div className="col_2 w-[60%] pl-5" >
                        <ul className="flex items-center gap-3">
                            <li className="list-none">
                                <Link to="/" className="link transition text-[16px] font-[500] ">
                                    <Button className="!link transition !text-black font-[500]
                                      hover:!text-[#ff5252]">
                                        Home
                                    </Button>
                                </Link>

                            </li>
                            <li className="list-none">
                                <Link to="/" className="link transition text-[16px] font-[500] ">
                                    <Button className="!link transition !text-black font-[500]
                                      hover:!text-[#ff5252]">
                                        Fashion
                                    </Button>
                                </Link>

                            </li>
                            <li className="list-none">
                                <Link to="/" className="link transition text-[16px] font-[500] ">
                                    <Button className="!link transition !text-black font-[500]
                                      hover:!text-[#ff5252]">
                                        Electronics
                                    </Button>
                                </Link>

                            </li>

                            <li className="list-none">
                                <Link to="/" className="link transition text-[16px] font-[500] ">
                                    <Button className="!link transition !text-black font-[500]
                                      hover:!text-[#ff5252]">
                                        Bags
                                    </Button>
                                </Link>

                            </li>
                            <li className="list-none">
                                <Link to="/" className="link transition text-[16px] font-[500] ">
                                    <Button className="!link transition !text-black font-[500]
                                      hover:!text-[#ff5252]">
                                        Footware
                                    </Button>
                                </Link>

                            </li>
                            <li className="list-none">
                                <Link to="/" className="link transition text-[16px] font-[500] ">
                                    <Button className="!link transition !text-black font-[500]
                                      hover:!text-[#ff5252]">
                                        Groceries
                                    </Button>
                                </Link>

                            </li>
                            <li className="list-none">
                                <Link to="/" className="link transition text-[16px] font-[500] ">
                                    <Button className="!link transition !text-black font-[500]
                                      hover:!text-[#ff5252]">
                                        Beauty
                                    </Button>
                                </Link>

                            </li>
                            <li className="list-none">
                                <Link to="/" className="link transition text-[16px] font-[500] ">
                                    <Button className="!link transition !text-black font-[500]
                                      hover:!text-[#ff5252]">
                                        Jewellery
                                    </Button>
                                </Link>

                            </li>

                        </ul>

                    </div>

                    <div className="col_3 w-[20%]">
                      <p className="text-[13px] font-[500] flex items-center gap-3 mb-0 mt-0">
                          <GoRocket className="text-[18px] "/>
                          Free International Delivery</p>
                    </div>

                </div>
            </nav>
            {/* Category panel*/}
            <CategoryPanel isOpenCatPanel={isOpenCatPanel}
                           setIsOpenCatPanel={setIsOpenCatPanel}/>
        </>
    );
};

export default Navigation;