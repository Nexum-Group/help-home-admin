import { Provider } from '@/src/types/provider';
import { formatProviderStatus } from '@/src/utils/formart-status-providers';

interface IProfileProvider {
  profile: Provider;
}

export default function ProviderProfile({ profile }: IProfileProvider) {
  return (
    <div className="admin-card">
      <h2 className="admin-card-title">Perfil de Prestador</h2>

      <div className="admin-form-row">
        <div>
          <strong>Status</strong>
          <p>
            <span className="admin-badge admin-badge-info">
              {formatProviderStatus(profile.approval_status)}
            </span>
          </p>
        </div>

        <div>
          <strong>Rating médio</strong>
          <p>{profile.rating_average}</p>
        </div>

        <div>
          <strong>Total de visualizações</strong>
          <p>{profile.total_views}</p>
        </div>
      </div>

      <br />

      <div>
        <strong>Descrição</strong>
        <p>{profile.description}</p>
      </div>

      <br />

      <div>
        <strong>Categorias</strong>
        <ul>
          {profile.categories.map((cat, i) => (
            <li key={i}>{cat.name}</li>
          ))}
        </ul>
      </div>

      <br />

      <div>
        <strong>Áreas de atendimento</strong>
        <ul>
          <li>
            <i>Implementar</i>
          </li>
        </ul>
      </div>

      <br />

      <h3>Reviews recebidas</h3>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Nota</th>
            <th>Comentário</th>
          </tr>
        </thead>

        <tbody>
          {/* {user.provider_profile.reviews_received.map((review, i) => (
                <tr key={i}>
                  <td>{review.client}</td>
                  <td>{review.rating}</td>
                  <td>{review.comment}</td>
                </tr>
              ))} */}
        </tbody>
      </table>
    </div>
  );
}
