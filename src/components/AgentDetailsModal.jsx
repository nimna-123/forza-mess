import React from 'react';
import breakfastImg from '../assets/images/breakfast.png';
import lunchImg from '../assets/images/lunch.png';
import dinnerImg from '../assets/images/dinner.png';

const AgentDetailsModal = ({ isOpen, onClose, agent }) => {
  if (!isOpen || !agent) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/90 backdrop-blur-xs rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div></div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white">
                Agent Details
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="space-y-6">
            {/* Agent Name */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{agent.name}</h2>
              <p className="text-gray-600 font-mono">{agent.agentId}</p>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Contact Information
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 font-medium">Mobile:</span>
                  <span className="text-gray-800 font-mono">{agent.mobile}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-600 font-medium">Address:</span>
                  <span className="text-gray-800">{agent.address || 'Not provided'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 font-medium">Joined:</span>
                  <span className="text-gray-800">{agent.joinedDate ? formatDate(agent.joinedDate) : 'Not provided'}</span>
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                Financial Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 font-medium">Credit Limit:</span>
                    <span className="text-gray-800 font-semibold">{agent.creditLimit || 'Not set'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 font-medium">Due Days:</span>
                    <span className="text-gray-800">{agent.dueDays || 'Not set'} days</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 font-medium">Commission:</span>
                    <span className="text-gray-800 font-semibold">{agent.commission || 'Not set'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 font-medium">Customers:</span>
                    <span className="text-gray-800">{agent.customersCount || 0}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Meal Prices */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Meal Prices
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Breakfast */}
                <div className="bg-white p-3 rounded-lg border-2 border-yellow-300 shadow-md">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center">
                      <img src={breakfastImg} alt="Breakfast" className="w-5 h-5 filter brightness-0 invert" />
                    </div>
                    <span className="font-medium text-gray-800">Breakfast</span>
                  </div>
                  <div className="text-center">
                    <span className="text-lg font-bold text-orange-600">
                      {agent.breakfastPrice || 'AED 0'}
                    </span>
                  </div>
                </div>

                {/* Lunch */}
                <div className="bg-white p-3 rounded-lg border-2 border-orange-300 shadow-md">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center">
                      <img src={lunchImg} alt="Lunch" className="w-5 h-5 filter brightness-0 invert" />
                    </div>
                    <span className="font-medium text-gray-800">Lunch</span>
                  </div>
                  <div className="text-center">
                    <span className="text-lg font-bold text-red-600">
                      {agent.lunchPrice || 'AED 0'}
                    </span>
                  </div>
                </div>

                {/* Dinner */}
                <div className="bg-white p-3 rounded-lg border-2 border-purple-300 shadow-md">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center justify-center">
                      <img src={dinnerImg} alt="Dinner" className="w-5 h-5 filter brightness-0 invert" />
                    </div>
                    <span className="font-medium text-gray-800">Dinner</span>
                  </div>
                  <div className="text-center">
                    <span className="text-lg font-bold text-purple-600">
                      {agent.dinnerPrice || 'AED 0'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetailsModal;
