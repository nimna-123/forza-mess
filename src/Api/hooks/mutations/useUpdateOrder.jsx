import { useMutation } from '@tanstack/react-query'
import { UPDATE_ORDER } from '../../endpoint'
import { api } from '../../service'

const useUpdateOrder = () => {
  return useMutation({
 
    mutationFn: async ({ data, orderId, orderAID }) => {
      const response = await api.put(
        UPDATE_ORDER,
        data,
        {
          params: {  
            orderId,
            orderAID
          }
          
        }
      )
      return response.data
    },
  })
}

export default useUpdateOrder
