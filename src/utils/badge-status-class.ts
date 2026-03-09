export function getStatusBadgeClass(status: string) {
  switch (status) {
    case 'pending':
      return 'admin-badge-info';
    case 'in_progress':
      return 'admin-badge-warning';
    case 'approved':
      return 'admin-badge-success';
    case 'completed':
      return 'admin-badge-success';
    case 'rejected':
      return 'admin-badge-danger';
    default:
      return '';
  }
}
