import React, {useContext, useState} from "react";
import axios from "axios";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import Bkash from "../assets/BKashLogo.png";

const Payment = () => {
    const {
        backendUrl,
        token,navigate,
        cartItems,products,currency,
        getCartAmount,delivery_fee,
    } = useContext(ShopContext);

    const [method, setMethod] =
        useState("cod");
    const [loading, setLoading] =
        useState(false);
    const createOrder = async () => {
        try {
            const orderItems = [];
            Object.keys(cartItems).forEach(
                (itemId) => {
                    Object.keys(
                        cartItems[itemId]
                    ).forEach((size) => {
                        const quantity =
                            cartItems[itemId][size];
                        if (quantity > 0) {
                            const itemInfo =
                                products.find(
                                    (product) =>
                                        product._id === itemId
                                );
                            if (itemInfo) {
                                orderItems.push({
                                    ...itemInfo,
                                    size: size,
                                    quantity:
                                        quantity,
                                });
                            }
                        }
                    });
                }
            );
            const amount = getCartAmount() + delivery_fee
            const response =
                await axios.post(
                    `${backendUrl}/api/order/place`,
                    {
                        items: orderItems,
                        amount: amount,
                        address: {
                        },
                        paymentMethod:
                            method,
                    },
                    {
                        headers: {
                            token: token,
                        },
                    }
                );

            if (!response.data.success) {
                throw new Error(
                    response.data.message
                );
            }
            return response.data.order;
        } catch (error) {
            console.error(
                "Create Order Error:",
                error
            );
            throw error;
        }
    };

    const handleBkashPayment =
        async () => {
            try {
                setLoading(true);
                const order = await createOrder();
                console.log(
                    "Created Order:",
                    order
                );
                const response =
                    await axios.post(
                        `${backendUrl}/api/bkash/create`,
                        {
                            orderId:
                                order._id,
                        },
                        {
                            headers: {
                                token: token,
                            },
                        }
                    );

                if (
                    !response.data.success
                ) {

                    throw new Error(
                        response.data.message
                    );
                }
                window.location.href =
                    response.data.bkashURL;
            } catch (error) {
                console.error(
                    "bKash Payment Error:",
                    error
                );
                alert(
                    error.response?.data
                        ?.message ||
                    error.message ||
                    "bKash payment failed"
                );
                setLoading(false);
            }
        };

    return (
        <div className="border-t pt-10">
            <div className="text-2xl mb-8">
                <Title
                    text1="PAYMENT" text2="METHOD"
                />
            </div>
            <div className="flex flex-col gap-4">
                <div onClick={() => setMethod("bkash") }
                    className={`
                        border p-4
                        cursor-pointer flex
                        items-center gap-4
                    `}
                >
                    <div
                        className={`w-4 h-4 rounded-full border
                            ${
                                method === "bkash"
                                    ? "bg-pink-600"
                                    : ""
                            }
                        `}
                    />
                    <img
                        src={Bkash}
                        alt="bKash"
                        className="w-20"
                    />
                    <span>
                        bKash Sandbox
                    </span>
                </div>
                <div
                    onClick={() =>
                        setMethod("cod")
                    }

                    className="border p-4 cursor-pointer"
                >
                    <div className="flex gap-3">
                        <div
                            className={`
                                w-4 h-4 rounded-full border
                                ${
                                    method === "cod"
                                        ? "bg-black"
                                        : ""
                                }
                            `}
                        />
                        <span>
                            Cash on Delivery
                        </span>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                {method === "bkash" ? (
                    <button
                        onClick={
                            handleBkashPayment
                        }
                        disabled={loading}
                        className=" bg-pink-600 text-white px-8 py-3 rounded
                        "
                    >
                        {loading
                            ? "Processing..."
                            : "Pay with bKash"
                        }

                    </button>

                ) : (

                    <button
                        onClick={createOrder}

                        disabled={loading}

                        className="
                            bg-black
                            text-white
                            px-8 py-3
                            rounded
                        "
                    >
                        Place Order

                    </button>
                )}

            </div>
        </div>
    );
};


export default Payment;