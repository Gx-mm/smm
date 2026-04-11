import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ChatbotWidget from '../components/ChatbotWidget';

const PublicLayout = () => (
  <>
    <Navbar />
    <main className="container">
      <Outlet />
    </main>
    <ChatbotWidget />
  </>
);

export default PublicLayout;
