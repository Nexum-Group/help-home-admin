
import Sidebar from "@/src/components/sidebar"
import Header from "@/src/components/header"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">
        <Header />
        {children}
      </main>
    </div>
  )
}