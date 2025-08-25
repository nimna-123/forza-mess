import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const AddOrder = () => {
  const navigate = useNavigate();
  
  // Sample customer data - in a real app, this would come from an API
  const [customers] = useState([
    { id: 1, customerId: 'CUST001', name: 'John Smith', mobile: '+971 50 123 4567' },
    { id: 2, customerId: 'CUST002', name: 'Sarah Johnson', mobile: '+971 55 234 5678' },
    { id: 3, customerId: 'CUST003', name: 'Michael Brown', mobile: '+971 52 345 6789' },
    { id: 4, customerId: 'CUST004', name: 'Emily Davis', mobile: '+971 56 456 7890' },
    { id: 5, customerId: 'CUST005', name: 'David Wilson', mobile: '+971 54 567 8901' }
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [mealInputs, setMealInputs] = useState({
    breakfast: '',
    lunch: '',
    dinner: ''
  });
  
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editForm, setEditForm] = useState({
    breakfast: '',
    lunch: '',
    dinner: ''
  });

  // Transform customers data for react-select
  const customerOptions = customers.map(customer => ({
    value: customer.customerId,
    label: customer.name,
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
    // Only allow positive numbers
    const numericValue = value.replace(/[^0-9]/g, '');
    setMealInputs(prev => ({
      ...prev,
      [name]: numericValue
    }));
  };

  const handleAddOrder = () => {
    if (!selectedCustomer) {
      alert('Please select a customer');
      return;
    }

    const totalMeals = parseInt(mealInputs.breakfast || 0) + 
                      parseInt(mealInputs.lunch || 0) + 
                      parseInt(mealInputs.dinner || 0);

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
      breakfast: parseInt(mealInputs.breakfast || 0),
      lunch: parseInt(mealInputs.lunch || 0),
      dinner: parseInt(mealInputs.dinner || 0),
      total: totalMeals,
      date: new Date().toLocaleDateString()
    };

    setOrders(prev => [...prev, newOrder]);
    
    // Reset form
    setSelectedCustomer(null);
    setMealInputs({ breakfast: '', lunch: '', dinner: '' });
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setEditForm({
      breakfast: order.breakfast.toString(),
      lunch: order.lunch.toString(),
      dinner: order.dinner.toString()
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    // Only allow positive numbers
    const numericValue = value.replace(/[^0-9]/g, '');
    setEditForm(prev => ({
      ...prev,
      [name]: numericValue
    }));
  };

  const handleSaveEdit = () => {
    const totalMeals = parseInt(editForm.breakfast || 0) + 
                      parseInt(editForm.lunch || 0) + 
                      parseInt(editForm.dinner || 0);

    if (totalMeals === 0) {
      alert('Please enter at least one meal quantity');
      return;
    }

    setOrders(prev => prev.map(order => 
      order.id === editingOrder.id 
        ? {
            ...order,
            breakfast: parseInt(editForm.breakfast || 0),
            lunch: parseInt(editForm.lunch || 0),
            dinner: parseInt(editForm.dinner || 0),
            total: totalMeals
          }
        : order
    ));

    setEditingOrder(null);
    setEditForm({ breakfast: '', lunch: '', dinner: '' });
  };

  const handleCancelEdit = () => {
    setEditingOrder(null);
    setEditForm({ breakfast: '', lunch: '', dinner: '' });
  };

  const handleCancel = () => {
    navigate('/agent-list');
  };

  const handleSubmit = () => {
    if (orders.length === 0) {
      alert('Please add at least one order');
      return;
    }
    
    console.log('Orders to be submitted:', orders);
    alert('Orders submitted successfully!');
    navigate('/agent-list');
  };

  const removeOrder = (orderId) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
             <div className="max-w-6xl mx-auto">
        {/* Header */}
    

         {/* Order Input Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-xl font-semibold text-gray-800">Add New Order</h2>
          </div>
          
          <div className="p-6">
            {/* Single Row Input */}
            <div className="flex flex-col lg:flex-row gap-4 items-end">
                             {/* Customer Selection */}
               <div className="flex-1 relative z-50">
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Customer
                 </label>
                 <Select
                   value={selectedCustomer}
                   onChange={handleCustomerChange}
                   options={customerOptions}
                   placeholder="Select a customer..."
                   isClearable
                   isSearchable
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
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Breakfast
                  </label>
                  <input
                    type="text"
                    name="breakfast"
                    value={mealInputs.breakfast}
                    onChange={handleMealInputChange}
                    placeholder="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-center text-lg font-semibold"
                  />
                </div>
                
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lunch
                  </label>
                  <input
                    type="text"
                    name="lunch"
                    value={mealInputs.lunch}
                    onChange={handleMealInputChange}
                    placeholder="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-center text-lg font-semibold"
                  />
                </div>
                
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dinner
                  </label>
                  <input
                    type="text"
                    name="dinner"
                    value={mealInputs.dinner}
                    onChange={handleMealInputChange}
                    placeholder="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-center text-lg font-semibold"
                  />
                </div>
              </div>

              {/* Add Button */}
              <div className="lg:w-auto">
                <button
                  onClick={handleAddOrder}
                  className="w-full lg:w-auto px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg font-semibold flex items-center justify-center gap-2"
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
        {orders.length > 0 && (
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
                        {editingOrder?.id === order.id ? (
                          <input
                            type="text"
                            name="breakfast"
                            value={editForm.breakfast}
                            onChange={handleEditFormChange}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                          />
                        ) : (
                          order.breakfast > 0 && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                              {order.breakfast}
                            </span>
                          )
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {editingOrder?.id === order.id ? (
                          <input
                            type="text"
                            name="lunch"
                            value={editForm.lunch}
                            onChange={handleEditFormChange}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                          />
                        ) : (
                          order.lunch > 0 && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              {order.lunch}
                            </span>
                          )
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {editingOrder?.id === order.id ? (
                          <input
                            type="text"
                            name="dinner"
                            value={editForm.dinner}
                            onChange={handleEditFormChange}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                          />
                        ) : (
                          order.dinner > 0 && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                              {order.dinner}
                            </span>
                          )
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {editingOrder?.id === order.id ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-indigo-100 text-indigo-800">
                            {parseInt(editForm.breakfast || 0) + parseInt(editForm.lunch || 0) + parseInt(editForm.dinner || 0)}
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
