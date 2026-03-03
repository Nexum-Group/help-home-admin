'use client'

import SelectCategory from "./select-category";
import SelectStatus from "./select-status";

interface IFilterProviders {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    categoryFilter: string;
    setCategoryFilter: (categoryId: string) => void;
    statusFilter: string;
    setStatusFilter: (status: string) => void;
}


export default function FilterProviders({ searchTerm, setSearchTerm, categoryFilter, setCategoryFilter, statusFilter, setStatusFilter }: IFilterProviders) {
    return (
        <div className="admin-toolbar">
            <input 
                type="search" 
                className="admin-search" 
                placeholder="Buscar prestador..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
           <SelectCategory
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
           />
           <SelectStatus
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
           />
        </div>
    )
}