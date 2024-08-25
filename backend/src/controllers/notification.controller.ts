import { RequireAuthProp } from "@clerk/clerk-sdk-node";
import { asyncHandler } from "../utils/asyncHandler";
import { getMydetails } from "./user.controller";
import { prisma } from "../utils/prisma";
import ApiResponse from "../utils/ApiResponse";
import { Response } from "express";

export const getNotifications = asyncHandler(async(req:RequireAuthProp<Request>,res: Response)=>{
    // we need two data
    // - favRequest
    // - sos

    //get user Details 

    const myData = await getMydetails((req.auth as any).clerkId);

    // get sos

    const data = await prisma.$transaction(async(prisma)=>{
        const myFav = await prisma.favUserlist.findMany({
            where: {
                userId: myData.id
            },
        })
        const myFavIds = myFav.map((fav)=>fav.favid)
        const mySos = await prisma.sOS.findMany({
            where: {
                userId: {
                    in: myFavIds
                }
            }
        })

        // get fav request

        const requests = await prisma.favRequest.findMany({
            where: {
                toId: myData.id
            }
        })
        return {
            mySos,
            requests
        }
    })

    res.status(200).json(new ApiResponse(200,data))
})