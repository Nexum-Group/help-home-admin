'use client'

import Stats from "@/src/components/stats"
import RecentRequests from "@/src/components/recents-requests"
import NewProviders from "@/src/components/new-providers"
import { useDashboard } from "@/src/hooks/useDashboard"

export default function HomePage() {
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