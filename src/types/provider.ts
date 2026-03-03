import { Category } from "./category";
import { User } from "./user";

export type Provider = {
    id: string;
    user: User;
    description: string;
    approval_status: "pending" | "in_progress" | "approved" | "rejected";
    categories: Category[];
    rating_average: number;
    total_views: number;
    created_at: string;
    updated_at: string;
}

export type ProviderWithServiceRequestsCount = Provider & {
    service_requests_count: number;
}