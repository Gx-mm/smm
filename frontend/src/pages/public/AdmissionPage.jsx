import { useState } from 'react';
import api from '../../api/client';

const AdmissionPage = () => {
  const [form, setForm] = useState({ student_name: '', parent_name: '', email: '', phone: '', class_applied: '' });
  const [document, setDocument] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(form).forEach(([k, v]) => payload.append(k, v));
    if (document) payload.append('document', document);
    await api.post('/public/admission', payload);
    alert('Admission submitted successfully');
  };

  return (
    <form className="card" onSubmit={submit}>
      <h2>Online Admission Form</h2>
      {Object.keys(form).map((key) => (
        <input key={key} placeholder={key.replace('_', ' ')} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} required />
      ))}
      <input type="file" onChange={(e) => setDocument(e.target.files[0])} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AdmissionPage;
