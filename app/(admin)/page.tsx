// app/(admin)/page.tsx

import Stats from "@/src/components/stats"
import RecentRequests from "@/src/components/recents-requests"
import NewProviders from "@/src/components/new-providers"

export default function HomePage() {
  return (
    <div className="admin-content">
      <Stats />
      <RecentRequests />
      <NewProviders />
    </div>
  )
}