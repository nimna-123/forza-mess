import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import RenewModal from '../components/RenewModal';
import CustomerDetailsModal from '../components/CustomerDetailsModal';
import Switch from '../components/Switch';

const IndividualCustomerList = () => {
  const navigate = useNavigate();
  
  // Sample customer data - in a real app, this would come from an API
  const [customers] = useState([
    {
      id: 1,
      customerId: 'CUST001',
      name: 'John Smith',
      mobile: '+971 50 123 4567',
      address: 'Dubai Marina, Tower 1, Apt 1501, Dubai',
      joinedDate: '2024-01-15',
      price: 'AED 1,099.99',
      paymentMode: 'Card',
      mealsQuantity: 3
    },
    {
      id: 2,
      customerId: 'CUST002',
      name: 'Sarah Johnson',
      mobile: '+971 55 234 5678',
      address: 'Palm Jumeirah, Shoreline Apartments, Dubai',
      joinedDate: '2024-01-20',
      price: 'AED 734.99',
      paymentMode: 'Cash',
      mealsQuantity: 3
    },
    {
      id: 3,
      customerId: 'CUST003',
      name: 'Michael Brown',
      mobile: '+971 52 345 6789',
      address: 'Downtown Dubai, Burj Views, Tower A, Dubai',
      joinedDate: '2024-02-01',
      price: 'AED 1,469.99',
      paymentMode: 'Card',
      mealsQuantity: 3
    },
    {
      id: 4,
      customerId: 'CUST004',
      name: 'Emily Davis',
      mobile: '+971 56 456 7890',
      address: 'Abu Dhabi Corniche, Marina Heights, Abu Dhabi',
      joinedDate: '2024-02-10',
      price: 'AED 919.99',
      paymentMode: 'Card',
      mealsQuantity: 2
    },
    {
      id: 5,
      customerId: 'CUST005',
      name: 'David Wilson',
      mobile: '+971 54 567 8901',
      address: 'Sharjah Al Majaz, Waterfront Tower, Sharjah',
      joinedDate: '2024-02-15',
      price: 'AED 1,287.99',
      paymentMode: 'Cash',
      mealsQuantity: 3
    }
  ]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const [activeCustomers, setActiveCustomers] = useState(new Set(['CUST001', 'CUST003', 'CUST004', 'CUST005']));
  const [expiringCustomers, setExpiringCustomers] = useState(new Set(['CUST003']));
  const [customerStatuses, setCustomerStatuses] = useState({
    'CUST001': true,
    'CUST002': false,
    'CUST003': true,
    'CUST004': true,
    'CUST005': true
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isRenewModalOpen, setIsRenewModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [columnWidths, setColumnWidths] = useState({
    customerId: 120,
    name: 150,
    mobile: 140,
    joinedDate: 120,
    price: 120,
    mealsQuantity: 120,
    actions: 120
  });

  const tableRef = useRef(null);
  const resizingRef = useRef(null);

  const handleRenew = (customer) => {
    setSelectedCustomer(customer);
    setIsRenewModalOpen(true);
  };

  const handleRowClick = (customer) => {
    setSelectedCustomer(customer);
    setIsDetailsModalOpen(true);
  };

  const handleRenewSubmit = (renewData) => {
    console.log('Renewing customer with data:', renewData);
    // Here you would typically make an API call to renew the customer
    alert(`Customer ${renewData.name} has been successfully renewed!`);
    
    // Update the customer status in the local state
    setActiveCustomers(prev => new Set([...prev, selectedCustomer.customerId]));
    setExpiringCustomers(prev => {
      const newSet = new Set(prev);
      newSet.delete(selectedCustomer.customerId);
      return newSet;
    });
  };

  const handleStatusChange = (customerId, newStatus) => {
    setCustomerStatuses(prev => ({
      ...prev,
      [customerId]: newStatus
    }));
    
    // Update active customers set
    if (newStatus) {
      setActiveCustomers(prev => new Set([...prev, customerId]));
    } else {
      setActiveCustomers(prev => {
        const newSet = new Set(prev);
        newSet.delete(customerId);
        return newSet;
      });
    }
    
    console.log(`Customer ${customerId} status changed to: ${newStatus ? 'Active' : 'Inactive'}`);
  };

  const handleAddCustomer = () => {
    navigate('/add-customer');
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.mobile.includes(searchTerm)
  );

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
    const newWidth = Math.max(80, startWidth + deltaX); // Minimum width of 80px
    
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

  return (
    <div className="p-5 sm:p-8 lg:p-10 min-h-screen bg-gray-50">
      {/* Search and Add Customer Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
                     <input
             type="text"
             placeholder="Search customers..."
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

        {/* Add Customer Button */}
        <button
          onClick={handleAddCustomer}
          className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm sm:text-base"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add Customer</span>
        </button>
      </div>

      <div className="bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs sm:text-sm table-fixed min-w-[1000px]" ref={tableRef}>
            <thead className="bg-gradient-to-r from-blue-50 to-indigo-100 text-gray-700">
              <tr>
                <th 
                  className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm uppercase tracking-wider relative select-none"
                  style={{ width: columnWidths.customerId }}
                >
                  Customer ID
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 bg-transparent cursor-col-resize transition-colors duration-200 hover:bg-gray-400 active:bg-gray-600" 
                    onMouseDown={(e) => startResize(e, 'customerId')}
                  ></div>
                </th>
                <th 
                  className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm uppercase tracking-wider relative select-none"
                  style={{ width: columnWidths.name }}
                >
                  Name
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 bg-transparent cursor-col-resize transition-colors duration-200 hover:bg-gray-400 active:bg-gray-600" 
                    onMouseDown={(e) => startResize(e, 'name')}
                  ></div>
                </th>
                                 <th 
                   className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm uppercase tracking-wider relative select-none"
                   style={{ width: columnWidths.mobile }}
                 >
                   Mobile No
                   <div 
                     className="absolute right-0 top-0 bottom-0 w-1 bg-transparent cursor-col-resize transition-colors duration-200 hover:bg-gray-400 active:bg-gray-600" 
                     onMouseDown={(e) => startResize(e, 'mobile')}
                   ></div>
                 </th>
                <th 
                  className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm uppercase tracking-wider relative select-none"
                  style={{ width: columnWidths.joinedDate }}
                >
                  Joined Date
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 bg-transparent cursor-col-resize transition-colors duration-200 hover:bg-gray-400 active:bg-gray-600" 
                    onMouseDown={(e) => startResize(e, 'joinedDate')}
                  ></div>
                </th>
                                 <th 
                   className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm uppercase tracking-wider relative select-none"
                   style={{ width: columnWidths.price }}
                 >
                   Price
                   <div 
                     className="absolute right-0 top-0 bottom-0 w-1 bg-transparent cursor-col-resize transition-colors duration-200 hover:bg-gray-400 active:bg-gray-600" 
                     onMouseDown={(e) => startResize(e, 'price')}
                   ></div>
                 </th>
                <th 
                  className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm uppercase tracking-wider relative select-none"
                  style={{ width: columnWidths.mealsQuantity }}
                >
                  Meals Quantity
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 bg-transparent cursor-col-resize transition-colors duration-200 hover:bg-gray-400 active:bg-gray-600" 
                    onMouseDown={(e) => startResize(e, 'mealsQuantity')}
                  ></div>
                </th>
                <th 
                  className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm uppercase tracking-wider relative select-none"
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
                             {filteredCustomers.map((customer) => (
                 <tr 
                   key={customer.id} 
                   className="border-b border-gray-100 transition-colors duration-200 hover:bg-gray-50 last:border-b-0 cursor-pointer"
                   onClick={() => handleRowClick(customer)}
                 >
                  <td className="p-3 sm:p-4 align-middle font-semibold text-indigo-600 font-mono">
                    {customer.customerId}
                  </td>
                  <td className="p-3 sm:p-4 align-middle font-medium text-gray-800">
                    {customer.name}
                  </td>
                                     <td className="p-3 sm:p-4 align-middle text-gray-600 font-mono">
                     {customer.mobile}
                   </td>
                  <td className="p-3 sm:p-4 align-middle text-gray-600 text-xs">
                    {formatDate(customer.joinedDate)}
                  </td>
                                     <td className="p-3 sm:p-4 align-middle font-semibold text-green-600 text-sm">
                     {customer.price}
                   </td>
                  <td className="p-3 sm:p-4 align-middle text-center">
                    <span className="font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-lg px-3 py-2 inline-block min-w-[40px] shadow-md text-lg">
                      {customer.mealsQuantity}
                    </span>
                  </td>
                                     <td className="p-3 sm:p-4 align-middle text-center">
                     <div className="flex flex-col gap-2 justify-center items-center" onClick={(e) => e.stopPropagation()}>
                       {/* Status Switch */}
                       <Switch
                         checked={customerStatuses[customer.customerId]}
                         onChange={(newStatus) => handleStatusChange(customer.customerId, newStatus)}
                         size="sm"
                       />
                      
                                             {/* Renew Button for All Customers */}
                       <button 
                         className="flex items-center gap-1 px-2 py-1 bg-cyan-500 text-white border-none rounded-md text-xs font-semibold uppercase tracking-wider cursor-pointer transition-all duration-200 hover:bg-cyan-600 hover:-translate-y-0.5 hover:shadow-md justify-center"
                         onClick={(e) => {
                           e.stopPropagation();
                           handleRenew(customer);
                         }}
                         title="Renew Customer"
                       >
                         <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                           <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0-4.42-3.58-8-8-8v3l4-4-4-4v3z" fill="currentColor"/>
                         </svg>
                         <span>Renew</span>
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

             {/* Renew Modal */}
       <RenewModal
         isOpen={isRenewModalOpen}
         onClose={() => setIsRenewModalOpen(false)}
         customer={selectedCustomer}
         onRenew={handleRenewSubmit}
       />

       {/* Customer Details Modal */}
       <CustomerDetailsModal
         isOpen={isDetailsModalOpen}
         onClose={() => setIsDetailsModalOpen(false)}
         customer={selectedCustomer}
       />
     </div>
   );
 };

export default IndividualCustomerList;
