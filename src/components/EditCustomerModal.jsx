import React, { useState, useEffect } from 'react';
import breakfastImg from '../assets/images/breakfast.png';
import lunchImg from '../assets/images/lunch.png';
import dinnerImg from '../assets/images/dinner.png';

const EditCustomerModal = ({ isOpen, onClose, customer, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
    joinedDate: '',
    price: '',
    meals: {
      Breakfast: false,
      Lunch: false,
      Dinner: false
    }
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data when customer prop changes
  useEffect(() => {
    if (customer) {
      let mealsData = { Breakfast: false, Lunch: false, Dinner: false };
      
      // Parse meals data if it exists
      if (customer.meals) {
        try {
          if (typeof customer.meals === 'string') {
            mealsData = JSON.parse(customer.meals);
          } else {
            mealsData = customer.meals;
          }
        } catch (e) {
          console.error('Error parsing meals data:', e);
        }
      }

      setFormData({
        name: customer.name || '',
        mobile: customer.mobile || '',
        address: customer.address || '',
        joinedDate: customer.joinedDate || '',
        price: customer.price ? customer.price.replace('AED ', '') : '',
        meals: mealsData
      });
      setErrors({});
    }
  }, [customer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
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
    setFormData(prevState => ({
      ...prevState,
      meals: {
        ...prevState.meals,
        [mealType]: !prevState.meals[mealType]
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Customer name is required';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid mobile number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.joinedDate) {
      newErrors.joinedDate = 'Joined date is required';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (!/^\d+(\.\d{1,2})?$/.test(formData.price) || parseFloat(formData.price) < 0) {
      newErrors.price = 'Please enter a valid price (e.g., 25.50)';
    }

    // Check if at least one meal is selected
    const hasSelectedMeal = Object.values(formData.meals).some(selected => selected);
    if (!hasSelectedMeal) {
      newErrors.meals = 'Please select at least one meal type';
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
      // Prepare the updated customer data
      const updatedCustomer = {
        ...customer,
        name: formData.name,
        mobile: formData.mobile,
        address: formData.address,
        joinedDate: formData.joinedDate,
        price: `AED ${formData.price}`,
        meals: JSON.stringify(formData.meals)
      };

      // Call the onSave callback with updated data
      if (onSave) {
        await onSave(updatedCustomer);
      }
      
      onClose();
      
    } catch (error) {
      console.error('Error updating customer:', error);
      alert('Error updating customer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !customer) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <h3 className="text-xl font-semibold text-white">
                Edit Customer Details
              </h3>
              <p className="text-indigo-100 text-sm mt-1">{customer.customerId}</p>
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
            {/* Customer Information Section */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Customer Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="+971 XX XXX XXXX"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                      errors.mobile ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.mobile && (
                    <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Joined Date *
                  </label>
                  <input
                    type="date"
                    name="joinedDate"
                    value={formData.joinedDate}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                      errors.joinedDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.joinedDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.joinedDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (AED) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    placeholder="25.50"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                      errors.price ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 resize-none ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Meal Selection Section */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Meal Selection
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Breakfast */}
                <div className={`p-4 rounded-lg border-2 shadow-md transition-all duration-200 cursor-pointer ${
                  formData.meals.Breakfast 
                    ? 'border-yellow-400 bg-yellow-50' 
                    : 'border-gray-200 bg-white hover:border-yellow-300'
                }`} onClick={() => handleMealChange('Breakfast')}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                      formData.meals.Breakfast 
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-400' 
                        : 'bg-gray-200'
                    }`}>
                      <img src={breakfastImg} alt="Breakfast" className="w-5 h-5 filter brightness-0 invert" />
                    </div>
                    <span className="font-medium text-gray-800">Breakfast</span>
                    <input
                      type="checkbox"
                      checked={formData.meals.Breakfast}
                      onChange={() => handleMealChange('Breakfast')}
                      className="ml-auto w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                    />
                  </div>
                </div>

                {/* Lunch */}
                <div className={`p-4 rounded-lg border-2 shadow-md transition-all duration-200 cursor-pointer ${
                  formData.meals.Lunch 
                    ? 'border-orange-400 bg-orange-50' 
                    : 'border-gray-200 bg-white hover:border-orange-300'
                }`} onClick={() => handleMealChange('Lunch')}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                      formData.meals.Lunch 
                        ? 'bg-gradient-to-r from-orange-400 to-red-400' 
                        : 'bg-gray-200'
                    }`}>
                      <img src={lunchImg} alt="Lunch" className="w-5 h-5 filter brightness-0 invert" />
                    </div>
                    <span className="font-medium text-gray-800">Lunch</span>
                    <input
                      type="checkbox"
                      checked={formData.meals.Lunch}
                      onChange={() => handleMealChange('Lunch')}
                      className="ml-auto w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Dinner */}
                <div className={`p-4 rounded-lg border-2 shadow-md transition-all duration-200 cursor-pointer ${
                  formData.meals.Dinner 
                    ? 'border-purple-400 bg-purple-50' 
                    : 'border-gray-200 bg-white hover:border-purple-300'
                }`} onClick={() => handleMealChange('Dinner')}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                      formData.meals.Dinner 
                        ? 'bg-gradient-to-r from-purple-400 to-indigo-400' 
                        : 'bg-gray-200'
                    }`}>
                      <img src={dinnerImg} alt="Dinner" className="w-5 h-5 filter brightness-0 invert" />
                    </div>
                    <span className="font-medium text-gray-800">Dinner</span>
                    <input
                      type="checkbox"
                      checked={formData.meals.Dinner}
                      onChange={() => handleMealChange('Dinner')}
                      className="ml-auto w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>
              {errors.meals && (
                <p className="text-red-500 text-sm mt-2">{errors.meals}</p>
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
                  Updating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Update Customer
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

export default EditCustomerModal;
