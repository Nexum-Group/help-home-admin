// app/admin/users/[uuid]/page.tsx
import UserDetail from "@/src/components/users/user-detail"

interface PageProps {
  params: Promise<{
    uuid: string
  }>
}

export default async function UserDetailPage({ params }: PageProps) {
  const { uuid } = await params

  return <UserDetail uuid={uuid} />
}