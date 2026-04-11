import { useState } from 'react';
import api from '../../api/client';

const ContactPage = () => {
  const [payload, setPayload] = useState({ name: '', email: '', message: '' });

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/public/contact', payload);
    alert('Message sent');
  };

  return (
    <section className="grid two">
      <form className="card" onSubmit={submit}>
        <h2>Contact Us</h2>
        <input placeholder="Name" onChange={(e) => setPayload({ ...payload, name: e.target.value })} required />
        <input placeholder="Email" type="email" onChange={(e) => setPayload({ ...payload, email: e.target.value })} required />
        <textarea placeholder="Message" onChange={(e) => setPayload({ ...payload, message: e.target.value })} required />
        <button>Send</button>
      </form>
      <article className="card">
        <h3>School Address</h3>
        <p>123 Learning Street, New Delhi</p>
        <iframe title="map" src="https://maps.google.com/maps?q=Delhi&t=&z=13&ie=UTF8&iwloc=&output=embed" />
      </article>
    </section>
  );
};

export default ContactPage;
