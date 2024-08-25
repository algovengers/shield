import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { prisma, exclude } from "../utils/prisma";
import ApiResponse from "../utils/ApiResponse";
import z from "zod";
import { RequireAuthProp } from "@clerk/clerk-sdk-node";


const signup_user_schema = z.object({
  name: z.string(),
  email: z.string(),
  clerkId: z.string()
})


const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const raw_data = req.body
  console.log(raw_data)
  const data = signup_user_schema.parse(raw_data)
  await prisma.user.create({
    data: {
      name: data.name,
      emailId: data.email,
      clerkId: data.clerkId,
      status : "pending"
      
    }
  })
  return res.status(200).json(new ApiResponse(200, "user Sucessfully created"));
});

const getUsers = asyncHandler(async(req: Request, res: Response)=>{
  // const data = (req.auth as any).clerkId
  const query = req.query.q
  
  const resp = await prisma.user.findMany({
    where: {
      name: {
        contains: String(query),
        mode: "insensitive"
      }

    }
  })
  res.status(200).json(new ApiResponse(200,resp))
})

const getMydetails = async(clerkId: string)=>{
  const data = await prisma.user.findFirst({
    where: {
      clerkId
    }
  })
  return data;
}

export {registerUser,getUsers,getMydetails}
