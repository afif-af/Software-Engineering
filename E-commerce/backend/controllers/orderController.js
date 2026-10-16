import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import { createPayment, executePayment } from "../services/bkashServices.js";

const placeOrder = async (req, res) => {
    try {
        const { items, amount, address = {} } = req.body;
        const userId = req.userId;
        if (!items || items.length === 0) return res.status(400).json({ success: false, message: "Cart is empty" });
        if (!Array.isArray(items)) return res.status(400).json({ success: false, message: "Invalid cart items" });

        const user = await userModel.findById(userId).select("name email phone address cartData");
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        const requested = new Map();
        for (const item of items) {
            const itemId = item?._id?.toString();
            const quantity = Number(item?.quantity);
            if (!itemId || !item?.size || !Number.isInteger(quantity) || quantity <= 0) return res.status(400).json({ success: false, message: "Invalid cart item" });
            const key = `${itemId}:${item.size}`;
            requested.set(key, (requested.get(key) || 0) + quantity);
        }

        const productIds = [...new Set(items.map((item) => item._id.toString()))];
        const products = await productModel.find({ _id: { $in: productIds } });
        const productsById = new Map(products.map((product) => [product._id.toString(), product]));
        const verifiedItems = [];
        let subtotal = 0;

        for (const [key, quantity] of requested) {
            const separator = key.lastIndexOf(":");
            const itemId = key.slice(0, separator);
            const size = key.slice(separator + 1);
            const product = productsById.get(itemId);
            if (!product || quantity > Number(user.cartData?.[itemId]?.[size] || 0)) return res.status(400).json({ success: false, message: "Selected item is no longer available in the cart" });
            subtotal += product.price * quantity;
            verifiedItems.push({ ...product.toObject(), size, quantity });
        }

        const verifiedAmount = subtotal + 10;
        if (!Number.isFinite(Number(amount)) || Math.abs(Number(amount) - verifiedAmount) > 0.01) return res.status(400).json({ success: false, message: "Order amount does not match the cart" });

        const orderAddress = {
            ...user.address,
            ...address,
            name: user.name,
            email: user.email,
            phone: address.phone || user.phone || user.address?.phone || ""
        };

        const orderData = {
            userId,
            items: verifiedItems,
            amount: verifiedAmount,
            address: orderAddress,
            paymentMethod: "COD",
            payment: false,
            paymentStatus: "pending",
            status: "Order Placed",
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const remainingCart = { ...(user.cartData || {}) };
        for (const item of items) {
            const itemId = item._id?.toString();
            if (!itemId || !remainingCart[itemId]?.[item.size]) continue;
            remainingCart[itemId][item.size] -= item.quantity;
            if (remainingCart[itemId][item.size] <= 0) delete remainingCart[itemId][item.size];
            if (Object.keys(remainingCart[itemId]).length === 0) delete remainingCart[itemId];
        }

        await userModel.findByIdAndUpdate(userId, {
            $set: {
                phone: orderAddress.phone,
                address: orderAddress,
                cartData: remainingCart
            }
        });

        return res.json({
            success: true,
            message: "Order placed successfully",
            order: { _id: newOrder._id, amount: newOrder.amount }
        });
    } catch (error) {
        console.log("Place Order Error:", error);
        return res.status(500).json({ success: false, message: "Error placing order" });
    }
};

const placeOrderBkash = async (req, res) => {
    try {
        const { items, amount, address = {} } = req.body;
        const userId = req.userId;
        if (!items || items.length === 0) return res.status(400).json({ success: false, message: "Cart is empty" });

        const user = await userModel.findById(userId).select("name email phone address cartData");
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        const requestedQuantities = new Map();
        for (const item of items) {
            const itemId = item._id?.toString();
            const quantity = Number(item.quantity);
            if (!itemId || !item.size || !Number.isInteger(quantity) || quantity <= 0) return res.status(400).json({ success: false, message: "Invalid cart item" });
            const key = `${itemId}:${item.size}`;
            requestedQuantities.set(key, (requestedQuantities.get(key) || 0) + quantity);
        }

        const productIds = [...new Set(items.map((item) => item._id.toString()))];
        const products = await productModel.find({ _id: { $in: productIds } });
        const productsById = new Map(products.map((product) => [product._id.toString(), product]));
        if (productsById.size !== productIds.length) return res.status(400).json({ success: false, message: "A selected product is no longer available" });

        for (const [key, quantity] of requestedQuantities) {
            const separator = key.indexOf(":");
            const itemId = key.slice(0, separator);
            const size = key.slice(separator + 1);
            if (quantity > Number(user.cartData?.[itemId]?.[size] || 0)) return res.status(400).json({ success: false, message: "Selected quantity is no longer available in the cart" });
        }

        let verifiedSubtotal = 0;
        const verifiedItems = items.map((item) => {
            const itemId = item._id.toString();
            const product = productsById.get(itemId);
            verifiedSubtotal += product.price * Number(item.quantity);
            return { ...product.toObject(), size: item.size, quantity: Number(item.quantity) };
        });

        const verifiedAmount = Number((verifiedSubtotal + 10).toFixed(2));
        if (!Number.isFinite(Number(amount)) || Math.abs(Number(amount) - verifiedAmount) > 0.01) return res.status(400).json({ success: false, message: "Order amount does not match the selected products" });

        const orderAddress = {
            ...user.address,
            ...address,
            name: user.name,
            email: user.email,
            phone: address.phone || user.phone || user.address?.phone || ""
        };

        const order = await orderModel.create({
            userId,
            items: verifiedItems,
            amount: verifiedAmount,
            address: orderAddress,
            paymentMethod: "bKash",
            payment: false,
            paymentStatus: "pending",
            status: "Payment Pending"
        });

        const payment = await createPayment({
            amount: verifiedAmount,
            invoiceNumber: `ORDER-${order._id}`,
            payerReference: orderAddress.phone || "customer"
        });

        console.log("bKash Payment:", payment);
        if (!payment.paymentID || !payment.bkashURL) {
            await orderModel.findByIdAndUpdate(order._id, {
                paymentStatus: "failed",
                status: "Payment Failed",
                bkashResponse: payment
            });
            return res.status(500).json({ success: false, message: "Failed to create bKash payment", data: payment });
        }

        order.paymentId = payment.paymentID;
        order.paymentStatus = "pending";
        order.bkashResponse = payment;
        await order.save();

        return res.json({
            success: true,
            message: "bKash payment created",
            orderId: order._id,
            paymentID: payment.paymentID,
            bkashURL: payment.bkashURL
        });
    } catch (error) {
        console.log("bKash payment error:", error.response?.data || error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to create bKash payment",
            error: error.response?.data || error.message
        });
    }
};

