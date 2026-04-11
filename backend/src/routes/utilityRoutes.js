import { Router } from 'express';
import { chatbot, dictionary } from '../controllers/utilityController.js';

const router = Router();

router.post('/chatbot', chatbot);
router.get('/i18n/:lang', dictionary);

export default router;
