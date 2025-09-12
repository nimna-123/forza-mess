import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { LOGIN_USER } from '../../endpoint'
import { api } from '../../service'

const useLoginUser = () => {
  return useMutation ({
    mutationFn: async (loginData)=> await api.post(LOGIN_USER,loginData),
  })
}

export default useLoginUser;