export function formatStatus(status: string) {
    switch (status) {
        case "pending":
            return "Pendente"
        case "in_progress":
            return "Em progresso"
        case "approved":
            return "Aprovado"
        case "completed":
            return "Concluída"
        case "rejected":
            return "Recusada"
        default:
            return status
    }
}

