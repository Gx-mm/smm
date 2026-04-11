import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

export const generateReceiptPdf = ({ receiptNo, studentName, amount, paymentDate }) =>
  new Promise((resolve, reject) => {
    const dir = path.resolve('uploads/receipts');
    fs.mkdirSync(dir, { recursive: true });

    const filePath = path.join(dir, `${receiptNo}.pdf`);
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);
    doc.fontSize(22).text('School Fee Receipt', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Receipt No: ${receiptNo}`);
    doc.text(`Student: ${studentName}`);
    doc.text(`Amount: ₹${amount}`);
    doc.text(`Date: ${paymentDate}`);
    doc.end();

    stream.on('finish', () => resolve(filePath));
    stream.on('error', reject);
  });
