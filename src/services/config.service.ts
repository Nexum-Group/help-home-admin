import { apiFetch } from "../lib/api";
import { CreateAndUpdateConfig } from "../types/config";


export function createConfig(data: CreateAndUpdateConfig) {
  return apiFetch('/config/create/', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateConfig(data: CreateAndUpdateConfig) {
  return apiFetch(`/config/update/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}


export function getCurrentConfig() {
  return apiFetch(`/config/current/`, {
    method: 'GET',
  })
}

export function updateMaintenanceConfig() {
  return apiFetch(`/config/maintenance/`, {
    method: 'PATCH',
  })
}

export function updateAutoApprovalConfig() {
  return apiFetch(`/config/auto_approval/`, {
    method: 'PATCH',
  })
}