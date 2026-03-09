export type Category = {
    id: string;
    name: string;
    description: string;
    slug: string;
    is_active: boolean;
    icon_url: string;
    created_at: string;
    updated_at: string;
}

export type CategoryCreateAndUpdate = Omit<Category, "id" | "icon_url" | "created_at" | "updated_at">