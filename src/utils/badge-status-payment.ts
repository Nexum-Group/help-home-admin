export function getStatusBadgeClassPayment(status: string) {
    switch (status) {
        case "pending":
            return "admin-badge-info"
        case "paid":
            return "admin-badge-success"
        case "failed":
            return "admin-badge-danger"
        default:
            return ""
    }
}