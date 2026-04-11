import { Router } from 'express';
import { addAssignment, getTeacherDashboard, markAttendance } from '../controllers/teacherController.js';
import { upload } from '../config/upload.js';
import { authorize, protect } from '../middleware/auth.js';

const router = Router();

router.get('/dashboard', protect, authorize('teacher'), getTeacherDashboard);
router.post('/attendance', protect, authorize('teacher'), markAttendance);
router.post('/assignments', protect, authorize('teacher'), upload.single('file'), addAssignment);

export default router;
