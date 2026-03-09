export function generateLast12Months() {
  const months = [];
  const date = new Date();

  for (let i = 0; i < 12; i++) {
    const d = new Date(date.getFullYear(), date.getMonth() - i, 1);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');

    const label = d.toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric',
    });

    months.push({
      value: `${year}-${month}`,
      label: label.charAt(0).toUpperCase() + label.slice(1),
    });
  }

  return months;
}
