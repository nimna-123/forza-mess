import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Switch from '../components/Switch';

const AgentList = () => {
  const navigate = useNavigate();
  // Sample agent data - in a real app, this would come from an API
  const [agents] = useState([
    {
      id: 1,
      agentId: 'AGT001',
      name: 'Ahmed Hassan',
      mobile: '+971 50 111 2222',
      email: 'ahmed.hassan@company.com',
      address: 'Dubai Marina, Tower 2, Apt 1201, Dubai',
      joinedDate: '2023-06-15',
      commission: 'AED 2,500.00',
      status: 'Active',
      customersCount: 45
    },
    {
      id: 2,
      agentId: 'AGT002',
      name: 'Fatima Al Mansouri',
      mobile: '+971 55 222 3333',
      email: 'fatima.mansouri@company.com',
      address: 'Abu Dhabi Corniche, Marina Heights, Abu Dhabi',
      joinedDate: '2023-08-20',
      commission: 'AED 3,200.00',
      status: 'Active',
      customersCount: 52
    },
    {
      id: 3,
      agentId: 'AGT003',
      name: 'Omar Khalil',
      mobile: '+971 52 333 4444',
      email: 'omar.khalil@company.com',
      address: 'Sharjah Al Majaz, Waterfront Tower, Sharjah',
      joinedDate: '2023-09-10',
      commission: 'AED 1,800.00',
      status: 'Inactive',
      customersCount: 28
    },
    {
      id: 4,
      agentId: 'AGT004',
      name: 'Aisha Rahman',
      mobile: '+971 56 444 5555',
      email: 'aisha.rahman@company.com',
      address: 'Dubai Silicon Oasis, Building A, Dubai',
      joinedDate: '2023-11-05',
      commission: 'AED 2,900.00',
      status: 'Active',
      customersCount: 38
    },
    {
      id: 5,
      agentId: 'AGT005',
      name: 'Youssef Ibrahim',
      mobile: '+971 54 555 6666',
      email: 'youssef.ibrahim@company.com',
      address: 'Ajman Corniche, Beach Tower, Ajman',
      joinedDate: '2024-01-12',
      commission: 'AED 2,100.00',
      status: 'Active',
      customersCount: 31
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

  const [columnWidths, setColumnWidths] = useState({
    agentId: 120,
    name: 150,
    mobile: 140,
    address: 250,
    joinedDate: 120,
    customersCount: 120,
    actions: 120
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [agentStatuses, setAgentStatuses] = useState({
    'AGT001': true,
    'AGT002': true,
    'AGT003': false,
    'AGT004': true,
    'AGT005': true
  });
  const tableRef = useRef(null);
  const resizingRef = useRef(null);

  const handleEdit = (agentId) => {
    console.log('Edit agent:', agentId);
    // Add edit functionality here
  };

  const handleAddAgent = () => {
    navigate('/add-agent');
  };

  const handleAddOrders = () => {
    navigate('/add-orders');
  };

  const handleStatusChange = (agentId, newStatus) => {
    setAgentStatuses(prev => ({
      ...prev,
      [agentId]: newStatus
    }));
    
    console.log(`Agent ${agentId} status changed to: ${newStatus ? 'Active' : 'Inactive'}`);
  };

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.agentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.mobile.includes(searchTerm)
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
              placeholder="Search agents..."
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
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs sm:text-sm table-fixed min-w-[1200px]" ref={tableRef}>
            <thead className="bg-gradient-to-r from-blue-50 to-indigo-100 text-gray-700">
              <tr>
                <th 
                  className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm uppercase tracking-wider relative select-none"
                  style={{ width: columnWidths.agentId }}
                >
                  Agent ID
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 bg-transparent cursor-col-resize transition-colors duration-200 hover:bg-gray-400 active:bg-gray-600" 
                    onMouseDown={(e) => startResize(e, 'agentId')}
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
                   style={{ width: columnWidths.customersCount }}
                 >
                   Members
                   <div 
                     className="absolute right-0 top-0 bottom-0 w-1 bg-transparent cursor-col-resize transition-colors duration-200 hover:bg-gray-400 active:bg-gray-600" 
                     onMouseDown={(e) => startResize(e, 'customersCount')}
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
              {filteredAgents.map((agent) => (
                <tr key={agent.id} className="border-b border-gray-100 transition-colors duration-200 hover:bg-gray-50 last:border-b-0">
                  <td className="p-3 sm:p-4 align-middle font-semibold text-indigo-600 font-mono">
                    {agent.agentId}
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
                  <td className="p-3 sm:p-4 align-middle text-center">
                    <span className="font-semibold text-gray-800 bg-gray-100 rounded-md px-2 py-1 inline-block min-w-[30px]">
                      {agent.customersCount}
                    </span>
                  </td>
                                     <td className="p-3 sm:p-4 align-middle text-center">
                     <div className="flex justify-center items-center">
                       {/* Status Switch */}
                       <Switch
                         checked={agentStatuses[agent.agentId]}
                         onChange={(newStatus) => handleStatusChange(agent.agentId, newStatus)}
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
    </div>
  );
};

export default AgentList;
