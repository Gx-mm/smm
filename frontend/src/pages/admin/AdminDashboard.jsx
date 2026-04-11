import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Students', value: 3800 },
  { name: 'Teachers', value: 180 },
  { name: 'Admissions', value: 420 },
  { name: 'Revenue', value: 95 }
];

const AdminDashboard = () => (
  <section>
    <h2>Super Admin Panel</h2>
    <div className="card" style={{ height: 260 }}>
      <ResponsiveContainer>
        <BarChart data={data}><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" fill="#4f46e5" /></BarChart>
      </ResponsiveContainer>
    </div>
    <div className="grid three">
      <div className="card">Student Management (CRUD)</div>
      <div className="card">Teacher + Class Management</div>
      <div className="card">Attendance + Result Management</div>
      <div className="card">Fee + Receipt Management</div>
      <div className="card">Admissions Approve/Reject</div>
      <div className="card">Gallery / CMS / Notices</div>
    </div>
  </section>
);

export default AdminDashboard;
