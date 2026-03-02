'use client'

import { useDashboard } from "@/src/hooks/useDashboard"
import Stats from "./stats"
import RecentRequests from "./recents-requests"
import NewProviders from "./new-providers"

export default function Dashboard() {
  const { data, isLoading, error } = useDashboard()

  if (isLoading) return <p>Carregando...</p>
  if (error) return <p>Erro ao carregar dashboard</p>

  return (
    <div className="admin-content">
      <Stats data={data} />
      <RecentRequests data={data?.recent_requests || []} />
      <NewProviders newProviders={data?.new_providers || []} />
    </div>
  )
}