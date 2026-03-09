export function formatPaymentStatus(status: string) {
  switch (status) {
    case 'pending':
      return 'Pendente';
    case 'paid':
      return 'Pago';
    case 'failed':
      return 'Falhou';
    default:
      return status;
  }
}
