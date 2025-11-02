"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { DashboardView } from "@/components/dashboard-view"
import { InventoryView } from "@/components/inventory-view"
import { LocationsView } from "@/components/locations-view"
import { PrintersView } from "@/components/printers-view"
import { ReportsView } from "@/components/reports-view"

interface DashboardProps {
  user: { username: string; role: string } | null
  onLogout: () => void
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardView />
      case "inventory":
        return <InventoryView />
      case "locations":
        return <LocationsView />
      case "printers":
        return <PrintersView />
      case "reports":
        return <ReportsView />
      default:
        return <DashboardView />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} /> 
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onLogout={onLogout} />
        <main className="flex-1 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  )
}
