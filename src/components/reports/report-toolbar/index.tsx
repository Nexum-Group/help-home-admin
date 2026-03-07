'use client'

import { generateLast12Months } from "@/src/utils/generate-months"
interface IReportToolbar {
    dateFilter: string;
    setDateFilter: (date: string) => void;
}

export default function ReportToolbar({ dateFilter, setDateFilter}:IReportToolbar) {
    const months = generateLast12Months()
    return(
        <div className="admin-toolbar">
            <select 
                style={{ padding: '0.5rem 1rem', border: '1px solid var(--admin-border)', borderRadius: '8px' }}
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
            >
              {months.map(month => (
                <option key={month.value} value={month.value}>{month.label}</option>
              ))}
            </select>
            <button className="admin-btn admin-btn-primary">Exportar PDF</button>
            <button className="admin-btn admin-btn-ghost">Exportar CSV</button>
        </div>
    )
}