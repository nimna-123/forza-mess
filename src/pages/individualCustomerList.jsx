import React, { useState, useRef,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RenewModal from '../components/RenewModal';
import CustomerDetailsModal from '../components/CustomerDetailsModal';
import EditCustomerModal from '../components/EditCustomerModal';
import Switch from '../components/Switch';
import { GET_CUSTOMERS, UPDATE_CUSTOMERS, CUSTOMER_UPDATE_STATUS } from '../Api/service';
import Toast from '../components/Toast';

const IndividualCustomerList = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await GET_CUSTOMERS("individual");
        const customerList = response.data;
        console.log('====================================');
        console.log(customerList);
        console.log('====================================');
        setCustomers(customerList || []);
        
        // Initialize customerStatuses based on fetched data
        if (customerList && customerList.length > 0) {
          const initialStatuses = {};
          const initialActiveCustomers = new Set();
          
          customerList.forEach(customer => {
            // Use isActive if available, otherwise default to true
            const isActive = customer.isActive !== undefined ? customer.isActive : true;
            initialStatuses[customer.id] = isActive;
            
            if (isActive) {
              initialActiveCustomers.add(customer.id);
            }
          });
          
          setCustomerStatuses(initialStatuses);
          setActiveCustomers(initialActiveCustomers);
        }
      } catch (err) {
        console.error("Error fetching customers:", err);
        
        // Handle specific API errors
        let errorMessage = "Failed to fetch customers. Please try again later.";
        setError(errorMessage);
        setCustomers([]); // fallback
      } finally {
        setLoading(false);
      }
    };
  
    fetchCustomers();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const [activeCustomers, setActiveCustomers] = useState(new Set());
  const [expiringCustomers, setExpiringCustomers] = useState(new Set());
  const [customerStatuses, setCustomerStatuses] = useState({});
  const [updatingStatuses, setUpdatingStatuses] = useState(new Set());
  const [renewingCustomers, setRenewingCustomers] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [isRenewModalOpen, setIsRenewModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [columnWidths, setColumnWidths] = useState({
    serialNo: 80,
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

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setIsEditModalOpen(true);
  };

  const handleSaveCustomer = async (updatedCustomer) => {
    const transformedCustomer = {
      ...updatedCustomer,
      meals:JSON.parse(updatedCustomer.meals)
      
    };
    try {
      const response = await UPDATE_CUSTOMERS(
        transformedCustomer,     
        "individual",          
        updatedCustomer.id  
      );
      if(response.success === true){
        showToast("Customer updated successfully!", "success");
        // Refresh the customer list
        const fetchCustomers = async () => {
          try {
            setLoading(true);
            setError(null);
            const response = await GET_CUSTOMERS("individual");
            const customerList = response.data;
            setCustomers(customerList || []);
            
            // Initialize customerStatuses based on fetched data
            if (customerList && customerList.length > 0) {
              const initialStatuses = {};
              const initialActiveCustomers = new Set();
              
              customerList.forEach(customer => {
                const isActive = customer.isActive !== undefined ? customer.isActive : true;
                initialStatuses[customer.id] = isActive;
                
                if (isActive) {
                  initialActiveCustomers.add(customer.id);
                }
              });
              
              setCustomerStatuses(initialStatuses);
              setActiveCustomers(initialActiveCustomers);
            }
          } catch (err) {
            console.error("Error fetching customers:", err);
            let errorMessage = "Failed to fetch customers. Please try again later.";
            setError(errorMessage);
            setCustomers([]);
          } finally {
            setLoading(false);
          }
        };
        fetchCustomers();
      }
    } catch (error) {
      console.error("Failed to update customer:", error);
      showToast("Failed to update customer. Please try again.", "error");
    }
  };

  const handleRenewSubmit = async (renewData) => {
    setRenewingCustomers(prev => new Set([...prev, selectedCustomer.id]));
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Renewing customer with data:', renewData);
      // Here you would typically make an API call to renew the customer
      alert(`Customer ${renewData.name} has been successfully renewed!`);
      
      // Update the customer status in the local state
      setActiveCustomers(prev => new Set([...prev, selectedCustomer.id]));
      setExpiringCustomers(prev => {
        const newSet = new Set(prev);
        newSet.delete(selectedCustomer.id);
        return newSet;
      });
      
      // Close the modal
      setIsRenewModalOpen(false);
    } catch (error) {
      console.error('Error renewing customer:', error);
      alert('Failed to renew customer. Please try again.');
    } finally {
      setRenewingCustomers(prev => {
        const newSet = new Set(prev);
        newSet.delete(selectedCustomer.id);
        return newSet;
      });
    }
  };

  const handleStatusChange = async (customerId, newStatus) => {
    setUpdatingStatuses(prev => new Set([...prev, customerId]));
    
    try {
      // Convert boolean to Active/Inactive string for API call
      const statusString = newStatus ? 'Active' : 'Inactive';
      
      // Call the actual API service to update customer status
      const response = await CUSTOMER_UPDATE_STATUS(statusString, customerId);
      
      if (response.success === true) {
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
        
        showToast(`Customer status updated to ${statusString}`, 'success');
        console.log(`Customer ${customerId} status changed to: ${statusString}`);
      } else {
        throw new Error(response.message || 'Failed to update customer status');
      }
    } catch (error) {
      console.error('Error updating customer status:', error);
      showToast('Failed to update customer status. Please try again.', 'error');
      // Revert the change on error
      setCustomerStatuses(prev => ({
        ...prev,
        [customerId]: !newStatus
      }));
    } finally {
      setUpdatingStatuses(prev => {
        const newSet = new Set(prev);
        newSet.delete(customerId);
        return newSet;
      });
    }
  };

  const handleAddCustomer = () => {
    // Show loading state briefly before navigation
    const button = document.querySelector('[data-add-customer-btn]');
    if (button) {
      button.disabled = true;
      button.innerHTML = `
        <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        <span>Loading...</span>
      `;
      
      setTimeout(() => {
        navigate('/add-customer');
      }, 300);
    } else {
      navigate('/add-customer');
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.trim()) {
      setSearchLoading(true);
      // Simulate search delay for better UX
      setTimeout(() => {
        setSearchLoading(false);
      }, 300);
    } else {
      setSearchLoading(false);
    }
  };

  const filteredCustomers = customers?.filter(customer =>
    customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    
    customer?.mobile.includes(searchTerm)
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
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
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
             onChange={(e) => handleSearch(e.target.value)}
             className="block w-full pl-12 pr-12 py-2 sm:py-2.5 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm sm:text-base bg-white shadow-lg hover:shadow-xl transition-all duration-200"
           />
           {searchLoading && (
             <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
               <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-500"></div>
             </div>
           )}
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
          data-add-customer-btn
          className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm sm:text-base"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add Customer</span>
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading customers...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-8 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Error Loading Customers</h3>
            <p className="text-gray-600 max-w-md">{error}</p>
            <button
              onClick={() => {
                setError(null);
                // Retry fetching
                const fetchCustomers = async () => {
                  try {
                    setLoading(true);
                    setError(null);
                    const response = await GET_CUSTOMERS("individual");
                    const customerList = response.data;
                    setCustomers(customerList || []);
                    
                    // Initialize customerStatuses based on fetched data
                    if (customerList && customerList.length > 0) {
                      const initialStatuses = {};
                      const initialActiveCustomers = new Set();
                      
                      customerList.forEach(customer => {
                        const isActive = customer.isActive !== undefined ? customer.isActive : true;
                        initialStatuses[customer.id] = isActive;
                        
                        if (isActive) {
                          initialActiveCustomers.add(customer.id);
                        }
                      });
                      
                      setCustomerStatuses(initialStatuses);
                      setActiveCustomers(initialActiveCustomers);
                    }
                  } catch (err) {
                    console.error("Error fetching customers:", err);
                    
                    // Handle specific API errors
                    let errorMessage = "Failed to fetch customers. Please try again later.";
                    setError(errorMessage);
                    setCustomers([]);
                  } finally {
                    setLoading(false);
                  }
                };
                fetchCustomers();
              }}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200 font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Table Content - Only show when not loading and no error */}
      {!loading && !error && customers.length > 0 && (
        <>
          {/* Search Results Info */}
          {searchTerm && (
            <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-blue-800 font-medium">
                    Search results for "{searchTerm}"
                  </span>
                  {searchLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-500"></div>
                      <span className="text-blue-600 text-sm">Searching...</span>
                    </div>
                  ) : (
                    <span className="text-blue-600 text-sm">
                      ({filteredCustomers.length} {filteredCustomers.length === 1 ? 'customer' : 'customers'} found)
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Clear search
                </button>
              </div>
            </div>
          )}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs sm:text-sm table-fixed min-w-[1000px]" ref={tableRef}>
            <thead className="bg-gradient-to-r from-blue-50 to-indigo-100 text-gray-700">
              <tr>
                <th 
                  className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm uppercase tracking-wider relative select-none"
                  style={{ width: columnWidths.serialNo }}
                >
                  S.No
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 bg-transparent cursor-col-resize transition-colors duration-200 hover:bg-gray-400 active:bg-gray-600" 
                    onMouseDown={(e) => startResize(e, 'serialNo')}
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
              {customers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500">
                    <div className="flex flex-col items-center space-y-3">
                      <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900">
                        {loading ? 'Loading customers...' : 'No customers found'}
                      </h3>
                      <p className="text-gray-500">
                        {loading ? 'Please wait while we fetch your customer data' : 'Get started by adding your first customer'}
                      </p>
                      {!loading && (
                        <button
                          onClick={handleAddCustomer}
                          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200 font-medium"
                        >
                          Add Customer
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCustomers?.map((customer, index) => (
                 <tr 
                   key={customer.id} 
                   className="border-b border-gray-100 transition-colors duration-200 hover:bg-gray-50 last:border-b-0 cursor-pointer"
                   onClick={() => handleRowClick(customer)}
                 >
                  <td className="p-3 sm:p-4 align-middle font-semibold text-gray-600 text-center">
                    {index + 1}
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
  {(() => {
    let mealString = "";
    try {
      const meals = JSON.parse(customer.meals); // parse the JSON string
      const selectedMeals = [];
      if (meals.Breakfast) selectedMeals.push("B");
      if (meals.Lunch) selectedMeals.push("L");
      if (meals.Dinner) selectedMeals.push("D");
      mealString = selectedMeals.join(", ");
    } catch (e) {
      console.error("Invalid meals format:", customer.meals);
      mealString = "-"; // fallback
    }

    return (
      <span className="font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-lg px-3 py-2 inline-block min-w-[40px] shadow-md text-lg">
        {mealString}
      </span>
    );
  })()}
</td>
                                     <td className="p-3 sm:p-4 align-middle text-center">
                     <div className="flex flex-col gap-2 justify-center items-center" onClick={(e) => e.stopPropagation()}>
                       {/* Edit Button */}
                       <button
                         onClick={() => handleEdit(customer)}
                         className="p-1.5 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                         title="Edit Customer"
                       >
                         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                         </svg>
                       </button>

                       {/* Status Switch */}
                       <div className="relative">
                         <Switch
                           checked={customerStatuses[customer.id] || customer.isActive}
                           onChange={(newStatus) => handleStatusChange(customer.id, newStatus)}
                           size="sm"
                           disabled={updatingStatuses.has(customer.id)}
                         />
                         {updatingStatuses.has(customer.id) && (
                           <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded">
                             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-500"></div>
                           </div>
                         )}
                       </div>
                      
                       {/* Renew Button for All Customers */}
                       <button 
                         className={`flex items-center gap-1 px-2 py-1 border-none rounded-md text-xs font-semibold uppercase tracking-wider cursor-pointer transition-all duration-200 justify-center ${
                           renewingCustomers.has(customer.id)
                             ? 'bg-gray-400 cursor-not-allowed'
                             : 'bg-cyan-500 text-white hover:bg-cyan-600 hover:-translate-y-0.5 hover:shadow-md'
                         }`}
                         onClick={(e) => {
                           e.stopPropagation();
                           if (!renewingCustomers.has(customer.id)) {
                             handleRenew(customer);
                           }
                         }}
                         title="Renew Customer"
                         disabled={renewingCustomers.has(customer.id)}
                       >
                         {renewingCustomers.has(customer.id) ? (
                           <>
                             <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                             <span>Renewing...</span>
                           </>
                         ) : (
                           <>
                             <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                               <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0-4.42-3.58-8-8-8v3l4-4-4-4v3z" fill="currentColor"/>
                             </svg>
                             <span>Renew</span>
                           </>
                         )}
                       </button>
                    </div>
                  </td>
                </tr>
              ))
              )}
            </tbody>
          </table>
        </div>
      </div>
        </>
      )}

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

       {/* Edit Customer Modal */}
       <EditCustomerModal
         isOpen={isEditModalOpen}
         onClose={() => setIsEditModalOpen(false)}
         customer={selectedCustomer}
         onSave={handleSaveCustomer}
       />
     </div>
   );
 };

export default IndividualCustomerList;
