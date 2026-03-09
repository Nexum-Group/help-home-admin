import { Review } from '@/src/types/review';

interface IReviewsList {
  reviews: Review[];
}

export default function ReviewsList({ reviews }: IReviewsList) {
  return (
    <div className="admin-card">
      <h2 className="admin-card-title">Avaliações feitas</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Prestador</th>
            <th>Nota</th>
            <th>Comentário</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td>{review.provider.user.name}</td>
              <td>{review.rating}</td>
              <td>{review.comment}</td>
              <td>{review.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
