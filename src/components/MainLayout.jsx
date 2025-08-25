import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const MainLayout = ({ onLogout, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/summary' || path === '/') return 'summary';
    if (path === '/individual' || path === '/add-customer') return 'individual';
    if (path === '/agent' || path === '/add-agent') return 'agent';
    if (path === '/orders' || path === '/add-order') return 'orders';
    if (path === '/company') return 'company';
    return 'summary';
  };

  const handleTabClick = (tab) => {
    switch (tab) {
      case 'summary':
        navigate('/summary');
        break;
      case 'individual':
        navigate('/individual');
        break;
      case 'agent':
        navigate('/agent');
        break;
      case 'orders':
        navigate('/orders');
        break;
      case 'company':
        navigate('/company');
        break;
      default:
        navigate('/summary');
    }
  };

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('isLoggedIn');
    // Call the parent logout handler
    onLogout();
    navigate('/login');
  };

  const activeTab = getActiveTab();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between h-20 sm:h-20 gap-4 sm:gap-0">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Forza Mess
              </span>
            </div>
            
            {/* Navigation Tabs */}
            <nav className="flex gap-2 sm:gap-2 mx-auto">
              <button 
                className={`px-4 sm:px-6 py-3 sm:py-3 text-sm sm:text-base font-medium rounded-lg transition-all duration-300 relative group ${
                  activeTab === 'summary' 
                    ? 'text-white font-semibold' 
                    : 'text-white text-opacity-80 hover:text-white'
                }`}
                onClick={() => handleTabClick('summary')}
              >
                Dashboard
                {activeTab === 'summary' && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-5 h-0.5 bg-white rounded-full"></div>
                )}
                {activeTab !== 'summary' && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white rounded-full transition-all duration-300 group-hover:w-5"></div>
                )}
              </button>
              <button 
                className={`px-4 sm:px-6 py-3 sm:py-3 text-sm sm:text-base font-medium rounded-lg transition-all duration-300 relative group ${
                  activeTab === 'orders' 
                    ? 'text-white font-semibold' 
                    : 'text-white text-opacity-80 hover:text-white'
                }`}
                onClick={() => handleTabClick('orders')}
              >
                Orders
                {activeTab === 'orders' && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-5 h-0.5 bg-white rounded-full"></div>
                )}
                {activeTab !== 'orders' && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white rounded-full transition-all duration-300 group-hover:w-5"></div>
                )}
              </button>
              <button 
                className={`px-4 sm:px-6 py-3 sm:py-3 text-sm sm:text-base font-medium rounded-lg transition-all duration-300 relative group ${
                  activeTab === 'individual' 
                    ? 'text-white font-semibold' 
                    : 'text-white text-opacity-80 hover:text-white'
                }`}
                onClick={() => handleTabClick('individual')}
              >
                Individual
                {activeTab === 'individual' && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-5 h-0.5 bg-white rounded-full"></div>
                )}
                {activeTab !== 'individual' && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white rounded-full transition-all duration-300 group-hover:w-5"></div>
                )}
              </button>
              <button 
                className={`px-4 sm:px-6 py-3 sm:py-3 text-sm sm:text-base font-medium rounded-lg transition-all duration-300 relative group ${
                  activeTab === 'agent' 
                    ? 'text-white font-semibold' 
                    : 'text-white text-opacity-80 hover:text-white'
                }`}
                onClick={() => handleTabClick('agent')}
              >
                Agent
                {activeTab === 'agent' && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-5 h-0.5 bg-white rounded-full"></div>
                )}
                {activeTab !== 'agent' && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white rounded-full transition-all duration-300 group-hover:w-5"></div>
                )}
              </button>
              
              <button 
                className={`px-4 sm:px-6 py-3 sm:py-3 text-sm sm:text-base font-medium rounded-lg transition-all duration-300 relative group ${
                  activeTab === 'company' 
                    ? 'text-white font-semibold' 
                    : 'text-white text-opacity-80 hover:text-white'
                }`}
                onClick={() => handleTabClick('company')}
              >
                Company
                {activeTab === 'company' && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-5 h-0.5 bg-white rounded-full"></div>
                )}
                {activeTab !== 'company' && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white rounded-full transition-all duration-300 group-hover:w-5"></div>
                )}
              </button>
            </nav>

            {/* User Section */}
            <div className="flex items-center">
              <button 
                className="flex items-center gap-2 bg-white bg-opacity-10 border border-white border-opacity-20 text-gray-800 px-3 sm:px-4 py-2 sm:py-2 rounded-lg text-xs sm:text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-white hover:bg-opacity-20 hover:border-opacity-30"
                onClick={handleLogout}
              >
                <svg width="16" height="16" className="sm:w-5 sm:h-5 text-gray-800" viewBox="0 0 24 24" fill="none">
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill="currentColor"/>
                </svg>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-gray-50 min-h-[calc(100vh-5rem)]">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
