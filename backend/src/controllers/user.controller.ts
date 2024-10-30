import { User } from "@/types";
import {
  validateCredential,
  validateUser,
  validateUserUpdate,
} from "@/validations/user.validation";
import { Request, Response } from "express";
import * as userModel from "../services/user.service";
import { generateJwtToken } from "@/utils/jwt";
import { MongooseError } from "mongoose";
import { env } from "@/config/env";

const sendResponse = <T>(res: Response, data: T, statusCode: number = 200) => {
  res.status(statusCode).json(data);
};

export async function addUser(req: Request, res: Response): Promise<void> {
  try {
    const user: User = req.body;

    const { error, value } = validateUser(user);

    if (error) {
      return sendResponse(
        res,
        { error: error.details.map((d) => d.message).join(", ") },
        422
      );
    }

    const isEmailTaken = await userModel.isEmailExist(value.email);

    if (isEmailTaken) {
      return sendResponse(res, { error: "Email already exist" }, 409);
    }

    const newUser = await userModel.createUser(user);

    return sendResponse(res, { data: newUser }, 201);
  } catch (error) {
    console.error("Error adding user:", error);
    if (error instanceof MongooseError) {
      return sendResponse(res, { error: "Database error occurred" }, 500);
    }
    return sendResponse(res, { error: "Internal server error" }, 500);
  }
}

export async function loginUser(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    const { error } = validateCredential({ email, password });

    if (error) {
      return sendResponse(
        res,
        { error: error.details.map((d) => d.message).join(", ") },
        422
      );
    }

    const user = await userModel.getUserCredentials({ email, password });

    if (!user) {
      return sendResponse(res, { error: "Invalid login credentials" }, 401);
    }

    const token = await generateJwtToken(user);

    res
      .cookie("Bearer", token, {
        maxAge: env.SESSION_MAX_AGE,
        httpOnly: true,
        secure: env.isProduction,
        sameSite: "strict",
      })
      .json({ data: user, message: "Successfuly logged in!" });
  } catch (error) {
    console.log("Login error: ", error);
    if (error instanceof MongooseError) {
      return sendResponse(res, { error: "Database error occurred" }, 500);
    }
    return sendResponse(res, { error: "Internal server error" }, 500);
  }
}

export async function logoutUser(_: Request, res: Response) {
  try {
    res.clearCookie("Bearer", {
      httpOnly: true,
      secure: env.isProduction,
      sameSite: "strict",
    });

    sendResponse(res, { message: "Successefully logged out!" }, 200);
  } catch (error) {
    console.log("Logout error: ", error);
    if (error instanceof MongooseError) {
      return sendResponse(res, { error: "Database error occurred" }, 500);
    }
    return sendResponse(res, { error: "Internal server error" }, 500);
  }
}

export async function getUsers(_: Request, res: Response): Promise<void> {
  try {
    const users = await userModel.getUsers();
    sendResponse(res, { data: users }, 200);
  } catch (error) {
    console.log("Error fetching users: ", error);
    if (error instanceof MongooseError) {
      return sendResponse(res, { error: "Database error occurred" }, 500);
    }
    return sendResponse(res, { error: "Internal server error" }, 500);
  }
}

export async function getUserById(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.id;

    if (!userId) {
      return sendResponse(res, { error: "Invalid suer ID" }, 400);
    }

    const isUserExist = await userModel.isUserExist(userId);

    if (!isUserExist) {
      return sendResponse(res, { error: "User does not exist" }, 404);
    }
    const user = await userModel.getUserById(userId);

    return sendResponse(res, { data: user }, 200);
  } catch (error) {
    console.log("Cannot get user: ", error);
    if (error instanceof MongooseError) {
      return sendResponse(res, { error: "Database error occurred" }, 500);
    }
    return sendResponse(res, { error: "Internal server error" }, 500);
  }
}

export async function updateUser(req: Request, res: Response): Promise<void> {
  try {
    const dataToUpdate = req.body;
    const userId = req.userId;
    const { error } = validateUserUpdate(dataToUpdate);

    if (error) {
      return sendResponse(
        res,
        {
          error: error.details.map((d) => d.message).join(", "),
        },
        422
      );
    } else if (!userId) {
      return sendResponse(
        res,
        { error: "Authorization error, invalid ID" },
        401
      );
    }
    const updatedUser = await userModel.updateUser(userId, dataToUpdate);

    return sendResponse(res, { data: updatedUser }, 200);
  } catch (error) {
    console.error("Error Updating user:", error);
    if (error instanceof MongooseError) {
      return sendResponse(res, { error: "Database error occurred" }, 500);
    }
    return sendResponse(res, { error: "Internal server error" }, 500);
  }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  try {
    const { userId } = req;

    if (!userId) {
      return sendResponse(res, { error: "User Id is missing" }, 400);
    }

    const exisitingUser = await userModel.isUserExist(userId);

    if (!exisitingUser) {
      return sendResponse(res, { error: "User does not exisit" }, 404);
    }

    const deletedUser = await userModel.deleteUser(userId);

    if (!deletedUser) {
      return sendResponse(res, { error: "Failed to delete user" }, 500);
    }

    return sendResponse(res, { message: "Successfullly deleted user" }, 204);
  } catch (error) {
    console.error("Error deleting user:", error);
    if (error instanceof MongooseError) {
      return sendResponse(res, { error: "Database error occurred" }, 500);
    }
    return sendResponse(res, { error: "Internal server error" }, 500);
  }
}
