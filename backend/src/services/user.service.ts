import UserModel from "@/models/user.model";
import { User } from "../types";
import bcrypt from "bcrypt";
import { logger } from "@/utils/logger";
import { isValidObjectId } from "mongoose";

const SALT_ROUNDS = 10;

type Auth = {
  email: string;
  password: string;
};

type UserUpdate = Partial<Omit<User, "_id">>;

type ServiceError = {
  message: string;
  status: number;
};

const createError = (message: string, status: number): ServiceError => ({
  message,
  status,
});

const createNotFoundError = (identifier: string) =>
  createError(`User not found with identifier: ${identifier}`, 404);

const createInvalidCredentialsError = () =>
  createError("Invalid email or password", 401);

const hashPassword = async (password: string): Promise<string> =>
  bcrypt.hash(password, SALT_ROUNDS);

const validateObjectId = (id: string): ServiceError | null => {
  if (!isValidObjectId(id)) {
    return createError(`Invalid ID format: ${id}`, 400);
  }
  return null;
};

export const createUser = async (user: User): Promise<User | ServiceError> => {
  try {
    const existingUser = await UserModel.findOne({ email: user.email });
    if (existingUser) {
      return createError("Email already exists", 409);
    }

    const hashedPassword = await hashPassword(user.password);
    const result = await UserModel.create({
      ...user,
      password: hashedPassword,
    });

    logger.info(`User created with ID: ${result.id}`);
    return result;
  } catch (error) {
    logger.error(`Error creating user: ${error}`);
    return createError("Failed to create user", 500);
  }
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const users = await UserModel.find().select("-password");
    logger.info(`Retrieved ${users.length} users`);
    return users;
  } catch (error) {
    logger.error(`Error getting users: ${error}`);
    throw createError("Failed to fetch users", 500);
  }
};

export const getUserById = async (
  userId: string
): Promise<User | ServiceError> => {
  try {
    const validationError = validateObjectId(userId);
    if (validationError) return validationError;

    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      return createNotFoundError(userId);
    }

    return user;
  } catch (error) {
    logger.error(`Error getting user by ID: ${error}`);
    return createError("Failed to fetch user", 500);
  }
};

export const getUserCredentials = async ({
  email,
  password,
}: Auth): Promise<User | ServiceError> => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return createInvalidCredentialsError();
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return createInvalidCredentialsError();
    }

    logger.info(`User authenticated: ${email}`);
    return user;
  } catch (error) {
    logger.error(`Error authenticating user: ${error}`);
    return createError("Authentication failed", 500);
  }
};

export const getUserByEmail = async (
  email: string
): Promise<User | ServiceError> => {
  try {
    const user = await UserModel.findOne({ email }).select("-password");
    if (!user) {
      return createNotFoundError(email);
    }

    return user;
  } catch (error) {
    logger.error(`Error getting user by email: ${error}`);
    return createError("Failed to fetch user", 500);
  }
};

export const updateUser = async (
  userId: string,
  updateData: UserUpdate
): Promise<User | ServiceError> => {
  try {
    const validationError = validateObjectId(userId);
    if (validationError) return validationError;

    // Check email uniqueness if updating email
    if (updateData.email) {
      const existingUser = await UserModel.findOne({
        email: updateData.email,
        _id: { $ne: userId },
      });
      if (existingUser) {
        return createError("Email already exists", 409);
      }
    }

    const finalUpdateData = updateData.password
      ? { ...updateData, password: await hashPassword(updateData.password) }
      : updateData;

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: finalUpdateData },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return createNotFoundError(userId);
    }

    logger.info(`User updated: ${userId}`);
    return updatedUser;
  } catch (error) {
    logger.error(`Error updating user: ${error}`);
    return createError("Failed to update user", 500);
  }
};

export const deleteUser = async (
  userId: string
): Promise<true | ServiceError> => {
  try {
    const validationError = validateObjectId(userId);
    if (validationError) return validationError;

    const result = await UserModel.findByIdAndDelete(userId);
    if (!result) {
      return createNotFoundError(userId);
    }

    logger.info(`User deleted: ${userId}`);
    return true;
  } catch (error) {
    logger.error(`Error deleting user: ${error}`);
    return createError("Failed to delete user", 500);
  }
};

export const isUserExist = async (userId: string): Promise<boolean> => {
  try {
    const validationError = validateObjectId(userId);
    if (validationError) return false;

    const user = await UserModel.exists({ _id: userId });
    return !!user;
  } catch (error) {
    logger.error(`Error checking user existence: ${error}`);
    return false;
  }
};

export const isEmailExist = async (email: string): Promise<boolean> => {
  try {
    const user = await UserModel.exists({ email });
    return !!user;
  } catch (error) {
    logger.error(`Error checking email existence: ${error}`);
    return false;
  }
};
