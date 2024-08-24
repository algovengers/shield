import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { exclude, prisma } from "../utils/prisma";



export const authenticateAdmin = asyncHandler(async(req: Request, res: Response, next: NextFunction) =>{
    const accessToken = req.cookies?.accessToken ?? req.headers["authorization"].replace("Bearer ","")

    if(!accessToken){
        throw new ApiError(401,"Unauthorized request")
    }
    const decodedToken = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET) as JwtPayload
    const user = await prisma.admin.findFirst({where : {id: decodedToken?.id}})
    if(!user){
        throw new ApiError(401,"Unauthorized request")
    }
    
    const fileredUser = exclude(user,["password","refreshToken"])
    req.user = user
    next()
})

// export const authenticateUser = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{

// })