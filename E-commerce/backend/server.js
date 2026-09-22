import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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


