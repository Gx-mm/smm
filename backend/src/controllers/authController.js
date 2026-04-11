import crypto from 'crypto';
import { body } from 'express-validator';
import {
  createUser,
  findUserByEmail,
  findUserById,
  findValidResetToken,
  saveResetToken,
  verifyPassword,
  consumeResetTokenAndSetPassword
} from '../models/userModel.js';
import { signToken } from '../services/tokenService.js';
import { sendResetEmail } from '../services/emailService.js';
import { created, fail, ok } from '../utils/response.js';

export const registerValidation = [
  body('name').trim().isLength({ min: 2 }),
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('role').isIn(['student', 'teacher', 'admin'])
];

export const loginValidation = [body('email').isEmail(), body('password').notEmpty()];

export const register = async (req, res, next) => {
  try {
    const exists = await findUserByEmail(req.body.email);
    if (exists) return fail(res, 409, 'Email already registered');

    const userId = await createUser(req.body);
    const user = await findUserById(userId);
    const token = signToken(user);
    return created(res, { token, user }, 'User created');
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await findUserByEmail(req.body.email);
    if (!user || user.status !== 'active') return fail(res, 401, 'Invalid credentials');

    const passwordOk = await verifyPassword(req.body.password, user.password);
    if (!passwordOk) return fail(res, 401, 'Invalid credentials');

    const token = signToken(user);
    delete user.password;
    return ok(res, { token, user }, 'Logged in');
  } catch (error) {
    return next(error);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = await findUserById(req.user.id);
    return ok(res, user);
  } catch (error) {
    return next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const user = await findUserByEmail(req.body.email);
    if (!user) return ok(res, {}, 'If this email exists, a reset link has been sent');

    const token = crypto.randomBytes(24).toString('hex');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 30);
    await saveResetToken({ userId: user.id, token, expiresAt });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await sendResetEmail(user.email, resetLink);

    return ok(res, {}, 'If this email exists, a reset link has been sent');
  } catch (error) {
    return next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const tokenData = await findValidResetToken(req.body.token);
    if (!tokenData) return fail(res, 400, 'Invalid or expired token');

    await consumeResetTokenAndSetPassword({
      resetId: tokenData.id,
      userId: tokenData.user_id,
      newPassword: req.body.password
    });

    return ok(res, {}, 'Password reset successful');
  } catch (error) {
    return next(error);
  }
};
