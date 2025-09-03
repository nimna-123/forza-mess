import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Switch from '../components/Switch';
import CompanyDetailsModal from '../components/CompanyDetailsModal';
import EditCompanyModal from '../components/EditCompanyModal';

const CompanyList = () => {
  const navigate = useNavigate();
  // Sample company data - in a real app, this would come from an API
  const [companies] = useState([
    {
      id: 1,
      companyId: 'CMP001',
      name: 'Tech Solutions Ltd',
      contactPerson: 'Ahmed Hassan',
      mobile: '+971 50 111 2222',
      address: 'Dubai Internet City, Building 3, Floor 5, Dubai',
      registeredDate: '2023-06-15',
      tradeLicense: 'TL-2023-001234',
      taxNumber: 'TRN-123456789',
      breakfastPrice: 'AED 25',
      lunchPrice: 'AED 45',
      dinnerPrice: 'AED 55',
      creditLimit: 'AED 50,000',
      creditDays: 30,
      status: 'Active',
     
    },
    {
      id: 2,
      companyId: 'CMP002',
      name: 'Global Trading Co',
      contactPerson: 'Fatima Al Mansouri',
      mobile: '+971 55 222 3333',
      address: 'Abu Dhabi Business District, Tower A, Abu Dhabi',
      registeredDate: '2023-08-20',
      tradeLicense: 'TL-2023-005678',
      taxNumber: 'TRN-987654321',
      breakfastPrice: 'AED 30',
      lunchPrice: 'AED 50',
      dinnerPrice: 'AED 60',
      creditLimit: 'AED 75,000',
      creditDays: 45,
      status: 'Active',
      
    },
    {
      id: 3,
      companyId: 'CMP003',
      name: 'Innovation Systems',
      contactPerson: 'Omar Khalil',
      mobile: '+971 52 333 4444',
      address: 'Sharjah Technology Park, Block B, Sharjah',
      registeredDate: '2023-09-10',
      tradeLicense: 'TL-2023-009876',
      taxNumber: 'TRN-456789123',
      breakfastPrice: 'AED 20',
      lunchPrice: 'AED 40',
      dinnerPrice: 'AED 50',
      creditLimit: 'AED 25,000',
      creditDays: 15,
      status: 'Inactive',
      
    },
    {
      id: 4,
      companyId: 'CMP004',
      name: 'Digital Dynamics',
      contactPerson: 'Aisha Rahman',
      mobile: '+971 56 444 5555',
      address: 'Dubai Silicon Oasis, Building A, Dubai',
      registeredDate: '2023-11-05',
      tradeLicense: 'TL-2023-012345',
      taxNumber: 'TRN-789123456',
      breakfastPrice: 'AED 28',
      lunchPrice: 'AED 48',
      dinnerPrice: 'AED 58',
      creditLimit: 'AED 60,000',
      creditDays: 30,
      status: 'Active',
      
    },
    {
      id: 5,
      companyId: 'CMP005',
      name: 'Future Technologies',
      contactPerson: 'Youssef Ibrahim',
      mobile: '+971 54 555 6666',
      address: 'Ajman Free Zone, Technology Hub, Ajman',
      registeredDate: '2024-01-12',
      tradeLicense: 'TL-2024-001111',
      taxNumber: 'TRN-111222333',
      breakfastPrice: 'AED 22',
      lunchPrice: 'AED 42',
      dinnerPrice: 'AED 52',
      creditLimit: 'AED 35,000',
      creditDays: 20,
      status: 'Active',
      
    }
  ]);



  const [columnWidths, setColumnWidths] = useState({
    companyId: 140,
    name: 250,
    contactPerson: 200,
    mobile: 160,
    actions: 120
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [companyStatuses, setCompanyStatuses] = useState({
    'CMP001': true,
    'CMP002': true,
    'CMP003': false,
    'CMP004': true,
    'CMP005': true
  });
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const tableRef = useRef(null);
  const resizingRef = useRef(null);

  const handleEdit = (company) => {
    setSelectedCompany(company);
    setIsEditModalOpen(true);
  };

  const handleSaveCompany = async (updatedCompany) => {
    // In a real app, this would be an API call
    console.log('Updated company data:', updatedCompany);
    
    // Update the companies array with the new data
    const updatedCompanies = companies.map(company => 
      company.id === updatedCompany.id ? updatedCompany : company
    );
    
    // For demo purposes, we'll just log the update
    // In a real app, you would update your state or make an API call
    console.log('Company updated successfully:', updatedCompany.name);
    
    // You could also show a success message here
    alert(`Company "${updatedCompany.name}" updated successfully!`);
  };

  const handleAddCompany = () => {
    navigate('/add-company');
  };

  const handleAddOrders = () => {
    navigate('/add-order');
  };

  const handleRowClick = (company) => {
    setSelectedCompany(company);
    setIsDetailsModalOpen(true);
  };

  const handleStatusChange = (companyId, newStatus) => {
    setCompanyStatuses(prev => ({
      ...prev,
      [companyId]: newStatus
    }));
    
    console.log(`Company ${companyId} status changed to: ${newStatus ? 'Active' : 'Inactive'}`);
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.companyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.mobile.includes(searchTerm)
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

  return (
    <div className="p-5 sm:p-8 lg:p-10 min-h-screen bg-gray-50">

      {/* Search and Add Company Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        {/* Left Section - Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search companies..."
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
        </div>

        {/* Right Section - Add Buttons */}
        <div className="flex gap-3">
          {/* Add Orders Button */}
          <button
            onClick={handleAddOrders}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Add Orders</span>
          </button>

          {/* Add Company Button */}
          <button
            onClick={handleAddCompany}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Company</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
                     <table className="w-full border-collapse text-xs sm:text-sm table-fixed min-w-[850px]" ref={tableRef}>
            <thead className="bg-gradient-to-r from-blue-50 to-indigo-100 text-gray-700">
              <tr>
                <th 
                  className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm uppercase tracking-wider relative select-none"
                  style={{ width: columnWidths.companyId }}
                >
                  Company ID
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 bg-transparent cursor-col-resize transition-colors duration-200 hover:bg-gray-400 active:bg-gray-600" 
                    onMouseDown={(e) => startResize(e, 'companyId')}
                  ></div>
                </th>
                <th 
                  className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm uppercase tracking-wider relative select-none"
                  style={{ width: columnWidths.name }}
                >
                  Company Name
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 bg-transparent cursor-col-resize transition-colors duration-200 hover:bg-gray-400 active:bg-gray-600" 
                    onMouseDown={(e) => startResize(e, 'name')}
                  ></div>
                </th>
                <th 
                  className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm uppercase tracking-wider relative select-none"
                  style={{ width: columnWidths.contactPerson }}
                >
                  Contact Person
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 bg-transparent cursor-col-resize transition-colors duration-200 hover:bg-gray-400 active:bg-gray-600" 
                    onMouseDown={(e) => startResize(e, 'contactPerson')}
                  ></div>
                </th>
                <th 
                  className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm uppercase tracking-wider relative select-none"
                  style={{ width: columnWidths.mobile }}
                >
                  Mobile
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 bg-transparent cursor-col-resize transition-colors duration-200 hover:bg-gray-400 active:bg-gray-600" 
                    onMouseDown={(e) => startResize(e, 'mobile')}
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
                             {filteredCompanies.map((company) => (
                 <tr 
                   key={company.id} 
                   className="border-b border-gray-100 transition-colors duration-200 hover:bg-gray-50 last:border-b-0 cursor-pointer"
                   onClick={() => handleRowClick(company)}
                 >
                  <td className="p-3 sm:p-4 align-middle font-semibold text-indigo-600 font-mono">
                    {company.companyId}
                  </td>
                  <td className="p-3 sm:p-4 align-middle font-medium text-gray-800">
                    {company.name}
                  </td>
                  <td className="p-3 sm:p-4 align-middle text-gray-600">
                    {company.contactPerson}
                  </td>
                  <td className="p-3 sm:p-4 align-middle text-gray-600 font-mono">
                    {company.mobile}
                  </td>
                                     <td className="p-3 sm:p-4 align-middle">
                     <div className="flex justify-center items-center gap-2 w-full h-full" onClick={(e) => e.stopPropagation()}>
                       {/* Edit Button */}
                       <button
                         onClick={() => handleEdit(company)}
                         className="p-1.5 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                         title="Edit Company"
                       >
                         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                         </svg>
                       </button>
                       
                       {/* Status Switch */}
                       <Switch
                         checked={companyStatuses[company.companyId]}
                         onChange={(newStatus) => handleStatusChange(company.companyId, newStatus)}
                         size="sm"
                       />
                     </div>
                   </td>
                </tr>
              ))}
            </tbody>
          </table>
                 </div>
       </div>

       {/* Company Details Modal */}
       <CompanyDetailsModal
         isOpen={isDetailsModalOpen}
         onClose={() => setIsDetailsModalOpen(false)}
         company={selectedCompany}
       />

       {/* Edit Company Modal */}
       <EditCompanyModal
         isOpen={isEditModalOpen}
         onClose={() => setIsEditModalOpen(false)}
         company={selectedCompany}
         onSave={handleSaveCompany}
       />
     </div>
   );
 };

export default CompanyList;
