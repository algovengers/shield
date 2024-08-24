import dotenv from "dotenv"
dotenv.config()
import express from "express"
import { router } from "./routes/router";
import cors from 'cors'
import cookieParser from "cookie-parser"

const app = express();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use(cors(({credentials: true, origin: true})))

app.use("/api/v1",router)

app.listen(8000,()=>{
    console.log("Server Started")
})