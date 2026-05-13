import React, {useState} from 'react';
import {Breadcrumbs, Button, Rating, TextField} from "@mui/material";
import {Link} from "react-router-dom";
import ProductZoom from "../../components/ProductZoom/index.jsx";
import img from "../../assets/saree2.webp"

import ProductDetailsComponents from "../../components/ProductDetails/index.jsx";
import ProductsSlider from "../../components/ProductSlider/index.jsx";





const ProductDetails = () => {
    const [activeTab, setActiveTab] = useState(0)


    return (
        <>
            <div className="py-5 pb-0">
                <div className="container">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover"
                              color="inherit"
                              to="/"
                              className="link transition !text-[14px]"
                              >
                            Home
                        </Link>

                        <Link underline="hover"
                              color="inherit"
                              to="/"
                              className="link transition !text-[14px]"
                        >
                            Fashion
                        </Link>

                        <Link underline="hover"
                              color="inherit"
                              to="/"
                              className="link transition !text-[14px]"
                        >
                            Cropend Stain Bomber Jacket
                        </Link>

                    </Breadcrumbs>
                </div>
            </div>

            <section className="bg-white py-5">
                <div className="container flex gap-8 items-start">

                    <div className="productZoomContainer w-[40%] h-[520px] shrink-0">
                        <ProductZoom />
                    </div>

                    <div className="productContent w-[60%] pr-10 pl-10">
                        <ProductDetailsComponents />
                    </div>

                </div>

                <div className="container pt-10">
                    <div className="flex items-center gap-8 mb-5">
                        <span
                            className={`link text-[17px] cursor-pointer font-[500] ${
                                activeTab === 0 ? "text-primary" : ""
                            }`}
                            onClick={() => setActiveTab(0)}
                        >
                            Description
                        </span>

                        <span
                            className={`link text-[17px] cursor-pointer font-[500] ${
                                activeTab === 1 ? "text-primary" : ""
                            }`}
                            onClick={() => setActiveTab(1)}
                        >
                        Product Details
                    </span>

                        <span
                            className={`link text-[17px] cursor-pointer font-[500] ${
                                activeTab === 2 ? "text-primary" : ""
                            }`}
                            onClick={() => setActiveTab(2)}
                        >
                        Reviews (5)
                    </span>

                    </div>


                    {activeTab === 0 && (
                        <div className="shadow-md w-full py-5 px-8 rounded-md">
                            Upgrade your everyday style with this trendy and comfortable digital print t-shirt. Made from soft and breathable fabric, this regular fit t-shirt ensures all-day comfort while giving you a modern casual look. The high-quality digital print adds a stylish and eye-catching touch, perfect for daily wear, hangouts, college, or casual outings.
                            <br/><br/>
                            <b>Features:</b> <br/>
                            Premium quality soft fabric<br/>
                            Stylish and long-lasting digital print<br/>
                            Comfortable regular fit design<br/>
                            Breathable and lightweight material<br/>
                            Perfect for casual and everyday wear<br/>
                            Easy to wash and maintain<br/>
                            <br/><br/>
                            <b>Specifications:</b><br/>
                            Fit: Regular Fit<br/>
                            Print Type: Digital Print<br/>
                            Neck Type: Round Neck<br/>
                            Sleeve Type: Half Sleeve<br/>
                            Suitable For: Men<br/>

                            <br/><br/>

                            Stay comfortable and stylish with this fashionable digital print t-shirt that matches perfectly with jeans, joggers, or shorts.

                            <h4>Online Support</h4>
                            <p>you will get 24 hour support with this purchase product and you ca return it with 30 days for and exchange</p>


                        </div>


                    )}
                    {
                        activeTab === 1 && (


                            <div
                                className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                                <table className="w-full text-sm text-left rtl:text-right text-body">
                                    <thead
                                        className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 font-medium">
                                            Product name
                                        </th>
                                        <th scope="col" className="px-6 py-3 font-medium">
                                            Color
                                        </th>
                                        <th scope="col" className="px-6 py-3 font-medium">
                                            Category
                                        </th>
                                        <th scope="col" className="px-6 py-3 font-medium">
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 py-3 font-medium">
                                            Stock
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="bg-neutral-primary border-b border-default">
                                        <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                            Apple MacBook Pro 17"
                                        </th>
                                        <td className="px-6 py-4">
                                            Silver
                                        </td>
                                        <td className="px-6 py-4">
                                            Laptop
                                        </td>
                                        <td className="px-6 py-4">
                                            $2999
                                        </td>
                                        <td className="px-6 py-4">
                                            231
                                        </td>
                                    </tr>
                                    <tr className="bg-neutral-primary border-b border-default">
                                        <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                            Microsoft Surface Pro
                                        </th>
                                        <td className="px-6 py-4">
                                            White
                                        </td>
                                        <td className="px-6 py-4">
                                            Laptop PC
                                        </td>
                                        <td className="px-6 py-4">
                                            $1999
                                        </td>
                                        <td className="px-6 py-4">
                                            423
                                        </td>
                                    </tr>
                                    <tr className="bg-neutral-primary">
                                        <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                            Magic Mouse 2
                                        </th>
                                        <td className="px-6 py-4">
                                            Black
                                        </td>
                                        <td className="px-6 py-4">
                                            Accessories
                                        </td>
                                        <td className="px-6 py-4">
                                            $99
                                        </td>
                                        <td className="px-6 py-4">
                                            121
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>


                        )
                    }

                    {
                        activeTab === 2 && (
                            <div className="w-[70%] shadow-md py-5 px-8 rounded-md">

                                <div className="w-full productReviewsContainer">
                                    <h2 className="text-[18px]">Customer quetions & answare</h2>

                                    {/* REVIEW LIST */}
                                    <div className="reviewScroll w-[80%] max-h-[300px] overflow-y-scroll overflow-x-hidden mt-4">

                                        {/* Review 1 */}
                                        <div className="review w-full pt-5 pb-5 mt-5 pr-5 border-b border-[rgba(0,0,0,0.1)] flex items-center justify-between">

                                            <div className="info w-[60%] flex items-center gap-2">
                                                <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                                                    <img src={img} className="w-full" />
                                                </div>

                                                <div className="w-[80%]">
                                                    <h4 className="text-[16px]">Alice</h4>
                                                    <h5 className="text-[13px] mb-0">2026-10-03</h5>
                                                    <p className="mt-0 mb-0">
                                                        Lorem ipsum is simply dummy text of the printing and typesetting industry lorem
                                                    </p>
                                                </div>
                                            </div>

                                            <Rating name="size-small" defaultValue={4} size="small" readOnly />
                                        </div>

                                        {/* Review 2 */}
                                        <div className="review w-full pt-5 pb-5 pr-5 border-b border-[rgba(0,0,0,0.1)] flex items-center justify-between">

                                            <div className="info w-[60%] flex items-center gap-2">
                                                <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                                                    <img src={img} className="w-full" />
                                                </div>

                                                <div className="w-[80%]">
                                                    <h4 className="text-[16px]">Alice</h4>
                                                    <h5 className="text-[13px] mb-0">2026-10-03</h5>
                                                    <p className="mt-0 mb-0">
                                                        Lorem ipsum is simply dummy text of the printing and typesetting industry lorem
                                                    </p>
                                                </div>
                                            </div>

                                            <Rating name="size-small" defaultValue={4} size="small" readOnly />
                                        </div>

                                        {/* Review 3 */}
                                        <div className="review w-full pt-5 pb-5 pr-5 border-b border-[rgba(0,0,0,0.1)] flex items-center justify-between">

                                            <div className="info w-[60%] flex items-center gap-2">
                                                <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                                                    <img src={img} className="w-full" />
                                                </div>

                                                <div className="w-[80%]">
                                                    <h4 className="text-[16px]">Alice</h4>
                                                    <h5 className="text-[13px] mb-0">2026-10-03</h5>
                                                    <p className="mt-0 mb-0">
                                                        Lorem ipsum is simply dummy text of the printing and typesetting industry lorem
                                                    </p>
                                                </div>
                                            </div>

                                            <Rating name="size-small" defaultValue={4} size="small" readOnly />
                                        </div>

                                    </div>

                                    {/* REVIEW FORM (IMPORTANT: OUTSIDE reviewScroll) */}
                                    <div className="reviewForm bg-[#fafafa] p-4 rounded-md mt-4">

                                        <h2 className="text-[18px]">Add a review</h2>

                                        <form className="w-full mt-5">
                                            <TextField
                                                id="outlined-multiline-flexible"
                                                label="Write a review..."
                                                className="w-full mb-5"
                                                multiline
                                                rows={5}
                                            />

                                            <Rating name="size-small" defaultValue={4} />

                                            <div className="flex items-center mt-5">
                                                <Button className="btn-org">Submit Review</Button>
                                            </div>
                                        </form>

                                    </div>

                                </div>

                            </div>                        )
                    }


                </div>

                <div className="container pt-8">
                    <h2 className="text-[20px] font-[600] mb-3">Latest Products</h2>
                    <ProductsSlider items={6}/>

                </div>


            </section>
        </>
    );
};

export default ProductDetails;