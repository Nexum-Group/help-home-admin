'use client';

import AddressList from '@/src/components/users/list-addresses';
import RequestsList from '@/src/components/users/list-request';
import ReviewsList from '@/src/components/users/list-reviews';
import ProviderProfile from '@/src/components/users/provider-profile';
import UserInfo from '@/src/components/users/user-info';
import { useProviderDetail } from '@/src/hooks/useProvider';
interface IUserDetail {
  uuid: string;
}
export default function ProviderDetail({ uuid }: IUserDetail) {
  const { data: provider, isLoading, error } = useProviderDetail(uuid);
  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar usuários</p>;
  return (
    <div className="admin-content">
      {provider && (
        <>
          <UserInfo user={provider.user} />
          <AddressList addresses={provider.user.addresses} />
          <RequestsList requests={provider.services} />
          <ReviewsList reviews={provider.reviews} />

          <ProviderProfile profile={provider} />
        </>
      )}
    </div>
  );
}
