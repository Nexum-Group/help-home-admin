import { useMutation, useQuery } from '@tanstack/react-query'
import { createConfig, getCurrentConfig, updateAutoApprovalConfig, updateConfig, updateMaintenanceConfig } from '../services/config.service'
import { Config } from '../types/config';



export function useCreateConfig() {
  return useMutation({
    mutationFn: createConfig,
  })
}

export function useUpdateConfig() {
  return useMutation({
    mutationFn: updateConfig
  })
}


export function useCurrentConfig() {
  return useQuery<Config>({
    queryKey: ["current-config"],
    queryFn: async () => getCurrentConfig(),
  })
}

export function useMaintenanceConfig() {
    return useMutation({
        mutationFn: updateMaintenanceConfig,
    })
}

export function useAutoApproveConfig() {
    return useMutation({
        mutationFn: updateAutoApprovalConfig,
    })
}