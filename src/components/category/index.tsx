'use client'

import { useCategories } from "@/src/hooks/useCategory";
import ListCategories from "./list-categories";
import { CategoryItem } from "@/src/types/categories";

export default function Category() {
    const { data, isLoading, error} = useCategories()
    return (
        <div className="admin-content">
            <ListCategories data={data as CategoryItem[] || []} loading={isLoading} error={error}/>
        </div>
    )
}