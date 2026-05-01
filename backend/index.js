import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import connectDb from "./config/connectDb.js";
import userRouter from "./route/user.route.js";
import cartRouter from "./route/cart.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ---------------- Middleware ---------------- */

app.use(cors({
    origin: true,
    credentials: true
}));


app.options(/.*/, cors());

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
    helmet({
        crossOriginResourcePolicy: false,
    })
);



const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "E-commerce API",
            version: "1.0.0",
            description: "API documentation for users and cart routes",
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ["./route/*.js"], // route folder scan করবে
};

const specs = swaggerJsdoc(options);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);


/* ---------------- Start Server ---------------- */

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log("🚀 Server running on port " + PORT);
        });
    })
    .catch((err) => {
        console.error("❌ Failed to connect to MongoDB:", err);
        process.exit(1);
    });



/* ---------------- Routes ---------------- */

app.get("/", (req, res) => {
    res.json({
        message: "Server started " + PORT,
    });
});

app.get("/home", (req, res) => {
    res.json({
        message: "Server started " + PORT,
    });
});

app.use("/api/users", userRouter);
// app.use("/api/cart", cartRouter);