const bkashCallback = async (req, res) => {
    try {
        const { paymentID, status } = req.query;
        console.log("bKash Callback:", { paymentID, status });

        if (!paymentID) return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);

        if (status === "cancel") {
            await orderModel.findOneAndUpdate(
                { paymentId: paymentID },
                { paymentStatus: "cancelled", status: "Payment Cancelled" }
            );
            return res.redirect(`${process.env.FRONTEND_URL}/payment-failed?reason=cancelled`);
        }

        if (status === "failure") {
            await orderModel.findOneAndUpdate(
                { paymentId: paymentID },
                { paymentStatus: "failed", status: "Payment Failed" }
            );
            return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
        }

        if (status === "success") {
            const existingOrder = await orderModel.findOne({ paymentId: paymentID });
            if (!existingOrder) return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
            if (existingOrder.payment === true) return res.redirect(`${process.env.FRONTEND_URL}/payment-success?verified=1`);

            const result = await executePayment(paymentID);
            console.log("bKash Execute:", result);

            if (result.statusCode === "0000" || result.transactionStatus === "Completed") {
                const order = await orderModel.findOne({ paymentId: paymentID });
                if (!order) return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
                if (order.payment === true) return res.redirect(`${process.env.FRONTEND_URL}/payment-success?verified=1`);

                order.payment = true;
                order.paymentStatus = "paid";
                order.status = "processing";
                order.transactionId = result.trxID || null;
                order.bkashResponse = result;
                await order.save();

                const user = await userModel.findById(order.userId);
                if (user) {
                    const remainingCart = { ...(user.cartData || {}) };

                    for (const item of order.items) {
                        const itemId = item._id?.toString();
                        if (!itemId || !remainingCart[itemId]?.[item.size]) continue;

                        remainingCart[itemId][item.size] -= item.quantity;
                        if (remainingCart[itemId][item.size] <= 0) delete remainingCart[itemId][item.size];
                        if (remainingCart[itemId] && Object.keys(remainingCart[itemId]).length === 0) delete remainingCart[itemId];
                    }

                    await userModel.findByIdAndUpdate(order.userId, {
                        $set: {
                            cartData: remainingCart,
                            phone: order.address.phone,
                            address: order.address
                        }
                    });
                }

                return res.redirect(`${process.env.FRONTEND_URL}/payment-success?verified=1`);
            }

            await orderModel.findOneAndUpdate(
                { paymentId: paymentID },
                { paymentStatus: "failed", status: "Payment Failed", bkashResponse: result }
            );
        }

        return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
    } catch (error) {
        console.log("bKash callback error:", error.response?.data || error.message);
        return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
    }
};

