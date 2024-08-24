import { RequireAuthProp } from "@clerk/clerk-sdk-node";
import { asyncHandler } from "../utils/asyncHandler";
import { Response } from "express";


export const createSos = asyncHandler(async(req: RequireAuthProp<Request>, res: Response)=>{
    console.log(req.auth)

    res.status(200).json({
        message: "hi"
    })
})