import ProviderDetail from "@/src/components/providers/provider-detail"

interface PageProps {
  params: Promise<{
    uuid: string
  }>
}

export default async function ProviderDetailPage({ params }: PageProps) {
  const { uuid } = await params

  return <ProviderDetail uuid={uuid} />
}