import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendResetEmail = async (to, resetLink) => {
  await transporter.sendMail({
    from: `School ERP <${process.env.SMTP_USER}>`,
    to,
    subject: 'Password Reset Request',
    html: `<p>You requested a password reset.</p><p><a href="${resetLink}">Reset Password</a></p>`
  });
};