const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching orders" });
    }
};

const userOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching user orders" });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: "Order status updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error updating order status" });
    }
};

export { placeOrder, placeOrderBkash, bkashCallback, allOrders, userOrders, updateStatus };



// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import productModel from "../models/productModel.js";

// import { createPayment, executePayment } from "../services/bkashServices.js"

// const placeOrder = async (req, res) => {
//     try {
//         const {
//             items,
//             amount,
//             address = {}
//         } = req.body;
//         const userId =
//             req.userId;
//         if (!items || items.length === 0) {
//             return res.status(400).json({
//                 success: false,
//                 message:
//                     "Cart is empty"
//             });
//         }

//         if (!Array.isArray(items)) {
//             return res.status(400).json({ success: false, message: "Invalid cart items" });
//         }

//         const user =
//             await userModel
//                 .findById(userId)
//                 .select(
//                     "name email phone address cartData"
//                 );
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message:
//                     "User not found"
//             });
//         }

//         const requested = new Map();
//         for (const item of items) {
//             const itemId = item?._id?.toString();
//             const quantity = Number(item?.quantity);
//             if (!itemId || !item?.size || !Number.isInteger(quantity) || quantity <= 0) {
//                 return res.status(400).json({ success: false, message: "Invalid cart item" });
//             }
//             const key = `${itemId}:${item.size}`;
//             requested.set(key, (requested.get(key) || 0) + quantity);
//         }

//         const productIds = [...new Set(items.map((item) => item._id.toString()))];
//         const products = await productModel.find({ _id: { $in: productIds } });
//         const productsById = new Map(products.map((product) => [product._id.toString(), product]));
//         const verifiedItems = [];
//         let subtotal = 0;
//         for (const [key, quantity] of requested) {
//             const separator = key.lastIndexOf(":");
//             const itemId = key.slice(0, separator);
//             const size = key.slice(separator + 1);
//             const product = productsById.get(itemId);
//             if (!product || quantity > Number(user.cartData?.[itemId]?.[size] || 0)) {
//                 return res.status(400).json({ success: false, message: "Selected item is no longer available in the cart" });
//             }
//             subtotal += product.price * quantity;
//             verifiedItems.push({ ...product.toObject(), size, quantity });
//         }
//         const verifiedAmount = subtotal + 10;
//         if (!Number.isFinite(Number(amount)) || Math.abs(Number(amount) - verifiedAmount) > 0.01) {
//             return res.status(400).json({ success: false, message: "Order amount does not match the cart" });
//         }

//         const orderAddress = {
//             ...user.address,
//             ...address,

//             name:
//                 user.name,
//             email:
//                 user.email,
//             phone:
//                 address.phone ||
//                 user.phone ||
//                 user.address?.phone ||
//                 ""
//         };
//         const orderData = {
//             userId,
//             items: verifiedItems,
//             amount: verifiedAmount,
//             address:
//                 orderAddress,
//             paymentMethod:
//                 "COD",
//             payment:
//                 false,
//             paymentStatus:
//                 "pending",
//             status:
//                 "Order Placed",
//             date:
//                 Date.now()
//         };

//         const newOrder =
//             new orderModel(orderData);
//         await newOrder.save();

