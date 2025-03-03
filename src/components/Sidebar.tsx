import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Car, Users, Calendar, BarChart3, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems = [
    { path: '/', icon: <BarChart3 size={20} />, label: 'Dashboard' },
    { path: '/bookings', icon: <Calendar size={20} />, label: 'Bookings' },
    { path: '/customers', icon: <Users size={20} />, label: 'Customers' },
    { path: '/cars', icon: <Car size={20} />, label: 'Cars' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className={`h-screen bg-gray-900 text-white w-${isCollapsed ? '20' : '64'} flex flex-col`}>
      <div className="p-5 border-b border-gray-800 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Car size={28} className="text-blue-400" />
          {!isCollapsed && <h1 className="text-xl font-bold">Shilaabo Tours And Car Hire</h1>}
        </div>
        <button onClick={toggleSidebar} className="text-white">
          {isCollapsed ? 'Expand' : 'Collapse'}
        </button>
      </div>
      
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            {currentUser?.name.charAt(0)}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">{currentUser?.name}</p>
            <p className="text-xs text-gray-400 capitalize">{currentUser?.role}</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                isActive(item.path)
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-800">
        <button 
          onClick={handleLogout}
          className="flex items-center px-4 py-3 text-sm text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white w-full"
        >
          <LogOut size={20} className="mr-3" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;