import Header from "./components/Header/index.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/index.jsx";
import ProductListing from "./pages/ProductListing/index.jsx";
import Footer from "./components/Footer/index.jsx";
import Login from "./pages/Login/index.jsx";
import Register from "./pages/Register/index.jsx";
import MyAccount from "./pages/MyAccount/index.jsx";
import WishList from "./pages/WishList/index.jsx";
// import {useState} from "react";
import CartPage from "./pages/Cart/index.jsx";
// import Order from "./pages/Order/index.jsx";
// import {Button, Dialog} from "@mui/material";
// import DialogContext from "@mui/material/Dialog/DialogContext.d.ts";
// import {IoCloseSharp} from "react-icons/io5";

import {createContext} from "react";



const MyContext =createContext();


function App() {

    // const[openProductDetailsModal, setOpenProductDetailsModal] = useState(false);
    // const[maxWidth, setMaxWidth] =useState("lg")
    // const[fullWidth, setFullWidth] =useState(true)
    // const[openCartPanel, setOpenCartPanel] = useState(false);
    //
    //
    // const handleCloseProductDetailsModal =()=>{
    //     setOpenProductDetailsModal(false);
    // }
    // const toggleCartPanel=(newOpen) => {
    //     setOpenCartPanel(newOpen);
    // }

    // const values ={
    //     setOpenProductDetailsModal,
    //     setOpenCartPanel,
    //     toggleCartPanel,
    //     openCartPanel
    //
    // }

  return (
    <>
        <BrowserRouter>

            {/*<MyContext.Provider value={values}>*/}
            {/*</MyContext.Provider>*/}
            <Header />
            <Routes>
                <Route path={"/"} element={<Home/>} />

                <Route path={"/productlist"} element={<ProductListing/>} />

                {/*<Route path={"/product/:id"}*/}
                {/*       exact={true}*/}
                {/*       element={<ProductDetails/>} />*/}


                <Route path={"/login"} element={<Login/>}/>

                <Route path={"/register"} element={<Register/>}/>

                <Route path={"/cart"} element={<CartPage/>}/>

                <Route path={"/myaccount"} element={<MyAccount/>}/>

                <Route path={"/wishlist"} element={<WishList/>}/>

                {/*<Route path={"/order-tacking"}*/}
                {/*       element={<Order/>}/>*/}

                 <Route path={"*"} element={<h1>404 Not Found</h1>}/>

            </Routes>
            <Footer/>
       </BrowserRouter>

        {/*<Dialog open={openProductDetailsModel}*/}
        {/*        fullWidth={fullwidth}*/}
        {/*        maxWidth={maxWidth}*/}
        {/*        onClose={handleCloseProductDetailsModal}*/}
        {/*        aria-labelledby="form-dialog-title"*/}
        {/*        aria-describedby="form-dialog-description"*/}
        {/*        className="productDetailsModel"*/}
        {/*        >*/}
        {/*    <DialogContext >*/}
        {/*        <div className="flex items-center w-full productDetailsModalContainer relative">*/}
        {/*            <Button className="!w-[40px] !h[40px] !min-w-[40px] !rounded-full !text-[#000]
                            !absolute top-[15px] right=[15px] !bg-[#f1f1f1] " onClick={handleCloseProductionDetailsModal}>*/}
        {/*                <IoCloseSharp className="text-[20px]"/>*/}
        {/*            </Button>*/}
        {/*            <div className="col1 w-[40%] px-3">*/}
        {/*                <ProductZoom/>*/}
        {/*            </div>*/}
        {/*            <div className="col2 w-[60%] py-8 pr-16 productContent">*/}
        {/*               <ProductDetailsComponent/>*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*    </DialogContext>*/}
        {/*</Dialog>*/}




    </>
  )
}

export default App