//         const remainingCart =
//             {
//                 ...(user.cartData || {})
//             };

//         for (const item of items) {
//             const itemId =
//                 item._id?.toString();
//             if (
//                 !itemId ||
//                 !remainingCart[itemId]?.[item.size]
//             ) {

//                 continue;
//             }
//             remainingCart[itemId][item.size]
//                 -= item.quantity;
//             if (
//                 remainingCart[itemId][item.size]
//                 <= 0
//             ) {

//                 delete
//                     remainingCart[itemId][item.size];
//             }
//             if (
//                 Object.keys(
//                     remainingCart[itemId]
//                 ).length === 0
//             ) {

//                 delete
//                     remainingCart[itemId];
//             }
//         }
//         await userModel.findByIdAndUpdate(

//             userId,

//             {
//                 $set: {

//                     phone:
//                         orderAddress.phone,

//                     address:
//                         orderAddress,

//                     cartData:
//                         remainingCart

//                 }
//             }
//         );
//         return res.json({

//             success: true,

//             message:
//                 "Order placed successfully",

//             order: {

//                 _id:
//                     newOrder._id,

//                 amount:
//                     newOrder.amount
//             }

//         });

//     } catch (error) {

//         console.log(
//             "Place Order Error:",
//             error
//         );

//         return res.status(500).json({

//             success: false,

//             message:
//                 "Error placing order"

//         });
//     }
// };

// const placeOrderBkash = async (
//     req,
//     res
// ) => {
//     try {
//         const {
//             items,
//             amount,
//             address = {}
//         } = req.body;

//         const userId =
//             req.userId;
//         if (
//             !items ||
//             items.length === 0
//         ) {

//             return res.status(400).json({

//                 success: false,

//                 message:
//                     "Cart is empty"

//             });
//         }

//         const user =
//             await userModel
//                 .findById(userId)
//                 .select(
//                     "name email phone address cartData"
//                 );

//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message:
//                     "User not found"
//             });
//         }
//         const requestedQuantities = new Map();
//         for (const item of items) {
//             const itemId = item._id?.toString();
//             const quantity = Number(item.quantity);
//             if (!itemId || !item.size || !Number.isInteger(quantity) || quantity <= 0) {
//                 return res.status(400).json({ success: false, message: "Invalid cart item" });
//             }
//             const key = `${itemId}:${item.size}`;
//             requestedQuantities.set(key, (requestedQuantities.get(key) || 0) + quantity);
//         }

//         const productIds = [...new Set(items.map((item) => item._id.toString()))];
//         const products = await productModel.find({ _id: { $in: productIds } });
//         const productsById = new Map(products.map((product) => [product._id.toString(), product]));
//         if (productsById.size !== productIds.length) {
//             return res.status(400).json({ success: false, message: "A selected product is no longer available" });
//         }

//         for (const [key, quantity] of requestedQuantities) {
//             const separator = key.indexOf(":");
//             const itemId = key.slice(0, separator);
//             const size = key.slice(separator + 1);
//             if (quantity > Number(user.cartData?.[itemId]?.[size] || 0)) {
//                 return res.status(400).json({ success: false, message: "Selected quantity is no longer available in the cart" });
//             }
//         }

//         let verifiedSubtotal = 0;
//         const verifiedItems = items.map((item) => {
//             const itemId = item._id.toString();
//             const product = productsById.get(itemId);
//             verifiedSubtotal += product.price * Number(item.quantity);
//             return { ...product.toObject(), size: item.size, quantity: Number(item.quantity) };
//         });
//         const verifiedAmount = Number((verifiedSubtotal + 10).toFixed(2));
//         if (!Number.isFinite(Number(amount)) || Math.abs(Number(amount) - verifiedAmount) > 0.01) {
//             return res.status(400).json({ success: false, message: "Order amount does not match the selected products" });
//         }

//         const orderAddress = {
//             ...user.address,
//             ...address,
//             name:
//                 user.name,
//             email:
//                 user.email,
//             phone:
//                 address.phone ||
//                 user.phone ||
//                 user.address?.phone ||
//                 ""
//         };

