import React from 'react';

const Summary = () => {
  // Sample data - in a real app, this would come from an API
  const stats = {
    totalCustomers: 1250,
    activeCustomers: 1180,
    totalAgents: 25,
    activeAgents: 22,
    totalRevenue: 'AED 2,450,000',
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
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
              Total Customers
            </p>
            <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-xl">
              +{stats.newThisMonth} this month
            </span>
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
            <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-xl">
              {stats.activeAgents} active
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
          <div className="w-12 h-12 sm:w-15 sm:h-15 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white flex-shrink-0">
            <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none">
              <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" fill="currentColor"/>
            </svg>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-1">
              {stats.totalRevenue}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mb-2">
              Total Revenue
            </p>
            <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-xl">
              +{stats.monthlyRevenue} this month
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
          <div className="w-12 h-12 sm:w-15 sm:h-15 rounded-xl bg-gradient-to-br from-pink-400 to-yellow-400 flex items-center justify-center text-white flex-shrink-0">
            <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none">
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="currentColor"/>
            </svg>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-1">
              {stats.expiringSoon}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mb-2">
              Expiring Soon
            </p>
            <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-xl">
              Requires attention
            </span>
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

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-5">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <button className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 hover:-translate-y-0.5">
            <svg width="16" height="16" className="sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
            </svg>
            <span className="hidden sm:inline">Add New Customer</span>
            <span className="sm:hidden">Add Customer</span>
          </button>
          <button className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 hover:-translate-y-0.5">
            <svg width="16" height="16" className="sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
            </svg>
            <span className="hidden sm:inline">Add New Agent</span>
            <span className="sm:hidden">Add Agent</span>
          </button>
          <button className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 hover:-translate-y-0.5">
            <svg width="16" height="16" className="sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/>
            </svg>
            <span className="hidden sm:inline">View Reports</span>
            <span className="sm:hidden">Reports</span>
          </button>
          <button className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 hover:-translate-y-0.5">
            <svg width="16" height="16" className="sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
            </svg>
            <span className="hidden sm:inline">Manage Subscriptions</span>
            <span className="sm:hidden">Subscriptions</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
