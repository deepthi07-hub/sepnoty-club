import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MembershipForm from './pages/MembershipForm';
import Dashboard from './pages/Dashboard';
import ScheduleCall from './pages/ScheduleCall';
import Login from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Navbar />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<MembershipForm />} />
            <Route path="/admin" element={<Login />} />
            <Route path="/schedule-call" element={<ScheduleCall />} />
            <Route path="/joinus" element={<MembershipForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </motion.main>
      </div>
    </AuthProvider>
  );
}

export default App;