//         const order =
//             await orderModel.create({
//                 userId,
//                 items: verifiedItems,
//                 amount: verifiedAmount,
//                 address:
//                     orderAddress,
//                 paymentMethod:
//                     "bKash",
//                 payment:
//                     false,
//                 paymentStatus:
//                     "pending",
//                 status:
//                     "Payment Pending"
//             });

//         const payment =
//             await createPayment({
//                 amount:
//                     verifiedAmount,
//                 invoiceNumber:
//                     `ORDER-${order._id}`,
//                 payerReference:
//                     orderAddress.phone ||
//                     "customer"
//             });


//         console.log(
//             "bKash Payment:",
//             payment
//         );
//         if (
//             !payment.paymentID ||
//             !payment.bkashURL
//         ) {
//             await orderModel.findByIdAndUpdate(
//                 order._id,
//                 {
//                     paymentStatus:
//                         "failed",
//                     status:
//                         "Payment Failed",
//                     bkashResponse:
//                         payment
//                 }

//             );
//             return res.status(500).json({
//                 success: false,
//                 message:
//                     "Failed to create bKash payment",
//                 data:
//                     payment
//             });
//         }

//         order.paymentId =
//             payment.paymentID;
//         order.paymentStatus =
//             "pending";
//         order.bkashResponse =
//             payment;
//         await order.save();

//         return res.json({

//             success: true,

//             message:
//                 "bKash payment created",

//             orderId:
//                 order._id,

//             paymentID:
//                 payment.paymentID,

//             bkashURL:
//                 payment.bkashURL

//         });


//     } catch (error) {

//         console.log(

//             "bKash payment error:",

//             error.response?.data ||
//             error.message

//         );


//         return res.status(500).json({

//             success: false,

//             message:
//                 "Failed to create bKash payment",

//             error:
//                 error.response?.data ||
//                 error.message

//         });
//     }
// };

// const bkashCallback = async (
//     req,
//     res
// ) => {

//     try {

//         const {
//             paymentID,
//             status
//         } = req.query;


//         console.log(
//             "bKash Callback:",
//             {
//                 paymentID,
//                 status
//             }
//         );


//         if (!paymentID) {

//             return res.redirect(

//                 `${process.env.FRONTEND_URL}/payment-failed`

//             );
//         }

//         if (
//             status === "cancel"
//         ) {

//             await orderModel.findOneAndUpdate(

//                 {
//                     paymentId:
//                         paymentID
//                 },

//                 {

//                     paymentStatus:
//                         "cancelled",

//                     status:
//                         "Payment Cancelled"

//                 }

//             );


//             return res.redirect(

//                 `${process.env.FRONTEND_URL}/payment-failed?reason=cancelled`

//             );
//         }

//         if (
//             status === "failure"
//         ) {

//             await orderModel.findOneAndUpdate(

//                 {
//                     paymentId:
//                         paymentID
//                 },

//                 {
//                     paymentStatus:
//                         "failed",

//                     status:
//                         "Payment Failed"
//                 }
//             );

//             return res.redirect(

//                 `${process.env.FRONTEND_URL}/payment-failed`
//             );
//         }
//         if (
//             status === "success"
//         ) {

//             const existingOrder = await orderModel.findOne({ paymentId: paymentID });
//             if (!existingOrder) {
//                 return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
//             }
//             if (existingOrder.payment === true) {
//                 return res.redirect(`${process.env.FRONTEND_URL}/payment-success?verified=1`);
//             }
//             const result = await executePayment(paymentID);
//             console.log("bKash Execute:",result
//             );

//             if (
//                 result.statusCode === "0000"
//                 ||
//                 result.transactionStatus ==="Completed"

//             ) {
//                 const order =
//                     await orderModel.findOne({
//                         paymentId: paymentID

//                     });

//                 if (!order) {

//                     return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`

//                     );
//                 }
//                 if (
//                     order.payment === true
//                 ) {
//                     return res.redirect(`${process.env.FRONTEND_URL}/payment-success?verified=1`
//                     );
//                 }
//                 order.payment =true;
//                 order.paymentStatus ="paid";
//                 order.status ="processing";
//                 order.transactionId =result.trxID ||null;
//                 order.bkashResponse =result;

//                 await order.save();
//                 const user =
//                     await userModel.findById(
//                         order.userId
//                     );

