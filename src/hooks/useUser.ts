// src/hooks/useDashboard.ts
import { useQuery } from "@tanstack/react-query"
import { AllUsers, User } from "../types/user"
import { getCurrentUser } from "../services/auth.service"
import { getAllUsers } from "../services/user.service"

export function useUser() {
  return useQuery<User>({
    queryKey: ["whoami"],
    queryFn: getCurrentUser,
  })
}

export function useGetAllUsers(search?: string, role?: 'client' | 'provider') {
  return useQuery<AllUsers[]>({
    queryKey: ["all-users", search, role],
    queryFn: () => getAllUsers({ search, role }),
  })
}