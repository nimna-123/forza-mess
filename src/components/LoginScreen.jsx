import React, { useState } from 'react';
import loginBg from '../assets/images/loginBg.jpg';

const LoginScreen = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Hardcoded credentials
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate a small delay for better UX
    setTimeout(() => {
      // Validate credentials
      if (formData.username === ADMIN_CREDENTIALS.username && 
          formData.password === ADMIN_CREDENTIALS.password) {
        console.log('Login successful');
        // Navigate to main layout
        if (onLogin) {
          onLogin();
        }
      } else {
        setError('Invalid username or password. Please try again.');
        console.log('Login failed:', formData);
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden font-sans">
      {/* Full Width Background Image */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <img 
          src={loginBg} 
          alt="Buddha bowl with colorful ingredients" 
          className="w-full h-full object-cover object-center" 
          onError={(e) => {
            console.error('Failed to load background image:', loginBg);
            e.target.style.display = 'none';
          }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 "></div>
      </div>

      {/* Login Form - Right Side */}
      <div className="relative z-10 h-full flex items-center justify-end pr-8 sm:pr-12 md:pr-20 lg:pr-30">
        <div className="w-full max-w-[400px] bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 sm:p-10">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-10">
            <div className="flex items-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#333"/>
                <path d="M8 10h8v2H8z" fill="#333"/>
                <path d="M10 8h2v8h-2z" fill="#333"/>
              </svg>
            </div>
            <span className="text-2xl font-semibold text-gray-800 tracking-tight">MixBowls</span>
          </div>

          {/* Login Form */}
          <form className="flex flex-col gap-6 mb-8" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                className="peer w-full px-5 py-4 border border-gray-300 rounded-full text-base bg-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-800 focus:shadow-xl placeholder-transparent focus:placeholder-gray-400"
                required
                disabled={isLoading}
              />
              <label className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white px-2 text-base font-normal text-gray-400 transition-all duration-300 ease-in-out pointer-events-none z-10 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-gray-800 peer-focus:font-medium peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:-translate-y-1/2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-800 peer-not-placeholder-shown:font-medium">
                Username
              </label>
            </div>
            
            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="peer w-full px-5 py-4 border border-gray-300 rounded-full text-base bg-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:border-gray-800 focus:shadow-xl placeholder-transparent focus:placeholder-gray-400"
                required
                disabled={isLoading}
              />
              <label className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white px-2 text-base font-normal text-gray-400 transition-all duration-300 ease-in-out pointer-events-none z-10 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-gray-800 peer-focus:font-medium peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:-translate-y-1/2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-800 peer-not-placeholder-shown:font-medium">
                Password
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full px-5 py-4 bg-gray-800 text-white border-none rounded-full text-base font-semibold uppercase tracking-wider cursor-pointer transition-all duration-300 ease-in-out shadow-lg hover:bg-gray-700 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-gray-800"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  LOGGING IN...
                </div>
              ) : (
                'LOGIN'
              )}
            </button>
          </form>

          {/* Login Hint */}
          <div className="text-center text-xs text-gray-500 font-normal mb-4">
            <p className="mb-1">Demo Credentials:</p>
            <p className="font-mono bg-gray-100 px-2 py-1 rounded">Username: admin | Password: admin</p>
          </div>

          {/* Copyright */}
          <div className="text-center text-xs text-gray-500 font-normal">
            ©2020 MixBowls LLD.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
