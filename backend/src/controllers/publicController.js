import { query } from '../config/db.js';
import { created, ok } from '../utils/response.js';

export const getWebsiteData = async (req, res, next) => {
  try {
    const notices = await query('SELECT id, title, content, published_at FROM notices ORDER BY published_at DESC LIMIT 6');
    const events = await query('SELECT id, title, event_date, description FROM events ORDER BY event_date DESC LIMIT 6');
    const faculty = await query('SELECT id, full_name, qualification, subject_specialization FROM teachers LIMIT 12');
    const gallery = await query('SELECT id, media_type, media_url, caption FROM gallery ORDER BY created_at DESC LIMIT 12');
    return ok(res, { notices, events, faculty, gallery });
  } catch (error) {
    return next(error);
  }
};

export const submitAdmission = async (req, res, next) => {
  try {
    const { student_name, parent_name, email, phone, class_applied } = req.body;
    const doc = req.file ? req.file.path : null;
    const result = await query(
      `INSERT INTO admissions (student_name, parent_name, email, phone, class_applied, document_path, status)
       VALUES (:student_name, :parent_name, :email, :phone, :class_applied, :doc, 'pending')`,
      { student_name, parent_name, email, phone, class_applied, doc }
    );
    return created(res, { id: result.insertId }, 'Admission submitted');
  } catch (error) {
    return next(error);
  }
};

export const submitContact = async (req, res, next) => {
  try {
    await query(
      'INSERT INTO contacts (name, email, message) VALUES (:name, :email, :message)',
      req.body
    );
    return ok(res, {}, 'Message received');
  } catch (error) {
    return next(error);
  }
};
