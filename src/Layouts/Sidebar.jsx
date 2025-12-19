import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { 
  Home,
  BarChart3,
  Users,
  Briefcase,
  Calendar,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ active }) => {
  const navigate = useNavigate(); // Initialize navigation hook

  const handleLogout = () => {
    // You can add logout logic here (clear tokens, user data, etc.)
    // For example: localStorage.removeItem('token');
    
    // Navigate to home page
    navigate('/');
  };

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/cases', label: 'Cases', icon: <Briefcase size={20} /> },
    { path: '/schedule', label: 'Schedule', icon: <Calendar size={20} /> },
    { path: '/analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
    { path: '/parties', label: 'Parties', icon: <Users size={20} /> },
  ];

  return (
    <div className="hidden lg:flex flex-col w-64 border-r border-gray-200 bg-white">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">D</span>
          </div>
          <div>
            <h2 className="font-bold text-gray-900">DCFM Admin</h2>
            <p className="text-xs text-gray-500">Court Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                active === item.label 
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Settings Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <Link
            to="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
          >
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </Link>
          
          <button 
            onClick={handleLogout} // Added onClick handler
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors mt-2"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center">
            <span className="text-white text-sm font-bold">A</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;