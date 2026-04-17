'use client';

import { useUser } from '@/src/hooks/useUser';
import { usePathname } from 'next/navigation';
import CreateCategoryModal from '../category/create-category-modal';
import ImportCategoryModal from '../category/import-category-modal';
import { HeaderSkeleton } from '@/src/components/ui/skeleton';
import { useState } from 'react';

const titles: Record<string, string> = {
  '/admin/': 'Dashboard',
  '/admin/users': 'Usuários',
  '/admin/requests': 'Solicitações',
  '/admin/providers': 'Prestadores',
  '/admin/categories': 'Categorias',
  '/admin/settings': 'Configurações',
  '/admin/reports': 'Relatórios',
};

export default function Header() {
  const pathName = usePathname();

  const title = titles[pathName] || 'Dashboard';
  const [createOpen, setCreateOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const { data, isLoading, error } = useUser();

  if (isLoading) return <HeaderSkeleton />;
  if (error) return <HeaderSkeleton />;

  return (
    <header className="admin-header">
      <h1>{title}</h1>
      <div className="admin-header-user">
        {pathName === '/admin/categories' && (
          <>
            <button onClick={() => setCreateOpen(true)} className="admin-btn admin-btn-primary">
              Nova categoria
            </button>
            <button
              disabled
              onClick={() => setImportOpen(true)}
              className="admin-btn admin-btn-primary"
            >
              Importar CSV
            </button>
          </>
        )}
        <span>{data?.name}</span>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: '#e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '600',
          }}
        >
          A
        </div>
      </div>
      {createOpen && (
        <CreateCategoryModal open={createOpen} onClose={() => setCreateOpen(false)} mode="new" />
      )}
      <ImportCategoryModal open={importOpen} onClose={() => setImportOpen(false)} />
    </header>
  );
}
