import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash,
  FaGoogle, FaGithub, FaFacebook, FaArrowRight
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
    console.log("Attempting to submit...");

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
          // Clear form after signup
          if(!isLogin) toggleForm(); 
        } else {
          alert(`❌ Error: ${data.message}`);
          setErrors({ server: data.message });
        }
      } catch (error) {
        console.error('Fetch error:', error);
        alert("❌ Cannot connect to Server. Is 'node server.js' running on port 5000?");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{isLogin ? 'Welcome Back!' : 'Create Account'}</h1>
            <p className="text-gray-600">{isLogin ? 'Sign in to your account' : 'Join our community today'}</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* NAME FIELD (Signup Only) */}
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2">Full Name</label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:border-blue-500 outline-none transition" placeholder="John Doe" />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
            )}

            {/* EMAIL FIELD */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:border-blue-500 outline-none transition" placeholder="email@example.com" />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* PASSWORD FIELD */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} className="w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:border-blue-500 outline-none transition" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* CONFIRM PASSWORD (Signup Only) */}
            {!isLogin && (
              <div className="mb-6">
                <label className="block text-gray-700 text-sm mb-2">Confirm Password</label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:border-blue-500 outline-none transition" placeholder="••••••••" />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2">
              {isLogin ? 'Sign In' : 'Create Account'} <FaArrowRight />
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button onClick={toggleForm} className="ml-2 text-blue-600 font-bold hover:underline">
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        {/* Right side decoration */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-12 text-white flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">Secure & Simple.</h2>
          <p className="text-lg opacity-80">Join thousands of users who trust our platform for their daily workflow.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginSignup;