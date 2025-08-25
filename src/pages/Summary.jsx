import React from 'react';

const Summary = () => {
  // Sample data - in a real app, this would come from an API
  const stats = {
    totalCustomers: 1250,
    activeCustomers: 1180,
    totalAgents: 25,
    activeAgents: 22,
    totalCompanies: 'AED 2,45',
    monthlyRevenue: 'AED 185,000',
    expiringSoon: 45,
    newThisMonth: 89
  };

  const recentActivities = [
    { id: 1, type: 'customer', action: 'New customer registered', name: 'Sarah Johnson', time: '2 hours ago' },
    { id: 2, type: 'agent', action: 'Agent commission updated', name: 'Ahmed Hassan', time: '4 hours ago' },
    { id: 3, type: 'customer', action: 'Customer renewed subscription', name: 'Michael Brown', time: '6 hours ago' },
    { id: 4, type: 'agent', action: 'New agent joined', name: 'Fatima Al Mansouri', time: '1 day ago' },
    { id: 5, type: 'customer', action: 'Payment received', name: 'Emily Davis', time: '1 day ago' }
  ];

  return (
    <div className="p-5 sm:p-8 lg:p-10 min-h-screen bg-gray-50">
      <div className="mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
          Dashboard
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Welcome back! Here's what's happening with your business.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
          <div className="w-12 h-12 sm:w-15 sm:h-15 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
            <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none">
              <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-1.7 2.26V16h-1.5v6h6zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9V9c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6h1.5v7h4z" fill="currentColor"/>
            </svg>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-1">
              {stats.totalCustomers.toLocaleString()}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mb-2">
              Total Individual Customers
            </p>
           
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
          <div className="w-12 h-12 sm:w-15 sm:h-15 rounded-xl bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center text-white flex-shrink-0">
            <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
            </svg>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-1">
              {stats.totalAgents}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mb-2">
              Total Agents
            </p>
           
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
          <div className="w-12 h-12 sm:w-15 sm:h-15 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white flex-shrink-0">
            <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none">
              <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10z" fill="currentColor"/>
            </svg>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-1">
              {stats.totalCompanies}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mb-2">
              Total Companies
            </p>
          
          </div>
        </div>


      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-8 sm:mb-10">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-5">
          Recent Activities
        </h2>
        <div className="space-y-3 sm:space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0 ${
                activity.type === 'customer' 
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600' 
                  : 'bg-gradient-to-br from-pink-400 to-red-500'
              }`}>
                {activity.type === 'customer' ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-1.7 2.26V16h-1.5v6h6z" fill="currentColor"/>
                  </svg>
                )}
              </div>
              <div className="text-center sm:text-left flex-1">
                <p className="text-sm text-gray-800 leading-relaxed">
                  <span className="font-semibold">{activity.action}</span> - {activity.name}
                </p>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default Summary;
