import {createContext, useState, useEffect} from 'react'
import {products} from '../assets/products'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'


export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "৳";
    const deliver_fee =10;
    const [search, setSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [showSearch, setShowSearch] = useState(false)

    const navigate = useNavigate()


    const addToCart = (itemId, size) => {
        if (!size){
            toast.error("Select Product Size");
            return;
        }
        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;

            }
            else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
        toast.success("Item Added to Cart");
    }
    
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems){
            for (const item in cartItems[items]){
                try {
                    if(cartItems[items][item]){
                        totalCount += cartItems[items][item];
                    }
                }
                catch (error){
                    console.log(error);
                }
            }
        }
        return totalCount;
    };

    
    const updatequantity = async(itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    };
    

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems){
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]){
                try {
                    if(cartItems[items][item]>0){
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                }
                catch (error){
                    console.log(error);
                }
            }

        }
        return totalAmount;
    };


        


    const value ={
        products,
        currency,
        deliver_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updatequantity,
        getCartAmount,
        navigate,
    }


    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider