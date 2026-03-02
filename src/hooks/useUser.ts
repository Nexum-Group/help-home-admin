// src/hooks/useDashboard.ts
import { useQuery } from "@tanstack/react-query"
import { User } from "../types/user"
import { getCurrentUser } from "../services/auth.service"

export function useUser() {
  return useQuery<User>({
    queryKey: ["whoami"],
    queryFn: getCurrentUser,
  })
}