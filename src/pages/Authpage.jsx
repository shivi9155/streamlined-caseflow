import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaEnvelope, 
  FaLock, 
  FaUser, 
  FaEye, 
  FaEyeSlash,
  FaGoogle,
  FaGithub,
  FaFacebook,
  FaArrowRight
} from 'react-icons/fa';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

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
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Add your API call here
      alert(`${isLogin ? 'Login' : 'Signup'} successful!`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const socialLogin = (platform) => {
    console.log(`${platform} login clicked`);
    // Implement social login logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Side - Form */}
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Welcome Back!
            </h1>
            <p className="text-gray-600">
              {isLogin ? 'Sign in to continue to your account' : 'Create your account to get started'}
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { icon: FaGoogle, color: 'bg-red-500 hover:bg-red-600', text: 'Google' },
              { icon: FaGithub, color: 'bg-gray-800 hover:bg-gray-900', text: 'GitHub' },
              { icon: FaFacebook, color: 'bg-blue-600 hover:bg-blue-700', text: 'Facebook' }
            ].map((social, index) => (
              <button
                key={index}
                onClick={() => socialLogin(social.text)}
                className={`${social.color} text-white p-3 rounded-xl flex flex-col items-center justify-center transition duration-300 transform hover:scale-105`}
              >
                <social.icon className="text-xl mb-1" />
                <span className="text-xs mt-1">{social.text}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center mb-8">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">Or continue with</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-8">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ${
                          errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="••••••••"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {isLogin && (
              <div className="flex items-center justify-between mb-8">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-gray-700 text-sm">Remember me</span>
                </label>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium transition duration-300"
                >
                  Forgot password?
                </a>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold text-lg hover:shadow-lg transition duration-300 flex items-center justify-center gap-2"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
              <FaArrowRight />
            </motion.button>
          </form>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={toggleForm}
                className="ml-2 text-blue-600 hover:text-blue-800 font-semibold transition duration-300"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>

        {/* Right Side - Illustration & Info */}
        <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-8 md:p-12 flex flex-col justify-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full translate-y-48 -translate-x-48"></div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative z-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {isLogin ? 'New here?' : 'Welcome!'}
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              {isLogin 
                ? 'Join our community and discover amazing features tailored just for you.'
                : "You're already part of our amazing community. Sign in to continue your journey."
              }
            </p>
            
            <ul className="space-y-4 mb-10">
              {[
                'Secure & encrypted data',
                'Access from anywhere',
                '24/7 Customer support',
                'Free for basic features'
              ].map((feature, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-lg">✓</span>
                  </div>
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>

            <div className="bg-white bg-opacity-10 p-6 rounded-2xl backdrop-blur-sm">
              <p className="italic mb-2">"This platform has transformed how we work!"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white rounded-full mr-3"></div>
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm opacity-80">Product Manager</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginSignup;