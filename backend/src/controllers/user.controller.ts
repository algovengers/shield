import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { prisma, exclude } from "../utils/prisma";
import ApiResponse from "../utils/ApiResponse";
import z from "zod";


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

export {registerUser}
