import { Router } from 'express';
import {
  createEntity,
  deleteEntity,
  getAnalytics,
  listEntity,
  reviewAdmission,
  updateEntity
} from '../controllers/adminController.js';
import { authorize, protect } from '../middleware/auth.js';

const router = Router();
const secured = [protect, authorize('admin')];

router.get('/analytics', ...secured, getAnalytics);

const entities = ['students', 'teachers', 'classes', 'attendance', 'results', 'fees', 'notices', 'assignments', 'gallery', 'events'];
for (const entity of entities) {
  router.get(`/${entity}`, ...secured, listEntity(entity));
  router.post(`/${entity}`, ...secured, createEntity(entity));
  router.put(`/${entity}/:id`, ...secured, updateEntity(entity));
  router.delete(`/${entity}/:id`, ...secured, deleteEntity(entity));
}

router.patch('/admissions/:id/review', ...secured, reviewAdmission);

export default router;
