import React from 'react';

import {Button} from "@mui/material";
import {BsFillBagCheckFill} from "react-icons/bs";
import CartItems from "./CartItem.jsx";



const CartPage = () => {


    return (
        <section className="container py-5">
            <div className="container w-[80%] max-w-[80%] flex gap-5">
                <div className="leftPanel w-[70%] ">
                    <div className="shadow-md rounded-md p-5 bg-white">
                        <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
                            <h2 >Your Cart</h2>
                            <p className="mt-0"> There are <span className="font-bold text-primary"> 2 </span>{" "} products</p>

                             <CartItems size="l" quantity={5}/>
                            <CartItems size="xl" quantity={2}/>
                            <CartItems size="s" quantity={1}/>



                        </div>


                    </div>
                </div>

                <div className="rightPanel w-[30%] ">
                    <div className="shadow-md rounded-md bg-white p-5">
                        <h3 className="pb-3">Cart Total</h3>
                        <h4/>

                        <p className="flex items-center justify-items-center">
                            <span className="text-[14px] font-[500] ">Subtotal</span>
                            <span className="text-primary font-bold">$12300</span>
                        </p>

                        <p className="flex items-center justify-between">
                            <span className="text-[14px] font-[500]"> Shipping</span>
                            <span className="font-bold">Free</span>
                        </p>

                        <p className="flex items-center justify-between">
                            <span className="text-[14px] font-[500]"> Estimate for</span>
                            <span className="font-bold">Dhaka</span>

                        </p>

                        <p className="flex items-center justify-between">
                            <span className="text-[14px] font-[500]"> Total </span>
                            <span className=" text-primary font-bold">$12300</span>
                        </p>

                        <Button className="btn-org btn-lg w-full flex gap-2 ">
                           <BsFillBagCheckFill className="text-[20px]"/> Checkout
                        </Button>

                    </div>
                </div>

            </div>

        </section>
    );
};

export default CartPage;