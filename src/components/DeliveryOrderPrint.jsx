// import React from 'react';

// const DeliveryOrderPrint = ({ orders, onProcessing }) => {
//   const handlePrintDeliveryOrder = () => {
//     if (onProcessing) onProcessing(true);

//     // Filter orders for Company and Agent customers only
//     const deliveryOrders = orders.filter(order =>
//       ['Company', 'Agent'].includes(order.customerType)
//     );

//     if (deliveryOrders.length === 0) {
//       alert('No delivery orders found for Company or Agent customers.');
//       if (onProcessing) onProcessing(false);
//       return;
//     }

//     // Generate all delivery orders content
//     const allDeliveryOrders = deliveryOrders.map((order, index) => {
//       const deliveryOrderNumber = `DEL${new Date().getFullYear()}${String(
//         new Date().getMonth() + 1
//       ).padStart(2, '0')}${String(new Date().getDate()).padStart(
//         2,
//         '0'
//       )}-${order.id || index + 1}`;

//       return `
//         <div class="delivery-order">
//           <!-- Header -->
//           <div class="header-title">Catering Delivery Order</div>
          
//           <!-- Order Info -->
//           <div class="section">
//             <div class="section-title">Order Info</div>
//             <div class="field-row">
//               <span class="field-label">Delivery Order No :</span>
//               <span class="field-line">${deliveryOrderNumber}</span>
//             </div>
//             <div class="field-row">
//               <span class="field-label">Date :</span>
//               <span class="field-line">${new Date().toLocaleDateString()}</span>
//             </div>
//             <div class="field-row">
//               <span class="field-label">Delivery Time :</span>
//               <span class="field-line">${order.deliveryTime || 'To be confirmed'}</span>
//             </div>
//           </div>
          
//           <!-- Customer Info -->
//           <div class="section">
//             <div class="section-title">Customer Info</div>
//             <div class="field-row">
//               <span class="field-label">Client / Company Name :</span>
//               <span class="field-line">${order.customerName || 'N/A'}</span>
//             </div>
//             <div class="field-row">
//               <span class="field-label">Contact Number :</span>
//               <span class="field-line">${order.customerMobile || 'N/A'}</span>
//             </div>
//             <div class="field-row">
//               <span class="field-label">Customer Type :</span>
//               <span class="field-line">${order.customerType}</span>
//             </div>
//           </div>
          
//           <!-- Order Details -->
//           <div class="section">
//             <div class="section-title">Order Details</div>
//             <table class="order-table">
//               <thead>
//                 <tr>
//                   <th>Meal Type</th>
//                   <th>Quantity</th>
//                   <th>Veg</th>
//                   <th>Non Veg</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>Breakfast</td>
//                   <td>${order.breakfast || 0}</td>
//                   <td>${order.breakfastVeg || 0}</td>
//                   <td>${order.breakfastNonVeg || 0}</td>
//                 </tr>
//                 <tr>
//                   <td>Lunch</td>
//                   <td>${order.lunch || 0}</td>
//                   <td>${order.lunchVeg || 0}</td>
//                   <td>${order.lunchNonVeg || 0}</td>
//                 </tr>
//                 <tr>
//                   <td>Dinner</td>
//                   <td>${order.dinner || 0}</td>
//                   <td>${order.dinnerVeg || 0}</td>
//                   <td>${order.dinnerNonVeg || 0}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
          
//           <!-- Signatures -->
//           <div class="section">
//             <div class="signature-row">
//               <span class="signature-label">Delivered By (Signature & Name) :</span>
//               <span class="signature-line"></span>
//             </div>
//             <div class="signature-row">
//               <span class="signature-label">Received By (Signature and Name, Company Name) :</span>
//               <span class="signature-line"></span>
//             </div>
//           </div>
          
//           <!-- Notes -->
//           <div class="section">
//             <div class="section-title">Notes</div>
//             <div class="notes-content">
//               <div class="note-item">Please Verify Quantity Upon Delivery Time</div>
//               <div class="note-item">Ensure All Items Are Accounted For</div>
//               <div class="note-item">Contact : ${order.customerMobile || 'N/A'}</div>
//               <div class="note-item">Customer Type : ${order.customerType}</div>
//             </div>
//           </div>
//         </div>
//       `;
//     }).join('');

