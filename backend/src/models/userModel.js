import bcrypt from 'bcryptjs';
import { query } from '../config/db.js';

export const findUserByEmail = async (email) => {
  const rows = await query('SELECT id, name, email, password, role, status FROM users WHERE email = :email LIMIT 1', { email });
  return rows[0] || null;
};

export const findUserById = async (id) => {
  const rows = await query('SELECT id, name, email, role, status FROM users WHERE id = :id LIMIT 1', { id });
  return rows[0] || null;
};

export const createUser = async ({ name, email, password, role }) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  const result = await query(
    'INSERT INTO users (name, email, password, role, status) VALUES (:name, :email, :password, :role, :status)',
    { name, email, password: hashedPassword, role, status: 'active' }
  );
  return result.insertId;
};

export const verifyPassword = async (plain, hash) => bcrypt.compare(plain, hash);

export const saveResetToken = async ({ userId, token, expiresAt }) =>
  query(
    'INSERT INTO password_resets (user_id, token, expires_at) VALUES (:userId, :token, :expiresAt)',
    { userId, token, expiresAt }
  );

export const findValidResetToken = async (token) => {
  const rows = await query(
    `SELECT pr.id, pr.user_id, pr.expires_at
     FROM password_resets pr
     WHERE pr.token = :token AND pr.used_at IS NULL AND pr.expires_at > NOW()
     LIMIT 1`,
    { token }
  );
  return rows[0] || null;
};

export const consumeResetTokenAndSetPassword = async ({ resetId, userId, newPassword }) => {
  const hashed = await bcrypt.hash(newPassword, 12);
  await query('UPDATE users SET password = :hashed WHERE id = :userId', { hashed, userId });
  await query('UPDATE password_resets SET used_at = NOW() WHERE id = :resetId', { resetId });
};
