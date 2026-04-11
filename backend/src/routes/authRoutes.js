import { Router } from 'express';
import { body } from 'express-validator';
import {
  forgotPassword,
  login,
  loginValidation,
  me,
  register,
  registerValidation,
  resetPassword
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';

const router = Router();

router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.get('/me', protect, me);
router.post('/forgot-password', body('email').isEmail(), validate, forgotPassword);
router.post('/reset-password', [body('token').notEmpty(), body('password').isLength({ min: 8 })], validate, resetPassword);

export default router;
