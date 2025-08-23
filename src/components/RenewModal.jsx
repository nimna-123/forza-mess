import React, { useState, useEffect } from 'react';
import breakfastImg from '../assets/images/breakfast.png';
import lunchImg from '../assets/images/lunch.png';
import dinnerImg from '../assets/images/dinner.png';

const RenewModal = ({ isOpen, onClose, customer, onRenew }) => {
  const [renewData, setRenewData] = useState({
    name: customer?.name || '',
    meals: {
      breakfast: true,
      lunch: true,
      dinner: true
    },
    paymentMode: 'Card',
    renewDate: new Date().toISOString().split('T')[0],
    price: customer?.price || 'AED 1,099.99'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form data when customer changes
  useEffect(() => {
    if (customer) {
      setRenewData(prevState => ({
        ...prevState,
        name: customer.name || '',
        price: customer.price || 'AED 1,099.99'
      }));
    }
  }, [customer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRenewData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevState => ({
        ...prevState,
        [name]: ''
      }));
    }
  };

  const handleMealChange = (mealType) => {
    setRenewData(prevState => ({
      ...prevState,
      meals: {
        ...prevState.meals,
        [mealType]: !prevState.meals[mealType]
      }
    }));
  };

     const validateForm = () => {
     const newErrors = {};

     if (!renewData.renewDate) {
       newErrors.renewDate = 'Renew date is required';
     }

     if (!renewData.price.trim()) {
       newErrors.price = 'Price is required';
     }

     const selectedMeals = Object.values(renewData.meals).filter(Boolean).length;
     if (selectedMeals === 0) {
       newErrors.meals = 'Please select at least one meal';
     }

     setErrors(newErrors);
     return Object.keys(newErrors).length === 0;
   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Renew data to be saved:', renewData);
      
      // Call the parent's onRenew function
      onRenew(renewData);
      
      // Close modal
      onClose();
      
    } catch (error) {
      console.error('Error renewing customer:', error);
      alert('Error renewing customer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/90 backdrop-blur-xs rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
                 {/* Modal Header */}
         <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4 rounded-t-2xl">
           <div className="flex items-center justify-between">
             <div></div>
             <div className="text-center">
               <h3 className="text-xl font-semibold text-white">
                 {renewData.name || 'No customer selected'}
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
         <form onSubmit={handleSubmit} className="p-6">
           <div className="space-y-6">

            {/* Meals Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Meals Selection *
              </label>
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Breakfast */}
                  <div 
                    className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      renewData.meals.breakfast 
                        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300 shadow-lg' 
                        : 'bg-white border-gray-200 hover:border-yellow-300 hover:shadow-md'
                    }`}
                    onClick={() => handleMealChange('breakfast')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden ${
                          renewData.meals.breakfast 
                            ? 'bg-gradient-to-r from-yellow-400 to-orange-400 shadow-lg' 
                            : 'bg-gray-100'
                        }`}>
                          <img 
                            src={breakfastImg} 
                            alt="Breakfast" 
                            className={`w-5 h-5 object-cover ${renewData.meals.breakfast ? 'filter brightness-0 invert' : 'opacity-60'}`}
                          />
                        </div>
                        <span className={`font-medium text-sm ${renewData.meals.breakfast ? 'text-gray-800' : 'text-gray-600'}`}>
                          Breakfast
                        </span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        renewData.meals.breakfast 
                          ? 'bg-yellow-500 border-yellow-500' 
                          : 'border-gray-300'
                      }`}>
                        {renewData.meals.breakfast && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Lunch */}
                  <div 
                    className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      renewData.meals.lunch 
                        ? 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-300 shadow-lg' 
                        : 'bg-white border-gray-200 hover:border-orange-300 hover:shadow-md'
                    }`}
                    onClick={() => handleMealChange('lunch')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden ${
                          renewData.meals.lunch 
                            ? 'bg-gradient-to-r from-orange-400 to-red-400 shadow-lg' 
                            : 'bg-gray-100'
                        }`}>
                          <img 
                            src={lunchImg} 
                            alt="Lunch" 
                            className={`w-5 h-5 object-cover ${renewData.meals.lunch ? 'filter brightness-0 invert' : 'opacity-60'}`}
                          />
                        </div>
                        <span className={`font-medium text-sm ${renewData.meals.lunch ? 'text-gray-800' : 'text-gray-600'}`}>
                          Lunch
                        </span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        renewData.meals.lunch 
                          ? 'bg-orange-500 border-orange-500' 
                          : 'border-gray-300'
                      }`}>
                        {renewData.meals.lunch && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Dinner */}
                  <div 
                    className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      renewData.meals.dinner 
                        ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-300 shadow-lg' 
                        : 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-md'
                    }`}
                    onClick={() => handleMealChange('dinner')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden ${
                          renewData.meals.dinner 
                            ? 'bg-gradient-to-r from-purple-400 to-indigo-400 shadow-lg' 
                            : 'bg-gray-100'
                        }`}>
                          <img 
                            src={dinnerImg} 
                            alt="Dinner" 
                            className={`w-5 h-5 object-cover ${renewData.meals.dinner ? 'filter brightness-0 invert' : 'opacity-60'}`}
                          />
                        </div>
                        <span className={`font-medium text-sm ${renewData.meals.dinner ? 'text-gray-800' : 'text-gray-600'}`}>
                          Dinner
                        </span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        renewData.meals.dinner 
                          ? 'bg-purple-500 border-purple-500' 
                          : 'border-gray-300'
                      }`}>
                        {renewData.meals.dinner && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {errors.meals && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.meals}
                </p>
              )}
            </div>

            {/* Payment Mode and Renew Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Payment Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Mode *
                </label>
                <select
                  name="paymentMode"
                  value={renewData.paymentMode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                >
                  <option value="Card">Card</option>
                  <option value="Cash">Cash</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>

              {/* Renew Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Renew Date *
                </label>
                <input
                  type="date"
                  name="renewDate"
                  value={renewData.renewDate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 ${
                    errors.renewDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.renewDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.renewDate}</p>
                )}
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (AED) *
              </label>
              <input
                type="text"
                name="price"
                value={renewData.price}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="AED X,XXX.XX"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Renewing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Renew 
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RenewModal;
