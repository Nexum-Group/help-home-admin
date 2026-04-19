'use client';

interface EmptyDisplayProps {
  title?: string;
  message?: string;
  icon?: 'search' | 'file' | 'inbox';
}

function EmptyIcon({ name }: { name: EmptyDisplayProps['icon'] }) {
  const icons = {
    search: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    file: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    inbox: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
        <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
      </svg>
    ),
  };
  return icons[name || 'inbox'];
}

export function EmptyDisplay({
  title = 'Nenhum resultado encontrado',
  message = 'Não há dados para exibir.',
  icon = 'inbox',
}: EmptyDisplayProps) {
  return (
    <div className="empty-display">
      <div className="empty-icon">
        <EmptyIcon name={icon} />
      </div>
      <h3 className="empty-title">{title}</h3>
      <p className="empty-message">{message}</p>
    </div>
  );
}