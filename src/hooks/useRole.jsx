import React from "react";
import useAuth from "./useAuth";
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading: isRoleLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ['role', user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/user/role`)
      return result.data.role
    },
  })

  return { role, isRoleLoading }
};

export default useRole;