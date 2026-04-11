import { query } from '../config/db.js';
import { ok } from '../utils/response.js';

export const getStudentDashboard = async (req, res, next) => {
  try {
    const studentId = req.user.id;
    const [profile] = await query('SELECT * FROM students WHERE user_id = :studentId', { studentId });
    const attendance = await query('SELECT date, status FROM attendance WHERE student_id = :studentId ORDER BY date DESC LIMIT 30', { studentId });
    const results = await query('SELECT subject, exam_type, marks_obtained, max_marks FROM results WHERE student_id = :studentId ORDER BY exam_date DESC', { studentId });
    const fees = await query('SELECT term, amount_due, due_date, status FROM fees WHERE student_id = :studentId ORDER BY due_date DESC', { studentId });
    const assignments = await query('SELECT id, title, due_date, file_url FROM assignments WHERE class_id = :classId ORDER BY due_date DESC LIMIT 10', { classId: profile?.class_id || 0 });
    const notices = await query('SELECT id, title, content FROM notices ORDER BY published_at DESC LIMIT 10');

    return ok(res, { profile, attendance, results, fees, assignments, notices });
  } catch (error) {
    return next(error);
  }
};
