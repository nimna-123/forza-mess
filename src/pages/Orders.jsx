import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import KitchenOrderPrint from '../components/KitchenOrderPrint';

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
      breakfastVeg: 1,
      breakfastNonVeg: 1,
      lunchVeg: 1,
      lunchNonVeg: 0,
      dinnerVeg: 2,
      dinnerNonVeg: 1,
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
      // No veg/non-veg preferences specified
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
      lunchVeg: 0,
      lunchNonVeg: 3,
      dinnerVeg: 1,
      dinnerNonVeg: 1,
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
      breakfastVeg: 1,
      breakfastNonVeg: 0,
      lunchVeg: 0,
      lunchNonVeg: 1,
      dinnerVeg: 1,
      dinnerNonVeg: 0,
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
      customerType: 'Company',
      breakfast: 2,
      lunch: 0,
      dinner: 2,
      breakfastVeg: 0,
      breakfastNonVeg: 2,
      dinnerVeg: 1,
      dinnerNonVeg: 1,
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
  const [isProcessingKitchenOrder, setIsProcessingKitchenOrder] = useState(false);
  const [editForm, setEditForm] = useState({
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    breakfastVeg: 0,
    breakfastNonVeg: 0,
    lunchVeg: 0,
    lunchNonVeg: 0,
    dinnerVeg: 0,
    dinnerNonVeg: 0
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
        dinner: order.dinner,
        breakfastVeg: order.breakfastVeg || 0,
        breakfastNonVeg: order.breakfastNonVeg || 0,
        lunchVeg: order.lunchVeg || 0,
        lunchNonVeg: order.lunchNonVeg || 0,
        dinnerVeg: order.dinnerVeg || 0,
        dinnerNonVeg: order.dinnerNonVeg || 0
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
      setEditForm({ 
        breakfast: 0, 
        lunch: 0, 
        dinner: 0,
        breakfastVeg: 0,
        breakfastNonVeg: 0,
        lunchVeg: 0,
        lunchNonVeg: 0,
        dinnerVeg: 0,
        dinnerNonVeg: 0
      });
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditingOrder(null);
    setEditForm({ 
      breakfast: 0, 
      lunch: 0, 
      dinner: 0,
      breakfastVeg: 0,
      breakfastNonVeg: 0,
      lunchVeg: 0,
      lunchNonVeg: 0,
      dinnerVeg: 0,
      dinnerNonVeg: 0
    });
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      console.log('Delete order:', orderId);
      // Add delete functionality here
    }
  };

  const handleDeliveryOrder = (clickedOrder) => {
    if (isProcessingKitchenOrder) return;

    // Check if clicked order is for Company or Agent customer
    if (!['Company', 'Agent'].includes(clickedOrder.customerType)) {
      alert('Delivery orders are only available for Company and Agent customers.');
      return;
    }

    // Filter orders for Company and Agent customers only
    const deliveryOrders = orders.filter(order =>
      ['Company', 'Agent'].includes(order.customerType)
    );

    if (deliveryOrders.length === 0) {
      alert('No delivery orders found for Company or Agent customers.');
      return;
    }

    console.log('Generating delivery orders for:', deliveryOrders.length, 'orders');
    console.log('Delivery orders found:', deliveryOrders.map(o => ({ orderId: o.orderId, customerName: o.customerName, customerType: o.customerType })));
    
    // Show alert with found orders for debugging
    alert(`Found ${deliveryOrders.length} delivery orders:\n${deliveryOrders.map(o => `${o.orderId} - ${o.customerName} (${o.customerType})`).join('\n')}`);
    
    setIsProcessingKitchenOrder(true);

    // Generate all delivery orders content
    console.log('Starting to generate delivery orders for each customer...');
    const allDeliveryOrders = deliveryOrders.map((order, index) => {
      const deliveryOrderNumber = `DEL${new Date().getFullYear()}${String(
        new Date().getMonth() + 1
      ).padStart(2, '0')}${String(new Date().getDate()).padStart(
        2,
        '0'
      )}-${order.orderId}`;

      console.log(`Generating delivery order ${index + 1} for: ${order.orderId} - ${order.customerName} (${order.customerType})`);

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
              <span class="field-line">${order.customerName || 'N/A'}</span>
            </div>
            <div class="field-row">
              <span class="field-label">Contact Number :</span>
              <span class="field-line">${order.customerMobile || 'N/A'}</span>
            </div>
            <div class="field-row">
              <span class="field-label">Customer Type :</span>
              <span class="field-line">${order.customerType}</span>
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
                  <td>${order.breakfast || 0}</td>
                  <td>${order.breakfastVeg || 0}</td>
                  <td>${order.breakfastNonVeg || 0}</td>
                </tr>
                <tr>
                  <td>Lunch</td>
                  <td>${order.lunch || 0}</td>
                  <td>${order.lunchVeg || 0}</td>
                  <td>${order.lunchNonVeg || 0}</td>
                </tr>
                <tr>
                  <td>Dinner</td>
                  <td>${order.dinner || 0}</td>
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
              <div class="note-item">Contact : ${order.customerMobile || 'N/A'}</div>
              <div class="note-item">Customer Type : ${order.customerType}</div>
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
        alert("Please allow pop-ups for printing.");
        setIsProcessingKitchenOrder(false);
        return;
      }

      // Write content to the window
      printWindow.document.write(printContent);
      printWindow.document.close();

      // Focus the window
      printWindow.focus();
      
      // Show success message
      alert(`Successfully opened print window with ${deliveryOrders.length} delivery orders!`);
      
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
      alert('Error opening print window. Please try again.');
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

        {/* Buttons Container - Right Aligned */}
        <div className="flex items-center gap-0">
          {/* Process Kitchen Order Button */}
          <KitchenOrderPrint 
            orders={orders} 
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
            <div>Breakfast: {orders.reduce((sum, order) => sum + order.breakfast, 0)}</div>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-green-700">{orders.reduce((sum, order) => sum + (order.breakfastVeg || 0), 0)}</span>
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span className="text-red-700">{orders.reduce((sum, order) => sum + (order.breakfastNonVeg || 0), 0)}</span>
            </div>
          </div>
          <div className="inline-flex flex-col items-center px-4 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300 shadow-md">
            <div>Lunch: {orders.reduce((sum, order) => sum + order.lunch, 0)}</div>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-green-700">{orders.reduce((sum, order) => sum + (order.lunchVeg || 0), 0)}</span>
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span className="text-red-700">{orders.reduce((sum, order) => sum + (order.lunchNonVeg || 0), 0)}</span>
            </div>
          </div>
          <div className="inline-flex flex-col items-center px-4 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300 shadow-md">
            <div>Dinner: {orders.reduce((sum, order) => sum + order.dinner, 0)}</div>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-green-700">{orders.reduce((sum, order) => sum + (order.dinnerVeg || 0), 0)}</span>
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span className="text-red-700">{orders.reduce((sum, order) => sum + (order.dinnerNonVeg || 0), 0)}</span>
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
                      <div className="space-y-1">
                        <div className="inline-flex items-center justify-center px-3 py-2 mb-3 rounded-lg text-sm font-semibold bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border border-orange-300 shadow-sm">
                          {order.breakfast}
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
                    {order.lunch > 0 ? (
                      <div className="space-y-1">
                        <div className="inline-flex items-center justify-center px-3 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300 shadow-sm">
                          {order.lunch}
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
                    {order.dinner > 0 ? (
                      <div className="space-y-1">
                        <div className="inline-flex items-center justify-center px-3 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300 shadow-sm">
                          {order.dinner}
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
                      {['Company', 'Agent'].includes(order.customerType) && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('Delivery order button clicked for:', order.orderId, order.customerName, order.customerType);
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
                        value={editForm.breakfast}
                        onChange={(e) => setEditForm(prev => ({ ...prev, breakfast: parseInt(e.target.value) || 0 }))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                                                               <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Veg</label>
                        <input
                          type="number"
                          min="0"
                          value={editForm.breakfastVeg}
                          onChange={(e) => setEditForm(prev => ({ ...prev, breakfastVeg: parseInt(e.target.value) || 0 }))}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Nveg</label>
                        <input
                          type="number"
                          min="0"
                          value={editForm.breakfastNonVeg}
                          onChange={(e) => setEditForm(prev => ({ ...prev, breakfastNonVeg: parseInt(e.target.value) || 0 }))}
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
                        value={editForm.lunch}
                        onChange={(e) => setEditForm(prev => ({ ...prev, lunch: parseInt(e.target.value) || 0 }))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                                                               <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Veg</label>
                        <input
                          type="number"
                          min="0"
                          value={editForm.lunchVeg}
                          onChange={(e) => setEditForm(prev => ({ ...prev, lunchVeg: parseInt(e.target.value) || 0 }))}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Nveg</label>
                        <input
                          type="number"
                          min="0"
                          value={editForm.lunchNonVeg}
                          onChange={(e) => setEditForm(prev => ({ ...prev, lunchNonVeg: parseInt(e.target.value) || 0 }))}
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
                        value={editForm.dinner}
                        onChange={(e) => setEditForm(prev => ({ ...prev, dinner: parseInt(e.target.value) || 0 }))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </div>
                                                               <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Veg</label>
                        <input
                          type="number"
                          min="0"
                          value={editForm.dinnerVeg}
                          onChange={(e) => setEditForm(prev => ({ ...prev, dinnerVeg: parseInt(e.target.value) || 0 }))}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Nveg</label>
                        <input
                          type="number"
                          min="0"
                          value={editForm.dinnerNonVeg}
                          onChange={(e) => setEditForm(prev => ({ ...prev, dinnerNonVeg: parseInt(e.target.value) || 0 }))}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                        />
                      </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Total Meals:</div>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {editForm.breakfast + editForm.lunch + editForm.dinner}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-green-700 font-bold">
                      {editForm.breakfastVeg + editForm.lunchVeg + editForm.dinnerVeg}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    <span className="text-red-700 font-bold">
                      {editForm.breakfastNonVeg + editForm.lunchNonVeg + editForm.dinnerNonVeg}
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

