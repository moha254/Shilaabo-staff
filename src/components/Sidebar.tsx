import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Car, Users, Calendar, BarChart3, Settings, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);
  
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/', icon: <BarChart3 size={20} />, label: 'Dashboard' },
    { path: '/bookings', icon: <Calendar size={20} />, label: 'Bookings' },
    { path: '/customers', icon: <Users size={20} />, label: 'Customers' },
    { path: '/cars', icon: <Car size={20} />, label: 'Cars' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        className="absolute top-4 left-4 z-20 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Container with Animation */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: isOpen ? 250 : 0 }}
        exit={{ width: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`h-screen bg-gray-900 text-white flex flex-col overflow-hidden`}
      >
        {/* Sidebar Header */}
        <div className="p-5 border-b border-gray-800 flex items-center space-x-3">
          <Car size={28} className="text-blue-400" />
          {isOpen && <h1 className="text-xl font-bold">Shilaabo Tours</h1>}
        </div>

        {/* User Info */}
        {isOpen && (
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                {currentUser?.name.charAt(0)}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{currentUser?.name}</p>
                <p className="text-xs text-gray-400 capitalize">{currentUser?.role}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                  isActive(item.path) ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {isOpen && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        {isOpen && (
          <div className="p-4 border-t border-gray-800">
            <button 
              onClick={handleLogout}
              className="flex items-center px-4 py-3 text-sm text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white w-full"
            >
              <LogOut size={20} className="mr-3" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Sidebar;
