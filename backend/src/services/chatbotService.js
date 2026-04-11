const faq = {
  admission: 'Admissions are open from April to June. Apply from the Admission page.',
  fee: 'Fees can be paid online from the student dashboard via Stripe.',
  timing: 'School timing is 8:00 AM to 2:30 PM (Monday to Friday).'
};

export const getFaqReply = (message) => {
  const lower = message.toLowerCase();
  if (lower.includes('admission')) return faq.admission;
  if (lower.includes('fee')) return faq.fee;
  if (lower.includes('time')) return faq.timing;
  return 'Please contact admin office for detailed support.';
};
