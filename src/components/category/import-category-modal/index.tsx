'use client';

import { useState } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ImportCategoryModal({ open, onClose }: Props) {
  const [file, setFile] = useState<File | null>(null);

  if (!open) return null;

  function handleImport(e: React.FormEvent) {
    e.preventDefault();

    if (!file) return;

    onClose();
  }

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal">
        <div className="admin-modal-header">
          <h2>Importar Categorias (CSV)</h2>
        </div>

        <form onSubmit={handleImport} className="admin-form">
          <div className="admin-form-group">
            <label>Arquivo CSV</label>

            <input
              type="file"
              accept=".csv"
              className="admin-input"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          <div className="admin-csv-hint">
            <p>Formato esperado:</p>

            <pre>name,slug,description</pre>
            <pre>Eletrica,eletrica,Serviços elétricos</pre>
            <pre>Hidraulica,hidraulica,Serviços hidráulicos</pre>
          </div>

          <div className="admin-modal-actions">
            <button type="button" className="admin-btn admin-btn-secondary" onClick={onClose}>
              Cancelar
            </button>

            <button type="submit" className="admin-btn admin-btn-primary">
              Importar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
