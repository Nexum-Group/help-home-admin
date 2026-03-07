'use client'
import { useReport } from "@/src/hooks/useReport";
import CategoryByVolume from "./category-by-volume";
import NewsRegistereds from "./news-registereds";
import ReportStats from "./report-stats";
import ReportToolbar from "./report-toolbar";
import { useState } from "react";

export default function Report() {
    const [date, setDate] = useState("");
    const { data:reports, isLoading, error } = useReport(date);

    function handleDate(date: string) {
        setDate(date)
    }
    return (
        <div className="admin-content">
          <ReportToolbar
            dateFilter={date}
            setDateFilter={handleDate} 
        />
          <ReportStats reports={reports!}/>
          <CategoryByVolume categories={reports?.category_by_volume || []} isLoading={isLoading} error={error}/>
          <NewsRegistereds data={reports?.news_registereds || []} isLoading={isLoading} error={error} />
        </div>
    )
}