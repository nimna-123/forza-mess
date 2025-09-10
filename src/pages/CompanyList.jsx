import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Switch from '../components/Switch';
import CompanyDetailsModal from '../components/CompanyDetailsModal';
import EditCompanyModal from '../components/EditCompanyModal';
import { GET_CUSTOMERS, UPDATE_CUSTOMERS, CUSTOMER_UPDATE_STATUS } from '../Api/service';
import Toast from '../components/Toast';

const CompanyList = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
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

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await GET_CUSTOMERS("company");
      const companiesList = response.data
      setCompanies(companiesList || []);
    } catch (err) {
      console.error("Error fetching companies:", err);
      setError("Failed to fetch companies. Please try again later.");
      setCompanies([]); // fallback
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {


    fetchCompanies();
  }, []);



  const [columnWidths, setColumnWidths] = useState({
    slNo: 80,
    name: 250,
    contactPerson: 200,
    mobile: 160,
    actions: 120
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [updatingStatuses, setUpdatingStatuses] = useState(new Set());
  const [companyStatuses, setCompanyStatuses] = useState({});
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

    const transformedCompany = {
      ...updatedCompany,
      creditDays: String(updatedCompany.creditDays),
      companyName: updatedCompany.name,

    };

    try {
      const response = await UPDATE_CUSTOMERS(
        transformedCompany,
        "company",
        updatedCompany.id
      );
      if (response.success === true) {
        showToast("Company updated successfully!", "success");
        fetchCompanies()
      }
    } catch (error) {
      console.error("Failed to update company:", error);
    }
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

  const handleStatusChange = async (companyId, newStatus) => {
    setUpdatingStatuses(prev => new Set([...prev, companyId]));

    try {
      const response = await CUSTOMER_UPDATE_STATUS(newStatus, companyId);
      if (response.success === true) {
        // Update local state to reflect the new status
        setCompanyStatuses(prev => ({
          ...prev,
          [companyId]: newStatus === 'Active'
        }));

        showToast(`Company status updated to ${newStatus}`, 'success');
      } else {
        throw new Error(response.message || 'Failed to update company status');
      }
    } catch (error) {
      console.error('Error updating company status:', error);
      showToast('Failed to update company status. Please try again.', 'error');


    } finally {
      setUpdatingStatuses(prev => {
        const newSet = new Set(prev);
        newSet.delete(companyId);
        return newSet;
      });
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

  return (
    <div className="p-5 sm:p-8 lg:p-10 min-h-screen bg-gray-50">
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
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

      {/* Data Count Display */}
      {!loading && !error && (
        <div className="mb-4 text-sm text-gray-600">
          <span className="font-medium">{companies.length}</span> company{companies.length !== 1 ? 'ies' : 'y'} found
          {searchTerm && (
            <span className="ml-2">
              (filtered from search: "{searchTerm}")
            </span>
          )}
        </div>
      )}

      {/* Loading and Error States */}
      {loading && (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading companies...</p>
        </div>
      )}

      {error && (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-8 text-center">
          <div className="text-red-500 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-red-600 font-medium">{error}</p>
          <button
            onClick={refreshCompanies}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && companies.length === 0 && (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium">No companies found</p>
          <p className="text-gray-500 text-sm mt-2">Get started by adding your first company</p>
        </div>
      )}

      {!loading && !error && companies.length > 0 && (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs sm:text-sm table-fixed min-w-[850px]" ref={tableRef}>
              <thead className="bg-gradient-to-r from-blue-50 to-indigo-100 text-gray-700">
                <tr>
                  <th
                    className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm uppercase tracking-wider relative select-none"
                    style={{ width: columnWidths.slNo }}
                  >
                    SL No
                    <div
                      className="absolute right-0 top-0 bottom-0 w-1 bg-transparent cursor-col-resize transition-colors duration-200 hover:bg-gray-400 active:bg-gray-600"
                      onMouseDown={(e) => startResize(e, 'slNo')}
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
                {companies.map((company, index) => (
                  <tr
                    key={company.id}
                    className="border-b border-gray-100 transition-colors duration-200 hover:bg-gray-50 last:border-b-0 cursor-pointer"
                    onClick={() => handleRowClick(company)}
                  >
                    <td className="p-3 sm:p-4 align-middle font-semibold text-indigo-600 font-mono">
                      {index + 1}
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
                        <div className="relative">
                          <Switch
                            checked={companyStatuses[company.id] !== undefined ? companyStatuses[company.id] : company.status === 'Active'}
                            onChange={(newChecked) =>
                              handleStatusChange(company.id, newChecked ? 'Active' : 'Inactive')
                            }
                            size="sm"
                            disabled={updatingStatuses.has(company.id)}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
