import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDb from "./config/connectDb.js";

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