//                 if (user) {
//                     const remainingCart =
//                         {
//                             ...(user.cartData || {})
//                         };

//                     for (
//                         const item
//                         of order.items
//                     ) {
//                         const itemId =item._id?.toString();

//                         if (
//                             !itemId ||
//                             !remainingCart[itemId]?.[
//                                 item.size
//                             ]
//                         ) {

//                             continue;
//                         }
//                         remainingCart[itemId][
//                             item.size
//                         ] -= item.quantity;


//                         if (
//                             remainingCart[itemId][
//                                 item.size
//                             ] <= 0

//                         ) {
//                             delete
//                                 remainingCart[
//                                     itemId
//                                 ][
//                                     item.size
//                                 ];
//                         }
//                         if (
//                             remainingCart[itemId] &&
//                             Object.keys(remainingCart[itemId]
//                             ).length === 0
//                         ) {
//                             delete
//                                 remainingCart[
//                                     itemId
//                                 ];
//                         }
//                     }
//                     await userModel.findByIdAndUpdate(
//                         order.userId,
//                         {
//                             $set: {
//                                 cartData:remainingCart,
//                                 phone: order.address.phone,
//                                 address: order.address
//                             }
//                         }
//                     );
//                 }
//                 return res.redirect( `${process.env.FRONTEND_URL}/payment-success?verified=1`

//                 );
//             }

//             await orderModel.findOneAndUpdate(
//                 {
//                     paymentId:paymentID
//                 },
//                 {
//                     paymentStatus:"failed",
//                     status:
//                         "Payment Failed",
//                     bkashResponse:result
//                 }
//             );
//         }
//         return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`
//         );
//     } catch (error) {
//         console.log(
//             "bKash callback error:",
//             error.response?.data ||
//             error.message
//         );
//         return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`
//         );
//     }
// };

// const allOrders = async (req,res) => {
//     try {
//         const orders =
//             await orderModel.find({});
//         res.json({
//             success: true,
//             orders
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success: false,
//             message:
//                 "Error fetching orders"

//         });
//     }
// };

// const userOrders = async (req,res) => {
//     try {
//         const userId =
//             req.userId;
//         const orders =
//             await orderModel.find({
//                 userId
//             });
//         res.json({
//             success: true,
//             orders
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success: false,
//             message:
//                 "Error fetching user orders"

//         });
//     }
// };

// const updateStatus = async (req, res) => {
//     try {
//         const {orderId,status} = req.body;
//         await orderModel.findByIdAndUpdate(
//             orderId,
//             {
//                 status
//             }
//         );
//         res.json({
//             success: true,
//             message:
//                 "Order status updated successfully"
//         });

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success: false,
//             message:
//                 "Error updating order status"

//         });
//     }
// };


// export { placeOrder, placeOrderBkash, bkashCallback,allOrders,userOrders,updateStatus};


// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import productModel from "../models/productModel.js";

// const placeOrder = async (req, res) => {
//     try {
//         const { items, amount, address = {} } = req.body;
//         const userId = req.userId;
//         const user = await userModel.findById(userId).select("name email phone address cartData");
//         if (!user) return res.status(404).json({ success: false, message: "User not found" });
//         const orderAddress = {
//             ...user.address,
//             ...address,
//             name: user.name,
//             email: user.email,
//             phone: address.phone || user.phone || user.address?.phone || ""
//         };
//         const orderData ={
//             userId,
//             items,
//             amount,
//             address: orderAddress,
//             paymentMethod: "COD",
//             payment :false,
//             date: Date.now()
//         }
//         const newOrder = new orderModel(orderData);
//         await newOrder.save();

//         const remainingCart = { ...(user.cartData || {}) };
//         for (const item of items) {
//             const itemId = item._id?.toString();
//             if (!itemId || !remainingCart[itemId]?.[item.size]) continue;
//             remainingCart[itemId][item.size] -= item.quantity;
//             if (remainingCart[itemId][item.size] <= 0) delete remainingCart[itemId][item.size];
//             if (Object.keys(remainingCart[itemId]).length === 0) delete remainingCart[itemId];
//         }
//         await userModel.findByIdAndUpdate(userId, { $set: { phone: orderAddress.phone, address: orderAddress, cartData: remainingCart,
 //                               phone: order.address.phone,
 //                               address: order.address } });

