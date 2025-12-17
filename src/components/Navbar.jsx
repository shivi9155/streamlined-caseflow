import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ScaleIcon, 
  HomeIcon, 
  FolderIcon, 
  CalendarIcon, 
  ChartBarIcon, 
  UsersIcon, 
  ChartPieIcon,
  ChevronDownIcon,
  UserCircleIcon,
  BellIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Cases', path: '/cases', icon: FolderIcon },
    { name: 'Schedule', path: '/schedule', icon: CalendarIcon },
    { name: 'Analytics', path: '/analytics', icon: ChartBarIcon },
    { name: 'Parties', path: '/parties', icon: UsersIcon },
    { name: 'Dashboard', path: '/dashboard', icon: ChartPieIcon },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side: Logo/Brand */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg">
                <ScaleIcon className="h-6 w-6 text-blue-900" />
              </div>
              <span className="text-white text-xl font-bold tracking-wider">
                DCFM
              </span>
              <div className="hidden md:block h-6 w-px bg-blue-400 mx-4"></div>
            </div>

            {/* Desktop Navigation Links - Centered */}
            <div className="hidden md:flex items-center ml-8 space-x-6">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-700 text-white'
                        : 'text-blue-100 hover:bg-blue-700/50 hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right side: Search, Notifications, Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-4 w-4 text-blue-300" />
              </div>
              <input
                type="text"
                placeholder="Search cases..."
                className="pl-10 pr-4 py-2 w-48 bg-blue-700/30 border border-blue-600 rounded-lg text-sm text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-blue-200 hover:text-white hover:bg-blue-700/50 rounded-lg">
              <BellIcon className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-700/50"
              >
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600">
                  <UserCircleIcon className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-white">Judge Sharma</span>
                  <span className="text-xs text-blue-300">Administrator</span>
                </div>
                <ChevronDownIcon className="h-4 w-4 text-blue-300" />
              </button>

              {/* Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile Settings
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    System Preferences
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Help & Support
                  </a>
                  <div className="border-t border-gray-100 my-1"></div>
                  <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800 border-t border-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium ${
                    isActive
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-200 hover:bg-blue-700 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* Mobile Profile Section */}
            <div className="pt-4 pb-3 border-t border-blue-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600">
                    <UserCircleIcon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">Judge Sharma</div>
                  <div className="text-sm font-medium text-blue-300">Administrator</div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <a
                  href="#"
                  className="block px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:text-white hover:bg-blue-700"
                >
                  Profile Settings
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:text-white hover:bg-blue-700"
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;