import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();
  
  // Sample orders data - in a real app, this would come from an API
  const [orders] = useState([
    {
      id: 1,
      orderId: 'ORD001',
      customerId: 'CUST001',
      customerName: 'John Smith',
      customerMobile: '+971 50 123 4567',
      customerType: 'Individual',
      breakfast: 2,
      lunch: 1,
      dinner: 3,
      status: 'Delivered',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-15',
      agentId: 'AGT001',
      agentName: 'Ahmed Hassan'
    },
    {
      id: 2,
      orderId: 'ORD002',
      customerId: 'CUST002',
      customerName: 'Sarah Johnson',
      customerMobile: '+971 55 234 5678',
      customerType: 'Company',
      breakfast: 1,
      lunch: 2,
      dinner: 1,
      status: 'In Progress',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-15',
      agentId: 'AGT002',
      agentName: 'Fatima Al Mansouri'
    },
    {
      id: 3,
      orderId: 'ORD003',
      customerId: 'CUST003',
      customerName: 'Michael Brown',
      customerMobile: '+971 52 345 6789',
      customerType: 'Agent',
      breakfast: 0,
      lunch: 3,
      dinner: 2,
      status: 'Pending',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-15',
      agentId: 'AGT001',
      agentName: 'Ahmed Hassan'
    },
    {
      id: 4,
      orderId: 'ORD004',
      customerId: 'CUST004',
      customerName: 'Emily Davis',
      customerMobile: '+971 56 456 7890',
      customerType: 'Individual',
      breakfast: 1,
      lunch: 1,
      dinner: 1,
      status: 'Delivered',
      orderDate: '2024-01-14',
      deliveryDate: '2024-01-14',
      agentId: 'AGT003',
      agentName: 'Omar Khalil'
    },
    {
      id: 5,
      orderId: 'ORD005',
      customerId: 'CUST005',
      customerName: 'David Wilson',
      customerMobile: '+971 54 567 8901',
      customerType: 'Customer',
      breakfast: 2,
      lunch: 0,
      dinner: 2,
      status: 'Cancelled',
      orderDate: '2024-01-14',
      deliveryDate: '2024-01-14',
      agentId: 'AGT004',
      agentName: 'Aisha Rahman'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [companyFilter, setCompanyFilter] = useState('All');
  const [columnWidths, setColumnWidths] = useState({
    orderId: 120,
    customer: 200,
    type: 120,
    breakfast: 120,
    lunch: 120,
    dinner: 120,
    actions: 120
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editForm, setEditForm] = useState({
    breakfast: 0,
    lunch: 0,
    dinner: 0
  });

  const tableRef = useRef(null);
  const resizingRef = useRef(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };



  const handleAddOrder = () => {
    navigate('/add-order');
  };

  const handleEditOrder = (orderId) => {
    const order = orders.find(o => o.orderId === orderId);
    if (order) {
      setEditingOrder(order);
      setEditForm({
        breakfast: order.breakfast,
        lunch: order.lunch,
        dinner: order.dinner
      });
      setIsEditModalOpen(true);
    }
  };

  const handleSaveEdit = () => {
    if (editingOrder) {
      // Update the order in the orders array
      const updatedOrders = orders.map(order => 
        order.orderId === editingOrder.orderId 
          ? { ...order, ...editForm }
          : order
      );
      // In a real app, you would make an API call here
      console.log('Updated order:', editingOrder.orderId, editForm);
      setIsEditModalOpen(false);
      setEditingOrder(null);
      setEditForm({ breakfast: 0, lunch: 0, dinner: 0 });
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditingOrder(null);
    setEditForm({ breakfast: 0, lunch: 0, dinner: 0 });
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      console.log('Delete order:', orderId);
      // Add delete functionality here
    }
  };

  const startResize = (e, columnKey) => {
    e.preventDefault();
    resizingRef.current = { columnKey, startX: e.clientX, startWidth: columnWidths[columnKey] };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopResize);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = (e) => {
    if (!resizingRef.current) return;
    
    const { columnKey, startX, startWidth } = resizingRef.current;
    const deltaX = e.clientX - startX;
    const newWidth = Math.max(80, startWidth + deltaX);
    
    setColumnWidths(prev => ({
      ...prev,
      [columnKey]: newWidth
    }));
  };

  const stopResize = () => {
    resizingRef.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopResize);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCompany = companyFilter === 'All' || order.customerType === companyFilter;
    
    return matchesSearch && matchesCompany;
  });
  return (
    <div className="p-5 sm:p-8 lg:p-10 min-h-screen bg-gray-50">
       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-12 pr-12 py-2 sm:py-2.5 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm sm:text-base bg-white shadow-lg hover:shadow-xl transition-all duration-200"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-100 rounded-r-full transition-colors duration-200"
            >
              <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Add Order Button */}
        <button
          onClick={handleAddOrder}
          className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm sm:text-base"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add Order</span>
        </button>
      </div>

      {/* Meal Summary and Filter Row */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Meal Summary - Left Side */}
        <div className="flex flex-wrap gap-4">
          <div className="inline-flex items-center px-4 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border border-orange-300 shadow-md">
            Breakfast: {orders.reduce((sum, order) => sum + order.breakfast, 0)}
          </div>
          <div className="inline-flex items-center px-4 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300 shadow-md">
            Lunch: {orders.reduce((sum, order) => sum + order.lunch, 0)}
          </div>
          <div className="inline-flex items-center px-4 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300 shadow-md">
            Dinner: {orders.reduce((sum, order) => sum + order.dinner, 0)}
          </div>
        </div>

        {/* Company Filter - Right Side */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="relative bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <select
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              className="block w-full px-6 py-3 pr-12 text-sm font-medium text-gray-700 bg-transparent border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 appearance-none cursor-pointer min-w-[200px] hover:text-indigo-600 transition-colors duration-200"
            >
              <option value="All">All</option>
              <option value="Individual">👤 Individual</option>
              <option value="Company">🏢 Company</option>
              <option value="Agent">🤝 Agent</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs sm:text-sm table-fixed min-w-[1200px]" ref={tableRef}>
            <thead className="bg-gradient-to-r from-blue-50 to-indigo-100 text-gray-700">
              <tr>
                <th 
                  className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm uppercase tracking-wider relative select-none"
                  style={{ width: columnWidths.orderId }}
                >
                  Order ID
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 bg-transparent cursor-col-resize transition-colors duration-200 hover:bg-gray-400 active:bg-gray-600" 
                    onMouseDown={(e) => startResize(e, 'orderId')}
                  ></div>
                </th>
                <th 
                  className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm uppercase tracking-wider relative select-none"
                  style={{ width: columnWidths.customer }}
                >
                  Customer
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 bg-transparent cursor-col-resize transition-colors duration-200 hover:bg-gray-400 active:bg-gray-600" 
                    onMouseDown={(e) => startResize(e, 'customer')}
                  ></div>
                </th>
                <th 
                  className="p-3 sm:p-4 text-center font-semibold text-xs sm:text-sm uppercase tracking-wider relative select-none"
                  style={{ width: columnWidths.type }}
                >
                  Type
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 bg-transparent cursor-col-resize transition-colors duration-200 hover:bg-gray-400 active:bg-gray-600" 
                    onMouseDown={(e) => startResize(e, 'type')}
                  ></div>
                </th>
                <th 
                  className="p-3 sm:p-4 text-center font-semibold text-xs sm:text-sm uppercase tracking-wider relative select-none"
                  style={{ width: columnWidths.breakfast }}
                >
                  Breakfast
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 bg-transparent cursor-col-resize transition-colors duration-200 hover:bg-gray-400 active:bg-gray-600" 
                    onMouseDown={(e) => startResize(e, 'breakfast')}
                  ></div>
                </th>
                <th 
                  className="p-3 sm:p-4 text-center font-semibold text-xs sm:text-sm uppercase tracking-wider relative select-none"
                  style={{ width: columnWidths.lunch }}
                >
                  Lunch
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 bg-transparent cursor-col-resize transition-colors duration-200 hover:bg-gray-400 active:bg-gray-600" 
                    onMouseDown={(e) => startResize(e, 'lunch')}
                  ></div>
                </th>
                <th 
                  className="p-3 sm:p-4 text-center font-semibold text-xs sm:text-sm uppercase tracking-wider relative select-none"
                  style={{ width: columnWidths.dinner }}
                >
                  Dinner
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 bg-transparent cursor-col-resize transition-colors duration-200 hover:bg-gray-400 active:bg-gray-600" 
                    onMouseDown={(e) => startResize(e, 'dinner')}
                  ></div>
                </th>
                <th 
                  className="p-3 sm:p-4 text-center font-semibold text-xs sm:text-sm uppercase tracking-wider relative select-none"
                  style={{ width: columnWidths.actions }}
                >
                  Actions
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 bg-transparent cursor-col-resize transition-colors duration-200 hover:bg-gray-400 active:bg-gray-600" 
                    onMouseDown={(e) => startResize(e, 'actions')}
                  ></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 transition-colors duration-200 hover:bg-gray-50 last:border-b-0">
                  <td className="p-3 sm:p-4 align-middle font-semibold text-indigo-600 font-mono">
                    {order.orderId}
                  </td>
                  <td className="p-3 sm:p-4 align-middle">
                    <div>
                      <div className="font-medium text-gray-900">{order.customerName}</div>
                      <div className="text-sm text-gray-500 font-mono">{order.customerId}</div>
                      <div className="text-xs text-gray-400">{order.customerMobile}</div>
                    </div>
                  </td>
                  <td className="p-3 sm:p-4 align-middle text-center">
                    {order.customerType === 'Individual' && (
                      <div className="inline-flex items-center justify-center px-3 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300 shadow-sm">
                        👤 Individual
                      </div>
                    )}
                    {order.customerType === 'Company' && (
                      <div className="inline-flex items-center justify-center px-3 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300 shadow-sm">
                        🏢 Company
                      </div>
                    )}
                    {order.customerType === 'Agent' && (
                      <div className="inline-flex items-center justify-center px-3 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300 shadow-sm">
                        🤝 Agent
                      </div>
                    )}
                    {order.customerType === 'Customer' && (
                      <div className="inline-flex items-center justify-center px-3 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border border-orange-300 shadow-sm">
                        👥 Customer
                      </div>
                    )}
                  </td>
                  <td className="p-3 sm:p-4 align-middle text-center">
                    {order.breakfast > 0 ? (
                      <div className="inline-flex items-center justify-center px-3 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border border-orange-300 shadow-sm">
                        {order.breakfast}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">-</span>
                    )}
                  </td>
                  <td className="p-3 sm:p-4 align-middle text-center">
                    {order.lunch > 0 ? (
                      <div className="inline-flex items-center justify-center px-3 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300 shadow-sm">
                        {order.lunch}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">-</span>
                    )}
                  </td>
                  <td className="p-3 sm:p-4 align-middle text-center">
                    {order.dinner > 0 ? (
                      <div className="inline-flex items-center justify-center px-3 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300 shadow-sm">
                        {order.dinner}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">-</span>
                    )}
                  </td>
                  <td className="p-3 sm:p-4 align-middle text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEditOrder(order.orderId)}
                        className="text-blue-600 hover:text-blue-900 transition-colors duration-200 p-1 hover:bg-blue-50 rounded"
                        title="Edit Order"
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Order Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Edit Order - {editingOrder?.orderId}
              </h3>
              <button
                onClick={handleCancelEdit}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer: {editingOrder?.customerName}
                </label>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Breakfast
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editForm.breakfast}
                    onChange={(e) => setEditForm(prev => ({ ...prev, breakfast: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lunch
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editForm.lunch}
                    onChange={(e) => setEditForm(prev => ({ ...prev, lunch: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dinner
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editForm.dinner}
                    onChange={(e) => setEditForm(prev => ({ ...prev, dinner: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Total Meals:</div>
                <div className="text-2xl font-bold text-gray-900">
                  {editForm.breakfast + editForm.lunch + editForm.dinner}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSaveEdit}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancelEdit}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
