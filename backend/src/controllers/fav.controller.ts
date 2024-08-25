import { RequireAuthProp } from "@clerk/clerk-sdk-node";
import { asyncHandler } from "../utils/asyncHandler";
import { Response } from "express";
import z from "zod";
import { prisma } from "../utils/prisma";
import ApiResponse from "../utils/ApiResponse";
import { getMydetails } from "./user.controller";

export const accpetFavRequest = asyncHandler(async(req:RequireAuthProp<Request>,res: Response)=>{
    const data = z.object({
        favRequestId: z.string(),
        name: z.string(),
        email: z.string()
    }).parse(req.body)

    const resp = await prisma.$transaction(async(prisma)=>{

        await prisma.favRequest.update({
            where: {
                id: data.favRequestId
            },
            data:{
                state: "accepted"
            }
        })

        const getUser = await prisma.user.findFirst({
            where: {
                name: data.name,
                emailId: data.email
            }
        })
        const myDetails = await prisma.user.findFirst({
            where: {
                clerkId: (req.auth as any).clerkId,
            }
        })
        const resData = await prisma.favUserlist.create({
            data: {
                userId: myDetails.id,
                favid: getUser.id
            }
        })
        await prisma.favUserlist.create({
            data: {
                userId: getUser.id,
                favid: myDetails.id
            }
        })
        return resData
    })
    res.status(200).json(new ApiResponse(200,resp));
})

export const declineFavRequest = asyncHandler(async(req:RequireAuthProp<Request>,res: Response)=>{
    const {favRequestId} = z.object({favRequestId: z.string()}).parse(req.body)

    const myDetails =await getMydetails((req.auth as any).clerkId)

    await prisma.favRequest.update({
        where: {
            id: favRequestId,
            toId: myDetails.id          

        },
        data: {
            state: "declined"
        }
    })
    res.status(200).json(new ApiResponse(200));
})

export const createFavRequest = asyncHandler(async(req:RequireAuthProp<Request>,res: Response)=>{
    const data = z.object({
        clerkId: z.string()
    }).parse(req.body)

    const clerkId = req.auth.userId

    const getUser = await prisma.user.findFirst({
        where: {
            clerkId: data.clerkId
        }
    })
    const myDetails = await prisma.user.findFirst({
        where: {
            clerkId: clerkId,
        }
    })

    const favReq = await prisma.favRequest.create({
        data: {
            toId: getUser.id,
            fromId: myDetails.id,
            state: "pending"
        }
    })

    res.status(200).json(new ApiResponse(200,favReq))
})

export const addFavNonUser = asyncHandler(async(req:RequireAuthProp<Request>,res: Response)=>{
    const clerkId = (req.auth as any).clerkId
    const data = z.object({
        email: z.string().optional(),
        phone: z.string().optional(),
        name: z.string()
    }).parse(req.body)


    const myDetails = await prisma.user.findFirst({
        where: {
            clerkId: clerkId,
        }
    })

    const resp = await prisma.favNonUserlist.create({
        data: {
            name: data.name,
            email: data.email,
            userId: myDetails.id
        }
    })
    
    res.status(200).json(new ApiResponse(200,resp))
})

