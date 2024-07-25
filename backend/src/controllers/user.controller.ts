import { User } from '@/types';
import {
  validateCredential,
  validateUser,
  validateUserRole,
  validateUserUpdate,
} from '@/validations/user.validator';
import { Request, Response } from 'express';
import * as userModel from '../models/user.model';
import { generateJwtToken } from '@/utils/jwt';
import { env } from '@/config/env';
import { DatabaseError } from 'pg';

const handleSuccess = <T>(res: Response, data: T, statusCode: number = 200) => {
  res.status(statusCode).json(data);
};
const handleFailure = <T>(res: Response, data: T, statusCode: number) => {
  res.status(statusCode).json(data);
};

export async function addUser(req: Request, res: Response): Promise<void> {
  try {
    const user: User = req.body;
    const { error } = validateUser(user);

    if (error) {
      return handleFailure(
        res,
        { error: error.details.map((d) => d.message).join(', ') },
        422
      );
    }

    const isEmailTaken = await userModel.isEmailExist(user.email);

    if (isEmailTaken) {
      return handleFailure(res, { error: 'Email already exist' }, 409);
    }

    const newUser = await userModel.createUser(user);

    return handleSuccess(res, { data: newUser }, 201);
  } catch (error) {
    console.error('Error adding user:', error);
    if (error instanceof DatabaseError) {
      return handleFailure(res, { error: 'Database error occurred' }, 500);
    }
    return handleFailure(res, { error: 'Internal server error' }, 500);
  }
}
export async function loginUser(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    const { error } = validateCredential({ email, password });

    if (error) {
      return handleFailure(
        res,
        { error: error.details.map((d) => d.message).join(', ') },
        422
      );
    }

    const user = await userModel.getUser({ email, password });

    if (!user) {
      return handleFailure(res, { error: 'Invalid login credentials' }, 401);
    }

    const token = await generateJwtToken(user);

    res
      .cookie('Bearer', token, {
        maxAge: process.env.SESSION_MAX_AGE,
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
        sameSite: 'strict',
      })
      .json({ data: user, message: 'Successfuly logged in!' });
  } catch (error) {
    console.log('Login error: ', error);
    if (error instanceof DatabaseError) {
      return handleFailure(res, { error: 'Database error occurred' }, 500);
    }
    return handleFailure(res, { error: 'Internal server error' }, 500);
  }
}

export async function logoutUser(_: Request, res: Response) {
  try {
    res.clearCookie('Bearer', {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: 'strict',
    });

    handleSuccess(res, { message: 'Successefully logged out!' }, 200);
  } catch (error) {
    console.log('Logout error: ', error);
    if (error instanceof DatabaseError) {
      return handleFailure(res, { error: 'Database error occurred' }, 500);
    }
    return handleFailure(res, { error: 'Internal server error' }, 500);
  }
}

export async function getUsers(_: Request, res: Response): Promise<void> {
  try {
    const users = await userModel.getUsers();
    handleSuccess(res, { data: users }, 200);
  } catch (error) {
    console.log('Error fetching users: ', error);
    if (error instanceof DatabaseError) {
      return handleFailure(res, { error: 'Database error occurred' }, 500);
    }
    return handleFailure(res, { error: 'Internal server error' }, 500);
  }
}

export async function getUserById(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.id;

    if (!userId) {
      return handleFailure(res, { error: 'Invalid suer ID' }, 400);
    }

    const isUserExist = await userModel.isUserExist(userId);

    if (!isUserExist) {
      return handleFailure(res, { error: 'User does not exist' }, 404);
    }
    const user = await userModel.getUserById(userId);

    return handleSuccess(res, { data: user }, 200);
  } catch (error) {
    console.log('Cannot get user: ', error);
    if (error instanceof DatabaseError) {
      return handleFailure(res, { error: 'Database error occurred' }, 500);
    }
    return handleFailure(res, { error: 'Internal server error' }, 500);
  }
}

export async function updateUser(req: Request, res: Response): Promise<void> {
  try {
    const dataToUpdate = req.body;
    const userId = req.userId;
    const { error } = validateUserUpdate(dataToUpdate);

    if (error) {
      return handleFailure(
        res,
        {
          error: error.details.map((d) => d.message).join(', '),
        },
        422
      );
    } else if (!userId) {
      return handleFailure(
        res,
        { error: 'Authorization error, invalid ID' },
        401
      );
    }
    const updatedUser = await userModel.updateUser(userId, dataToUpdate);

    return handleSuccess(res, { data: updatedUser }, 200);
  } catch (error) {
    console.error('Error Updating user:', error);
    if (error instanceof DatabaseError) {
      return handleFailure(res, { error: 'Database error occurred' }, 500);
    }
    return handleFailure(res, { error: 'Internal server error' }, 500);
  }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  try {
    const { userId } = req;

    if (!userId) {
      return handleFailure(res, { error: 'User Id is missing' }, 400);
    }

    const exisitingUser = await userModel.isUserExist(userId);

    if (!exisitingUser) {
      return handleFailure(res, { error: 'User does not exisit' }, 404);
    }

    const deletedUser = await userModel.deleteUser(userId);

    if (!deletedUser) {
      return handleFailure(res, { error: 'Failed to delete user' }, 500);
    }

    return handleSuccess(res, { message: 'Successfullly deleted user' }, 204);
  } catch (error) {
    console.error('Error deleting user:', error);
    if (error instanceof DatabaseError) {
      return handleFailure(res, { error: 'Database error occurred' }, 500);
    }
    return handleFailure(res, { error: 'Internal server error' }, 500);
  }
}

export async function updateUserRole(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const userId = req.params.id;
    const { role } = req.body;

    const { error, value } = validateUserRole({ userId, role });

    if (error) {
      return handleFailure(
        res,
        { error: error.details.map((d) => d.message).join(', ') },
        422
      );
    }

    const updatedRole = await userModel.updateRole(value);

    if (!updatedRole) {
      return handleFailure(res, { error: 'Failed to update user role' }, 500);
    }

    return handleSuccess(
      res,
      { message: 'Successfully updated user role' },
      200
    );
  } catch (error) {
    console.error('Error updating user role', error);
    if (error instanceof DatabaseError) {
      return handleFailure(res, { error: 'Database error!' }, 500);
    }
    return handleFailure(res, { error: 'Internal server error' }, 500);
  }
}
