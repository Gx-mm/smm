import { Router } from 'express';
import { createPaymentIntent, paymentHistory, recordPayment } from '../controllers/paymentController.js';
import { authorize, protect } from '../middleware/auth.js';

const router = Router();

router.post('/intent', protect, authorize('student'), createPaymentIntent);
router.post('/record', protect, authorize('student'), recordPayment);
router.get('/history', protect, authorize('student'), paymentHistory);

export default router;
