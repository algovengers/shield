import { RequireAuthProp } from "@clerk/clerk-sdk-node";
import { asyncHandler } from "../utils/asyncHandler";
import { Response, Request } from "express";
import { prisma } from "utils/prisma";
import { User } from "@prisma/client";
import { z } from "zod";
import ApiResponse from "utils/ApiResponse";

export const createSos = asyncHandler(
  async (req: RequireAuthProp<Request>, res: Response) => {
    console.log(req.auth);
    const data = req.auth as any;
    const query = z
      .object({
        location: z.string(),
      })
      .parse(req.query);

    try {
      const user: User = await prisma.user.findUnique({
        where: {
          clerkId: data.clerkId,
        },
      });
      if (!user) {
        return res
          .status(500)
          .json(new ApiResponse(500, { error: "Internal Server Error" }));
      }
      const resp = await prisma.sOS.create({
        data: {
          userId: user.id,
          location: String(query?.location),
          datetime: new Date(),
          status: "pending",
        },
      });
      if (!resp) {
        return res
          .status(500)
          .json(new ApiResponse(500, { error: "Internal Server Error" }));
      }
      res.status(201).json(new ApiResponse(201, { status: "success" }));
    } catch (err) {
      res
        .status(500)
        .json(new ApiResponse(500, { error: "Internal Server Error" }));
    }
  }
);

export const getSos = asyncHandler(
  async (req: RequireAuthProp<Request>, res: Response) => {
    try {
      const resp = await prisma.sOS.findMany({
        orderBy: {
          datetime: "desc",
        },
      });
      if (!resp) {
        res
          .status(500)
          .json(new ApiResponse(500, { error: "Internal Server Error" }));
      }
      res
        .status(200)
        .json(new ApiResponse(200, { status: "success", data: resp }));
    } catch (err) {
      res
        .status(500)
        .json(new ApiResponse(500, { error: "Internal Server Error" }));
    }
  }
);
