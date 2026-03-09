export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  is_active: boolean;
  icon: string | null;
  created_at: string;
  updated_at: string;
};

export type CategoryOptions = Omit<
  Category,
  'description' | 'is_active' | 'icon' | 'created_at' | 'updated_at'
>;

export type CategoryItem = Category & {
  providers_count: number;
};