//     // Print Page Content
//     const printContent = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <title>Delivery Orders</title>
//         <style>
//           @page {
//             size: A4;
//             margin: 1cm;
//           }
//           body {
//             font-family: Arial, sans-serif;
//             font-size: 10px;
//             line-height: 1.4;
//             margin: 0;
//             padding: 0;
//             background-color: #2d3748;
//           }
//           .delivery-order {
//             background: white;
//             width: 21cm;
//             min-height: 29.7cm;
//             margin: 0 auto 20px;
//             padding: 1cm;
//             border-radius: 8px;
//             box-sizing: border-box;
//             page-break-after: always;
//             border: 1px solid #ddd;
//           }
//           .header-title {
//             text-align: center;
//             background: #f7f7f7;
//             border: 1px solid #ccc;
//             border-radius: 8px;
//             padding: 6px;
//             font-weight: bold;
//             font-size: 12px;
//             margin-bottom: 15px;
//           }
//           .section-title {
//             font-weight: bold;
//             font-size: 11px;
//             margin: 12px 0 6px;
//           }
//           .field-row {
//             display: flex;
//             margin-bottom: 6px;
//           }
//           .field-label {
//             font-weight: bold;
//             width: 140px;
//             font-size: 9px;
//           }
//           .field-line {
//             flex: 1;
//             border-bottom: 1px dotted #999;
//             font-size: 9px;
//             margin-left: 6px;
//             color: #333;
//           }
//           .order-table {
//             width: 100%;
//             border-collapse: collapse;
//             margin: 8px 0;
//           }
//           .order-table th {
//             background: #444;
//             color: white;
//             padding: 5px;
//             font-size: 9px;
//             border: 1px solid #444;
//           }
//           .order-table td {
//             border: 1px solid #ccc;
//             padding: 5px;
//             text-align: center;
//             font-size: 9px;
//           }
//           .order-table td:first-child {
//             text-align: left;
//             font-weight: bold;
//           }
//           .signature-row {
//             display: flex;
//             margin: 10px 0;
//           }
//           .signature-label {
//             font-weight: bold;
//             font-size: 9px;
//             min-width: 200px;
//           }
//           .signature-line {
//             flex: 1;
//             border-bottom: 1px dotted #999;
//             margin-left: 5px;
//           }
//           .notes-content {
//             margin-top: 5px;
//           }
//           .note-item {
//             font-size: 9px;
//             margin-bottom: 3px;
//           }
//           @media print {
//             body {
//               background: white;
//             }
//             .no-print { display: none; }
//           }
//         </style>
//       </head>
//       <body>
//         <div class="summary-info no-print" style="text-align:center; margin-bottom:20px; color:white;">
//           <h2>Delivery Orders Summary</h2>
//           <p>Total Orders: ${deliveryOrders.length}</p>
//           <p>Date: ${new Date().toLocaleDateString()}</p>
//           <p>Time: ${new Date().toLocaleTimeString()}</p>
//         </div>
//         ${allDeliveryOrders}
//         <div class="no-print" style="position:fixed; top:20px; right:20px; z-index:1000;">
//           <button onclick="window.print()" style="padding:10px 20px; background:#444; color:white; border:none; border-radius:5px; cursor:pointer;">
//             Print All Delivery Orders
//           </button>
//           <button onclick="window.close()" style="padding:10px 20px; background:#777; color:white; border:none; border-radius:5px; cursor:pointer; margin-left:10px;">
//             Close
//           </button>
//         </div>
//       </body>
//       </html>
//     `;

//     const printWindow = window.open('', '_blank', 'width=900,height=700');
//     if (!printWindow) {
//       alert("Please allow pop-ups for printing.");
//       if (onProcessing) onProcessing(false);
//       return;
//     }

//     printWindow.document.write(printContent);
//     printWindow.document.close();

//     if (onProcessing) onProcessing(false);
//   };

//   return (
//     <div className="flex flex-col sm:flex-row gap-3">
//       <button
//         onClick={handlePrintDeliveryOrder}
//         className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm sm:text-base"
//       >
//         <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//         </svg>
//         <span>Print Delivery Order</span>
//       </button>






















//     </div>
//   );
// };

// export default DeliveryOrderPrint;
