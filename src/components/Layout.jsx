import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Scale, 
  Home, 
  FileText, 
  Calendar, 
  BarChart, 
  Users,
  Settings,
  LogOut,
  Sun,
  Moon,
  Bell,
  User,
  ChevronLeft,
  ChevronRight,
  Search,
  Plus,
  TrendingUp,
  Shield,
  Folder
} from 'lucide-react';

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const location = useLocation();
  
  const navigation = [
    { 
      name: 'Home', 
      href: '/', 
      icon: Home, 
      current: location.pathname === '/',
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      name: 'Case Management', 
      href: '/cases', 
      icon: FileText, 
      current: location.pathname === '/cases',
      gradient: 'from-purple-500 to-pink-500',
      badge: 2847,
      subItems: [
        { name: 'All Cases', href: '/cases', icon: FileText },
        { name: 'New Case', href: '#new', icon: Plus },
        { name: 'High Priority', href: '#priority', icon: TrendingUp },
        { name: 'Archived', href: '#archived', icon: Folder }
      ]
    },
    { 
      name: 'Schedule', 
      href: '#schedule', 
      icon: Calendar, 
      current: false,
      gradient: 'from-emerald-500 to-green-500',
      badge: 48
    },
    { 
      name: 'Analytics', 
      href: '#analytics', 
      icon: BarChart, 
      current: false,
      gradient: 'from-orange-500 to-amber-500'
    },
    { 
      name: 'Parties', 
      href: '#parties', 
      icon: Users, 
      current: false,
      gradient: 'from-cyan-500 to-blue-500',
      subItems: [
        { name: 'Plaintiffs', href: '#plaintiffs', icon: User },
        { name: 'Defendants', href: '#defendants', icon: Users },
        { name: 'Advocates', href: '#advocates', icon: Shield }
      ]
    },
    { 
      name: 'Dashboard', 
      href: '#dashboard', 
      icon: TrendingUp, 
      current: false,
      gradient: 'from-violet-500 to-purple-500'
    },
    { 
      name: 'Settings', 
      href: '#settings', 
      icon: Settings, 
      current: false,
      gradient: 'from-gray-600 to-gray-700'
    },
  ];

  const toggleSubMenu = (name) => {
    setActiveSubMenu(activeSubMenu === name ? null : name);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-blue-50'}`}>
      {/* Sidebar */}
      <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} fixed inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out`}>
        <div className="h-full bg-gradient-to-b from-gray-900 to-blue-900 shadow-2xl overflow-hidden">
          {/* Logo Section */}
          <div className="p-4 border-b border-blue-800/50">
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && (
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg">
                    <Scale className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">DCFM</span>
                </div>
              )}
              {sidebarCollapsed && (
                <div className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg mx-auto">
                  <Scale className="h-6 w-6 text-white" />
                </div>
              )}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-1.5 rounded-lg bg-blue-800/50 hover:bg-blue-700/50 text-blue-200 hover:text-white transition-colors"
              >
                {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Search Bar (visible when expanded) */}
          {!sidebarCollapsed && (
            <div className="p-4 border-b border-blue-800/30">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-300" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-3 py-2 bg-blue-800/30 border border-blue-700/50 rounded-lg text-sm text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  {item.subItems ? (
                    <div>
                      <button
                        onClick={() => toggleSubMenu(item.name)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                          item.current 
                            ? 'bg-gradient-to-r from-blue-600/50 to-cyan-600/50 text-white shadow-lg' 
                            : 'text-blue-100 hover:bg-blue-800/30 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${item.gradient}`}>
                            <item.icon className="h-5 w-5" />
                          </div>
                          {!sidebarCollapsed && <span className="font-medium">{item.name}</span>}
                        </div>
                        {!sidebarCollapsed && (
                          <div className="flex items-center space-x-2">
                            {item.badge && (
                              <span className="px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full">
                                {item.badge}
                              </span>
                            )}
                            <ChevronRight className={`h-4 w-4 transition-transform ${activeSubMenu === item.name ? 'rotate-90' : ''}`} />
                          </div>
                        )}
                      </button>
                      
                      {/* Submenu */}
                      {!sidebarCollapsed && activeSubMenu === item.name && (
                        <ul className="mt-1 ml-10 space-y-1">
                          {item.subItems.map((subItem) => (
                            <li key={subItem.name}>
                              <Link
                                to={subItem.href}
                                className="flex items-center space-x-2 px-3 py-2 text-sm text-blue-200 hover:text-white hover:bg-blue-800/20 rounded-lg transition-colors"
                              >
                                <subItem.icon className="h-4 w-4" />
                                <span>{subItem.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`flex items-center p-3 rounded-xl transition-all duration-300 group ${
                        item.current 
                          ? 'bg-gradient-to-r from-blue-600/50 to-cyan-600/50 text-white shadow-lg' 
                          : 'text-blue-100 hover:bg-blue-800/30 hover:text-white'
                      }`}
                    >
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${item.gradient}`}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      {!sidebarCollapsed && (
                        <div className="ml-3 flex-1 flex items-center justify-between">
                          <span className="font-medium">{item.name}</span>
                          {item.badge && (
                            <span className="px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Dark Mode Toggle */}
            <div className="mt-8">
              {!sidebarCollapsed && (
                <div className="bg-blue-800/30 rounded-xl p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-200">Dark Mode</span>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        darkMode ? 'bg-cyan-500' : 'bg-blue-600'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        darkMode ? 'translate-x-6' : 'translate-x-1'
                      }`}>
                        {darkMode ? (
                          <Moon className="h-3 w-3 text-cyan-500 ml-0.5 mt-0.5" />
                        ) : (
                          <Sun className="h-3 w-3 text-blue-600 ml-0.5 mt-0.5" />
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              {!sidebarCollapsed && (
                <div className="bg-gradient-to-r from-blue-600/50 to-cyan-600/50 rounded-xl p-4 mb-4">
                  <h3 className="text-sm font-semibold text-white mb-2">Quick Actions</h3>
                  <Link
                    to="/cases"
                    className="flex items-center justify-center w-full py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Case
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-blue-800/50">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500">
                <User className="h-6 w-6 text-white" />
              </div>
              {!sidebarCollapsed && (
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Court Admin</p>
                  <p className="text-xs text-blue-300">High Court District</p>
                </div>
              )}
              {!sidebarCollapsed && (
                <button className="p-2 rounded-lg bg-blue-800/50 hover:bg-blue-700/50 text-blue-200 hover:text-white transition-colors">
                  <LogOut className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {location.pathname === '/' ? 'Dashboard' : 'Case Management'}
                </h1>
                <div className="hidden md:flex items-center space-x-2">
                  <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium">
                    Live
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Last updated: Today, 11:45 AM
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                </button>
                
                <div className="hidden md:flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Court Administrator</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">admin@court.gov</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-medium">
                    CA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;