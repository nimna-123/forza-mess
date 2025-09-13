import React, { useState, useEffect, useRef, use } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { POST_ORDERS, GET_CUSTOMERS } from '../Api/service';
import { toast as warning } from 'react-toastify';
import Toast from '../components/Toast';
import { set } from 'date-fns';
const AddOrder = () => {
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

  useEffect(() => {
    const now = new Date();
    if (now.getHours() >= 22) {
      setTimeUp(true)
      warning.error("Time is up! You can only place orders for the day after tomorrow.")
    } else {
      setTimeUp(false)
    }
  }, []);


  // Customer data from API
  const [customers, setCustomers] = useState([]);
  const [loadingCustomers, setLoadingCustomers] = useState(true);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [preferenceType, setPreferenceType] = useState('none');
  const [mealInputs, setMealInputs] = useState({
    breakfast: { vegQuantity: '', nonVegQuantity: '', dietPreference: 'veg' },
    lunch: { vegQuantity: '', nonVegQuantity: '', dietPreference: 'veg' },
    dinner: { vegQuantity: '', nonVegQuantity: '', dietPreference: 'veg' }
  });
  const [timeUp, setTimeUp] = useState(false);
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editForm, setEditForm] = useState({
    breakfast: { vegQuantity: '', nonVegQuantity: '', dietPreference: 'veg' },
    lunch: { vegQuantity: '', nonVegQuantity: '', dietPreference: 'veg' },
    dinner: { vegQuantity: '', nonVegQuantity: '', dietPreference: 'veg' }
  });

  console.log(timeUp, "timeup")

  // Load customers on component mount
  useEffect(() => {
    const loadCustomers = async () => {
      try {
        setLoadingCustomers(true);
        let agentCustomers = [];
        let companyCustomers = [];

        try {
          const agentResponse = await GET_CUSTOMERS('agent');
          agentCustomers = Array.isArray(agentResponse) ? agentResponse : (agentResponse?.data || []);

        } catch (agentError) {
          console.error('Error fetching agent customers:', agentError);
          showToast('Warning: Could not load agent customers', 'error');
        }
        try {
          const companyResponse = await GET_CUSTOMERS('company');
          companyCustomers = Array.isArray(companyResponse) ? companyResponse : (companyResponse?.data || []);

        } catch (companyError) {
          console.error('Error fetching company customers:', companyError);

        }
        // Combine both arrays and filter for active customers only
        const allCustomers = [...agentCustomers, ...companyCustomers];
        const activeCustomers = allCustomers.filter(customer =>
          customer.status === 'Active' || customer.isActive === true || customer.isActive === 'true'
        );
        console.log('Total customers loaded:', allCustomers.length);
        console.log('Active customers:', activeCustomers.length);
        if (activeCustomers.length === 0) {
          showToast('No active customers found. Please check if active customers exist in the system.', 'error');
        } else {
          setCustomers(activeCustomers);
          showToast(`Loaded ${activeCustomers.length} active customers successfully`, 'success');
        }
      } catch (error) {
        console.error('Unexpected error loading customers:', error);
        showToast(`Failed to load customers: ${error.message || 'Unknown error'}`, 'error');
      } finally {
        setLoadingCustomers(false);
      }
    };

    loadCustomers();
  }, []);


  const customerOptions = customers.map(customer => ({
    value: customer.customerId || customer.id,
    label: customer.name || customer.customerName,
    customer: customer
  }));

  // Custom styles for react-select
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '48px',
      border: state.isFocused ? '2px solid #6366f1' : '1px solid #d1d5db',
      borderRadius: '8px',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(99, 102, 241, 0.1)' : 'none',
      '&:hover': {
        border: '1px solid #6366f1'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#6366f1'
        : state.isFocused
          ? '#f3f4f6'
          : 'white',
      color: state.isSelected ? 'white' : '#374151',
      padding: '12px 16px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: state.isSelected ? '#6366f1' : '#f3f4f6'
      }
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '8px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      zIndex: 9999,
      position: 'absolute'
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: '200px'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#374151',
      fontWeight: '500'
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af'
    })
  };

  // Custom option component to show only customer name
  const CustomOption = ({ data, innerProps }) => (
    <div {...innerProps} className="px-4 py-3 hover:bg-indigo-50 cursor-pointer">
      <div className="font-medium text-gray-900">{data.label}</div>
    </div>
  );

  const handleCustomerChange = (selectedOption) => {
    setSelectedCustomer(selectedOption);
  };

  const handleMealInputChange = (e) => {
    const { name, value } = e.target;
    const fieldName = name.split('.')[0]; // e.g., 'breakfast' from 'breakfast.veg'
    const quantityType = name.split('.')[1]; // e.g., 'veg' from 'breakfast.veg'

    // Only allow positive numbers
    const numericValue = value.replace(/[^0-9]/g, '');

    if (preferenceType === 'none') {
      // When preference type is none, set both veg and nonVeg to 0, and set the value to total quantity
      setMealInputs(prev => ({
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          vegQuantity: '0',
          nonVegQuantity: '0',
          [quantityType]: numericValue
        }
      }));
    } else {
      setMealInputs(prev => ({
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          [quantityType]: numericValue
        }
      }));
    }
  };


  const handleAddOrder = () => {

    // --- NEW LOGIC FOR orderFor ---
    const user = JSON.parse(localStorage.getItem("user"));
    const now = new Date();
    let orderForDate;

    if (user?.userType?.toLowerCase() === "admin") {
      const now = new Date();
      const cutoffHour = 5; // e.g. until 5 AM, still count as "yesterday's order"

      // Decide baseDate → yesterday if before cutoff, else today
      let baseDate = new Date(now);
      if (now.getHours() < cutoffHour) {
        baseDate.setDate(baseDate.getDate() - 1);
      }

      // Normalize to midnight
      baseDate.setHours(0, 0, 0, 0);

      // Delivery = baseDate + 1 day
      orderForDate = new Date(baseDate);
      orderForDate.setDate(baseDate.getDate() + 1);


    } else if (user?.userType?.toLowerCase() === "user") {

      const tomorrow = new Date();
      tomorrow.setDate(now.getDate() + 1);
    }

    const orderFor = orderForDate.toLocaleDateString();

    if (!selectedCustomer) {
      alert('Please select a customer');
      return;
    }

    const totalMeals = (parseInt(mealInputs.breakfast.vegQuantity || 0) + parseInt(mealInputs.breakfast.nonVegQuantity || 0)) +
      (parseInt(mealInputs.lunch.vegQuantity || 0) + parseInt(mealInputs.lunch.nonVegQuantity || 0)) +
      (parseInt(mealInputs.dinner.vegQuantity || 0) + parseInt(mealInputs.dinner.nonVegQuantity || 0));

    if (totalMeals === 0) {
      alert('Please enter at least one meal quantity');
      return;
    }

    const customer = selectedCustomer.customer;



    const newOrder = {
      id: Date.now(),
      customerId: selectedCustomer.value,
      customerName: customer.name,
      customerMobile: customer.mobile,
      preferenceType: preferenceType,
      breakfast: {
        vegQuantity: preferenceType === 'none' ? 0 : parseInt(mealInputs.breakfast.vegQuantity || 0),
        nonVegQuantity: preferenceType === 'none' ? 0 : parseInt(mealInputs.breakfast.nonVegQuantity || 0),
        totalQuantity: preferenceType === 'none' ? parseInt(mealInputs.breakfast.vegQuantity || 0) : parseInt(mealInputs.breakfast.vegQuantity || 0) + parseInt(mealInputs.breakfast.nonVegQuantity || 0),
        dietPreference: preferenceType === 'preference' ? mealInputs.breakfast.dietPreference : 'none'
      },
      lunch: {
        vegQuantity: preferenceType === 'none' ? 0 : parseInt(mealInputs.lunch.vegQuantity || 0),
        nonVegQuantity: preferenceType === 'none' ? 0 : parseInt(mealInputs.lunch.nonVegQuantity || 0),
        totalQuantity: preferenceType === 'none' ? parseInt(mealInputs.lunch.vegQuantity || 0) : parseInt(mealInputs.lunch.vegQuantity || 0) + parseInt(mealInputs.lunch.nonVegQuantity || 0),
        dietPreference: preferenceType === 'preference' ? mealInputs.lunch.dietPreference : 'none'
      },
      dinner: {
        vegQuantity: preferenceType === 'none' ? 0 : parseInt(mealInputs.dinner.vegQuantity || 0),
        nonVegQuantity: preferenceType === 'none' ? 0 : parseInt(mealInputs.dinner.nonVegQuantity || 0),
        totalQuantity: preferenceType === 'none' ? parseInt(mealInputs.dinner.vegQuantity || 0) : parseInt(mealInputs.dinner.vegQuantity || 0) + parseInt(mealInputs.dinner.nonVegQuantity || 0),
        dietPreference: preferenceType === 'preference' ? mealInputs.dinner.dietPreference : 'none'
      },
      total: totalMeals,
      date: new Date().toLocaleDateString(),
      orderFor: orderFor
    };

    setOrders(prev => [...prev, newOrder]);

    // Reset form
    setSelectedCustomer(null);
    setPreferenceType('none');
    setMealInputs({
      breakfast: { vegQuantity: '', nonVegQuantity: '', dietPreference: 'veg' },
      lunch: { vegQuantity: '', nonVegQuantity: '', dietPreference: 'veg' },
      dinner: { vegQuantity: '', nonVegQuantity: '', dietPreference: 'veg' }
    });
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setEditForm({
      breakfast: {
        vegQuantity: order.breakfast.vegQuantity ? order.breakfast.vegQuantity.toString() : '',
        nonVegQuantity: order.breakfast.nonVegQuantity ? order.breakfast.nonVegQuantity.toString() : '',
        dietPreference: order.breakfast.dietPreference || 'veg'
      },
      lunch: {
        vegQuantity: order.lunch.vegQuantity ? order.lunch.vegQuantity.toString() : '',
        nonVegQuantity: order.lunch.nonVegQuantity ? order.lunch.nonVegQuantity.toString() : '',
        dietPreference: order.lunch.dietPreference || 'veg'
      },
      dinner: {
        vegQuantity: order.dinner.vegQuantity ? order.dinner.vegQuantity.toString() : '',
        nonVegQuantity: order.dinner.nonVegQuantity ? order.dinner.nonVegQuantity.toString() : '',
        dietPreference: order.dinner.dietPreference || 'veg'
      }
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    const fieldName = name.split('.')[0]; // e.g., 'breakfast' from 'breakfast.veg'
    const quantityType = name.split('.')[1]; // e.g., 'veg' from 'breakfast.veg'

    // Only allow positive numbers
    const numericValue = value.replace(/[^0-9]/g, '');

    if (editingOrder?.preferenceType === 'none') {
      // When preference type is none, set both veg and nonVeg to 0, and set the value to total quantity
      setEditForm(prev => ({
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          vegQuantity: '0',
          nonVegQuantity: '0',
          [quantityType]: numericValue
        }
      }));
    } else {
      setEditForm(prev => ({
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          [quantityType]: numericValue
        }
      }));
    }
  };


  const handleSaveEdit = () => {
    const totalMeals = (parseInt(editForm.breakfast.vegQuantity || 0) + parseInt(editForm.breakfast.nonVegQuantity || 0)) +
      (parseInt(editForm.lunch.vegQuantity || 0) + parseInt(editForm.lunch.nonVegQuantity || 0)) +
      (parseInt(editForm.dinner.vegQuantity || 0) + parseInt(editForm.dinner.nonVegQuantity || 0));

    if (totalMeals === 0) {
      alert('Please enter at least one meal quantity');
      return;
    }
    setOrders(prev => prev.map(order =>
      order.id === editingOrder.id
        ? {
          ...order,
          breakfast: {
            vegQuantity: editingOrder.preferenceType === 'none' ? 0 : parseInt(editForm.breakfast.vegQuantity || 0),
            nonVegQuantity: editingOrder.preferenceType === 'none' ? 0 : parseInt(editForm.breakfast.nonVegQuantity || 0),
            totalQuantity: editingOrder.preferenceType === 'none' ? parseInt(editForm.breakfast.vegQuantity || 0) : parseInt(editForm.breakfast.vegQuantity || 0) + parseInt(editForm.breakfast.nonVegQuantity || 0),
            dietPreference: editForm.breakfast.dietPreference
          },
          lunch: {
            vegQuantity: editingOrder.preferenceType === 'none' ? 0 : parseInt(editForm.lunch.vegQuantity || 0),
            nonVegQuantity: editingOrder.preferenceType === 'none' ? 0 : parseInt(editForm.lunch.nonVegQuantity || 0),
            totalQuantity: editingOrder.preferenceType === 'none' ? parseInt(editForm.lunch.vegQuantity || 0) : parseInt(editForm.lunch.vegQuantity || 0) + parseInt(editForm.lunch.nonVegQuantity || 0),
            dietPreference: editForm.lunch.dietPreference
          },
          dinner: {
            vegQuantity: editingOrder.preferenceType === 'none' ? 0 : parseInt(editForm.dinner.vegQuantity || 0),
            nonVegQuantity: editingOrder.preferenceType === 'none' ? 0 : parseInt(editForm.dinner.nonVegQuantity || 0),
            totalQuantity: editingOrder.preferenceType === 'none' ? parseInt(editForm.dinner.vegQuantity || 0) : parseInt(editForm.dinner.vegQuantity || 0) + parseInt(editForm.dinner.nonVegQuantity || 0),
            dietPreference: editForm.dinner.dietPreference
          },
          total: totalMeals
        }
        : order
    ));

    setEditingOrder(null);
    setEditForm({
      breakfast: { vegQuantity: '', nonVegQuantity: '', dietPreference: 'veg' },
      lunch: { vegQuantity: '', nonVegQuantity: '', dietPreference: 'veg' },
      dinner: { vegQuantity: '', nonVegQuantity: '', dietPreference: 'veg' }
    });
  };

  const handleCancelEdit = () => {
    setEditingOrder(null);
    setEditForm({
      breakfast: { vegQuantity: '', nonVegQuantity: '', dietPreference: 'veg' },
      lunch: { vegQuantity: '', nonVegQuantity: '', dietPreference: 'veg' },
      dinner: { vegQuantity: '', nonVegQuantity: '', dietPreference: 'veg' }
    });
  };

  const handleCancel = () => {
    navigate('/agent-list');
  };

  const handleSubmit = async () => {
    const transformedOrders = orders.map(order => ({
      ...order,
      customerId: String(order.customerId),
    }));

    if (orders.length === 0) {
      alert('Please add at least one order');
      return;
    }
    try {
      const response = await POST_ORDERS(transformedOrders);
      showToast("Add Order successfully!", "success");
      setOrders([]);
      setSelectedCustomer(null);
      setPreferenceType('none');
      setMealInputs({
        breakfast: { vegQuantity: '', nonVegQuantity: '', dietPreference: 'veg' },
        lunch: { vegQuantity: '', nonVegQuantity: '', dietPreference: 'veg' },
        dinner: { vegQuantity: '', nonVegQuantity: '', dietPreference: 'veg' }
      });
      setEditingOrder(null);
      setEditForm({
        breakfast: { vegQuantity: '', nonVegQuantity: '', dietPreference: 'veg' },
        lunch: { vegQuantity: '', nonVegQuantity: '', dietPreference: 'veg' },
        dinner: { vegQuantity: '', nonVegQuantity: '', dietPreference: 'veg' }
      });

      // navigate('/orders');
    } catch (error) {
      console.error("Error adding company:", error);
      showToast("Failed to add company", "error");
    }
  };

  const removeOrder = (orderId) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={hideToast}
        />
        {/* Order Input Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-xl font-semibold text-gray-800">Add New Order</h2>
          </div>

          <div className="p-6">
            {/* Preference Type Selection */}
            <div className="mb-6">

              <div className="flex gap-6 justify-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="preferenceType"
                    value="preference"
                    checked={preferenceType === 'preference'}
                    onChange={(e) => setPreferenceType(e.target.value)}
                    className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Preference</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="preferenceType"
                    value="none"
                    checked={preferenceType === 'none'}
                    onChange={(e) => setPreferenceType(e.target.value)}
                    className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 focus:ring-gray-500"
                  />
                  <span className="text-sm font-medium text-gray-700">None</span>
                </label>
              </div>
            </div>

            {/* Single Row Input */}
            <div className="flex flex-row gap-4 items-end">
              {/* Customer Selection */}
              <div className="flex-1 relative z-50">
                <div className="flex items-center  mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Customer
                  </label>
                  <button
                    onClick={() => navigate('/add-agent')}
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200 ml-2"
                  >
                    (Create New)
                  </button>
                </div>
                <Select
                  value={selectedCustomer}
                  onChange={handleCustomerChange}
                  options={customerOptions}
                  placeholder={loadingCustomers ? "Loading customers..." : "Select a customer..."}
                  isClearable
                  isSearchable
                  isLoading={loadingCustomers}
                  styles={customStyles}
                  components={{
                    Option: CustomOption
                  }}
                  noOptionsMessage={() => "No customers found"}
                  loadingMessage={() => "Loading customers..."}
                  menuPosition="fixed"
                />
              </div>

              {/* Meal Input Fields */}
              <div className="flex gap-4 flex-1">
                {/* Breakfast */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Breakfast
                  </label>
                  {preferenceType === 'preference' ? (
                    <div className="flex gap-1">
                      <div className="flex-1">
                        <input
                          type="text"
                          name="breakfast.vegQuantity"
                          value={mealInputs.breakfast.vegQuantity}
                          onChange={handleMealInputChange}
                          placeholder="V"
                          className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-center text-sm font-semibold"
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          name="breakfast.nonVegQuantity"
                          value={mealInputs.breakfast.nonVegQuantity}
                          onChange={handleMealInputChange}
                          placeholder="NV"
                          className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-center text-sm font-semibold"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        type="text"
                        name="breakfast.vegQuantity"
                        value={mealInputs.breakfast.vegQuantity}
                        onChange={handleMealInputChange}
                        placeholder="0"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-center text-lg font-semibold"
                      />
                    </div>
                  )}
                </div>

                {/* Lunch */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lunch
                  </label>
                  {preferenceType === 'preference' ? (
                    <div className="flex gap-1">
                      <div className="flex-1">
                        <input
                          type="text"
                          name="lunch.vegQuantity"
                          value={mealInputs.lunch.vegQuantity}
                          onChange={handleMealInputChange}
                          placeholder="V"
                          className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-center text-sm font-semibold"
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          name="lunch.nonVegQuantity"
                          value={mealInputs.lunch.nonVegQuantity}
                          onChange={handleMealInputChange}
                          placeholder="NV"
                          className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-center text-sm font-semibold"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        type="text"
                        name="lunch.vegQuantity"
                        value={mealInputs.lunch.vegQuantity}
                        onChange={handleMealInputChange}
                        placeholder="0"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-center text-lg font-semibold"
                      />
                    </div>
                  )}
                </div>

                {/* Dinner */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dinner
                  </label>
                  {preferenceType === 'preference' ? (
                    <div className="flex gap-1">
                      <div className="flex-1">
                        <input
                          type="text"
                          name="dinner.vegQuantity"
                          value={mealInputs.dinner.vegQuantity}
                          onChange={handleMealInputChange}
                          placeholder="V"
                          className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-center text-sm font-semibold"
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          name="dinner.nonVegQuantity"
                          value={mealInputs.dinner.nonVegQuantity}
                          onChange={handleMealInputChange}
                          placeholder="NV"
                          className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-center text-sm font-semibold"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        type="text"
                        name="dinner.vegQuantity"
                        value={mealInputs.dinner.vegQuantity}
                        onChange={handleMealInputChange}
                        placeholder="0"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-center text-lg font-semibold"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Add Button */}
              <div className="lg:w-auto">
                <button
                  onClick={handleAddOrder}
                  disabled={timeUp}
                  className={`w-full lg:w-auto px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2
    transition-all duration-200 shadow-md hover:shadow-lg
    ${timeUp
                      ? "bg-gradient-to-r from-indigo-300 to-purple-300 text-white opacity-70 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700"
                    }`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Order
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {orders?.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <h2 className="text-xl font-semibold text-gray-800">
                Orders Summary ({orders.length})
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Breakfast
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lunch
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dinner
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {order.customerName}
                          </div>
                          <div className="text-sm text-gray-500 font-mono">
                            {order.customerId}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${order.preferenceType === 'preference'
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-gray-100 text-gray-800'
                          }`}>
                          {order.preferenceType === 'preference' ? 'Preference' : 'None'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {editingOrder?.id === order.id ? (
                          <div className="space-y-2">
                            <div className="flex gap-1">
                              <input
                                type="text"
                                name="breakfast.vegQuantity"
                                value={editForm.breakfast.vegQuantity}
                                onChange={handleEditFormChange}
                                placeholder="V"
                                className="w-12 px-1 py-1 border border-gray-300 rounded text-center text-xs"
                              />
                              <input
                                type="text"
                                name="breakfast.nonVegQuantity"
                                value={editForm.breakfast.nonVegQuantity}
                                onChange={handleEditFormChange}
                                placeholder="NV"
                                className="w-12 px-1 py-1 border border-gray-300 rounded text-center text-xs"
                              />
                            </div>
                          </div>
                        ) : (
                          order.breakfast.totalQuantity > 0 && (
                            <div className="flex flex-col items-center gap-1">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                                {order.breakfast.totalQuantity}
                              </span>
                              {order.preferenceType === 'preference' && (
                                <div className="flex gap-1">
                                  {order.breakfast.vegQuantity > 0 && (
                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                                      {order.breakfast.vegQuantity}V
                                    </span>
                                  )}
                                  {order.breakfast.nonVegQuantity > 0 && (
                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
                                      {order.breakfast.nonVegQuantity}NV
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          )
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {editingOrder?.id === order.id ? (
                          <div className="space-y-2">
                            <div className="flex gap-1">
                              <input
                                type="text"
                                name="lunch.vegQuantity"
                                value={editForm.lunch.vegQuantity}
                                onChange={handleEditFormChange}
                                placeholder="V"
                                className="w-12 px-1 py-1 border border-gray-300 rounded text-center text-xs"
                              />
                              <input
                                type="text"
                                name="lunch.nonVegQuantity"
                                value={editForm.lunch.nonVegQuantity}
                                onChange={handleEditFormChange}
                                placeholder="NV"
                                className="w-12 px-1 py-1 border border-gray-300 rounded text-center text-xs"
                              />
                            </div>
                          </div>
                        ) : (
                          order.lunch.totalQuantity > 0 && (
                            <div className="flex flex-col items-center gap-1">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                {order.lunch.totalQuantity}
                              </span>
                              {order.preferenceType === 'preference' && (
                                <div className="flex gap-1">
                                  {order.lunch.vegQuantity > 0 && (
                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                                      {order.lunch.vegQuantity}V
                                    </span>
                                  )}
                                  {order.lunch.nonVegQuantity > 0 && (
                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
                                      {order.lunch.nonVegQuantity}NV
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          )
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {editingOrder?.id === order.id ? (
                          <div className="space-y-2">
                            <div className="flex gap-1">
                              <input
                                type="text"
                                name="dinner.vegQuantity"
                                value={editForm.dinner.vegQuantity}
                                onChange={handleEditFormChange}
                                placeholder="V"
                                className="w-12 px-1 py-1 border border-gray-300 rounded text-center text-xs"
                              />
                              <input
                                type="text"
                                name="dinner.nonVegQuantity"
                                value={editForm.dinner.nonVegQuantity}
                                onChange={handleEditFormChange}
                                placeholder="NV"
                                className="w-12 px-1 py-1 border border-gray-300 rounded text-center text-xs"
                              />
                            </div>
                          </div>
                        ) : (
                          order.dinner.totalQuantity > 0 && (
                            <div className="flex flex-col items-center gap-1">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                                {order.dinner.totalQuantity}
                              </span>
                              {order.preferenceType === 'preference' && (
                                <div className="flex gap-1">
                                  {order.dinner.vegQuantity > 0 && (
                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                                      {order.dinner.vegQuantity}V
                                    </span>
                                  )}
                                  {order.dinner.nonVegQuantity > 0 && (
                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
                                      {order.dinner.nonVegQuantity}NV
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          )
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {editingOrder?.id === order.id ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-indigo-100 text-indigo-800">
                            {(parseInt(editForm.breakfast.vegQuantity || 0) + parseInt(editForm.breakfast.nonVegQuantity || 0)) +
                              (parseInt(editForm.lunch.vegQuantity || 0) + parseInt(editForm.lunch.nonVegQuantity || 0)) +
                              (parseInt(editForm.dinner.vegQuantity || 0) + parseInt(editForm.dinner.nonVegQuantity || 0))}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-indigo-100 text-indigo-800">
                            {order.total}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center space-x-2">
                          {editingOrder?.id === order.id ? (
                            <>
                              <button
                                onClick={handleSaveEdit}
                                className="text-green-600 hover:text-green-900 transition-colors duration-200"
                                title="Save changes"
                              >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                                title="Cancel edit"
                              >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEditOrder(order)}
                                className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                                title="Edit order"
                              >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => removeOrder(order.id)}
                                className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                title="Delete order"
                              >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={orders.length === 0}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOrder;
