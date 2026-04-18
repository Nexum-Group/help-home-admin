import { Address } from '@/src/types/address';

interface IAddressList {
  addresses?: Address[];
}

export default function AddressList({ addresses = [] }: IAddressList) {
  if (addresses.length === 0) return null;

  return (
    <div className="admin-card">
      <h2 className="admin-card-title">Endereços</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Rua</th>
            <th>Número</th>
            <th>Bairro</th>
            <th>Cidade</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {addresses.map((address, i) => (
            <tr key={i}>
              <td>{address.street}</td>
              <td>{address.number}</td>
              <td>{address.neighborhood?.name}</td>
              <td>{address.neighborhood?.city?.name}</td>
              <td>{address.neighborhood?.city?.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
