export type Config = {
    id: string;
    platform_fee?: number;
    email_suport: string;
    cancellation_deadline_hours?: number;
    auto_approve_providers: boolean;
    maintenance: boolean;
    updated_at: string;
}


export type CreateAndUpdateConfig = Omit<Config, "id" | "auto_approve_providers" | "maintenance" | "updated_at">