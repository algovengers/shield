import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { prisma, exclude } from "../utils/prisma";
import ApiResponse from "../utils/ApiResponse";
import jwt from "jsonwebtoken";

const generateAccessToken: (
  id: string,
  username: string
) => string = (id: string, username: string) => {
  return jwt.sign(
    {
      id,
      username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
};
const generateRefreshToken: (id: string) => string = (id: string) => {
  return jwt.sign(
    {
      id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "10d",
    }
  );
};

const registerAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { password, username } = req.body;

  if (!password || !username) {
    throw new ApiError(401, "All feilds required");
  }

  const userExists = await prisma.admin.findFirst({ where: { username } });

  if (userExists) {
    throw new ApiError(400, "Admin Already Exists");
  }

  const newAdmin = await prisma.admin.create({
    data: { username, password },
  });

  return res.status(200).json(new ApiResponse(200, "Admin Sucessfully created"));
});

const loginAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ApiError(401, "All feilds are required");
  }

  const userExists = await prisma.admin.findFirst({
    where: { username, password },
  });

  if (!userExists) {
    throw new ApiError(401, "Invalid email or Password");
  }

  const refreshToken = generateRefreshToken(userExists.id);
  const accessToken = generateAccessToken(
    userExists.id,
    userExists.username,
  );

  // updateToken
  const updatedToken = prisma.admin.update({
    where: { id: userExists.id },
    data: { refreshToken },
  });

  const updatedAdmin = await prisma.admin.findFirst({
    where: { username },
  });

  const filteredAdmin = exclude(updatedAdmin, ["password", "refreshToken"]);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          accessToken,
          refreshToken,
          user: filteredAdmin,
        },
        "admin logged in"
      )
    );
});


const logoutAdmin = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.user)
  const user = await prisma.admin.update({
    where: { id: req.user.id },
    data: { refreshToken: null },
  });
  if (!user) {
    throw new ApiError(401, "Unauthorised Request");
  }
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Admin logged Out"));
});

export { registerAdmin, loginAdmin, logoutAdmin };
