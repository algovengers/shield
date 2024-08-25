import dotenv from "dotenv"
dotenv.config()
import express from "express"
import { router } from "./routes/router";
import cors from 'cors'
import cookieParser from "cookie-parser"
import { authRouter } from "./routes/authRouter";
import { ClerkExpressRequireAuth, StrictAuthProp } from "@clerk/clerk-sdk-node";



const app = express();


declare global {
    namespace Express {
      interface Request extends StrictAuthProp {
        clerkId: string
      }
    }
  }

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use(cors(({credentials: true, origin: true})))


app.get('/hi',(req,res)=>{
    console.log("Hit")
    res.status(200).json({
        message: "HI"
    })
})

app.use("/api/v1",router)

app.use(ClerkExpressRequireAuth())

app.use('/api/v1',authRouter)

app.listen(8000,()=>{
    console.log("Server Started")
})