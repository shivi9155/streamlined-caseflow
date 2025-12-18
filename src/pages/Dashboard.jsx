import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Scale,
  Home,
  Folder,
  Calendar,
  BarChart3,
  Users,
  PieChart,
  Bell,
  UserCircle,
  ChevronDown,
  Menu,
  X,
  Search,
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Users as UsersIcon,
  Download,
  Filter,
  MoreVertical,
  Eye,
  BarChart,
  LineChart,
  Activity,
  Target,
  Award,
  Shield,
  Zap,
  Cpu,
  Database,
  Server,
  Globe,
  Lock,
  Mail,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';

// Navbar Component
const Navbar = () => {
  const location = useLocation();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigationItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Cases', path: '/cases', icon: Folder },
    { name: 'Schedule', path: '/schedule', icon: Calendar },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Parties', path: '/parties', icon: Users },
    { name: 'Dashboard', path: '/dashboard', icon: PieChart },
    { name: 'Learn More', path: '/learn-more', icon: Globe },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side: Logo/Brand */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg">
                <Scale className="h-6 w-6 text-blue-900" />
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
                        ? 'bg-blue-700 text-white shadow-lg'
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
                <Search className="h-4 w-4 text-blue-300" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-48 bg-blue-700/30 border border-blue-600 rounded-lg text-sm text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-blue-200 hover:text-white hover:bg-blue-700/50 rounded-lg">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-700/50"
              >
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600">
                  <UserCircle className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-white">Judge Sharma</span>
                  <span className="text-xs text-blue-300">Administrator</span>
                </div>
                <ChevronDown className="h-4 w-4 text-blue-300" />
              </button>

              {/* Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <UserCircle className="h-4 w-4 mr-2" />
                    Profile Settings
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Settings className="h-4 w-4 mr-2" />
                    System Preferences
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Help & Support
                  </a>
                  <div className="border-t border-gray-100 my-1"></div>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-700 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-800 border-t border-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
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
                    <UserCircle className="h-8 w-8 text-white" />
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
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:text-white hover:bg-blue-700"
                >
                  <UserCircle className="h-5 w-5 mr-2" />
                  Profile Settings
                </a>
                <a
                  href="#"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:text-white hover:bg-blue-700"
                >
                  <LogOut className="h-5 w-5 mr-2" />
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

// Stat Card Component
const StatCard = ({ title, value, change, icon: Icon, color, trend }) => {
  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-red-500" />;
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          <div className="flex items-center mt-2">
            {getTrendIcon()}
            <span className={`text-sm font-medium ml-1 ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
              {change}
            </span>
            <span className="text-sm text-gray-500 ml-1">from last month</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
};

// Case Type Distribution Component
const CaseTypeDistribution = () => {
  const caseTypes = [
    { type: 'Civil', count: 450, color: 'bg-blue-500', percentage: 35 },
    { type: 'Criminal', count: 320, color: 'bg-red-500', percentage: 25 },
    { type: 'Commercial', count: 280, color: 'bg-purple-500', percentage: 22 },
    { type: 'Family', count: 180, color: 'bg-green-500', percentage: 14 },
    { type: 'Constitutional', count: 70, color: 'bg-yellow-500', percentage: 4 }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Case Type Distribution</h3>
        <button className="text-blue-600 hover:text-blue-800">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
      <div className="space-y-4">
        {caseTypes.map((caseType, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-700">{caseType.type}</span>
              <span className="text-gray-900 font-semibold">{caseType.count} cases</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${caseType.color} h-2 rounded-full`}
                style={{ width: `${caseType.percentage}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 flex justify-between">
              <span>{caseType.percentage}% of total</span>
              <span>{Math.round((caseType.count / 1300) * 100)}% of capacity</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Recent Activity Component
const RecentActivity = () => {
  const activities = [
    { time: '2 mins ago', action: 'New case filed', case: 'CR/2024/1234', user: 'Court Clerk 1', icon: FileText, color: 'bg-blue-100 text-blue-600' },
    { time: '15 mins ago', action: 'Hearing scheduled', case: 'CIV/2024/5678', user: 'Judge Sharma', icon: Calendar, color: 'bg-green-100 text-green-600' },
    { time: '1 hour ago', action: 'Document uploaded', case: 'COM/2024/9012', user: 'Adv. Mehta', icon: Download, color: 'bg-purple-100 text-purple-600' },
    { time: '2 hours ago', action: 'Case status updated', case: 'FA/2024/3456', user: 'Court Admin', icon: CheckCircle, color: 'bg-yellow-100 text-yellow-600' },
    { time: '4 hours ago', action: 'New party added', case: 'CR/2024/7890', user: 'Legal Assistant', icon: UsersIcon, color: 'bg-red-100 text-red-600' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
        <Link to="/cases" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View All →
        </Link>
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className={`p-2 rounded-lg ${activity.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
                <p className="text-sm text-gray-600">
                  Case: <span className="font-medium">{activity.case}</span> • By: {activity.user}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Performance Metrics Component
const PerformanceMetrics = () => {
  const metrics = [
    { label: 'Case Clearance Rate', value: '92%', target: '95%', status: 'on-track', color: 'bg-green-500' },
    { label: 'Average Disposal Time', value: '45 days', target: '30 days', status: 'needs-improvement', color: 'bg-yellow-500' },
    { label: 'Judicial Productivity', value: '88%', target: '90%', status: 'on-track', color: 'bg-blue-500' },
    { label: 'Case Backlog', value: '12%', target: '10%', status: 'warning', color: 'bg-red-500' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Performance Metrics</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Current vs Target</span>
        </div>
      </div>
      <div className="space-y-6">
        {metrics.map((metric, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">{metric.label}</span>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-gray-900">{metric.value}</span>
                <span className="text-sm text-gray-500">Target: {metric.target}</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${metric.color} h-2 rounded-full`}
                style={{ width: metric.value.replace('%', '') + '%' }}
              ></div>
            </div>
            <div className="flex justify-between text-xs">
              <span className={`px-2 py-1 rounded-full ${
                metric.status === 'on-track' ? 'bg-green-100 text-green-800' :
                metric.status === 'needs-improvement' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {metric.status.replace('-', ' ')}
              </span>
              <span className="text-gray-500">
                {parseInt(metric.value) > parseInt(metric.target) ? 'Above target' : 'Below target'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Upcoming Hearings Component
const UpcomingHearings = () => {
  const hearings = [
    { case: 'CR/2024/1234', title: 'State vs. Kumar', time: '10:00 AM', judge: 'Justice Sharma', courtroom: 'Courtroom 3', priority: 'high' },
    { case: 'CIV/2024/5678', title: 'Property Dispute', time: '11:30 AM', judge: 'Justice Verma', courtroom: 'Courtroom 1', priority: 'medium' },
    { case: 'COM/2024/9012', title: 'Contract Breach', time: '2:00 PM', judge: 'Justice Patel', courtroom: 'Courtroom 2', priority: 'high' },
    { case: 'FA/2024/3456', title: 'Divorce Petition', time: '3:30 PM', judge: 'Justice Singh', courtroom: 'Chamber 4', priority: 'low' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Upcoming Hearings Today</h3>
        <Link to="/schedule" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View Calendar →
        </Link>
      </div>
      <div className="space-y-4">
        {hearings.map((hearing, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-block w-2 h-2 rounded-full ${
                    hearing.priority === 'high' ? 'bg-red-500' :
                    hearing.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></span>
                  <span className="font-bold text-blue-600">{hearing.case}</span>
                </div>
                <p className="font-medium text-gray-900 mt-1">{hearing.title}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {hearing.time}
                  </span>
                  <span className="flex items-center">
                    <UserCircle className="h-3 w-3 mr-1" />
                    {hearing.judge}
                  </span>
                  <span className="flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    {hearing.courtroom}
                  </span>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Eye className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// System Health Component
const SystemHealth = () => {
  const systemMetrics = [
    { component: 'Database', status: 'healthy', usage: '65%', icon: Database, color: 'bg-green-500' },
    { component: 'Server', status: 'healthy', usage: '72%', icon: Server, color: 'bg-green-500' },
    { component: 'API', status: 'warning', usage: '89%', icon: Cpu, color: 'bg-yellow-500' },
    { component: 'Storage', status: 'healthy', usage: '58%', icon: Shield, color: 'bg-green-500' },
    { component: 'Network', status: 'critical', usage: '95%', icon: Globe, color: 'bg-red-500' },
    { component: 'Security', status: 'healthy', usage: '100%', icon: Lock, color: 'bg-green-500' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">System Health</h3>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
          <span className="text-sm text-gray-600">All systems operational</span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {systemMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <Icon className="h-5 w-5 text-gray-600" />
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full ${metric.color} mr-1`}></div>
                  <span className="text-xs font-medium capitalize">{metric.status}</span>
                </div>
              </div>
              <p className="font-bold text-gray-900">{metric.component}</p>
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">Usage</span>
                  <span className="font-medium">{metric.usage}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div
                    className={`h-1 rounded-full ${metric.color}`}
                    style={{ width: metric.usage }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Quick Actions Component
const QuickActions = () => {
  const actions = [
    { icon: FileText, label: 'New Case', color: 'bg-blue-500 hover:bg-blue-600', link: '/cases' },
    { icon: Calendar, label: 'Schedule Hearing', color: 'bg-green-500 hover:bg-green-600', link: '/schedule' },
    { icon: Users, label: 'Add Party', color: 'bg-purple-500 hover:bg-purple-600', link: '/parties' },
    { icon: BarChart3, label: 'Generate Report', color: 'bg-yellow-500 hover:bg-yellow-600', link: '/analytics' }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-white mb-6">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              to={action.link}
              className={`${action.color} text-white p-4 rounded-lg flex flex-col items-center justify-center text-center transition-all hover:scale-105 hover:shadow-lg`}
            >
              <Icon className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">{action.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [timeOfDay, setTimeOfDay] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    
    if (hours < 12) setTimeOfDay('Good Morning');
    else if (hours < 18) setTimeOfDay('Good Afternoon');
    else setTimeOfDay('Good Evening');

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(now.toLocaleDateString('en-US', options));
  }, []);

  const stats = [
    { title: 'Total Cases', value: '2,847', change: '+12%', icon: FileText, color: 'bg-blue-500', trend: 'up' },
    { title: 'Active Cases', value: '156', change: '+5%', icon: Activity, color: 'bg-green-500', trend: 'up' },
    { title: 'Today\'s Hearings', value: '12', change: '-3%', icon: Calendar, color: 'bg-purple-500', trend: 'down' },
    { title: 'Pending Decisions', value: '48', change: '+8%', icon: Clock, color: 'bg-yellow-500', trend: 'up' },
    { title: 'Parties Involved', value: '1,234', change: '+15%', icon: Users, color: 'bg-red-500', trend: 'up' },
    { title: 'Case Resolution', value: '92%', change: '+2%', icon: CheckCircle, color: 'bg-indigo-500', trend: 'up' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Court Dashboard</h1>
              <p className="text-gray-600 mt-2">
                {timeOfDay}, Judge Sharma • {currentDate}
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <QuickActions />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-8">
            <PerformanceMetrics />
            <CaseTypeDistribution />
          </div>
          <div className="space-y-8">
            <RecentActivity />
            <UpcomingHearings />
          </div>
        </div>

        {/* System Health */}
        <div className="mb-8">
          <SystemHealth />
        </div>

        {/* Bottom Info */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">System Performance</h3>
                <p className="text-gray-600">All systems running optimally. Last system check: 5 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">99.8%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">0.2s</div>
                <div className="text-sm text-gray-600">Avg. Response</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-600">Issues</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Data last updated: Just now • Auto-refresh every 5 minutes • For assistance, contact support@dcfm.in</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;