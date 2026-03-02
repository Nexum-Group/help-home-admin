import { Address } from "./address";

export type User = {
    id: string;
    last_login: string;
    is_superuser: boolean;
    is_staff: boolean;
    is_active: boolean;
    email: string;
    name: string;
    phone: string;
    created_at: string;
    updated_at: string;
    addresses: Address[];
}