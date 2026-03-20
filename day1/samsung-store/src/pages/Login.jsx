import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Context import kiya

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Global login function
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Yahan hum dummy data bhej rahe hain (Actual app mein API call hoti hai)
    const userData = {
      name: email.split('@')[0], // Email ka pehla part naam ban jayega
      email: email,
      avatar: "K" // Logo ke liye pehla letter
    };

    login(userData); // AuthContext mein user save ho gaya
    alert("Welcome back!");
    navigate('/'); // Home page par redirect
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100">
        
        {/* Header */}
        <div className="text-center mb-10">
          <Link to="/" className="text-2xl font-black tracking-tighter text-black block mb-2 underline-none">SAMSUNG</Link>
          <h2 className="text-xl font-bold text-gray-800">Sign in to your account</h2>
          <p className="text-gray-400 text-sm mt-2">Enter your Galaxy credentials</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Action Links */}
          <div className="flex justify-end">
            <button type="button" className="text-sm font-bold text-blue-600 hover:underline">Forgot password?</button>
          </div>

          {/* Login Button */}
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all"
          >
            Sign In
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center mt-8 text-gray-500 text-sm">
          Don't have an account? 
          <Link to="/signup" className="text-blue-600 font-bold ml-2 hover:underline">Create account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;