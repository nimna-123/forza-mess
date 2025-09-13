import React, { useState } from 'react';

const KitchenOrderPrint = ({ orders, onProcessing }) => {

  const [processed, setProcessed] = useState(false)
  console.log(processed)
  const handleDeliveryOrder = () => {
   
    if (onProcessing) onProcessing(true);
    
    // Filter orders for Company or Agent only
    const deliveryOrders = orders.filter(order =>
      ['company', 'agent'].includes(order.CustomerType)
    );

    if (deliveryOrders.length === 0) {
      alert('No delivery orders found for Company or Agent customers.');
      if (onProcessing) onProcessing(false);
      return;
    }

    // Generate all delivery notes with improved design
    const allDeliveryNotes = deliveryOrders.map((order, index) => {
      const deliveryOrderNumber = `DEL${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}-${index + 1}`;

      return `
        <div class="delivery-order" style="page-break-after: ${index === deliveryOrders.length - 1 ? 'auto' : 'always'}; min-height: 100vh;">
          <div class="main-container">
            <!-- Header -->
            <div class="header">
              <h1>Catering Delivery Order</h1>
            </div>
            
            <!-- Order Information Section -->
            <div class="section">
              <div class="section-title">Order Info</div>
              <div class="info-grid">
                <div class="info-row">
                  <span class="label">Delivery Order No</span>
                  <span class="colon">:</span>
                  <span class="value">${deliveryOrderNumber}</span>
                </div>
                <div class="info-row">
                  <span class="label">Date</span>
                  <span class="colon">:</span>
                  <span class="value">${order.orderDate || new Date().toLocaleDateString('en-GB')}</span>
                </div>
                <div class="info-row">
                  <span class="label">Delivery Time</span>
                  <span class="colon">:</span>
                  <span class="value">_________________</span>
                </div>
              </div>
            </div>
            
            <!-- Customer Information Section -->
            <div class="section">
              <div class="section-title">Customer Info</div>
              <div class="info-grid">
                <div class="info-row">
                  <span class="label">Client / Company Name</span>
                  <span class="colon">:</span>
                  <span class="value">${order.CustomerName}</span>
                </div>
                <div class="info-row">
                  <span class="label">Contact Number</span>
                  <span class="colon">:</span>
                  <span class="value">${order.CustomerMobile || '_________________'}</span>
                </div>
                <div class="info-row">
                  <span class="label">Customer Type</span>
                  <span class="colon">:</span>
                  <span class="value">${order.CustomerType}</span>
                </div>
              </div>
            </div>
            
            <!-- Order Details Section -->
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
            
            <!-- Signatures Section -->
            <div class="signature-section">
              <div class="signature-row">
                <span class="signature-label">Delivered By (Signature & Name)</span>
                <span class="colon">:</span>
                <span class="signature-line"></span>
              </div>
              <div class="signature-row">
                <span class="signature-label">Received By (Signature and Name, Company Name)</span>
                <span class="colon">:</span>
                <span class="signature-line"></span>
              </div>
            </div>
            
            <!-- Notes Section -->
            <div class="notes-section">
              <div class="notes-title">Notes</div>
              <ul class="notes-list">
                <li>Please Verify Quantity Upon Delivery Time</li>
                <li>Any discrepancy should be reported immediately</li>
                <li>Customer Type: ${order.CustomerType}</li>
                <li>Delivery Date: ${order.deliveryDate || order.OrderDate || new Date().toLocaleDateString('en-GB')}</li>
               
              </ul>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Complete HTML with improved CSS matching the reference image
    const printContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Delivery Orders</title>
        <style>
          @page { 
            size: A4; 
            margin: 15mm; 
          }
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body { 
            font-family: Arial, sans-serif; 
            font-size: 12px; 
            line-height: 1.3; 
            color: #000;
            background-color: #f5f5f5;
          }
          
          .delivery-order {
            background-color: #f5f5f5;
            padding: 0;
            margin: 0;
          }
          
          .main-container {
            max-width: 100%;
            margin: 0;
            padding: 0;
          }
          
          .header {
            text-align: center;
            margin-bottom: 25px;
            background-color: #333;
            color: white;
            padding: 12px;
          }
          
          .header h1 {
            font-size: 18px;
            font-weight: bold;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 1px;
            color:#000;
          }
          
          .section {
            margin-bottom: 20px;
            background-color: transparent;
          }
          
          .section-title {
            font-weight: bold;
            font-size: 13px;
            margin-bottom: 12px;
            color: #000;
            
            padding-bottom: 3px;
          }
          
          .info-grid {
            display: block;
          }
          
          .info-row {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            min-height: 18px;
          }
          
          .label {
            font-weight: 500;
            width: 160px;
            flex-shrink: 0;
            font-size: 12px;
            font-color: #787878 !important;
          }
          
          .colon {
            margin: 0 8px;
            font-weight: normal;
          }
          
          .value {
            flex: 1;
            font-weight: normal;
            border-bottom: 1px dashed #ACACAC;
            min-height: 16px;
            padding-bottom: 1px;
          }
          
          .order-table {
            width: 100%;
            border: 1px solid #000;
            margin: 10px 0;
            background-color: white;
            border-collapse: collapse;
          }
          
          .order-table th {
            background-color: #333;
            color: white;
            padding: 8px 6px;
            text-align: center;
            font-weight: bold;
            font-size: 12px;
            border: 1px solid #333;
          }
          
          .order-table td {
            padding: 8px 6px;
            text-align: center;
            border: 1px solid #333;
            background-color: white;
            font-size: 12px;
          }
          
          .order-table td:first-child {
            text-align: left;
            font-weight: normal;
          }
          
          .signature-section {
            margin: 25px 0;
          }
          
          .signature-row {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
          }
          
          .signature-label {
            width: 280px;
            flex-shrink: 0;
            font-size: 12px;
            font-weight: normal;
          }
          
          .signature-line {
            flex: 1;
            border-bottom: 1px dashed  #ACACAC;
            height: 16px;
            margin-left: 8px;
          }
          
          .notes-section {
            margin-top: 25px;
          }
          
          .notes-title {
            font-weight: bold;
            font-size: 13px;
            margin-bottom: 8px;
            color:  #787878;
          
            padding-bottom: 3px;
          }
          
          .notes-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          
          .notes-list li {
            margin-bottom: 4px;
            font-size: 12px;
            line-height: 1.3;
            position: relative;
            padding-left: 12px;
            color: #787878;
          }
          
          .notes-list li:before {
            content: "•";
            position: absolute;
            left: 0;
            font-weight: bold;
          }
          
          @media print {
            body { 
              background-color: white;
              margin: 0;
              padding: 0;
            }
            
            .delivery-order {
              background-color: white;
            }
            
            .no-print { 
              display: none; 
            }
          }
        </style>
      </head>
      <body>
        ${allDeliveryNotes}
        
        <div class="no-print" style="position: fixed; top: 20px; right: 20px; z-index: 1000; background: white; padding: 10px; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <button onclick="window.print()" style="padding: 8px 16px; background: #dc2626; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 8px; font-size: 12px;">
            Print
          </button>
          <button onclick="window.close()" style="padding: 8px 16px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
            Close
          </button>
        </div>
      </body>
    </html>
    `;

    // Open print window
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.onload = () => printWindow.print();

    if (onProcessing) onProcessing(false);
  };

  const handleProcessKitchenOrder = () => {
    console.log(orders);
    setProcessed(true);
    if (onProcessing) {
      onProcessing(true);
    }

    // Filter orders for Individual, Company, and Agent customers only
    const kitchenOrders = orders.filter(order =>
      ['Individual', 'company', 'agent'].includes(order.CustomerType)
    );

    // Calculate summary data by customer type
    const individualOrders = kitchenOrders.filter(order => order.CustomerType === 'Individual');
    const companyOrders = kitchenOrders.filter(order => order.CustomerType === 'company');
    const agentOrders = kitchenOrders.filter(order => order.CustomerType === 'agent');

    const individualBreakfast = individualOrders.reduce((sum, order) => sum + parseInt(order.breakfastTotal || 0), 0);
    const individualLunch = individualOrders.reduce((sum, order) => sum + parseInt(order.lunchTotal || 0), 0);
    const individualDinner = individualOrders.reduce((sum, order) => sum + parseInt(order.dinnerTotal || 0), 0);

    const companyBreakfast = companyOrders.reduce((sum, order) => sum + parseInt(order.breakfastTotal || 0), 0);
    const companyLunch = companyOrders.reduce((sum, order) => sum + parseInt(order.lunchTotal || 0), 0);
    const companyDinner = companyOrders.reduce((sum, order) => sum + parseInt(order.dinnerTotal || 0), 0);

    const agentBreakfast = agentOrders.reduce((sum, order) => sum + parseInt(order.breakfastTotal || 0), 0);
    const agentLunch = agentOrders.reduce((sum, order) => sum + parseInt(order.lunchTotal || 0), 0);
    const agentDinner = agentOrders.reduce((sum, order) => sum + parseInt(order.dinnerTotal || 0), 0);

    // Calculate total veg and non-veg counts for each meal type
    const totalBreakfastVeg = kitchenOrders.reduce((sum, order) => sum + parseInt(order.breakfastVeg || 0), 0);
    const totalBreakfastNonVeg = kitchenOrders.reduce((sum, order) => sum + parseInt(order.breakfastNonVeg || 0), 0);
    const totalLunchVeg = kitchenOrders.reduce((sum, order) => sum + parseInt(order.lunchVeg || 0), 0);
    const totalLunchNonVeg = kitchenOrders.reduce((sum, order) => sum + parseInt(order.lunchNonVeg || 0), 0);
    const totalDinnerVeg = kitchenOrders.reduce((sum, order) => sum + parseInt(order.dinnerVeg || 0), 0);
    const totalDinnerNonVeg = kitchenOrders.reduce((sum, order) => sum + parseInt(order.dinnerNonVeg || 0), 0);

    // Calculate totals
    const totalBreakfast = individualBreakfast + companyBreakfast + agentBreakfast;
    const totalLunch = individualLunch + companyLunch + agentLunch;
    const totalDinner = individualDinner + companyDinner + agentDinner;

    // Create print window content matching the reference image
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Kitchen Order Summary</title>
        <style>
          @page {
            size: A5;
            margin: 0.8cm;
          }
          body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            line-height: 1.4;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: #f5f5f5;
          }
          .title-box {
            background-color: white;
            border-radius: 10px;
            padding: 15px 20px;
            text-align: center;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .title-box h1 {
            margin: 0;
            font-size: 20px;
            font-weight: bold;
            color: #333;
          }
          .date-time {
            text-align: right;
            margin-bottom: 20px;
            font-size: 14px;
            color: #666;
            display: flex;
            justify-content: flex-end;
            gap: 20px;
          }
          .order-details-heading {
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #333;
          }
          .order-table {
            width: 100%;
            border: 2px solid #000;
            background-color: white;
            border-radius: 8px;
            overflow: hidden;
            margin-bottom: 30px;
            border-collapse: collapse;
            outline: 1px solid #000;
            outline-offset: 1px;
          }
          .order-table th {
            background-color: #4a5568 !important;
            color: white !important;
            padding: 12px 8px;
            text-align: center;
            font-weight: bold;
            font-size: 14px;
            border: 1px solid #000;
          }
          .order-table td {
            padding: 12px 8px;
            text-align: center;
            border: 1px solid #000;
            background-color: white;
          }
          .order-table tr:last-child td {
            border: 1px solid #000;
            font-weight: bold;
            background-color: #f8f9fa;
          }
          .customer-type {
            text-align: left;
            font-weight: bold;
          }
          .summary-cards {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin-top: 20px;
          }
          .summary-card {
            background-color: white;
            border: 1px dotted #e2e8f0;
            border-radius: 6px;
            padding: 12px;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .summary-card h3 {
            margin: 0 0 10px 0;
            font-size: 14px;
            font-weight: bold;
            color: #333;
          }
          .total-count {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
          }
          .veg-nonveg {
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
          .veg-count, .nonveg-count {
            display: flex;
            align-items: center;
            font-size: 12px;
            font-weight: bold;
            padding: 3px 6px;
            border: 1px dotted #e2e8f0;
            border-radius: 3px;
            background-color: #f8f9fa;
          }
          .veg-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 5px;
          }
          .veg-dot.red {
            background-color: #ef4444;
          }
          .veg-dot.green {
            background-color: #10b981;
          }
          @media print {
            body { 
              margin: 0; 
              background-color: white;
              padding: 10px;
            }
            .no-print { display: none; }
            .container {
              background-color: white;
            }
            .title-box, .summary-card {
              box-shadow: none;
              border: 1px solid #ccc;
            }
            .order-table {
              box-shadow: none;
              border: 1px solid #000;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="title-box">
            <h1>Kitchen Order Summary</h1>
          </div>
          
          <div class="date-time">
            <span>${new Date().toLocaleDateString('en-GB')}</span>
            <span>${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
          </div>
          
          <div class="order-details-heading">Order Details</div>
          
          <table class="order-table">
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
                <td>${individualBreakfast}</td>
                <td>${individualLunch}</td>
                <td>${individualDinner}</td>
              </tr>
              <tr>
                <td class="customer-type">Company</td>
                <td>${companyBreakfast}</td>
                <td>${companyLunch}</td>
                <td>${companyDinner}</td>
              </tr>
              <tr>
                <td class="customer-type">Agent</td>
                <td>${agentBreakfast}</td>
                <td>${agentLunch}</td>
                <td>${agentDinner}</td>
              </tr>
              <tr>
                <td class="customer-type"><strong>Total</strong></td>
                <td><strong>${totalBreakfast}</strong></td>
                <td><strong>${totalLunch}</strong></td>
                <td><strong>${totalDinner}</strong></td>
              </tr>
            </tbody>
          </table>
          
          <div class="summary-cards">
            <div class="summary-card">
              <h3>Total Breakfast</h3>
              <div class="total-count">${totalBreakfast}</div>
              <div class="veg-nonveg">
                <div class="nonveg-count">
                  <span class="veg-dot red"></span>Non Veg ${totalBreakfastNonVeg}
                </div>
                <div class="veg-count">
                  <span class="veg-dot green"></span>Veg ${totalBreakfastVeg}
                </div>
              </div>
            </div>
            <div class="summary-card">
              <h3>Total Lunch</h3>
              <div class="total-count">${totalLunch}</div>
              <div class="veg-nonveg">
                <div class="nonveg-count">
                  <span class="veg-dot red"></span>Non Veg ${totalLunchNonVeg}
                </div>
                <div class="veg-count">
                  <span class="veg-dot green"></span>Veg ${totalLunchVeg}
                </div>
              </div>
            </div>
            <div class="summary-card">
              <h3>Total Dinner</h3>
              <div class="total-count">${totalDinner}</div>
              <div class="veg-nonveg">
                <div class="nonveg-count">
                  <span class="veg-dot red"></span>Non Veg ${totalDinnerNonVeg}
                </div>
                <div class="veg-count">
                  <span class="veg-dot green"></span>Veg ${totalDinnerVeg}
                </div>
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
    const printWindow = window.open('', '_blank', 'width=900,height=700');
    printWindow.document.write(printContent);
    printWindow.document.close();

    // Auto-print after content loads
    printWindow.onload = function () {
      printWindow.print();
    };

    // Notify parent component that processing has completed
    if (onProcessing) {
      onProcessing(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={handleDeliveryOrder}
        disabled={!processed}   // 👈 disable when processed is false
        className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 
    bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg 
    transition-all duration-200 shadow-md font-medium text-sm sm:text-base
    ${!processed
            ? "opacity-50 cursor-not-allowed"  // disabled look
            : "hover:from-red-600 hover:to-red-700 hover:shadow-lg"}`
        }
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