import { useState } from "react";
import { ShopContext } from "./ShopContext";
import { products } from "../assets/assets";

const ShopContextProvider = ({ children }) => {

    const currency = "৳";
    const delivery_fee = 10;

    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;