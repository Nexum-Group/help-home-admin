'use client'
import ClientService from "@/src/components/requests/client-service"
import DatesService from "@/src/components/requests/dates-service"
import PaymentService from "@/src/components/requests/payment-service"
import ProviderService from "@/src/components/requests/provider-service"
import ServiceInfo from "@/src/components/requests/service-info"
import { useServiceDetail } from "@/src/hooks/useRequest"

interface IServiceDetail {
    uuid: string
}
export default function ServiceDetail({uuid}:IServiceDetail) {
    const { data: service, isLoading, error} = useServiceDetail(uuid);
    if (isLoading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar provedores</p>;
    return (
        <div className="admin-content">
            { service && (
                <>
                    <ServiceInfo request={service}/>
                    <ClientService client={service.client}/>
                    <ProviderService provider={service.provider}/>
                    <PaymentService request={service}/>
                    <DatesService request={service}/>
                </>
            )}
        </div>
    )
}
