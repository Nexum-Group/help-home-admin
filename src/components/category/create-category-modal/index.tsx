"use client"

import { useCategory, useCreateCategory, useUpdateCategory } from "@/src/hooks/useCategory"
import { useQueryClient } from "@tanstack/react-query"
import { useState, useEffect } from "react"

type Props = {
  open: boolean;
  onClose: () => void;
  mode: "update" | "new";
  categoryUuid?: string;
}

export default function CreateCategoryModal({ open, onClose, mode = "new", categoryUuid }: Props) {
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [isActive, setIsActive] = useState(true)

  const { mutate: newCategory, isPending: isPendingNew } = useCreateCategory()
  const { mutate: updateCategory, isPending: isPendingUpdate } = useUpdateCategory()
  const { data, isLoading } = useCategory(categoryUuid ?? "")
  const queryClient = useQueryClient();

  useEffect(() => {
    if (mode === "update" && data && !isLoading) {
       // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(data.name || "")
      setSlug(data.slug || "")
      setDescription(data.description || "")
      setIsActive(data.is_active ?? true)
    }
  }, [mode, data, isLoading])

  // Limpa o formulário quando o modal é fechado
  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName("")
      setSlug("")
      setDescription("")
      setIsActive(true)
    }
  }, [open])

  if (!open) return null

  function formatToSlug(name: string) {
    return name.replace(/\s+/g, "-").toLowerCase()
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setName(newName)
    setSlug(formatToSlug(newName))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!name || !slug || !description) {
      alert("Preencha todos os campos")
      return
    }

    const payload = {
      name,
      slug,
      description,
      is_active: isActive,
    }

    if (mode === "new") {
      newCategory(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries({ 
            queryKey: ['categories-options']
          });
          alert("Nova categoria adicionada com sucesso!");
          onClose();
        },
        onError: (error) => {
          alert("Erro ao criar categoria");
          console.error(error);
        }
      });
    } else {
      // Modo update
      updateCategory(
        { categoryUuid: categoryUuid!, data: payload },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ 
              queryKey: ['categories-options']
            });
            alert("Categoria atualizada com sucesso!");
            onClose();
          },
          onError: (error) => {
            alert("Erro ao atualizar categoria");
            console.error(error);
          }
        }
      );
    }
  }

  const isPending = isPendingNew || isPendingUpdate;
  const buttonText = isPending 
    ? (mode === "new" ? "Criando..." : "Atualizando...") 
    : (mode === "new" ? "Criar" : "Atualizar");
  const modalTitle = mode === "new" ? "Nova Categoria" : "Editar Categoria";

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal">
        <div className="admin-modal-header">
          <h2>{modalTitle}</h2>
        </div>

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-form-group">
            <label>Nome</label>
            <input
              className="admin-input"
              value={name}
              onChange={handleNameChange}
              required
              disabled={isLoading && mode === "update"}
            />
          </div>

          <div className="admin-form-group">
            <label>Slug</label>
            <input
              className="admin-input"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              disabled={isLoading && mode === "update"}
            />
          </div>

          <div className="admin-form-group">
            <label>Descrição</label>
            <textarea
              className="admin-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              disabled={isLoading && mode === "update"}
              rows={4}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-checkbox">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                disabled={isLoading && mode === "update"}
              />
              Ativa
            </label>
          </div>

          <div className="admin-modal-actions">
            <button
              type="button"
              className="admin-btn admin-btn-secondary"
              onClick={onClose}
              disabled={isPending}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="admin-btn admin-btn-primary"
              disabled={isPending || (mode === "update" && isLoading)}
            >
              {isLoading && mode === "update" ? "Carregando..." : buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}