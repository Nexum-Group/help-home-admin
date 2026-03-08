import { Address } from "./address";
import { Provider } from "./provider";
import { Review } from "./review";
import { ServiceRequest } from "./service";

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


export type AllUsers = User & {
    provider_profile: Provider | null;
}

export type UserDetail = User & {
    services: ServiceRequest[];
    reviews: Review[];
    profile_provider: Provider | null
}