import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("Account Created for:", formData);
    alert("Account Created Successfully!");
    navigate('/login'); // Account banne ke baad Login page par bhej dega
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100">
        
        <div className="text-center mb-10">
          <Link to="/" className="text-2xl font-black tracking-tighter text-black block mb-2">SAMSUNG</Link>
          <h2 className="text-xl font-bold text-gray-800">Create your account</h2>
          <p className="text-gray-400 text-sm mt-2">Join the Galaxy community today</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Full Name</label>
            <input 
              type="text" 
              required
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
              placeholder="Your Name"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
              placeholder="name@example.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
              placeholder="Create a password"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg hover:bg-gray-800 shadow-lg active:scale-[0.98] transition-all mt-4"
          >
            Create Account
          </button>
        </form>

        <p className="text-center mt-8 text-gray-500 text-sm">
          Already have an account? 
          <Link to="/login" className="text-blue-600 font-bold ml-2 hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;