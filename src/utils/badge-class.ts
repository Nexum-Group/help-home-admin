export function getStatusBadgeClass(status: string) {
    switch (status) {
        case "pending":
            return "admin-badge-warning"
        case "in_progress":
            return "admin-badge-info"
        case "approved":
            return "admin-badge-success"
        case "rejected":
            return "admin-badge-danger"
        default:
            return ""
    }
}