import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
    try {
        const { itemId, size, quantity } = req.body;
        const user = await userModel.findById(req.userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        if (!itemId || !size) return res.status(400).json({ success: false, message: "Item and size are required" });

        const cartData = { ...(user.cartData || {}) };
        cartData[itemId] = { ...(cartData[itemId] || {}) };
        const requestedQuantity = Number(quantity);
        cartData[itemId][size] = Number.isInteger(requestedQuantity) && requestedQuantity > 0
            ? requestedQuantity
            : Number(cartData[itemId][size] || 0) + 1;

        await userModel.findByIdAndUpdate(req.userId, { $set: { cartData } });
        return res.json({ success: true, cartData, message: "Product added to cart" });
    } catch (error) {
        console.error("Add to cart error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

const updateCart = async (req, res) => {
    try {
        const { itemId, size, quantity } = req.body;
        const requestedQuantity = Number(quantity);
        if (!itemId || !size || !Number.isInteger(requestedQuantity) || requestedQuantity < 0) {
            return res.status(400).json({ success: false, message: "Valid item, size and quantity are required" });
        }

        const user = await userModel.findById(req.userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        const cartData = { ...(user.cartData || {}) };
        cartData[itemId] = { ...(cartData[itemId] || {}) };

        if (requestedQuantity === 0) {
            delete cartData[itemId][size];
            if (Object.keys(cartData[itemId]).length === 0) delete cartData[itemId];
        } else {
            cartData[itemId][size] = requestedQuantity;
        }

        await userModel.findByIdAndUpdate(req.userId, { $set: { cartData } });
        return res.json({ success: true, cartData, message: "Cart updated successfully" });
    } catch (error) {
        console.error("Update cart error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

const getUserCart = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select("cartData");
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        return res.json({ success: true, cartData: user.cartData || {} });
    } catch (error) {
        console.error("Get user cart error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export { addToCart, updateCart, getUserCart };

// import userModel from "../models/userModel.js";


// // ======================================================
// // ADD TO CART
// // ======================================================

// const addToCart = async (
//     req,
//     res
// ) => {

//     try {

//         const {
//             userId,
//             itemId,
//             size
//         } = req.body;


//         const userData =
//             await userModel.findById(
//                 userId
//             );


//         if (!userData) {

//             return res.status(404).json({

//                 success: false,

//                 message:
//                     "User not found"

//             });
//         }


//         let cartData =
//             userData.cartData || {};


//         // Product exists
//         if (
//             cartData[itemId]
//         ) {

//             // Size exists
//             if (
//                 cartData[itemId][size]
//             ) {

//                 cartData[itemId][size]
//                     += 1;

//             } else {

//                 cartData[itemId][size]
//                     = 1;
//             }


//         } else {

//             cartData[itemId] = {};

//             cartData[itemId][size]
//                 = 1;
//         }


//         await userModel.findByIdAndUpdate(

//             userId,

//             {
//                 $set: {
//                     cartData
//                 }
//             }

//         );


//         res.json({

//             success: true,

//             message:
//                 "Product added to cart successfully"

//         });


//     } catch (error) {

//         console.log(error);


//         res.json({

//             success: false,

//             message:
//                 error.message

//         });
//     }
// };


// // ======================================================
// // UPDATE CART
// // ======================================================

// const updateCart = async (
//     req,
//     res
// ) => {

//     try {

//         const {
//             userId,
//             itemId,
//             size,
//             quantity
//         } = req.body;


//         const userData =
//             await userModel.findById(
//                 userId
//             );


//         if (!userData) {

//             return res.status(404).json({

//                 success: false,

//                 message:
//                     "User not found"

//             });
//         }


//         let cartData =
//             userData.cartData || {};


//         if (
//             cartData[itemId]
//         ) {

//             if (
//                 quantity > 0
//             ) {

//                 cartData[itemId][size]
//                     = quantity;

//             } else {

//                 delete
//                     cartData[itemId][size];


//                 if (
//                     Object.keys(
//                         cartData[itemId]
//                     ).length === 0
//                 ) {

//                     delete
//                         cartData[itemId];
//                 }
//             }
//         }


//         await userModel.findByIdAndUpdate(

//             userId,

//             {
//                 $set: {
//                     cartData
//                 }
//             }

//         );


//         res.json({

//             success: true,

//             message:
//                 "Cart updated successfully"

//         });


//     } catch (error) {

//         console.log(error);


//         res.json({

//             success: false,

//             message:
//                 error.message

//         });
//     }
// };


// // ======================================================
// // GET USER CART
// // ======================================================

// const getUserCart = async (
//     req,
//     res
// ) => {

//     try {

//         const {
//             userId
//         } = req.body;


//         const userData =
//             await userModel.findById(
//                 userId
//             );


//         if (!userData) {

//             return res.status(404).json({

//                 success: false,

//                 message:
//                     "User not found"

//             });
//         }


//         const cartData =
//             userData.cartData || {};


//         res.json({

//             success: true,

//             message:
//                 cartData

//         });


//     } catch (error) {

//         console.log(error);


//         res.json({

//             success: false,

//             message:
//                 error.message

//         });

//     }
// };


// export {
//     addToCart,
//     updateCart,
//     getUserCart
// };
