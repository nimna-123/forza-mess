import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import breakfastImg from '../assets/images/breakfast.png';
import lunchImg from '../assets/images/lunch.png';
import dinnerImg from '../assets/images/dinner.png';

const EditCompany = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Sample company data - in a real app, this would come from an API
  const sampleCompanies = [
    {
      id: 1,
      companyId: 'CMP001',
      name: 'Tech Solutions Ltd',
      contactPerson: 'Ahmed Hassan',
      mobile: '+971 50 111 2222',
      address: 'Dubai Internet City, Building 3, Floor 5, Dubai',
      registeredDate: '2023-06-15',
      tradeLicense: 'TL-2023-001234',
      taxNumber: 'TRN-123456789',
      breakfastPrice: 'AED 25',
      lunchPrice: 'AED 45',
      dinnerPrice: 'AED 55',
      creditLimit: 'AED 50,000',
      creditDays: 30,
      status: 'Active',
      employeesCount: 45
    },
    {
      id: 2,
      companyId: 'CMP002',
      name: 'Global Trading Co',
      contactPerson: 'Fatima Al Mansouri',
      mobile: '+971 55 222 3333',
      address: 'Abu Dhabi Business District, Tower A, Abu Dhabi',
      registeredDate: '2023-08-20',
      tradeLicense: 'TL-2023-005678',
      taxNumber: 'TRN-987654321',
      breakfastPrice: 'AED 30',
      lunchPrice: 'AED 50',
      dinnerPrice: 'AED 60',
      creditLimit: 'AED 75,000',
      creditDays: 45,
      status: 'Active',
      employeesCount: 52
    },
    {
      id: 3,
      companyId: 'CMP003',
      name: 'Innovation Systems',
      contactPerson: 'Omar Khalil',
      mobile: '+971 52 333 4444',
      address: 'Sharjah Technology Park, Block B, Sharjah',
      registeredDate: '2023-09-10',
      tradeLicense: 'TL-2023-009876',
      taxNumber: 'TRN-456789123',
      breakfastPrice: 'AED 20',
      lunchPrice: 'AED 40',
      dinnerPrice: 'AED 50',
      creditLimit: 'AED 25,000',
      creditDays: 15,
      status: 'Inactive',
      employeesCount: 28
    }
  ];

  const [company, setCompany] = useState(null);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    mobile: '',
    address: '',
    registeredDate: '',
    tradeLicense: '',
    taxNumber: '',
    breakfastPrice: '',
    lunchPrice: '',
    dinnerPrice: '',
    creditLimit: '',
    creditDays: '',
    employeesCount: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load company data
  useEffect(() => {
    const loadCompany = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundCompany = sampleCompanies.find(c => c.id === parseInt(id));
        if (foundCompany) {
          setCompany(foundCompany);
          setFormData({
            companyName: foundCompany.name || '',
            contactPerson: foundCompany.contactPerson || '',
            mobile: foundCompany.mobile || '',
            address: foundCompany.address || '',
            registeredDate: foundCompany.registeredDate || '',
            tradeLicense: foundCompany.tradeLicense || '',
            taxNumber: foundCompany.taxNumber || '',
            breakfastPrice: foundCompany.breakfastPrice ? foundCompany.breakfastPrice.replace('AED ', '') : '',
            lunchPrice: foundCompany.lunchPrice ? foundCompany.lunchPrice.replace('AED ', '') : '',
            dinnerPrice: foundCompany.dinnerPrice ? foundCompany.dinnerPrice.replace('AED ', '') : '',
            creditLimit: foundCompany.creditLimit ? foundCompany.creditLimit.replace('AED ', '').replace(',', '') : '',
            creditDays: foundCompany.creditDays || '',
            employeesCount: foundCompany.employeesCount || ''
          });
        } else {
          alert('Company not found!');
          navigate('/company');
        }
      } catch (error) {
        console.error('Error loading company:', error);
        alert('Error loading company data. Please try again.');
        navigate('/company');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadCompany();
    }
  }, [id, navigate]);

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

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = 'Contact person is required';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\+971\s\d{2}\s\d{3}\s\d{4}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile must be in format +971 XX XXX XXXX';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.registeredDate) {
      newErrors.registeredDate = 'Registered date is required';
    }

    if (!formData.tradeLicense.trim()) {
      newErrors.tradeLicense = 'Trade license is required';
    }

    if (!formData.taxNumber.trim()) {
      newErrors.taxNumber = 'Tax number is required';
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

    if (formData.employeesCount && (!/^\d+$/.test(formData.employeesCount) || parseInt(formData.employeesCount) < 0)) {
      newErrors.employeesCount = 'Please enter a valid number of employees';
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
      
      // Prepare the updated company data
      const updatedCompany = {
        ...company,
        name: formData.companyName,
        contactPerson: formData.contactPerson,
        mobile: formData.mobile,
        address: formData.address,
        registeredDate: formData.registeredDate,
        tradeLicense: formData.tradeLicense,
        taxNumber: formData.taxNumber,
        breakfastPrice: `AED ${formData.breakfastPrice}`,
        lunchPrice: `AED ${formData.lunchPrice}`,
        dinnerPrice: `AED ${formData.dinnerPrice}`,
        creditLimit: `AED ${parseFloat(formData.creditLimit).toLocaleString()}`,
        creditDays: parseInt(formData.creditDays),
        employeesCount: formData.employeesCount ? parseInt(formData.employeesCount) : company.employeesCount
      };
      
      console.log('Updated company data:', updatedCompany);
      
      alert(`Company "${updatedCompany.name}" updated successfully!`);
      navigate('/company');
      
    } catch (error) {
      console.error('Error updating company:', error);
      alert('Error updating company. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading company data...</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Company not found</p>
          <button
            onClick={() => navigate('/company')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Companies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
      
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Edit Company</h1>
              <p className="text-gray-600 mt-1">{company.companyId}</p>
            </div>
            <button
              onClick={() => navigate('/company')}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-white rounded-lg transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Companies
            </button>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Edit Company Details</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 lg:p-8">
            <div className="space-y-8">
              {/* Company Information Section */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Company Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                        errors.companyName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.companyName && (
                      <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                        errors.contactPerson ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.contactPerson && (
                      <p className="text-red-500 text-sm mt-1">{errors.contactPerson}</p>
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
                      Employees Count
                    </label>
                    <input
                      type="number"
                      name="employeesCount"
                      value={formData.employeesCount}
                      onChange={handleInputChange}
                      min="0"
                      placeholder="45"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                        errors.employeesCount ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.employeesCount && (
                      <p className="text-red-500 text-sm mt-1">{errors.employeesCount}</p>
                    )}
                  </div>

                  <div className="md:col-span-2 lg:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Address *
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

              {/* Business Information Section */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Business Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Registered Date *
                    </label>
                    <input
                      type="date"
                      name="registeredDate"
                      value={formData.registeredDate}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                        errors.registeredDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.registeredDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.registeredDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trade License *
                    </label>
                    <input
                      type="text"
                      name="tradeLicense"
                      value={formData.tradeLicense}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                        errors.tradeLicense ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.tradeLicense && (
                      <p className="text-red-500 text-sm mt-1">{errors.tradeLicense}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tax Number *
                    </label>
                    <input
                      type="text"
                      name="taxNumber"
                      value={formData.taxNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                        errors.taxNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.taxNumber && (
                      <p className="text-red-500 text-sm mt-1">{errors.taxNumber}</p>
                    )}
                  </div>

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
                      placeholder="50000.00"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                        errors.creditLimit ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.creditLimit && (
                      <p className="text-red-500 text-sm mt-1">{errors.creditLimit}</p>
                    )}
                  </div>

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
              </div>

              {/* Meal Prices Section */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Meal Prices (AED)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Breakfast */}
                  <div className="bg-white p-4 rounded-lg border-2 border-yellow-300 shadow-md">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center">
                        <img src={breakfastImg} alt="Breakfast" className="w-5 h-5 filter brightness-0 invert" />
                      </div>
                      <span className="font-medium text-gray-800">Breakfast</span>
                    </div>
                    <input
                      type="number"
                      name="breakfastPrice"
                      value={formData.breakfastPrice}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      placeholder="25.50"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200 ${
                        errors.breakfastPrice ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.breakfastPrice && (
                      <p className="text-red-500 text-sm mt-1">{errors.breakfastPrice}</p>
                    )}
                  </div>

                  {/* Lunch */}
                  <div className="bg-white p-4 rounded-lg border-2 border-orange-300 shadow-md">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center">
                        <img src={lunchImg} alt="Lunch" className="w-5 h-5 filter brightness-0 invert" />
                      </div>
                      <span className="font-medium text-gray-800">Lunch</span>
                    </div>
                    <input
                      type="number"
                      name="lunchPrice"
                      value={formData.lunchPrice}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      placeholder="45.00"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200 ${
                        errors.lunchPrice ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.lunchPrice && (
                      <p className="text-red-500 text-sm mt-1">{errors.lunchPrice}</p>
                    )}
                  </div>

                  {/* Dinner */}
                  <div className="bg-white p-4 rounded-lg border-2 border-purple-300 shadow-md">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center justify-center">
                        <img src={dinnerImg} alt="Dinner" className="w-5 h-5 filter brightness-0 invert" />
                      </div>
                      <span className="font-medium text-gray-800">Dinner</span>
                    </div>
                    <input
                      type="number"
                      name="dinnerPrice"
                      value={formData.dinnerPrice}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      placeholder="55.00"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 ${
                        errors.dinnerPrice ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.dinnerPrice && (
                      <p className="text-red-500 text-sm mt-1">{errors.dinnerPrice}</p>
                    )}
                  </div>
                </div>
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
                    Updating Company...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Update Company
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/company')}
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

export default EditCompany;
