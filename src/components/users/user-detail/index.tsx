'use client';

import AddressList from '@/src/components/users/list-addresses';
import RequestsList from '@/src/components/users/list-request';
import ReviewsList from '@/src/components/users/list-reviews';
import ProviderProfile from '@/src/components/users/provider-profile';
import UserInfo from '@/src/components/users/user-info';
import { useUserDetail } from '@/src/hooks/useUser';
interface IUserDetail {
  uuid: string;
}
export default function UserDetail({ uuid }: IUserDetail) {
  const { data: user, isLoading, error } = useUserDetail(uuid);
  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar usuários</p>;
  return (
    <div className="admin-content">
      {user && (
        <>
          <UserInfo user={user} />
          <AddressList addresses={user.addresses} />
          <RequestsList requests={user.services} />
          <ReviewsList reviews={user.reviews} />

          {user.profile_provider && <ProviderProfile profile={user.profile_provider} />}
        </>
      )}
    </div>
  );
}
