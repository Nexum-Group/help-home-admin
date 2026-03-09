import ServiceDetail from '@/src/components/requests/service-detail';
interface PageProps {
  params: Promise<{
    uuid: string;
  }>;
}

export default async function ServiceRequestDetailPage({ params }: PageProps) {
  const { uuid } = await params;
  return <ServiceDetail uuid={uuid} />;
}
