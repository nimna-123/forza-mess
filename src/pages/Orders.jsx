import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KitchenOrderPrint from '../components/KitchenOrderPrint';
import { GET_ORDERS,UPDATE_ORDERS } from '../Api/service';
import Toast from '../components/Toast';

const Orders = () => {
  const navigate = useNavigate();
  
  // Orders data from API
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  const [isProcessingKitchenOrder, setIsProcessingKitchenOrder] = useState(false);
  const [editForm, setEditForm] = useState({
    id: 0,
    customerId: "",
    customerName: "",
    customerMobile: "",
    preferenceType: "",
    breakfast: {
      vegQuantity: 0,
      nonVegQuantity: 0,
      totalQuantity: 0,
      dietPreference: ""
    },
    lunch: {
      vegQuantity: 0,
      nonVegQuantity: 0,
      totalQuantity: 0,
      dietPreference: ""
    },
    dinner: {
      vegQuantity: 0,
      nonVegQuantity: 0,
      totalQuantity: 0,
      dietPreference: ""
    },
    total: 0,
    date: "",
    customerType: ""
  });

  const tableRef = useRef(null);
  const resizingRef = useRef(null);
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

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await GET_ORDERS();
        setOrders(response.data || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
  const AddOrder = () => {
    const navigate = useNavigate();
   
  }
  const handleEditOrder = (orderId) => {
    const order = orders.find(o => o.orderId === orderId);
    if (order) {
      setEditingOrder(order);
      setEditForm({
        id: order.OrderAID || order.id || 0,
        customerId: order.CustomerId || order.customerId || "",
        customerName: order.CustomerName || order.customerName || "",
        customerMobile: order.CustomerMobile || order.customerMobile || "",
        preferenceType: order.preferenceType || "",
        breakfast: {
          vegQuantity: parseInt(order.breakfastVeg || 0),
          nonVegQuantity: parseInt(order.breakfastNonVeg || 0),
          totalQuantity: parseInt(order.breakfastTotal || 0),
          dietPreference: order.breakfast?.dietPreference || ""
        },
        lunch: {
          vegQuantity: parseInt(order.lunchVeg || 0),
          nonVegQuantity: parseInt(order.lunchNonVeg || 0),
          totalQuantity: parseInt(order.lunchTotal || 0),
          dietPreference: order.lunch?.dietPreference || ""
        },
        dinner: {
          vegQuantity: parseInt(order.dinnerVeg || 0),
          nonVegQuantity: parseInt(order.dinnerNonVeg || 0),
          totalQuantity: parseInt(order.dinnerTotal || 0),
          dietPreference: order.dinner?.dietPreference || ""
        },
        total: parseInt(order.Total || order.total || 0),
        date: order.OrderDate || order.date || order.createdAt || "",
        customerType: order.CustomerType || order.customerType || ""
      });
      setIsEditModalOpen(true);
    }
  };

  const handleSaveEdit = async () => {
    if (editingOrder) {
      try {
        // Calculate total
        const total = editForm.breakfast.totalQuantity + editForm.lunch.totalQuantity + editForm.dinner.totalQuantity;
         // Prepare the update data in the new JSON structure
        const updateData = {
          ...editForm,
          total: total
        };
        // Call the UPDATE_ORDERS API
        const response = await UPDATE_ORDERS(updateData, editingOrder.orderId);
        showToast('Order updated successfully');

        // Update the order in the orders array
        const updatedOrders = orders.map(order => 
          order.orderId === editingOrder.orderId 
            ? { 
                ...order, 
                ...updateData,
                // Keep backward compatibility with existing field names
                breakfastTotal: editForm.breakfast.totalQuantity,
                lunchTotal: editForm.lunch.totalQuantity,
                dinnerTotal: editForm.dinner.totalQuantity,
                breakfastVeg: editForm.breakfast.vegQuantity,
                breakfastNonVeg: editForm.breakfast.nonVegQuantity,
                lunchVeg: editForm.lunch.vegQuantity,
                lunchNonVeg: editForm.lunch.nonVegQuantity,
                dinnerVeg: editForm.dinner.vegQuantity,
                dinnerNonVeg: editForm.dinner.nonVegQuantity,
                Total: total
              }
            : order
        );
        setOrders(updatedOrders);
        setIsEditModalOpen(false);
        setEditingOrder(null);
        setEditForm({ 
          id: 0,
          customerId: "",
          customerName: "",
          customerMobile: "",
          preferenceType: "",
          breakfast: {
            vegQuantity: 0,
            nonVegQuantity: 0,
            totalQuantity: 0,
            dietPreference: ""
          },
          lunch: {
            vegQuantity: 0,
            nonVegQuantity: 0,
            totalQuantity: 0,
            dietPreference: ""
          },
          dinner: {
            vegQuantity: 0,
            nonVegQuantity: 0,
            totalQuantity: 0,
            dietPreference: ""
          },
          total: 0,
          date: "",
          customerType: ""
        });
      } catch (error) {
        console.error('Error updating order:', error);
       
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditingOrder(null);
    setEditForm({ 
      id: 0,
      customerId: "",
      customerName: "",
      customerMobile: "",
      preferenceType: "",
      breakfast: {
        vegQuantity: 0,
        nonVegQuantity: 0,
        totalQuantity: 0,
        dietPreference: ""
      },
      lunch: {
        vegQuantity: 0,
        nonVegQuantity: 0,
        totalQuantity: 0,
        dietPreference: ""
      },
      dinner: {
        vegQuantity: 0,
        nonVegQuantity: 0,
        totalQuantity: 0,
        dietPreference: ""
      },
      total: 0,
      date: "",
      customerType: ""
    });
  };
  const handleDeliveryOrder = (clickedOrder) => {
    console.log('handleDeliveryOrder called with:', clickedOrder);
    
    if (isProcessingKitchenOrder) return;

    // Check if clicked order is for Company or Agent customer
    if (!['company', 'agent', 'Company', 'Agent'].includes(clickedOrder.CustomerType)) {
      showToast('Delivery orders are only available for Company and Agent customers.', 'error');
      return;
    }

    // Filter orders for Company and Agent customers only
    const deliveryOrders = filteredOrders.filter(order =>
      ['company', 'agent', 'Company', 'Agent'].includes(order.CustomerType)
    );

    console.log('Filtered delivery orders:', deliveryOrders);

    if (deliveryOrders.length === 0) {
      showToast('No delivery orders found for Company or Agent customers.', 'error');
      
      return;
    }
    setIsProcessingKitchenOrder(true);
    const allDeliveryOrders = deliveryOrders.map((order, index) => {
      const deliveryOrderNumber = `DEL${new Date().getFullYear()}${String(
        new Date().getMonth() + 1
      ).padStart(2, '0')}${String(new Date().getDate()).padStart(
        2,
        '0'
      )}-${order.orderId}`;

      console.log(`Generating delivery order ${index + 1} for: ${order.orderId} - ${order.CustomerName} (${order.CustomerType})`);

      return `
        <div class="delivery-order">
          <!-- Header -->
          <div class="header-title">Catering Delivery Order</div>
          
          <!-- Order Info -->
          <div class="section">
            <div class="section-title">Order Info</div>
            <div class="field-row">
              <span class="field-label">Delivery Order No :</span>
              <span class="field-line">${deliveryOrderNumber}</span>
            </div>
            <div class="field-row">
              <span class="field-label">Date :</span>
              <span class="field-line">${new Date().toLocaleDateString()}</span>
            </div>
            <div class="field-row">
              <span class="field-label">Delivery Time :</span>
              <span class="field-line">${order.deliveryTime || 'To be confirmed'}</span>
            </div>
          </div>
          
          <!-- Customer Info -->
          <div class="section">
            <div class="section-title">Customer Info</div>
            <div class="field-row">
              <span class="field-label">Client / Company Name :</span>
              <span class="field-line">${order.CustomerName || 'N/A'}</span>
            </div>
            <div class="field-row">
              <span class="field-label">Contact Number :</span>
              <span class="field-line">${order.CustomerMobile || 'N/A'}</span>
            </div>
            <div class="field-row">
              <span class="field-label">Customer Type :</span>
              <span class="field-line">${order.CustomerType}</span>
            </div>
          </div>
          
          <!-- Order Details -->
          <div class="section">
            <div class="section-title">Order Details</div>
            <table class="order-table">
              <thead>
                <tr>
                  <th>Meal Type</th>
                  <th>Quantity</th>
                  <th>Veg</th>
                  <th>Non Veg</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Breakfast</td>
                  <td>${order.breakfastTotal || 0}</td>
                  <td>${order.breakfastVeg || 0}</td>
                  <td>${order.breakfastNonVeg || 0}</td>
                </tr>
                <tr>
                  <td>Lunch</td>
                  <td>${order.lunchTotal || 0}</td>
                  <td>${order.lunchVeg || 0}</td>
                  <td>${order.lunchNonVeg || 0}</td>
                </tr>
                <tr>
                  <td>Dinner</td>
                  <td>${order.dinnerTotal || 0}</td>
                  <td>${order.dinnerVeg || 0}</td>
                  <td>${order.dinnerNonVeg || 0}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Signatures -->
          <div class="section">
            <div class="signature-row">
              <span class="signature-label">Delivered By (Signature & Name) :</span>
              <span class="signature-line"></span>
            </div>
            <div class="signature-row">
              <span class="signature-label">Received By (Signature and Name, Company Name) :</span>
              <span class="signature-line"></span>
            </div>
          </div>
          
          <!-- Notes -->
          <div class="section">
            <div class="section-title">Notes</div>
            <div class="notes-content">
              <div class="note-item">Please Verify Quantity Upon Delivery Time</div>
              <div class="note-item">Ensure All Items Are Accounted For</div>
              <div class="note-item">Contact : ${order.CustomerMobile || 'N/A'}</div>
              <div class="note-item">Customer Type : ${order.CustomerType}</div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    console.log('Final delivery orders HTML length:', allDeliveryOrders.length);
    
    // Print Page Content
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Delivery Orders</title>
        <style>
          @page {
            size: A4;
            margin: 1cm;
          }
          body {
            font-family: Arial, sans-serif;
            font-size: 10px;
            line-height: 1.4;
            margin: 0;
            padding: 0;
            background-color: #2d3748;
          }
          .delivery-order {
            background: white;
            width: 21cm;
            min-height: 29.7cm;
            margin: 0 auto 20px;
            padding: 1cm;
            border-radius: 8px;
            box-sizing: border-box;
            page-break-after: always;
            border: 1px solid #ddd;
          }
          .header-title {
            text-align: center;
            background: #f7f7f7;
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 6px;
            font-weight: bold;
            font-size: 12px;
            margin-bottom: 15px;
          }
          .section-title {
            font-weight: bold;
            font-size: 11px;
            margin: 12px 0 6px;
          }
          .field-row {
            display: flex;
            margin-bottom: 6px;
          }
          .field-label {
            font-weight: bold;
            width: 140px;
            font-size: 9px;
          }
          .field-line {
            flex: 1;
            border-bottom: 1px dotted #999;
            font-size: 9px;
            margin-left: 6px;
            color: #333;
          }
          .order-table {
            width: 100%;
            border-collapse: collapse;
            margin: 8px 0;
          }
          .order-table th {
            background: #444;
            color: white;
            padding: 5px;
            font-size: 9px;
            border: 1px solid #444;
          }
          .order-table td {
            border: 1px solid #ccc;
            padding: 5px;
            text-align: center;
            font-size: 9px;
          }
          .order-table td:first-child {
            text-align: left;
            font-weight: bold;
          }
          .signature-row {
            display: flex;
            margin: 10px 0;
          }
          .signature-label {
            font-weight: bold;
            font-size: 9px;
            min-width: 200px;
          }
          .signature-line {
            flex: 1;
            border-bottom: 1px dotted #999;
            margin-left: 5px;
          }
          .notes-content {
            margin-top: 5px;
          }
          .note-item {
            font-size: 9px;
            margin-bottom: 3px;
          }
          @media print {
            body {
              background: white;
            }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="summary-info no-print" style="text-align:center; margin-bottom:20px; color:white;">
          <h2>Delivery Orders Summary</h2>
          <p>Total Orders: ${deliveryOrders.length}</p>
          <p>Date: ${new Date().toLocaleDateString()}</p>
          <p>Time: ${new Date().toLocaleTimeString()}</p>
        </div>
        ${allDeliveryOrders}
        <div class="no-print" style="position:fixed; top:20px; right:20px; z-index:1000;">
          <button onclick="window.print()" style="padding:10px 20px; background:#444; color:white; border:none; border-radius:5px; cursor:pointer;">
            Print All Delivery Orders
          </button>
          <button onclick="window.close()" style="padding:10px 20px; background:#777; color:white; border:none; border-radius:5px; cursor:pointer; margin-left:10px;">
            Close
          </button>
        </div>
      </body>
      </html>
    `;

    try {
      const windowName = `delivery_orders_${Date.now()}`;
      const printWindow = window.open('', windowName, 'width=900,height=700,scrollbars=yes,resizable=yes');
      if (!printWindow) {
        showToast("Please allow pop-ups for printing.", 'error');
        setIsProcessingKitchenOrder(false);
        return;
      }

      // Write content to the window
      printWindow.document.write(printContent);
      printWindow.document.close();

      // Focus the window
      printWindow.focus();
      
      // Show success message
      showToast(`Successfully opened print window with ${deliveryOrders.length} delivery orders!`, 'success');
      
      // Let the window load naturally
      setTimeout(() => {
        console.log('Print window loaded successfully for all delivery orders');
        setIsProcessingKitchenOrder(false);
      }, 1000);

      // Fallback in case onload doesn't fire
      setTimeout(() => {
        console.log('Fallback timeout reached for delivery orders');
        setIsProcessingKitchenOrder(false);
      }, 3000);
    } catch (error) {
      console.error('Error opening print window:', error);
      showToast('Error opening print window. Please try again.', 'error');
      setIsProcessingKitchenOrder(false);
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
      (order.orderId?.toString().toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (order.CustomerName?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (order.CustomerId?.toString().toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (order.CustomerMobile?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    
    const matchesCompany = companyFilter === 'All' || order.CustomerType === companyFilter;
    
    return matchesSearch && matchesCompany;
  });
  // Show loading state
  if (loading) {
    return (
      <div className="p-5 sm:p-8 lg:p-10 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="p-5 sm:p-8 lg:p-10 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Orders</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 sm:p-8 lg:p-10 min-h-screen bg-gray-50">
       <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={hideToast}
            />
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
            placeholder="Search by customer name, order ID, mobile..."
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

        {/* Buttons Container - Right Aligned */}
        <div className="flex items-center gap-0">
          {/* Process Kitchen Order Button */}
          <KitchenOrderPrint 
            orders={filteredOrders} 
            onProcessing={setIsProcessingKitchenOrder}
          />

          {/* Add Order Button */}
          <button
            onClick={handleAddOrder}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md 
            hover:shadow-lg font-medium text-sm sm:text-base ml-4"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Order</span>
          </button>
        </div>
      </div>

      {/* Meal Summary and Filter Row */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Meal Summary - Left Side */}
        <div className="flex flex-wrap gap-4">
          <div className="inline-flex flex-col items-center px-4 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border border-orange-300 shadow-md">
            <div>Breakfast: {filteredOrders.reduce((sum, order) => sum + parseInt(order.breakfastTotal || 0), 0)}</div>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-green-700">{filteredOrders.reduce((sum, order) => sum + parseInt(order.breakfastVeg || 0), 0)}</span>
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span className="text-red-700">{filteredOrders.reduce((sum, order) => sum + parseInt(order.breakfastNonVeg || 0), 0)}</span>
            </div>
          </div>
          <div className="inline-flex flex-col items-center px-4 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300 shadow-md">
            <div>Lunch: {filteredOrders.reduce((sum, order) => sum + parseInt(order.lunchTotal || 0), 0)}</div>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-green-700">{filteredOrders.reduce((sum, order) => sum + parseInt(order.lunchVeg || 0), 0)}</span>
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span className="text-red-700">{filteredOrders.reduce((sum, order) => sum + parseInt(order.lunchNonVeg || 0), 0)}</span>
            </div>
          </div>
          <div className="inline-flex flex-col items-center px-4 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300 shadow-md">
            <div>Dinner: {filteredOrders.reduce((sum, order) => sum + parseInt(order.dinnerTotal || 0), 0)}</div>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-green-700">{filteredOrders.reduce((sum, order) => sum + parseInt(order.dinnerVeg || 0), 0)}</span>
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span className="text-red-700">{filteredOrders.reduce((sum, order) => sum + parseInt(order.dinnerNonVeg || 0), 0)}</span>
            </div>
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
              <option value="company">🏢 Company</option>
              <option value="agent">🤝 Agent</option>
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

      {/* Orders Count and Table */}
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing {filteredOrders.length} of {orders.length} orders
          {companyFilter !== 'All' && (
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              Filtered by: {companyFilter}
            </span>
          )}
          {searchTerm && (
            <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
              Search: "{searchTerm}"
            </span>
          )}
        </div>
        {(companyFilter !== 'All' || searchTerm) && (
          <button
            onClick={() => {
              setCompanyFilter('All');
              setSearchTerm('');
            }}
            className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors duration-200 border border-red-200"
          >
            Clear Filters
          </button>
        )}
      </div>
      
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
              {filteredOrders.map((order,index) => (
                <tr key={index} className="border-b border-gray-100 transition-colors duration-200 hover:bg-gray-50 last:border-b-0">
                  <td className="p-3 sm:p-4 align-middle font-semibold text-indigo-600 font-mono">
                    {order.orderId}
                  </td>
                  <td className="p-3 sm:p-4 align-middle">
                    <div>
                      <div className="font-medium text-gray-900">{order.CustomerName}</div>
                      <div className="text-sm text-gray-500 font-mono">{order.CustomerType}</div>
                      <div className="text-xs text-gray-400">{order.CustomerMobile}</div>
                    </div>
                  </td>
                  <td className="p-3 sm:p-4 align-middle text-center">
                    {order.CustomerType === 'Individual' && (
                      <div className="inline-flex items-center justify-center px-3 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300 shadow-sm">
                        👤 Individual
                      </div>
                    )}
                    {order.CustomerType === 'company' && (
                      <div className="inline-flex items-center justify-center px-3 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300 shadow-sm">
                        🏢 Company
                      </div>
                    )}
                    {order.CustomerType === 'agent' && (
                      <div className="inline-flex items-center justify-center px-3 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300 shadow-sm">
                        🤝 Agent
                      </div>
                    )}
                    
                  </td>
                  <td className="p-3 sm:p-4 align-middle text-center">
                    {order.breakfastTotal > 0 ? (
                      <div className="space-y-1">
                        <div className="inline-flex items-center justify-center px-3 py-2 mb-3 rounded-lg text-sm font-semibold bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border border-orange-300 shadow-sm">
                          {order.breakfastTotal}
                        </div>
                        {(order.breakfastVeg !== undefined || order.breakfastNonVeg !== undefined) && (
                          <div className="text-xs space-y-1">
                            {order.breakfastVeg > 0 && (
                              <div className="inline-flex items-center px-2 py-1 rounded bg-green-100 text-green-700 text-xs">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                                {order.breakfastVeg}
                              </div>
                            )}
                            {order.breakfastNonVeg > 0 && (
                              <div className="inline-flex items-center px-2 ml-1 py-1 rounded bg-red-100 text-red-700 text-xs">
                                <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                                {order.breakfastNonVeg}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">-</span>
                    )}
                  </td>
                  <td className="p-3 sm:p-4 align-middle text-center">
                    {order.lunchTotal > 0 ? (
                      <div className="space-y-1">
                        <div className="inline-flex items-center justify-center px-3 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300 shadow-sm">
                          {order.lunchTotal}
                        </div>
                        {(order.lunchVeg !== undefined || order.lunchNonVeg !== undefined) && (
                          <div className="text-xs space-y-1">
                            {order.lunchVeg > 0 && (
                              <div className="inline-flex items-center px-2 py-1 rounded bg-green-100 text-green-700 text-xs">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                                {order.lunchVeg}
                              </div>
                            )}
                            {order.lunchNonVeg > 0 && (
                              <div className="inline-flex items-center px-2 py-1 rounded bg-red-100 text-red-700 text-xs">
                                <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                                {order.lunchNonVeg}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">-</span>
                    )}
                  </td>
                  <td className="p-3 sm:p-4 align-middle text-center">
                    {order.dinnerTotal > 0 ? (
                      <div className="space-y-1">
                        <div className="inline-flex items-center justify-center px-3 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300 shadow-sm">
                          {order.dinnerTotal}
                        </div>
                        {(order.dinnerVeg !== undefined || order.dinnerNonVeg !== undefined) && (
                          <div className="text-xs space-y-1">
                            {order.dinnerVeg > 0 && (
                              <div className="inline-flex items-center px-2 py-1 rounded bg-green-100 text-green-700 text-xs">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                                {order.dinnerVeg}
                              </div>
                            )}
                            {order.dinnerNonVeg > 0 && (
                              <div className="inline-flex items-center px-2 py-1 rounded bg-red-100 text-red-700 text-xs">
                                <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                                {order.dinnerNonVeg}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">-</span>
                    )}
                  </td>
                  <td className="p-3 sm:p-4 align-middle text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEditOrder(order.orderId)}
                        disabled={isProcessingKitchenOrder}
                        className={`transition-colors duration-200 p-1 rounded ${
                          isProcessingKitchenOrder 
                            ? 'text-gray-400 cursor-not-allowed' 
                            : 'text-blue-600 hover:text-blue-900 hover:bg-blue-50'
                        }`}
                        title={isProcessingKitchenOrder ? "Edit disabled while processing kitchen order" : "Edit Order"}
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      
                      {/* Delivery Order Button - Only for Company and Agent customers */}
                      {['company', 'agent', 'Company', 'Agent'].includes(order.CustomerType) && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('Delivery order button clicked for:', order.orderId, order.CustomerName, order.CustomerType);
                            handleDeliveryOrder(order);
                          }}
                          disabled={isProcessingKitchenOrder}
                          className={`transition-colors duration-200 p-1 rounded ${
                            isProcessingKitchenOrder 
                              ? 'text-gray-400 cursor-not-allowed' 
                              : 'text-green-600 hover:text-green-900 hover:bg-green-50'
                          }`}
                          title={isProcessingKitchenOrder ? "Delivery order disabled while processing" : "Print All Delivery Orders"}
                        >
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </button>
                      )}
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
        <div 
          className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50 p-4"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          onClick={handleCancelEdit}
        >
          <div 
            className="bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 relative border border-white/20"
            style={{ position: 'relative', zIndex: 51 }}
            onClick={(e) => e.stopPropagation()}
          >
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Order ID</label>
                  <div className="text-sm font-semibold text-gray-800">{editingOrder?.orderId}</div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Customer Type</label>
                  <div className="text-sm font-semibold text-gray-800">{editingOrder?.CustomerType}</div>
                </div>
              </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Customer Name</label>
                  <div className="text-sm font-semibold text-gray-800">{editingOrder?.CustomerName}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Contact Number</label>
                    <div className="text-sm font-semibold text-gray-800">{editingOrder?.CustomerMobile || 'N/A'}</div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Order Date</label>
                    <div className="text-sm font-semibold text-gray-800">
                      {editingOrder?.OrderDate ? formatDate(editingOrder.OrderDate) : 
                       editingOrder?.createdAt ? formatDate(editingOrder.createdAt) : 
                       editingOrder?.orderDate ? formatDate(editingOrder.orderDate) : 
                       'N/A'}
                    </div>
                  </div>
                </div>

              <div className="space-y-6">
                {/* Breakfast Section */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
                    Breakfast
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Total</label>
                      <input
                        type="number"
                        min="0"
                        value={editForm.breakfast.totalQuantity}
                        onChange={(e) => setEditForm(prev => ({ 
                          ...prev, 
                          breakfast: { 
                            ...prev.breakfast, 
                            totalQuantity: parseInt(e.target.value) || 0 
                          } 
                        }))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Veg</label>
                      <input
                        type="number"
                        min="0"
                        value={editForm.breakfast.vegQuantity}
                        onChange={(e) => setEditForm(prev => ({ 
                          ...prev, 
                          breakfast: { 
                            ...prev.breakfast, 
                            vegQuantity: parseInt(e.target.value) || 0 
                          } 
                        }))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Non-Veg</label>
                      <input
                        type="number"
                        min="0"
                        value={editForm.breakfast.nonVegQuantity}
                        onChange={(e) => setEditForm(prev => ({ 
                          ...prev, 
                          breakfast: { 
                            ...prev.breakfast, 
                            nonVegQuantity: parseInt(e.target.value) || 0 
                          } 
                        }))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Lunch Section */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    Lunch
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Total</label>
                      <input
                        type="number"
                        min="0"
                        value={editForm.lunch.totalQuantity}
                        onChange={(e) => setEditForm(prev => ({ 
                          ...prev, 
                          lunch: { 
                            ...prev.lunch, 
                            totalQuantity: parseInt(e.target.value) || 0 
                          } 
                        }))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Veg</label>
                      <input
                        type="number"
                        min="0"
                        value={editForm.lunch.vegQuantity}
                        onChange={(e) => setEditForm(prev => ({ 
                          ...prev, 
                          lunch: { 
                            ...prev.lunch, 
                            vegQuantity: parseInt(e.target.value) || 0 
                          } 
                        }))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Non-Veg</label>
                      <input
                        type="number"
                        min="0"
                        value={editForm.lunch.nonVegQuantity}
                        onChange={(e) => setEditForm(prev => ({ 
                          ...prev, 
                          lunch: { 
                            ...prev.lunch, 
                            nonVegQuantity: parseInt(e.target.value) || 0 
                          } 
                        }))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Dinner Section */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                    Dinner
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Total</label>
                      <input
                        type="number"
                        min="0"
                        value={editForm.dinner.totalQuantity}
                        onChange={(e) => setEditForm(prev => ({ 
                          ...prev, 
                          dinner: { 
                            ...prev.dinner, 
                            totalQuantity: parseInt(e.target.value) || 0 
                          } 
                        }))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Veg</label>
                      <input
                        type="number"
                        min="0"
                        value={editForm.dinner.vegQuantity}
                        onChange={(e) => setEditForm(prev => ({ 
                          ...prev, 
                          dinner: { 
                            ...prev.dinner, 
                            vegQuantity: parseInt(e.target.value) || 0 
                          } 
                        }))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Non-Veg</label>
                      <input
                        type="number"
                        min="0"
                        value={editForm.dinner.nonVegQuantity}
                        onChange={(e) => setEditForm(prev => ({ 
                          ...prev, 
                          dinner: { 
                            ...prev.dinner, 
                            nonVegQuantity: parseInt(e.target.value) || 0 
                          } 
                        }))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Total Meals:</div>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {editForm.breakfast.totalQuantity + editForm.lunch.totalQuantity + editForm.dinner.totalQuantity}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-green-700 font-bold">
                      {editForm.breakfast.vegQuantity + editForm.lunch.vegQuantity + editForm.dinner.vegQuantity}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    <span className="text-red-700 font-bold">
                      {editForm.breakfast.nonVegQuantity + editForm.lunch.nonVegQuantity + editForm.dinner.nonVegQuantity}
                    </span>
                  </div>
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

