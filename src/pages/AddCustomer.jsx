import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import breakfastImg from '../assets/images/breakfast.png';
import lunchImg from '../assets/images/lunch.png';
import dinnerImg from '../assets/images/dinner.png';
import { ADD_INDIVIDUAL } from '../Api/service';
import Toast from '../components/Toast';

const AddCustomer = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'success'
  });

  const showToast = (message, type = 'success') => {
    setToast({
      isVisible: true,
      message,
      type
    });
  };

  const hideToast = () => {
    setToast(prev => ({
      ...prev,
      isVisible: false
    }));
  };

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
    joinedDate: '',
    price: '',
    paymentMode: 'Card',
    dietPreference: 'veg',
    meals: {
      breakfast: true,
      lunch: true,
      dinner: true
    }
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
      newErrors.name = 'Name is required';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.joinedDate) {
      newErrors.joinedDate = 'Joined date is required';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (!/^AED\s\d{1,3}(,\d{3})*\.\d{2}$/.test(formData.price)) {
      newErrors.price = 'Price must be in format AED X,XXX.XX';
    }

    const selectedMeals = Object.values(formData.meals).filter(Boolean).length;
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
      const response = await ADD_INDIVIDUAL( formData);
      setIsSubmitting(false);
      showToast("Customer added successfully!", "success");
      setFormData({
        name: '',
        mobile: '',
        address: '',
        joinedDate: '',
        price: '',
        paymentMode: 'Card',
        dietPreference: 'veg',
        meals: {
          breakfast: true,
          lunch: true,
          dinner: true
        }
      });
    } catch (error) {
      console.error("Error adding customer:", error);
      setIsSubmitting(false);
      showToast("Failed to add customer", "error");
    }
  };
  
  return (
    <>
      <Toast
            message={toast.message}
            type={toast.type}
            isVisible={toast.isVisible}
            onClose={hideToast}
          />
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
      
        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Add  New Customer</h2>
          </div>

                     <form onSubmit={handleSubmit} className="p-6 lg:p-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              {/* Address */}
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

                             {/* Joined Date, Price, Payment Mode Row */}
               <div className="md:col-span-2">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                   {/* Price */}
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       Price (AED) *
                     </label>
                     <input
                       type="text"
                       name="price"
                       value={formData.price}
                       onChange={handleInputChange}
                       className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                         errors.price ? 'border-red-500' : 'border-gray-300'
                       }`}
                     />
                     {errors.price && (
                       <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                     )}
                   </div>

                   {/* Payment Mode */}
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       Payment Mode *
                     </label>
                     <select
                       name="paymentMode"
                       value={formData.paymentMode}
                       onChange={handleInputChange}
                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                     >
                       <option value="Card">Card</option>
                       <option value="Cash">Cash</option>
                       <option value="Bank Transfer">Bank Transfer</option>
                     </select>
                   </div>
                 </div>
               </div>

                             {/* Meals Selection */}
               <div className="md:col-span-2">
                 <label className="block text-sm font-medium text-gray-700 mb-4">
                   Meals Selection *
                 </label>
                 <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                     {/* Breakfast */}
                     <div 
                       className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                         formData.meals.breakfast 
                           ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300 shadow-lg' 
                           : 'bg-white border-gray-200 hover:border-yellow-300 hover:shadow-md'
                       }`}
                       onClick={() => handleMealChange('breakfast')}
                     >
                       <div className="flex items-center justify-between mb-3">
                         <div className="flex items-center gap-3">
                           <div className={`w-12 h-12 rounded-full flex items-center justify-center overflow-hidden ${
                             formData.meals.breakfast 
                               ? 'bg-gradient-to-r from-yellow-400 to-orange-400 shadow-lg' 
                               : 'bg-gray-100'
                           }`}>
                             <img 
                               src={breakfastImg} 
                               alt="Breakfast" 
                               className={`w-8 h-8 object-cover ${formData.meals.breakfast ? 'filter brightness-0 invert' : 'opacity-60'}`}
                             />
                           </div>
                           <div>
                             <h3 className={`font-semibold text-lg ${formData.meals.breakfast ? 'text-gray-800' : 'text-gray-600'}`}>
                               Breakfast
                             </h3>
                            
                           </div>
                         </div>
                         <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                           formData.meals.breakfast 
                             ? 'bg-yellow-500 border-yellow-500' 
                             : 'border-gray-300'
                         }`}>
                           {formData.meals.breakfast && (
                             <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                             </svg>
                           )}
                         </div>
                       </div>
                     
                     </div>

                     {/* Lunch */}
                     <div 
                       className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                         formData.meals.lunch 
                           ? 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-300 shadow-lg' 
                           : 'bg-white border-gray-200 hover:border-orange-300 hover:shadow-md'
                       }`}
                       onClick={() => handleMealChange('lunch')}
                     >
                       <div className="flex items-center justify-between mb-3">
                         <div className="flex items-center gap-3">
                           <div className={`w-12 h-12 rounded-full flex items-center justify-center overflow-hidden ${
                             formData.meals.lunch 
                               ? 'bg-gradient-to-r from-orange-400 to-red-400 shadow-lg' 
                               : 'bg-gray-100'
                           }`}>
                             <img 
                               src={lunchImg} 
                               alt="Lunch" 
                               className={`w-8 h-8 object-cover ${formData.meals.lunch ? 'filter brightness-0 invert' : 'opacity-60'}`}
                             />
                           </div>
                           <div>
                             <h3 className={`font-semibold text-lg ${formData.meals.lunch ? 'text-gray-800' : 'text-gray-600'}`}>
                               Lunch
                             </h3>
                            
                           </div>
                         </div>
                         <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                           formData.meals.lunch 
                             ? 'bg-orange-500 border-orange-500' 
                             : 'border-gray-300'
                         }`}>
                           {formData.meals.lunch && (
                             <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                             </svg>
                           )}
                         </div>
                       </div>
                      
                     </div>

                     {/* Dinner */}
                     <div 
                       className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                         formData.meals.dinner 
                           ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-300 shadow-lg' 
                           : 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-md'
                       }`}
                       onClick={() => handleMealChange('dinner')}
                     >
                       <div className="flex items-center justify-between mb-3">
                         <div className="flex items-center gap-3">
                           <div className={`w-12 h-12 rounded-full flex items-center justify-center overflow-hidden ${
                             formData.meals.dinner 
                               ? 'bg-gradient-to-r from-purple-400 to-indigo-400 shadow-lg' 
                               : 'bg-gray-100'
                           }`}>
                             <img 
                               src={dinnerImg} 
                               alt="Dinner" 
                               className={`w-8 h-8 object-cover ${formData.meals.dinner ? 'filter brightness-0 invert' : 'opacity-60'}`}
                             />
                           </div>
                           <div>
                             <h3 className={`font-semibold text-lg ${formData.meals.dinner ? 'text-gray-800' : 'text-gray-600'}`}>
                               Dinner
                             </h3>
                            
                           </div>
                         </div>
                         <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                           formData.meals.dinner 
                             ? 'bg-purple-500 border-purple-500' 
                             : 'border-gray-300'
                         }`}>
                           {formData.meals.dinner && (
                             <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
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

               {/* Diet Preference */}
               <div className="md:col-span-2">
                 <label className="block text-sm font-medium text-gray-700 mb-4">
                   Diet Preference *
                 </label>
                 <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {/* Vegetarian */}
                     <div 
                       className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                         formData.dietPreference === 'veg' 
                           ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-lg' 
                           : 'bg-white border-gray-200 hover:border-green-300 hover:shadow-md'
                       }`}
                       onClick={() => setFormData(prevState => ({ ...prevState, dietPreference: 'veg' }))}
                     >
                       <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           <div className={`w-12 h-12 rounded-full flex items-center justify-center overflow-hidden ${
                             formData.dietPreference === 'veg' 
                               ? 'bg-gradient-to-r from-green-400 to-emerald-400 shadow-lg' 
                               : 'bg-gray-100'
                           }`}>
                             <svg className={`w-8 h-8 ${formData.dietPreference === 'veg' ? 'text-white' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
                               <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                             </svg>
                           </div>
                           <div>
                             <h3 className={`font-semibold text-lg ${formData.dietPreference === 'veg' ? 'text-gray-800' : 'text-gray-600'}`}>
                               Vegetarian
                             </h3>
                             <p className={`text-sm ${formData.dietPreference === 'veg' ? 'text-gray-600' : 'text-gray-500'}`}>
                               Plant-based meals only
                             </p>
                           </div>
                         </div>
                         <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                           formData.dietPreference === 'veg' 
                             ? 'bg-green-500 border-green-500' 
                             : 'border-gray-300'
                         }`}>
                           {formData.dietPreference === 'veg' && (
                             <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                             </svg>
                           )}
                         </div>
                       </div>
                     </div>

                     {/* Non-Vegetarian */}
                     <div 
                       className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                         formData.dietPreference === 'non-veg' 
                           ? 'bg-gradient-to-br from-red-50 to-pink-50 border-red-300 shadow-lg' 
                           : 'bg-white border-gray-200 hover:border-red-300 hover:shadow-md'
                       }`}
                       onClick={() => setFormData(prevState => ({ ...prevState, dietPreference: 'non-veg' }))}
                     >
                       <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           <div className={`w-12 h-12 rounded-full flex items-center justify-center overflow-hidden ${
                             formData.dietPreference === 'non-veg' 
                               ? 'bg-gradient-to-r from-red-400 to-pink-400 shadow-lg' 
                               : 'bg-gray-100'
                           }`}>
                             <svg className={`w-8 h-8 ${formData.dietPreference === 'non-veg' ? 'text-white' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
                               <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                             </svg>
                           </div>
                           <div>
                             <h3 className={`font-semibold text-lg ${formData.dietPreference === 'non-veg' ? 'text-gray-800' : 'text-gray-600'}`}>
                               Non-Vegetarian
                             </h3>
                             <p className={`text-sm ${formData.dietPreference === 'non-veg' ? 'text-gray-600' : 'text-gray-500'}`}>
                               Includes meat and fish
                             </p>
                           </div>
                         </div>
                         <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                           formData.dietPreference === 'non-veg' 
                             ? 'bg-red-500 border-red-500' 
                             : 'border-gray-300'
                         }`}>
                           {formData.dietPreference === 'non-veg' && (
                             <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                             </svg>
                           )}
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
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
                    Adding Customer...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Customer
                  </>
                )}
              </button>
              
                             <button
                 type="button"
                 onClick={() => navigate('/individual')}
                 className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
               >
                Cancel
              </button>
            </div>
          </form>
        </div>

      
      </div>
    </div>
    </>
  );
};

export default AddCustomer;
