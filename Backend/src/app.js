import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

dotenv.config({
    path:"../.env",
});

app.use(cors());
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cookieParser());

export {
    app
}