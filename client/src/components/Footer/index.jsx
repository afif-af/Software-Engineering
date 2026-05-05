import React from 'react';
import {
    LiaGiftSolid,
    LiaShippingFastSolid
} from "react-icons/lia";
import { PiKeyReturnLight } from "react-icons/pi";
import { BsWallet2 } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { Link } from "react-router-dom";
import { IoChatboxOutline } from "react-icons/io5";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import './style.css';
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";

const Footer = () => {
    return (
        <>
            <footer className="py-6 bg-[#fafafa] border border-cyan-950">
                <div className="container">

                    <div className="flex items-center justify-center gap-5 py-8 pb-8">
                        <div className="col flex items-center justify-center flex-col group w-[15%]">
                            <LiaShippingFastSolid className="text-[40px] group-hover:text-primary transition-all duration-300 group-hover:-translate-y-1" />
                            <h3 className="text-[16px] font-[600] mt-3">Free Shipping</h3>
                            <p className="text-[12px] font-[500]">For all Orders Over $100</p>
                        </div>

                        <div className="col flex items-center justify-center flex-col group w-[15%]">
                            <PiKeyReturnLight className="text-[40px] group-hover:text-primary transition-all duration-300 group-hover:-translate-y-1" />
                            <h3 className="text-[16px] font-[600] mt-3">30 Days Returns</h3>
                            <p className="text-[12px] font-[500]">For all Exchange Product</p>
                        </div>

                        <div className="col flex items-center justify-center flex-col group w-[15%]">
                            <BsWallet2 className="text-[40px] group-hover:text-primary transition-all duration-300 group-hover:-translate-y-1" />
                            <h3 className="text-[16px] font-[600] mt-3">Secured Payment</h3>
                            <p className="text-[12px] font-[500]">Payment Cards Accepted</p>
                        </div>

                        <div className="col flex items-center justify-center flex-col group w-[15%]">
                            <LiaGiftSolid className="text-[40px] group-hover:text-primary transition-all duration-300 group-hover:-translate-y-1" />
                            <h3 className="text-[16px] font-[600] mt-3">Special Gifts</h3>
                            <p className="text-[12px] font-[500]">Our First Product Order</p>
                        </div>

                        <div className="col flex items-center justify-center flex-col group w-[15%]">
                            <BiSupport className="text-[40px] group-hover:text-primary transition-all duration-300 group-hover:-translate-y-1" />
                            <h3 className="text-[16px] font-[600] mt-3">Support 24/7</h3>
                            <p className="text-[12px] font-[500]">Contact us Anytime</p>
                        </div>
                    </div>

                    <hr />

                    <div className="footer flex py-8">

                        <div className="part1 w-[25%] border-r border-[rgba(0,0,0,0.2)]">
                            <h2 className="text-[18px] font-[600] mb-4">
                                Contact Us
                            </h2>

                            <p className="text-[13px] font-[400] pb-4">
                                Classyshop - Mega Super Store
                                <br />
                                507-Union Trade Center France
                            </p>

                            <Link className="link" to="mailto:someone@example.com">
                                sales@company.com
                            </Link>

                            <span className="text-[22px] font-[600] block w-full mt-3 text-primary">
                (+88)01600000000
              </span>

                            <div className="flex items-center gap-2 mt-4">
                                <IoChatboxOutline className="text-[40px] text-primary" />
                                <span className="text-[16px] font-[600]">
                  Online Chat <br />
                  Get Expert Help
                </span>
                            </div>
                        </div>

                        <div className="part2 w-[40%] flex pl-8">

                            <div className="part2_col1 w-[50%]">
                                <h2 className="text-[20px] font-[600] mb-4">Products</h2>

                                <ul className="list">
                                    <li className="mb-1">
                                        <Link className="link text-[14px] block" to="/">Price drop</Link>
                                    </li>
                                    <li className="mb-1">
                                        <Link className="link text-[14px] block" to="/">New Products</Link>
                                    </li>
                                    <li className="mb-1">
                                        <Link className="link text-[14px] block" to="/">Best Sales</Link>
                                    </li>
                                    <li className="mb-1">
                                        <Link className="link text-[14px] block" to="/">Contact Us</Link>
                                    </li>
                                    <li className="mb-1">
                                        <Link className="link text-[14px] block" to="/">Sitemap</Link>
                                    </li>
                                    <li className="mb-1">
                                        <Link className="link text-[14px] block" to="/">Stores</Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="part2_col1 w-[50%]">
                                <h2 className="text-[18px] font-[600] mb-4">Our Company</h2>

                                <ul className="list">
                                    <li className="mb-1">
                                        <Link className="link text-[14px] block" to="/">Delivery</Link>
                                    </li>
                                    <li className="mb-1">
                                        <Link className="link text-[14px] block" to="/">Legal Notice</Link>
                                    </li>
                                    <li className="mb-1">
                                        <Link className="link text-[14px] block" to="/">Terms and Condition of use</Link>
                                    </li>
                                    <li className="mb-1">
                                        <Link className="link text-[14px] block" to="/">About Us</Link>
                                    </li>
                                    <li className="mb-1">
                                        <Link className="link text-[14px] block" to="/">Secure Payment</Link>
                                    </li>
                                    <li className="mb-1">
                                        <Link className="link text-[14px] block" to="/">Login</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="part3 w-[35%] pl-8">
                            <h2 className="text-[18px] font-[600] mb-4">
                                Subscribe to newsletter
                            </h2>

                            <p className="text-[13px]">
                                Subscribe to our latest newsletter to get news about special discounts
                            </p>

                            <form className="mt-5">
                                <input
                                    type="text"
                                    className="w-full focus:border-[rgba(0,0,0,0.1)] mb-4 h-[45px] border outline-none pl-4 pr-4 rounded-sm"
                                    placeholder="Your Email Address"
                                />

                                <Button className="btn-org">
                                    SUBSCRIBE
                                </Button>

                                <FormControlLabel
                                    control={<Checkbox defaultChecked />}
                                    label="I agree to the terms and conditions and the privacy policy"
                                />
                            </form>
                        </div>

                    </div>
                </div>
            </footer>

            <div className="bottomStrip border-t border-[rgba(0,0,0,0.2)] py-3 bg-white">
                <div className="container flex items-center justify-between">

                    <ul className="flex items-center gap-2">

                        <li className="list-none">
                            <Link
                                to="/"
                                target="_blank"
                                className="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.2)] flex items-center justify-center group hover:bg-primary transition-all"
                            >
                                <FaFacebookF className="text-[20px] group-hover:text-white" />
                            </Link>
                        </li>

                        <li className="list-none">
                            <Link
                                to="/"
                                target="_blank"
                                className="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.2)] flex items-center justify-center group hover:bg-primary transition-all"
                            >
                                <AiOutlineYoutube className="text-[20px] group-hover:text-white" />
                            </Link>
                        </li>

                        <li className="list-none">
                            <Link
                                to="/"
                                target="_blank"
                                className="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.2)] flex items-center justify-center group hover:bg-primary transition-all"
                            >
                                <FaPinterestP className="text-[20px] group-hover:text-white" />
                            </Link>
                        </li>

                        <li className="list-none">
                            <Link
                                to="/"
                                target="_blank"
                                className="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.2)] flex items-center justify-center group hover:bg-primary transition-all"
                            >
                                <FaInstagram className="text-[20px] group-hover:text-white" />
                            </Link>
                        </li>

                    </ul>

                    <p className="text-[13px] text-center mb-0">
                        @ 2024 - Ecommerce software by Alice Bob
                    </p>

                    <div className="flex items-center gap-2">
                        <img src="/" alt="image" />
                        <img src="/" alt="image" />
                        <img src="/" alt="image" />
                        <img src="/" alt="image" />
                        <img src="/" alt="image" />
                    </div>

                </div>
            </div>
        </>
    );
};

export default Footer;