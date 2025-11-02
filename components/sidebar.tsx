// components/sidebar.tsx
"use client"

import { LayoutDashboard, Package, MapPin, Printer, FileText } from "lucide-react"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "inventory", icon: Package, label: "Inventory" },
    { id: "locations", icon: MapPin, label: "Locations" },
    { id: "printers", icon: Printer, label: "Printers" },
    { id: "reports", icon: FileText, label: "Reports" },
  ]

  return (
    <aside className="w-64 bg-gray-800/50 backdrop-blur-xl border-r border-gray-700/50 flex flex-col overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xl font-bold text-white mb-8">IMS</h2>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
              activeTab === item.id
                ? "bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/20"
                : "text-gray-300 hover:bg-gray-700/50 hover:text-white hover:shadow-md"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}