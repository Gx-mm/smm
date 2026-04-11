import { query } from '../config/db.js';
import { createStripeCheckout } from '../services/paymentService.js';
import { generateReceiptPdf } from '../services/pdfService.js';
import { created, ok } from '../utils/response.js';

export const createPaymentIntent = async (req, res, next) => {
  try {
    const { amount, fee_id } = req.body;
    const intent = await createStripeCheckout({ amount, metadata: { fee_id: String(fee_id), user_id: String(req.user.id) } });
    return created(res, { clientSecret: intent.client_secret, paymentIntentId: intent.id });
  } catch (error) {
    return next(error);
  }
};

export const recordPayment = async (req, res, next) => {
  try {
    const { fee_id, amount, payment_method, transaction_id } = req.body;
    const receiptNo = `RCPT-${Date.now()}`;
    const [student] = await query('SELECT full_name FROM students WHERE user_id = :userId', { userId: req.user.id });
    const pdfPath = await generateReceiptPdf({
      receiptNo,
      studentName: student?.full_name || 'Student',
      amount,
      paymentDate: new Date().toISOString().slice(0, 10)
    });

    const result = await query(
      `INSERT INTO payments (fee_id, student_id, amount, payment_method, transaction_id, receipt_no, receipt_path)
       VALUES (:fee_id, :student_id, :amount, :payment_method, :transaction_id, :receipt_no, :receipt_path)`,
      {
        fee_id,
        student_id: req.user.id,
        amount,
        payment_method,
        transaction_id,
        receipt_no: receiptNo,
        receipt_path: pdfPath
      }
    );

    await query("UPDATE fees SET status='paid' WHERE id = :fee_id", { fee_id });
    return created(res, { id: result.insertId, receiptNo, receiptPath: pdfPath }, 'Payment recorded');
  } catch (error) {
    return next(error);
  }
};

export const paymentHistory = async (req, res, next) => {
  try {
    const rows = await query('SELECT * FROM payments WHERE student_id = :studentId ORDER BY payment_date DESC', {
      studentId: req.user.id
    });
    return ok(res, rows);
  } catch (error) {
    return next(error);
  }
};
