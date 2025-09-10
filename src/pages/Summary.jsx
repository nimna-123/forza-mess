import React,{useEffect,useState} from 'react';
import { GET_DASHBOARD_DATA } from '../Api/service';

const Summary = () => {
  const [stats, setStats] = useState({totalIndividualCustomers:"",totalAgents:"",totalCompanies:""});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  
  // Helper function to parse meals JSON string
  const parseMeals = (mealsString) => {
    if (!mealsString) return null;
    try {
      return JSON.parse(mealsString);
    } catch (error) {
      console.error('Error parsing meals:', error);
      return null;
    }
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Helper function to get customer type icon and color
  const getCustomerTypeInfo = (customerType) => {
    switch (customerType) {
      case 'individual':
        return { icon: '👤', color: 'from-blue-500 to-blue-600', label: 'Individual' };
      case 'company':
        return { icon: '🏢', color: 'from-green-500 to-green-600', label: 'Company' };
      case 'agent':
        return { icon: '🤝', color: 'from-purple-500 to-purple-600', label: 'Agent' };
      default:
        return { icon: '👤', color: 'from-gray-500 to-gray-600', label: 'Unknown' };
    }
  };

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await GET_DASHBOARD_DATA();
        setStats(response.data.summary || {});
        setRecentActivities(response.data.recentActivity || []);
      } catch (err) {
        setError('Failed to fetch summary. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);





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
              {stats.totalIndividualCustomers.toLocaleString()}
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
          {recentActivities.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p>No recent activities found</p>
            </div>
          ) : (
            recentActivities.map((activity, index) => {
              const customerTypeInfo = getCustomerTypeInfo(activity.customerType);
              const meals = parseMeals(activity.meals);
              const isOrderPlaced = activity.activityType === 'Order Placed';
              
              return (
                <div key={index} className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                  {/* Activity Icon */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0 bg-gradient-to-br ${customerTypeInfo.color}`}>
                    {isOrderPlaced ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-1.7 2.26V16h-1.5v6h6z" fill="currentColor"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
                      </svg>
                    )}
                  </div>
                  
                  {/* Activity Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {activity.activityType}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{activity.customerName}</span>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded-full">
                            {customerTypeInfo.label}
                          </span>
                        </p>
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(activity.activityDate)}
                      </div>
                    </div>
                    
                    {/* Order Details (only for Order Placed) */}
                    {isOrderPlaced && activity.orderId && meals && (
                      <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                          <span className="text-sm font-medium text-gray-700">
                            Order #{activity.orderId}
                          </span>
                          <span className="text-sm font-bold text-green-600">
                            ₹{activity.total?.toFixed(2)}
                          </span>
                        </div>
                        
                        {/* Meal Details */}
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          {meals.Breakfast && meals.Breakfast.totalQuantity > 0 && (
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                              <span>Breakfast: {meals.Breakfast.totalQuantity}</span>
                            </div>
                          )}
                          {meals.Lunch && meals.Lunch.totalQuantity > 0 && (
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              <span>Lunch: {meals.Lunch.totalQuantity}</span>
                            </div>
                          )}
                          {meals.Dinner && meals.Dinner.totalQuantity > 0 && (
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                              <span>Dinner: {meals.Dinner.totalQuantity}</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Veg/Non-Veg Breakdown */}
                        {meals.PreferenceType === 'preference' && (
                          <div className="mt-2 flex gap-4 text-xs text-gray-600">
                            <span>Veg: {[meals.Breakfast?.vegQuantity || 0, meals.Lunch?.vegQuantity || 0, meals.Dinner?.vegQuantity || 0].reduce((a, b) => a + b, 0)}</span>
                            <span>Non-Veg: {[meals.Breakfast?.nonVegQuantity || 0, meals.Lunch?.nonVegQuantity || 0, meals.Dinner?.nonVegQuantity || 0].reduce((a, b) => a + b, 0)}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      
    </div>
  );
};

export default Summary;
