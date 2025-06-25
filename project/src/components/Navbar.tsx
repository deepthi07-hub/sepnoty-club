import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, LogIn, LayoutDashboard, LogOut, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/sepnoty-logo.png'; // ✅ Correct import

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/register', icon: UserPlus, label: 'Join Us' },
    ...(isAuthenticated 
      ? [{ path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' }]
      : [{ path: '/login', icon: LogIn, label: 'Admin' }]
    ),
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div 
  className="flex items-center justify-center"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  <img 
    src={logo} 
    alt="Sepnoty Logo" 
    className="w-16 h-16 object-contain"
  />
</motion.div>

            <div>
              <h1 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                Sepnotian'S
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Membership Portal</p>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:block font-medium">{item.label}</span>
                </Link>
              );
            })}
            
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:block font-medium">Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
