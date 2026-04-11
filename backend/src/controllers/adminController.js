import { query } from '../config/db.js';
import { created, ok } from '../utils/response.js';

export const getAnalytics = async (req, res, next) => {
  try {
    const [studentCount] = await query('SELECT COUNT(*) total FROM students');
    const [teacherCount] = await query('SELECT COUNT(*) total FROM teachers');
    const [pendingAdmissions] = await query("SELECT COUNT(*) total FROM admissions WHERE status='pending'");
    const [monthlyCollection] = await query(
      'SELECT COALESCE(SUM(amount),0) total FROM payments WHERE MONTH(payment_date)=MONTH(CURRENT_DATE()) AND YEAR(payment_date)=YEAR(CURRENT_DATE())'
    );
    return ok(res, { studentCount, teacherCount, pendingAdmissions, monthlyCollection });
  } catch (error) {
    return next(error);
  }
};

export const listEntity = (table) => async (req, res, next) => {
  try {
    const rows = await query(`SELECT * FROM ${table} ORDER BY id DESC LIMIT 500`);
    return ok(res, rows);
  } catch (error) {
    return next(error);
  }
};

export const createEntity = (table) => async (req, res, next) => {
  try {
    const keys = Object.keys(req.body);
    const columns = keys.join(', ');
    const values = keys.map((k) => `:${k}`).join(', ');
    const result = await query(`INSERT INTO ${table} (${columns}) VALUES (${values})`, req.body);
    return created(res, { id: result.insertId });
  } catch (error) {
    return next(error);
  }
};

export const updateEntity = (table) => async (req, res, next) => {
  try {
    const keys = Object.keys(req.body);
    const setClause = keys.map((k) => `${k} = :${k}`).join(', ');
    await query(`UPDATE ${table} SET ${setClause} WHERE id = :id`, { ...req.body, id: req.params.id });
    return ok(res, {}, 'Updated');
  } catch (error) {
    return next(error);
  }
};

export const deleteEntity = (table) => async (req, res, next) => {
  try {
    await query(`DELETE FROM ${table} WHERE id = :id`, { id: req.params.id });
    return ok(res, {}, 'Deleted');
  } catch (error) {
    return next(error);
  }
};

export const reviewAdmission = async (req, res, next) => {
  try {
    await query('UPDATE admissions SET status = :status, reviewed_by = :reviewed_by WHERE id = :id', {
      id: req.params.id,
      status: req.body.status,
      reviewed_by: req.user.id
    });
    return ok(res, {}, 'Admission updated');
  } catch (error) {
    return next(error);
  }
};
