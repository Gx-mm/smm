import { Router } from 'express';
import { body } from 'express-validator';
import { getWebsiteData, submitAdmission, submitContact } from '../controllers/publicController.js';
import { upload } from '../config/upload.js';
import { validate } from '../middleware/validation.js';

const router = Router();

router.get('/website-data', getWebsiteData);
router.post(
  '/admission',
  upload.single('document'),
  [body('student_name').notEmpty(), body('parent_name').notEmpty(), body('email').isEmail(), body('class_applied').notEmpty()],
  validate,
  submitAdmission
);
router.post('/contact', [body('name').notEmpty(), body('email').isEmail(), body('message').isLength({ min: 10 })], validate, submitContact);

export default router;
