import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PublicLayout from '../layouts/PublicLayout';
import HomePage from '../pages/public/HomePage';
import AboutPage from '../pages/public/AboutPage';
import AcademicsPage from '../pages/public/AcademicsPage';
import FacultyPage from '../pages/public/FacultyPage';
import GalleryPage from '../pages/public/GalleryPage';
import EventsPage from '../pages/public/EventsPage';
import AdmissionPage from '../pages/public/AdmissionPage';
import ContactPage from '../pages/public/ContactPage';
import LoginPage from '../pages/public/LoginPage';
import StudentDashboard from '../pages/student/StudentDashboard';
import TeacherDashboard from '../pages/teacher/TeacherDashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';

const PortalRouter = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'admin') return <AdminDashboard />;
  if (user.role === 'teacher') return <TeacherDashboard />;
  return <StudentDashboard />;
};

const AppRoutes = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/academics" element={<AcademicsPage />} />
      <Route path="/faculty" element={<FacultyPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/admission" element={<AdmissionPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/portal" element={<PortalRouter />} />
    </Route>
  </Routes>
);

export default AppRoutes;
