import React from 'react';
import breakfastImg from '../assets/images/breakfast.png';
import lunchImg from '../assets/images/lunch.png';
import dinnerImg from '../assets/images/dinner.png';

const CustomerDetailsModal = ({ isOpen, onClose, customer }) => {
  if (!isOpen || !customer) return null;

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
                Customer Details
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
            {/* Customer Name */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{customer.name}</h2>
              <p className="text-gray-600 font-mono">{customer.customerId}</p>
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
                  <span className="text-gray-800 font-mono">{customer.mobile}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-600 font-medium">Address:</span>
                  <span className="text-gray-800">{customer.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 font-medium">Joined:</span>
                  <span className="text-gray-800">{formatDate(customer.joinedDate)}</span>
                </div>
              </div>
            </div>

            {/* Meals Selection */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Meals Selection
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Breakfast */}
                <div className="bg-white p-3 rounded-lg border-2 border-yellow-300 shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center">
                      <img src={breakfastImg} alt="Breakfast" className="w-5 h-5 filter brightness-0 invert" />
                    </div>
                    <span className="font-medium text-gray-800">Breakfast</span>
                  </div>
                </div>

                {/* Lunch */}
                <div className="bg-white p-3 rounded-lg border-2 border-orange-300 shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center">
                      <img src={lunchImg} alt="Lunch" className="w-5 h-5 filter brightness-0 invert" />
                    </div>
                    <span className="font-medium text-gray-800">Lunch</span>
                  </div>
                </div>

                {/* Dinner */}
                <div className="bg-white p-3 rounded-lg border-2 border-purple-300 shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center justify-center">
                      <img src={dinnerImg} alt="Dinner" className="w-5 h-5 filter brightness-0 invert" />
                    </div>
                    <span className="font-medium text-gray-800">Dinner</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Diet Preference and Payment Information Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Diet Preference */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Diet Preference
                </h3>
                <div className="flex justify-center">
                  <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 shadow-md ${
                    customer.dietPreference === 'veg' 
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 text-green-800' 
                      : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-300 text-red-800'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      customer.dietPreference === 'veg' 
                        ? 'bg-gradient-to-r from-green-400 to-emerald-400' 
                        : 'bg-gradient-to-r from-red-400 to-pink-400'
                    }`}>
                      {customer.dietPreference === 'veg' ? (
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                    <span className="font-semibold text-lg capitalize">
                      {customer.dietPreference === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Payment Information
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 font-medium">Mode:</span>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium uppercase tracking-wider ${
                      customer.paymentMode.toLowerCase() === 'card'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {customer.paymentMode}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 font-medium">Price:</span>
                    <span className="text-green-600 font-semibold text-lg">{customer.price}</span>
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

export default CustomerDetailsModal;
