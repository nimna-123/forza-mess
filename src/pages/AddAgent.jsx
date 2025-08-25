import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddAgent = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
    joinedDate: '',
    breakfastPrice: '',
    lunchPrice: '',
    dinnerPrice: '',
    creditLimit: '',
    creditDays: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\+971\s\d{2}\s\d{3}\s\d{4}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile must be in format +971 XX XXX XXXX';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.joinedDate) {
      newErrors.joinedDate = 'Joined date is required';
    }

    if (!formData.breakfastPrice.trim()) {
      newErrors.breakfastPrice = 'Breakfast price is required';
    } else if (!/^\d+(\.\d{1,2})?$/.test(formData.breakfastPrice) || parseFloat(formData.breakfastPrice) < 0) {
      newErrors.breakfastPrice = 'Please enter a valid price (e.g., 25.50)';
    }

    if (!formData.lunchPrice.trim()) {
      newErrors.lunchPrice = 'Lunch price is required';
    } else if (!/^\d+(\.\d{1,2})?$/.test(formData.lunchPrice) || parseFloat(formData.lunchPrice) < 0) {
      newErrors.lunchPrice = 'Please enter a valid price (e.g., 35.00)';
    }

    if (!formData.dinnerPrice.trim()) {
      newErrors.dinnerPrice = 'Dinner price is required';
    } else if (!/^\d+(\.\d{1,2})?$/.test(formData.dinnerPrice) || parseFloat(formData.dinnerPrice) < 0) {
      newErrors.dinnerPrice = 'Please enter a valid price (e.g., 45.75)';
    }

    if (!formData.creditLimit.trim()) {
      newErrors.creditLimit = 'Credit limit is required';
    } else if (!/^\d+(\.\d{1,2})?$/.test(formData.creditLimit) || parseFloat(formData.creditLimit) < 0) {
      newErrors.creditLimit = 'Please enter a valid amount (e.g., 5000.00)';
    }

    if (!formData.creditDays.trim()) {
      newErrors.creditDays = 'Due days is required';
    } else if (!/^\d+$/.test(formData.creditDays) || parseInt(formData.creditDays) < 0) {
      newErrors.creditDays = 'Please enter a valid number of days';
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
      
      console.log('Agent data to be saved:', formData);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        mobile: '',
        address: '',
        joinedDate: '',
        breakfastPrice: '',
        lunchPrice: '',
        dinnerPrice: '',
        creditLimit: '',
        creditDays: ''
      });
      
      alert('Agent added successfully!');
      navigate('/agent-list');
      
    } catch (error) {
      console.error('Error adding agent:', error);
      alert('Error adding agent. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
      
        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Add New Agent</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 lg:p-8">
            {/* First Row - Name and Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
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

              {/* Mobile */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                    errors.mobile ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                )}
              </div>
            </div>

            {/* Rest of the form */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Address */}
              <div className="md:col-span-2 lg:col-span-3">
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

              {/* Joined Date */}
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

               

               {/* Breakfast Price */}
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Breakfast Price (AED) *
                 </label>
                 <input
                   type="number"
                   name="breakfastPrice"
                   value={formData.breakfastPrice}
                   onChange={handleInputChange}
                   min="0"
                   step="0.01"
                   placeholder="25.50"
                   className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                     errors.breakfastPrice ? 'border-red-500' : 'border-gray-300'
                   }`}
                 />
                 {errors.breakfastPrice && (
                   <p className="text-red-500 text-sm mt-1">{errors.breakfastPrice}</p>
                 )}
               </div>

               {/* Lunch Price */}
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Lunch Price (AED) *
                 </label>
                 <input
                   type="number"
                   name="lunchPrice"
                   value={formData.lunchPrice}
                   onChange={handleInputChange}
                   min="0"
                   step="0.01"
                   placeholder="35.00"
                   className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                     errors.lunchPrice ? 'border-red-500' : 'border-gray-300'
                   }`}
                 />
                 {errors.lunchPrice && (
                   <p className="text-red-500 text-sm mt-1">{errors.lunchPrice}</p>
                 )}
               </div>

               {/* Dinner Price */}
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Dinner Price (AED) *
                 </label>
                 <input
                   type="number"
                   name="dinnerPrice"
                   value={formData.dinnerPrice}
                   onChange={handleInputChange}
                   min="0"
                   step="0.01"
                   placeholder="45.75"
                   className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                     errors.dinnerPrice ? 'border-red-500' : 'border-gray-300'
                   }`}
                 />
                 {errors.dinnerPrice && (
                   <p className="text-red-500 text-sm mt-1">{errors.dinnerPrice}</p>
                 )}
               </div>

               {/* Credit Limit */}
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Credit Limit (AED) *
                 </label>
                 <input
                   type="number"
                   name="creditLimit"
                   value={formData.creditLimit}
                   onChange={handleInputChange}
                   min="0"
                   step="0.01"
                   placeholder="5000.00"
                   className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                     errors.creditLimit ? 'border-red-500' : 'border-gray-300'
                   }`}
                 />
                 {errors.creditLimit && (
                   <p className="text-red-500 text-sm mt-1">{errors.creditLimit}</p>
                 )}
               </div>

               {/* Credit Days */}
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Due Days *
                 </label>
                 <input
                   type="number"
                   name="creditDays"
                   value={formData.creditDays}
                   onChange={handleInputChange}
                   min="0"
                   placeholder="30"
                   className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                     errors.creditDays ? 'border-red-500' : 'border-gray-300'
                   }`}
                 />
                 {errors.creditDays && (
                   <p className="text-red-500 text-sm mt-1">{errors.creditDays}</p>
                 )}
               </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Adding Agent...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Agent
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/agent-list')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AddAgent;
