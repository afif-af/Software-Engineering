import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";s
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";



import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

conectDb();
connectCloudinary();


app.use(cors({
    origin: true,
    credentials: true}
));
app.options(/.*/, cors());
app.use(express.json());

app.use(cookieParser());
app.use(morgan("dev"));
app.use(
    helmet({
    crossOriginResourcePolicy: false
}));

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "E-commerce API",
            version: "1.0.0",
            description: "API documentation for the E-commerce application",
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
        ],
    },
    apis: ["./routes/*.js"],    
}


connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    });


app.get("/", (req, res) => {
    res.send("Welcome to the E-commerce API");
});



app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);



