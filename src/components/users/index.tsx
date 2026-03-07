'use client'
import { useGetAllUsers } from "@/src/hooks/useUser";
import ListUsers from "./list-users";
import SearchUser from "./search-user";
import { useState } from "react";

export default function Users() {
    const [searchTerm, setSearchTerm] = useState("")
    const [roleFilter, setRoleFilter] = useState<'client' | 'provider' | ''>('')
    const { data, isLoading, error } = useGetAllUsers(searchTerm, roleFilter || undefined)

    function handleSearch(term: string) {
        setSearchTerm(term)
    }

    function handleRoleFilter(role: 'client' | 'provider' | '') {
        setRoleFilter(role)
    }
    return (
        <div className="admin-content">
            <SearchUser 
                searchTerm={searchTerm} 
                setSearchTerm={handleSearch} 
                roleFilter={roleFilter} 
                setRoleFilter={handleRoleFilter}
                data={data ?? []}
            />
            <ListUsers data={data || []} isLoading={isLoading} error={error} />
        </div>
    )
}