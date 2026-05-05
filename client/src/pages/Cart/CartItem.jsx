import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {IoCloseSharp} from "react-icons/io5";
import {Menu, MenuItem, Rating} from "@mui/material";
import {GoTriangleDown} from "react-icons/go";

const CartItems = (props) => {

    const [sizeAnchorR1, setSizeAnchorR1] = useState(null);
    const [qtyAnchor, setQtyAnchor] = useState(null);
    const openSize = Boolean(sizeAnchorR1);
    const openQty = Boolean(qtyAnchor);

    const [selectedSize, setSelectedSize] = useState(props.size || 'M');
    const [selectedQty, setSelectedQty] = useState(props.quantity || 1);

    const handleClickSize = (event) => {
        setSizeAnchorR1(event.currentTarget);
    }

    const handleCloseSize = () => {
        setSizeAnchorR1(null);
    }

    const handleSelectSize = (size) => {
        setSelectedSize(size);
        handleCloseSize();
    }

    const handleClickQty = (event) => {
        setQtyAnchor(event.currentTarget);
    }

    const handleCloseQty = () => {
        setQtyAnchor(null);
    }

    const handleSelectQty = (qty) => {
        setSelectedQty(qty);
        handleCloseQty();
    }

    const handleRemoveItem = () => {
        if (props.onRemove) {
            props.onRemove(props.id);
        }
    }

    return (
        <div className="cartItem w-full p-3 flex items-center border-b border-[rgba(0,0,0,0.1)] gap-4 pb-5">
            <div className="img w-[15%] rounded-md overflow-hidden">
                <Link to={"/product/7845"} className="group">

                    <img src="https://m.media-amazon.com/images/I/71w+qQy9sL._AC_UL320_.jpg" alt="product"
                         className="w-full group-hover:scale-105 transition-all "/>

                </Link>
            </div>

            <div className="info w-[85%] relative ">
                <IoCloseSharp
                    onClick={handleRemoveItem}
                    className="cursor-pointer absolute top-[0px] right-[0px]
                                text-[22px] hover:text-red-600 transition-colors"/>
                <span className="text-[13px]">Sangria</span>
                <h3 className="text-[15px]">
                    <Link className="link" to={""}>
                        A-Line Kurti with Sharara & Dupatta
                    </Link>
                </h3>

                <Rating name="size-small"
                        defaultValue={4}
                        size="small"
                        readOnly/>

                <div className="flex items-center gap-4 mt-2">
                    <div className="relative">

                        <span className="flex items-center justify-center bg-[#f1f1f1] text-[11px]
                                      font-[600] py-1 px-2 rounded-md cursor-pointer"
                              onClick={handleClickSize}>
                            Size: {selectedSize} <GoTriangleDown/>
                        </span>

                        <Menu
                            id="size-menu"
                            anchorEl={sizeAnchorR1}
                            open={openSize}
                            onClose={handleCloseSize}
                            slotProps={{
                                paper: {
                                    "aria-labelledby": "size-menu",
                                },
                            }}
                        >
                            <MenuItem onClick={() => handleSelectSize('S')}>S</MenuItem>
                            <MenuItem onClick={() => handleSelectSize('M')}>M</MenuItem>
                            <MenuItem onClick={() => handleSelectSize('L')}>L</MenuItem>
                            <MenuItem onClick={() => handleSelectSize('XL')}>XL</MenuItem>
                            <MenuItem onClick={() => handleSelectSize('XXL')}>XXL</MenuItem>
                        </Menu>

                    </div>

                    <div className="relative">
                        <span className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer"
                           onClick={handleClickQty}>
                            Qty: {selectedQty} <GoTriangleDown/>
                        </span>

                        <Menu
                            id="quantity-menu"
                            anchorEl={qtyAnchor}
                            open={openQty}
                            onClose={handleCloseQty}
                            slotProps={{
                                paper: {
                                    "aria-labelledby": "quantity-menu",
                                },
                            }}
                        >
                            <MenuItem onClick={() => handleSelectQty(1)}>1</MenuItem>
                            <MenuItem onClick={() => handleSelectQty(2)}>2</MenuItem>
                            <MenuItem onClick={() => handleSelectQty(3)}>3</MenuItem>
                            <MenuItem onClick={() => handleSelectQty(4)}>4</MenuItem>
                            <MenuItem onClick={() => handleSelectQty(5)}>5</MenuItem>
                        </Menu>
                    </div>
                </div>





                <div className="flex items-center gap-4 mt-2">
                    <span className="price text-[14px] font-[600]">
                                        $58.00
                                    </span>

                    <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
                                        $58.00
                                    </span>
                    <span className="price text-primary text-[14px] font-[600]">
                                        55% OFF
                                    </span>



                </div>

            </div>














        </div>
    );
};

export default CartItems;