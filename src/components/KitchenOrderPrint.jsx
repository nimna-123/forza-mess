import React from 'react';

const KitchenOrderPrint = ({ orders, onProcessing }) => {
  const generateDeliveryNote = (order, deliveryOrderNumber) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Catering Delivery Order - ${order.customerName}</title>
        <style>
          @page {
            size: A4;
            margin: 1cm;
          }
          body {
            font-family: 'Courier New', monospace;
            font-size: 12px;
            line-height: 1.3;
            margin: 0;
            padding: 20px;
            background-color: #f9f9f9;
          }
          .delivery-order {
            border: 2px solid #000;
            max-width: 800px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding: 20px;
            background-color: #f8f9fa;
          }
          .header h1 {
            margin: 0;
            font-size: 20px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .order-info {
            padding: 20px;
            border-bottom: 1px solid #000;
          }
          .order-row {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
          }
          .order-label {
            font-weight: bold;
            min-width: 180px;
            flex-shrink: 0;
          }
          .order-value {
            border-bottom: 1px solid #000;
            flex: 1;
            margin-left: 15px;
            min-height: 25px;
            padding: 2px 5px;
          }
          .client-info {
            padding: 20px;
            border-bottom: 1px solid #000;
          }
          .client-row {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
          }
          .client-label {
            font-weight: bold;
            min-width: 180px;
            flex-shrink: 0;
          }
          .client-value {
            border-bottom: 1px solid #000;
            flex: 1;
            margin-left: 15px;
            min-height: 25px;
            padding: 2px 5px;
          }
          .order-details {
            padding: 20px;
            border-bottom: 1px solid #000;
          }
          .details-header {
            text-align: center;
            font-weight: bold;
            margin-bottom: 15px;
            text-transform: uppercase;
            font-size: 14px;
            letter-spacing: 1px;
          }
          .meal-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
          }
          .meal-table th, .meal-table td {
            border: 1px solid #000;
            padding: 12px 8px;
            text-align: center;
            font-weight: 500;
          }
          .meal-table th {
            background-color: #f8f9fa;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.5px;
          }
          .meal-table td:first-child {
            text-align: left;
            font-weight: bold;
          }
          .signature-section {
            padding: 20px;
          }
          .signature-row {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
          }
          .signature-label {
            font-weight: bold;
            min-width: 250px;
            flex-shrink: 0;
          }
          .signature-line {
            border-bottom: 1px solid #000;
            flex: 1;
            margin-left: 15px;
            min-height: 35px;
          }
          .notes {
            padding: 20px;
            border-top: 1px solid #000;
            background-color: #f8f9fa;
          }
          .notes h4 {
            margin: 0 0 12px 0;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 13px;
            letter-spacing: 0.5px;
          }
          .notes ul {
            margin: 0;
            padding-left: 20px;
          }
          .notes li {
            margin-bottom: 6px;
            line-height: 1.4;
          }
          @media print {
            body { 
              margin: 0; 
              background-color: white;
              padding: 0;
            }
            .no-print { display: none; }
            .delivery-order {
              box-shadow: none;
              border: 2px solid #000;
            }
          }
        </style>
      </head>
      <body>
        <div class="delivery-order">
          <div class="header">
            <h1>Catering Delivery Order</h1>
          </div>
          
          <div class="order-info">
            <div class="order-row">
              <span class="order-label">Delivery Order No:</span>
              <span class="order-value">${deliveryOrderNumber}</span>
            </div>
            <div class="order-row">
              <span class="order-label">Date:</span>
              <span class="order-value">${new Date().toLocaleDateString()}</span>
            </div>
            <div class="order-row">
              <span class="order-label">Delivery Time:</span>
              <span class="order-value">${new Date().toLocaleTimeString()}</span>
            </div>
          </div>
          
          <div class="client-info">
            <div class="client-row">
              <span class="client-label">Client / Company Name:</span>
              <span class="client-value">${order.customerName}</span>
            </div>
            <div class="client-row">
              <span class="client-label">Contact Person & Phone:</span>
              <span class="client-value">${order.customerMobile || '__________________'}</span>
            </div>
            <div class="client-row">
              <span class="client-label">Customer Type:</span>
              <span class="client-value">${order.customerType}</span>
            </div>
          </div>
          
          <div class="order-details">
            <div class="details-header">Order Details</div>
            <table class="meal-table">
              <thead>
                <tr>
                  <th>Meal Type</th>
                  <th>Quantity</th>
                  <th>Veg</th>
                  <th>Non-Veg</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Breakfast</td>
                  <td>${order.breakfast}</td>
                  <td>${order.breakfastVeg || 0}</td>
                  <td>${order.breakfastNonVeg || 0}</td>
                </tr>
                <tr>
                  <td>Lunch</td>
                  <td>${order.lunch}</td>
                  <td>${order.lunchVeg || 0}</td>
                  <td>${order.lunchNonVeg || 0}</td>
                </tr>
                <tr>
                  <td>Dinner</td>
                  <td>${order.dinner}</td>
                  <td>${order.dinnerVeg || 0}</td>
                  <td>${order.dinnerNonVeg || 0}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="signature-section">
            <div class="signature-row">
              <span class="signature-label">Delivered By (Signature & Name):</span>
              <span class="signature-line"></span>
            </div>
            <div class="signature-row">
              <span class="signature-label">Received By (Signature, Name & Company Stamp):</span>
              <span class="signature-line"></span>
            </div>
          </div>
          
          <div class="notes">
            <h4>Notes:</h4>
            <ul>
              <li>Please verify quantities upon delivery.</li>
              <li>Any discrepancy should be reported immediately.</li>
              <li>Customer: ${order.customerName}</li>
              <li>Customer Type: ${order.customerType}</li>
            </ul>
          </div>
        </div>
        
        <div class="no-print" style="position: fixed; top: 20px; right: 20px; z-index: 1000;">
          <button onclick="window.print()" style="padding: 10px 20px; background: #dc2626; color: white; border: none; border-radius: 5px; cursor: pointer;">
            Print Delivery Order
          </button>
          <button onclick="window.close()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px;">
            Close
          </button>
        </div>
      </body>
      </html>
    `;
  };

  const handleDeliveryOrder = () => {
    // Notify parent component that processing has started
    if (onProcessing) {
      onProcessing(true);
    }

    // Filter orders for Company and Agent customers only (not individuals)
    const deliveryOrders = orders.filter(order => 
      ['Company', 'Agent'].includes(order.customerType)
    );

    if (deliveryOrders.length === 0) {
      alert('No delivery orders found for Company or Agent customers.');
      if (onProcessing) {
        onProcessing(false);
      }
      return;
    }

    // Generate all delivery notes content
    const allDeliveryNotes = deliveryOrders.map((order, index) => {
      const deliveryOrderNumber = `DEL${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}-${index + 1}`;
      
      return `
        <div class="delivery-order" style="page-break-after: always;">
          <div class="header">
            <h1>Catering Delivery Order</h1>
          </div>
          
          <div class="order-info">
            <div class="order-row">
              <span class="order-label">Delivery Order No:</span>
              <span class="order-value">${deliveryOrderNumber}</span>
            </div>
            <div class="order-row">
              <span class="order-label">Date:</span>
              <span class="order-value">${new Date().toLocaleDateString()}</span>
            </div>
            <div class="order-row">
              <span class="order-label">Delivery Time:</span>
              <span class="order-value">${new Date().toLocaleTimeString()}</span>
            </div>
          </div>
          
          <div class="client-info">
            <div class="client-row">
              <span class="client-label">Client / Company Name:</span>
              <span class="client-value">${order.customerName}</span>
            </div>
            <div class="client-row">
              <span class="client-label">Contact Person & Phone:</span>
              <span class="client-value">${order.customerMobile || '__________________'}</span>
            </div>
            <div class="client-row">
              <span class="client-label">Customer Type:</span>
              <span class="client-value">${order.customerType}</span>
            </div>
          </div>
          
          <div class="order-details">
            <div class="details-header">Order Details</div>
            <table class="meal-table">
              <thead>
                <tr>
                  <th>Meal Type</th>
                  <th>Quantity</th>
                  <th>Veg</th>
                  <th>Non-Veg</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Breakfast</td>
                  <td>${order.breakfast}</td>
                  <td>${order.breakfastVeg || 0}</td>
                  <td>${order.breakfastNonVeg || 0}</td>
                </tr>
                <tr>
                  <td>Lunch</td>
                  <td>${order.lunch}</td>
                  <td>${order.lunchVeg || 0}</td>
                  <td>${order.lunchNonVeg || 0}</td>
                </tr>
                <tr>
                  <td>Dinner</td>
                  <td>${order.dinner}</td>
                  <td>${order.dinnerVeg || 0}</td>
                  <td>${order.dinnerNonVeg || 0}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="signature-section">
            <div class="signature-row">
              <span class="signature-label">Delivered By (Signature & Name):</span>
              <span class="signature-line"></span>
            </div>
            <div class="signature-row">
              <span class="signature-label">Received By (Signature, Name & Company Stamp):</span>
              <span class="signature-line"></span>
            </div>
          </div>
          
          <div class="notes">
            <h4>Notes:</h4>
            <ul>
              <li>Please verify quantities upon delivery.</li>
              <li>Any discrepancy should be reported immediately.</li>
              <li>Customer: ${order.customerName}</li>
              <li>Customer Type: ${order.customerType}</li>
            </ul>
          </div>
        </div>
      `;
    }).join('');

    // Create combined print content
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Individual Delivery Orders</title>
        <style>
          @page {
            size: A4;
            margin: 1cm;
          }
          body {
            font-family: 'Courier New', monospace;
            font-size: 12px;
            line-height: 1.3;
            margin: 0;
            padding: 20px;
            background-color: #f9f9f9;
          }
          .delivery-order {
            border: 2px solid #000;
            max-width: 800px;
            margin: 0 auto 20px auto;
            background: white;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            page-break-inside: avoid;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding: 20px;
            background-color: #f8f9fa;
          }
          .header h1 {
            margin: 0;
            font-size: 20px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .order-info {
            padding: 20px;
            border-bottom: 1px solid #000;
          }
          .order-row {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
          }
          .order-label {
            font-weight: bold;
            min-width: 180px;
            flex-shrink: 0;
          }
          .order-value {
            border-bottom: 1px solid #000;
            flex: 1;
            margin-left: 15px;
            min-height: 25px;
            padding: 2px 5px;
          }
          .client-info {
            padding: 20px;
            border-bottom: 1px solid #000;
          }
          .client-row {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
          }
          .client-label {
            font-weight: bold;
            min-width: 180px;
            flex-shrink: 0;
          }
          .client-value {
            border-bottom: 1px solid #000;
            flex: 1;
            margin-left: 15px;
            min-height: 25px;
            padding: 2px 5px;
          }
          .order-details {
            padding: 20px;
            border-bottom: 1px solid #000;
          }
          .details-header {
            text-align: center;
            font-weight: bold;
            margin-bottom: 15px;
            text-transform: uppercase;
            font-size: 14px;
            letter-spacing: 1px;
          }
          .meal-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
          }
          .meal-table th, .meal-table td {
            border: 1px solid #000;
            padding: 12px 8px;
            text-align: center;
            font-weight: 500;
          }
          .meal-table th {
            background-color: #f8f9fa;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.5px;
          }
          .meal-table td:first-child {
            text-align: left;
            font-weight: bold;
          }
          .signature-section {
            padding: 20px;
          }
          .signature-row {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
          }
          .signature-label {
            font-weight: bold;
            min-width: 250px;
            flex-shrink: 0;
          }
          .signature-line {
            border-bottom: 1px solid #000;
            flex: 1;
            margin-left: 15px;
            min-height: 35px;
          }
          .notes {
            padding: 20px;
            border-top: 1px solid #000;
            background-color: #f8f9fa;
          }
          .notes h4 {
            margin: 0 0 12px 0;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 13px;
            letter-spacing: 0.5px;
          }
          .notes ul {
            margin: 0;
            padding-left: 20px;
          }
          .notes li {
            margin-bottom: 6px;
            line-height: 1.4;
          }
          .summary-info {
            text-align: center;
            margin-bottom: 20px;
            padding: 15px;
            background-color: #e8f4fd;
            border: 1px solid #007bff;
            border-radius: 5px;
          }
          .summary-info h2 {
            margin: 0 0 10px 0;
            color: #007bff;
            font-size: 16px;
          }
          .summary-info p {
            margin: 5px 0;
            font-weight: bold;
          }
          @media print {
            body { 
              margin: 0; 
              background-color: white;
              padding: 0;
            }
            .no-print { display: none; }
            .delivery-order {
              box-shadow: none;
              border: 2px solid #000;
              margin-bottom: 0;
            }
            .summary-info {
              background-color: white;
              border: 1px solid #000;
            }
          }
        </style>
      </head>
      <body>
        <div class="summary-info">
          <h2>Individual Delivery Orders Summary</h2>
          <p>Total Orders: ${deliveryOrders.length}</p>
          <p>Date: ${new Date().toLocaleDateString()}</p>
          <p>Time: ${new Date().toLocaleTimeString()}</p>
        </div>
        
        ${allDeliveryNotes}
        
        <div class="no-print" style="position: fixed; top: 20px; right: 20px; z-index: 1000;">
          <button onclick="window.print()" style="padding: 10px 20px; background: #dc2626; color: white; border: none; border-radius: 5px; cursor: pointer;">
            Print All Delivery Orders
          </button>
          <button onclick="window.close()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px;">
            Close
          </button>
        </div>
      </body>
      </html>
    `;

    // Open single window with all delivery notes
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Auto-print after content loads
    printWindow.onload = function() {
      printWindow.print();
    };

    // Notify parent component that processing has completed
    if (onProcessing) {
      onProcessing(false);
    }
  };

  const handleProcessKitchenOrder = () => {
    // Notify parent component that processing has started
    if (onProcessing) {
      onProcessing(true);
    }

    // Filter orders for Individual, Company, and Agent customers only
    const kitchenOrders = orders.filter(order => 
      ['Individual', 'Company', 'Agent'].includes(order.customerType)
    );

    // Calculate summary data by customer type
    const individualOrders = kitchenOrders.filter(order => order.customerType === 'Individual');
    const companyOrders = kitchenOrders.filter(order => order.customerType === 'Company');
    const agentOrders = kitchenOrders.filter(order => order.customerType === 'Agent');

    const individualBreakfast = individualOrders.reduce((sum, order) => sum + order.breakfast, 0);
    const individualLunch = individualOrders.reduce((sum, order) => sum + order.lunch, 0);
    const individualDinner = individualOrders.reduce((sum, order) => sum + order.dinner, 0);

    const companyBreakfast = companyOrders.reduce((sum, order) => sum + order.breakfast, 0);
    const companyLunch = companyOrders.reduce((sum, order) => sum + order.lunch, 0);
    const companyDinner = companyOrders.reduce((sum, order) => sum + order.dinner, 0);

    const agentBreakfast = agentOrders.reduce((sum, order) => sum + order.breakfast, 0);
    const agentLunch = agentOrders.reduce((sum, order) => sum + order.lunch, 0);
    const agentDinner = agentOrders.reduce((sum, order) => sum + order.dinner, 0);

    // Calculate total veg and non-veg counts for each meal type
    const totalBreakfastVeg = kitchenOrders.reduce((sum, order) => sum + (order.breakfastVeg || 0), 0);
    const totalBreakfastNonVeg = kitchenOrders.reduce((sum, order) => sum + (order.breakfastNonVeg || 0), 0);
    const totalLunchVeg = kitchenOrders.reduce((sum, order) => sum + (order.lunchVeg || 0), 0);
    const totalLunchNonVeg = kitchenOrders.reduce((sum, order) => sum + (order.lunchNonVeg || 0), 0);
    const totalDinnerVeg = kitchenOrders.reduce((sum, order) => sum + (order.dinnerVeg || 0), 0);
    const totalDinnerNonVeg = kitchenOrders.reduce((sum, order) => sum + (order.dinnerNonVeg || 0), 0);

    // Create simplified print window content
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Kitchen Order Summary</title>
        <style>
          @page {
            size: A5;
            margin: 1cm;
          }
          body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            line-height: 1.4;
            margin: 0;
            padding: 0;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
          }
          .header h1 {
            margin: 0;
            font-size: 18px;
            font-weight: bold;
          }
          .header p {
            margin: 5px 0 0 0;
            font-size: 12px;
            color: #666;
          }
          .summary-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          .summary-table th, .summary-table td {
            border: 1px solid #333;
            padding: 8px 12px;
            text-align: center;
            font-size: 11px;
          }
          .summary-table th {
            background-color: #f0f0f0;
            font-weight: bold;
          }
          .customer-type {
            text-align: left;
            font-weight: bold;
            background-color: #e8f4fd;
          }
          .meal-count {
            font-weight: bold;
            font-size: 14px;
          }
          .total-row {
            background-color: #f8f8f8;
            font-weight: bold;
          }
          .summary-cards {
            margin-top: 20px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
          }
          .summary-card {
            border: 2px solid #333;
            border-radius: 8px;
            padding: 12px;
            text-align: center;
            background-color: #f9f9f9;
          }
          .summary-card h3 {
            margin: 0 0 8px 0;
            font-size: 14px;
            font-weight: bold;
            color: #333;
          }
          .total-count {
            font-size: 18px;
            font-weight: bold;
            color: #000;
            margin-bottom: 8px;
          }
          .veg-nonveg {
            display: flex;
            justify-content: space-around;
            font-size: 11px;
          }
          .veg-count {
            color: #2d5a2d;
            font-weight: bold;
          }
          .nonveg-count {
            color: #8b0000;
            font-weight: bold;
          }
          .veg-indicator {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 4px;
          }
          .veg-indicator.veg {
            background-color: #4ade80;
          }
          .veg-indicator.nonveg {
            background-color: #ef4444;
          }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Kitchen Order Summary</h1>
          <p>Date: ${new Date().toLocaleDateString()}</p>
          <p>Time: ${new Date().toLocaleTimeString()}</p>
        </div>
        
        <table class="summary-table">
          <thead>
            <tr>
              <th>Customer Type</th>
              <th>Total Breakfast</th>
              <th>Total Lunch</th>
              <th>Total Dinner</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="customer-type">Individual</td>
              <td class="meal-count">${individualBreakfast}</td>
              <td class="meal-count">${individualLunch}</td>
              <td class="meal-count">${individualDinner}</td>
            </tr>
            <tr>
              <td class="customer-type">Company</td>
              <td class="meal-count">${companyBreakfast}</td>
              <td class="meal-count">${companyLunch}</td>
              <td class="meal-count">${companyDinner}</td>
            </tr>
            <tr>
              <td class="customer-type">Agent</td>
              <td class="meal-count">${agentBreakfast}</td>
              <td class="meal-count">${agentLunch}</td>
              <td class="meal-count">${agentDinner}</td>
            </tr>
            <tr class="total-row">
              <td><strong>TOTAL</strong></td>
              <td class="meal-count">${individualBreakfast + companyBreakfast + agentBreakfast}</td>
              <td class="meal-count">${individualLunch + companyLunch + agentLunch}</td>
              <td class="meal-count">${individualDinner + companyDinner + agentDinner}</td>
            </tr>
          </tbody>
        </table>
        
        <div class="summary-cards">
          <div class="summary-card">
            <h3>Total Breakfast</h3>
            <div class="total-count">${individualBreakfast + companyBreakfast + agentBreakfast}</div>
            <div class="veg-nonveg">
              <div class="veg-count">
                <span class="veg-indicator veg"></span>${totalBreakfastVeg}
              </div>
              <div class="nonveg-count">
                <span class="veg-indicator nonveg"></span>${totalBreakfastNonVeg}
              </div>
            </div>
          </div>
          <div class="summary-card">
            <h3>Total Lunch</h3>
            <div class="total-count">${individualLunch + companyLunch + agentLunch}</div>
            <div class="veg-nonveg">
              <div class="veg-count">
                <span class="veg-indicator veg"></span>${totalLunchVeg}
              </div>
              <div class="nonveg-count">
                <span class="veg-indicator nonveg"></span>${totalLunchNonVeg}
              </div>
            </div>
          </div>
          <div class="summary-card">
            <h3>Total Dinner</h3>
            <div class="total-count">${individualDinner + companyDinner + agentDinner}</div>
            <div class="veg-nonveg">
              <div class="veg-count">
                <span class="veg-indicator veg"></span>${totalDinnerVeg}
              </div>
              <div class="nonveg-count">
                <span class="veg-indicator nonveg"></span>${totalDinnerNonVeg}
              </div>
            </div>
          </div>
        </div>
        
        <div class="no-print" style="position: fixed; top: 20px; right: 20px; z-index: 1000;">
          <button onclick="window.print()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">
            Print Report
          </button>
          <button onclick="window.close()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px;">
            Close
          </button>
        </div>
      </body>
      </html>
    `;

    // Open new window and print
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Auto-print after content loads
    printWindow.onload = function() {
      printWindow.print();
    };
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={handleDeliveryOrder}
        className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all 
                  duration-200 shadow-md hover:shadow-lg font-medium text-sm sm:text-base"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <span>Delivery Order</span>
      </button>
      
      <button
        onClick={handleProcessKitchenOrder}
        className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all 
                  duration-200 shadow-md hover:shadow-lg font-medium text-sm sm:text-base"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Process Kitchen Order</span>
      </button>
    </div>
  );
};

export default KitchenOrderPrint;
