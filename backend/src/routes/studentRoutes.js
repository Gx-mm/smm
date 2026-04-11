import { Router } from 'express';
import { getStudentDashboard } from '../controllers/studentController.js';
import { authorize, protect } from '../middleware/auth.js';

const router = Router();

router.get('/dashboard', protect, authorize('student'), getStudentDashboard);

export default router;
