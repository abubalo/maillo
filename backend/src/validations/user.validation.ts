import Joi from 'joi';
import { User } from '../types';

const userSchema = Joi.object({
  id: Joi.alternatives().try(Joi.string(), Joi.number()).optional(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const validateUser = (user: Partial<User>): Joi.ValidationResult => {
  return userSchema.validate(user, { abortEarly: false });
};

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const validateCredential = (
  user: Pick<User, 'email' | 'password'>
): Joi.ValidationResult => {
  return loginSchema.validate(user, { abortEarly: false });
};

const userUpdateSchema = Joi.object({
  email: Joi.string().email(),
  firstName: Joi.string().min(2),
  lastName: Joi.string().min(2),
}).min(1);

export const validateUserUpdate = (
  updateData: Partial<User>
): Joi.ValidationResult => {
  return userUpdateSchema.validate(updateData, { abortEarly: false });
};

const roleSchema = Joi.object({
  userId: Joi.string().required(),
  role: Joi.string().valid('regular', 'admin', 'super-admin').required(),
});

export const validateUserRole = (updates: Role): Joi.ValidationResult => {
  return roleSchema.validate(updates, { abortEarly: false });
};