//         res.json({success:true, message:"Order placed successfully"})
//     }
    
//     catch(error) {
//         console.log(error);
//         res.status(500).json({success:false, message:"Error placing order"})
//     }


// }

// const placeOrderBkash = async (req, res) => {

//     try {

//         const userId = req.body.userId;

//         const {
//             items,
//             amount,
//             address
//         } = req.body;

//         if (!items || items.length === 0) {
//             return res.json({
//                 success: false,
//                 message: "Cart is empty"
//             });
//         }

//         // Create order first
//         const order = await orderModel.create({
//             userId,
//             items,
//             amount,
//             address,

//             paymentMethod: "bkash",
//             paymentStatus: "pending",
//             status: "pending"
//         });

//         // Create bKash payment
//         const payment = await createPayment({
//             amount,
//             invoiceNumber: order._id.toString(),
//             payerReference: address.phone
//         });

//         if (!payment.paymentID || !payment.bkashURL) {

//             return res.status(500).json({
//                 success: false,
//                 message: "Failed to create bKash payment",
//                 data: payment
//             });
//         }

//         // Save bKash payment ID
//         order.paymentID = payment.paymentID;

//         await order.save();

//         return res.json({
//             success: true,
//             paymentID: payment.paymentID,
//             bkashURL: payment.bkashURL
//         });

//     } catch (error) {

//         console.log("bKash payment error:", error.response?.data || error.message);

//         return res.status(500).json({
//             success: false,
//             message: "Failed to create bKash payment"
//         });
//     }
// };

// const bkashCallback = async (req, res) => {

//     try {

//         const {
//             paymentID,
//             status
//         } = req.query;

//         if (!paymentID) {
//             return res.redirect(
//                 `${process.env.FRONTEND_URL}/payment-failed`
//             );
//         }

//         if (status === "cancel") {

//             return res.redirect(
//                 `${process.env.FRONTEND_URL}/payment-cancel`
//             );
//         }

//         if (status === "failure") {

//             return res.redirect(
//                 `${process.env.FRONTEND_URL}/payment-failed`
//             );
//         }

//         if (status === "success") {

//             const result = await executePayment(paymentID);

//             console.log("bKash execute:", result);

//             if (
//                 result.statusCode === "0000" ||
//                 result.transactionStatus === "Completed"
//             ) {

//                 await orderModel.findOneAndUpdate(
//                     { paymentID },
//                     {
//                         paymentStatus: "paid",
//                         status: "processing",
//                         transactionID: result.trxID
//                     }
//                 );

//                 return res.redirect(
//                     `${process.env.FRONTEND_URL}/payment-success?verified=1`
//                 );
//             }
//         }

//         return res.redirect(
//             `${process.env.FRONTEND_URL}/payment-failed`
//         );

//     } catch (error) {

//         console.log(
//             "bKash callback error:",
//             error.response?.data || error.message
//         );

//         return res.redirect(
//             `${process.env.FRONTEND_URL}/payment-failed`
//         );
//     }
// };

// const allOrders = async (req, res) => {
//     try {
//         const orders = await orderModel.find({})
//         res.json({success:true, orders})

//     }
//     catch(error) {
//         console.log(error);
//         res.status(500).json({success:false, message:"Error fetching orders"})
//     }
// }

// const userOrders = async (req, res) => {
//     try {
//         const {userId} = req.body;
//         const orders = await orderModel.find({userId})
//         res.json({success:true, orders})
//     }
//     catch(error) {
//         console.log(error);
//         res.status(500).json({success:false, message:"Error fetching user orders"})
//     }
// }

// const updateStatus = async (req, res) => {
//     try {
//         const {orderId, status} = req.body;
//         await orderModel.findByIdAndUpdate(orderId, {status})
//         res.json({success:true, message:"Order status updated successfully"})
//     }
//     catch(error) {
//         console.log(error);
//         res.status(500).json({success:false, message:"Error updating order status"})
//     }
// }

// export { placeOrder, placeOrderBkash, bkashCallback, allOrders, userOrders, updateStatus }
