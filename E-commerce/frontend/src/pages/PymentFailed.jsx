import React from "react";
import { useNavigate } from "react-router-dom";


const PaymentFailed = () => {
    const navigate =
        useNavigate();

    return (
        <div className="min-h-[400px] flex flex-col items-center justify-center ">
            <div className="text-red-600 text-5xl ">
                ✕
            </div>
            <h1 className="text-3xl font-bold mt-4">
                Payment Failed
            </h1>
            <p className="text-gray-500 mt-2 ">
                Your bKash payment was not completed.
            </p>
            <button onClick={() =>navigate("/cart")}
                className="mt-6 bg-black text-white px-6 py-3 rounded">
                Try Again
            </button>
        </div>
    );
};


export default PaymentFailed;
