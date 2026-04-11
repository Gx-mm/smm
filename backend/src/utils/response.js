export const ok = (res, data = {}, message = 'Success') =>
  res.status(200).json({ success: true, message, data });

export const created = (res, data = {}, message = 'Created') =>
  res.status(201).json({ success: true, message, data });

export const fail = (res, status = 500, message = 'Something went wrong', errors = null) =>
  res.status(status).json({ success: false, message, errors });
