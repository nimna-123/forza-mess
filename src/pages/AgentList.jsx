import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Switch from '../components/Switch';
import AgentDetailsModal from '../components/AgentDetailsModal';
import EditAgentModal from '../components/EditAgentModal';
import { GET_CUSTOMERS, UPDATE_CUSTOMERS, CUSTOMER_UPDATE_STATUS } from '../Api/service';
import Toast from '../components/Toast';

const AgentList = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchAgents = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await GET_CUSTOMERS("agent");
      const agentsList = response.data
      setAgents(agentsList || []);

      // Initialize agentStatuses based on fetched data
      if (agentsList && agentsList.length > 0) {
        const initialStatuses = {};

        agentsList.forEach(agent => {
          // Use status field from API response
          const isActive = agent.status === 'Active';
          initialStatuses[agent.id] = isActive;
        
        });

      
        setAgentStatuses(initialStatuses);
      }
    } catch (err) {
    
      setError("Failed to fetch agents. Please try again later.");
      setAgents([]); // fallback
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAgents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const [columnWidths, setColumnWidths] = useState({
    slNo: 80,
    name: 150,
    mobile: 140,
    address: 250,
    joinedDate: 120,
    actions: 120
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [agentStatuses, setAgentStatuses] = useState({});
  const [updatingStatuses, setUpdatingStatuses] = useState(new Set());
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
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
  const tableRef = useRef(null);
  const resizingRef = useRef(null);

  const handleEdit = (agent) => {
    setSelectedAgent(agent);
    setIsEditModalOpen(true);
  };

  const handleSaveAgent = async (updatedAgent) => {
    const transformedAgent = {
      ...updatedAgent,
      creditDays: String(updatedAgent.creditDays),
    };

    try {
      const response = await UPDATE_CUSTOMERS(
        transformedAgent,
        "agent",
        updatedAgent.id
      );
      if (response.success === true) {
        showToast("Agent updated successfully!", "success");
        fetchAgents();
      }



    } catch (error) {
      console.error("Failed to update agent:", error);
    }
  };

  const handleAddAgent = () => {
    navigate('/add-agent');
  };

  const handleAddOrders = () => {
    navigate('/add-order');
  };

  const handleRowClick = (agent) => {
    setSelectedAgent(agent);
    setIsDetailsModalOpen(true);
  };

  const handleStatusChange = async (agentId, newStatus) => {
    setUpdatingStatuses(prev => new Set([...prev, agentId]));

    try {
      // Convert boolean to Active/Inactive string for API call
      const statusString = newStatus ? 'Active' : 'Inactive';

      // Call the actual API service to update agent status
      const response = await CUSTOMER_UPDATE_STATUS(statusString, agentId);

      if (response.success === true) {
        setAgentStatuses(prev => ({
          ...prev,
          [agentId]: newStatus
        }));

        showToast(`Agent status updated to ${statusString}`, 'success');
        
      } else {
        throw new Error(response.message || 'Failed to update agent status');
      }
    } catch (error) {

      showToast('Failed to update agent status. Please try again.', 'error');
      // Revert the change on error
      setAgentStatuses(prev => ({
        ...prev,
        [agentId]: !newStatus
      }));
    } finally {
      setUpdatingStatuses(prev => {
        const newSet = new Set(prev);
        newSet.delete(agentId);
        return newSet;
      });
    }
  };

  const filteredAgents = agents.filter(agent =>
    agent.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.mobile?.includes(searchTerm)
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
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />


      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-700 font-medium">{error}</span>
            </div>

          </div>
        </div>
      )}

      {/* Search and Add Agent Section */}
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
              placeholder={"Search agents..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}

              className="block w-full pl-12 pr-12 py-2 sm:py-2.5 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm sm:text-base bg-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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

          {/* Add Agent Button */}
          <button
            onClick={handleAddAgent}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Agent</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden">
        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading agents...</p>
          </div>
        )}



        {/* Empty State */}
        {!loading && !error && agents.length === 0 && (
          <div className="p-12 text-center">
            <div className="inline-flex flex-col items-center gap-3">
              <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No agents found</h3>
                <p className="text-gray-500 mb-4">Get started by adding your first agent.</p>
                <button
                  onClick={handleAddAgent}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Agent
                </button>
              </div>
            </div>
          </div>
        )}

        {/* No Search Results */}
        {!loading && !error && agents.length > 0 && filteredAgents.length === 0 && searchTerm && (
          <div className="p-12 text-center">
            <div className="inline-flex flex-col items-center gap-3">
              <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No search results</h3>
                <p className="text-gray-500 mb-4">No agents found matching "{searchTerm}". Try adjusting your search terms.</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear Search
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Table Content */}
        {!loading && !error && agents.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs sm:text-sm table-fixed min-w-[1200px]" ref={tableRef}>
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
                    Mobile
                    <div
                      className="absolute right-0 top-0 bottom-0 w-1 bg-transparent cursor-col-resize transition-colors duration-200 hover:bg-gray-400 active:bg-gray-600"
                      onMouseDown={(e) => startResize(e, 'mobile')}
                    ></div>
                  </th>
                  <th
                    className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm uppercase tracking-wider relative select-none"
                    style={{ width: columnWidths.address }}
                  >
                    Address
                    <div
                      className="absolute right-0 top-0 bottom-0 w-1 bg-transparent cursor-col-resize transition-colors duration-200 hover:bg-gray-400 active:bg-gray-600"
                      onMouseDown={(e) => startResize(e, 'address')}
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
                {agents.map((agent, index) => (
                  <tr
                    key={agent.id}
                    className="border-b border-gray-100 transition-colors duration-200 hover:bg-gray-50 last:border-b-0 cursor-pointer"
                    onClick={() => handleRowClick(agent)}
                  >
                    <td className="p-3 sm:p-4 align-middle font-semibold text-indigo-600 font-mono">
                      {index + 1}
                    </td>
                    <td className="p-3 sm:p-4 align-middle font-medium text-gray-800">
                      {agent.name}
                    </td>
                    <td className="p-3 sm:p-4 align-middle text-gray-600 font-mono">
                      {agent.mobile}
                    </td>
                    <td className="p-3 sm:p-4 align-middle text-gray-600 text-xs max-w-[200px] break-words">
                      {agent.address}
                    </td>
                    <td className="p-3 sm:p-4 align-middle text-gray-600 text-xs">
                      {formatDate(agent.joinedDate)}
                    </td>

                    <td className="p-3 sm:p-4 align-middle">
                      <div className="flex justify-center items-center gap-2 w-full h-full" onClick={(e) => e.stopPropagation()}>
                        {/* Edit Button */}
                        <button
                          onClick={() => handleEdit(agent)}
                          className="p-1.5 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                          title="Edit Agent"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>

                        {/* Status Switch */}
                        <div className="relative">
                          <Switch
                            checked={(() => {
                              const localStatus = agentStatuses[agent.id];
                              const fallbackStatus = agent.status === 'Active';
                              const finalStatus = localStatus !== undefined ? localStatus : fallbackStatus;
                            
                              return finalStatus;
                            })()}
                            onChange={(newStatus) => handleStatusChange(agent.id, newStatus)}
                            size="sm"
                            disabled={updatingStatuses.has(agent.id)}
                          />
                          {updatingStatuses.has(agent.id) && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-500"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Agent Details Modal */}
      <AgentDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        agent={selectedAgent}
      />

      {/* Edit Agent Modal */}
      <EditAgentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        agent={selectedAgent}
        onSave={handleSaveAgent}
      />
    </div>
  );
};

export default AgentList;
