import React from 'react';
import {Button} from "@mui/material";
import { RiMenu2Fill } from "react-icons/ri";
import {LiaAngleDownSolid} from "react-icons/lia";
import {Link} from "react-router-dom";

const Navigation = () => {
    return (
        <nav className="py-2 ">
            <div className="container flex item-center justify-end gap-5">
                <div className="col_1 w-[20%]">
                    <Button className="!text-black gap-2 w-full ">
                        <RiMenu2Fill className="text-[18px]"/>
                        Shop By Categories
                        <LiaAngleDownSolid className="text-[13px]"/>
                    </Button>
                </div>

                <div className="col_2 w-[80%] pl-5" >
                    <ul className="flex items-center">
                        <li className="list-none">
                            <Link to="/" className="link transition ">Home</Link>

                        </li>
                        <li className="list-none">

                        </li>
                        <li className="list-none">

                        </li>
                        <li className="list-none">

                        </li>



                    </ul>

                </div>

            </div>
        </nav>
    );
};

export default Navigation;