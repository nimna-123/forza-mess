import React from 'react'
import { GET_ORDER } from '../../endpoint'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../service';


const useGetOrders = (filters = {}) => {
  return useQuery({
    queryKey: [ "orders", filters ],
    queryFn: async () => {
      try {
        const response = await api.get(GET_ORDER, {
          params: {
            orderId:filters.orderId,
            orderDate: filters.orderDate,
            orderForDate: filters.orderForDate,
            customerType: filters.customerType,
          }
        });
        console.log("Fetched orders:", response.data.data);
        return response.data.data || [];
      } catch (error) {
        console.error(error);
      }
    },
    // ✅ No `enabled` needed unless you want conditional execution
  });
}

export default useGetOrders