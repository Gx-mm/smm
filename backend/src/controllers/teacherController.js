import { query } from '../config/db.js';
import { created, ok } from '../utils/response.js';

export const getTeacherDashboard = async (req, res, next) => {
  try {
    const teacherId = req.user.id;
    const [profile] = await query('SELECT * FROM teachers WHERE user_id = :teacherId', { teacherId });
    const classes = await query('SELECT id, class_name, section FROM classes WHERE class_teacher_id = :teacherId', { teacherId });
    const assignments = await query('SELECT id, title, due_date FROM assignments WHERE teacher_id = :teacherId ORDER BY created_at DESC LIMIT 20', { teacherId });
    return ok(res, { profile, classes, assignments });
  } catch (error) {
    return next(error);
  }
};

export const markAttendance = async (req, res, next) => {
  try {
    const { entries } = req.body;
    for (const entry of entries) {
      await query(
        `INSERT INTO attendance (student_id, class_id, date, status, marked_by)
         VALUES (:student_id, :class_id, :date, :status, :marked_by)
         ON DUPLICATE KEY UPDATE status=:status, marked_by=:marked_by`,
        { ...entry, marked_by: req.user.id }
      );
    }
    return ok(res, {}, 'Attendance saved');
  } catch (error) {
    return next(error);
  }
};

export const addAssignment = async (req, res, next) => {
  try {
    const payload = { ...req.body, teacher_id: req.user.id, file_url: req.file?.path || null };
    const result = await query(
      `INSERT INTO assignments (class_id, teacher_id, title, description, due_date, file_url)
       VALUES (:class_id, :teacher_id, :title, :description, :due_date, :file_url)`,
      payload
    );
    return created(res, { id: result.insertId }, 'Assignment uploaded');
  } catch (error) {
    return next(error);
  }
};
