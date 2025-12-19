import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash,
  FaArrowRight, FaChartLine, FaFilter, FaShieldAlt,
  FaRocket, FaCheckCircle, FaUsers, FaProjectDiagram
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  // All existing state and logic remains EXACTLY the same
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // All existing functions remain EXACTLY the same
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const endpoint = isLogin 
          ? 'http://localhost:5000/api/auth/login' 
          : 'http://localhost:5000/api/auth/signup';

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert(`🎉 ${isLogin ? 'Login' : 'Signup'} Successful! Data saved to MongoDB.`);
          localStorage.setItem('user', JSON.stringify({
            name: formData.name || data.user?.name || 'User',
            email: formData.email,
            id: data.user?.id || `user_${Date.now()}`
          }));
          navigate('/home');
          if(!isLogin) toggleForm(); 
        } else {
          alert(`❌ Error: ${data.message}`);
          setErrors({ server: data.message });
        }
      } catch (error) {
        console.error('Fetch error:', error);
        alert("⚠️ Backend not connected. Using demo mode. Redirecting to home...");
        localStorage.setItem('user', JSON.stringify({
          name: formData.name || 'Demo User',
          email: formData.email || 'demo@example.com',
          id: `demo_${Date.now()}`
        }));
        navigate('/home');
      }
    } else {
      console.log("Validation failed", errors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  // NEW UI DESIGN STARTS HERE
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">CaseFlow</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Cases', 'Schedule', 'Analytics','Parties','Dashboard'].map((item) => (
                <a key={item} href="/services" className="text-gray-700 hover:text-blue-600 font-medium">
                  {item}
                </a>
              ))}
              {/* <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-semibold">
                Get Started
              </button> */}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Welcome Tag */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full">
              <span className="text-sm font-semibold text-blue-700">
                {isLogin ? 'WELCOME BACK EXCLUSIVE MEMBER' : 'JOIN OUR CASE MANAGEMENT COMMUNITY'}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              {isLogin ? 'Welcome Back to' : 'Streamline Case Listing'}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {isLogin ? 'CaseFlow Manager' : 'With Differentiated Workflows'}
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-lg">
              Designed for simplicity and efficiency, our software transforms complex case handling 
              into streamlined workflows. Whether you're managing legal cases, support tickets, or 
              project tasks, we make the process smooth and intuitive.
            </p>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        className="w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:border-blue-500 outline-none transition" 
                        placeholder="John Doe" 
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name}</p>}
                  </div>
                )}

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      className="w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:border-blue-500 outline-none transition" 
                      placeholder="email@example.com" 
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email}</p>}
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      name="password" 
                      value={formData.password} 
                      onChange={handleChange} 
                      className="w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:border-blue-500 outline-none transition" 
                      placeholder="••••••••" 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)} 
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password}</p>}
                </div>

                {!isLogin && (
                  <div className="mb-8">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Confirm Password</label>
                    <div className="relative">
                      <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                        type="password" 
                        name="confirmPassword" 
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
                        className="w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:border-blue-500 outline-none transition" 
                        placeholder="••••••••" 
                      />
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-2">{errors.confirmPassword}</p>}
                  </div>
                )}

                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-3"
                >
                  {isLogin ? 'Sign In to Dashboard' : 'Create Account'} 
                  <FaArrowRight />
                </button>
              </form>

              <p className="text-center mt-6 text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button 
                  onClick={toggleForm} 
                  className="ml-2 text-blue-600 font-semibold hover:underline"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </motion.div>

          {/* Right Column - Hero Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Feature Cards */}
            <div className="bg-gradient-to-br from-blue-700 to-indigo-800 rounded-3xl p-8 text-white shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-3xl font-bold mb-2">CaseFlow Management Suite</h3>
                  <p className="opacity-90">Differentiated workflows for efficient case listing</p>
                </div>
                <FaProjectDiagram className="text-4xl text-blue-300" />
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/20 p-3 rounded-xl">
                    <FaFilter className="text-2xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Smart Categorization</h4>
                    <p className="opacity-80">Automatically route different case types through customized workflows</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/20 p-3 rounded-xl">
                    <FaChartLine className="text-2xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Progress Analytics</h4>
                    <p className="opacity-80">Track case resolution times and team performance metrics</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/20 p-3 rounded-xl">
                    <FaShieldAlt className="text-2xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Secure & Compliant</h4>
                    <p className="opacity-80">Enterprise-grade security with audit trails for sensitive cases</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                <div className="text-gray-700 font-medium">Faster Case Listing</div>
                <div className="text-sm text-gray-500 mt-1">With automated workflows</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
                <div className="text-gray-700 font-medium">Teams Trust Us</div>
                <div className="text-sm text-gray-500 mt-1">For case management</div>
              </div>
            </div>

            {/* Benefits List */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Why Choose Our Platform</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Differentiated workflow paths for varied case types</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Real-time collaboration across departments</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Automated notifications and escalation rules</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Customizable case templates and forms</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;