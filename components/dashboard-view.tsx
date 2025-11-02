"use client"

import { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Package, AlertCircle, MapPin, Printer, DollarSign, Clock } from "lucide-react"
import { MetricCard } from "@/components/metric-card"

export function DashboardView() {
  const [metrics, setMetrics] = useState({
    total_items: 0,
    low_stock_count: 0,
    total_locations: 0,
    total_printers: 0,
    total_spent: 0,
    pending_payments: 0,
    paid_amount: 0
  })
  
  const [financial, setFinancial] = useState({
    total_spent: 0,
    total_pending: 0,
    total_paid: 0,
    transactions_by_location: []
  })
  
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [metricsRes, financialRes] = await Promise.all([
        fetch("http://localhost:8000/api/dashboard/metrics"),
        fetch("http://localhost:8000/api/financial/summary")
      ])

      if (metricsRes.ok) {
        const data = await metricsRes.json()
        setMetrics(data)
      }

      if (financialRes.ok) {
        const data = await financialRes.json()
        setFinancial(data)
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const metricCards = [
    { 
      label: "Total Items", 
      value: metrics.total_items.toString(), 
      change: "+12%", 
      icon: Package, 
      color: "primary" as const
    },
    { 
      label: "Low Stock", 
      value: metrics.low_stock_count.toString(), 
      change: "-5%", 
      icon: AlertCircle, 
      color: "warning" as const
    },
    { 
      label: "Locations", 
      value: metrics.total_locations.toString(), 
      change: "+2", 
      icon: MapPin, 
      color: "accent" as const
    },
    { 
      label: "Printers", 
      value: metrics.total_printers.toString(), 
      change: "+3", 
      icon: Printer, 
      color: "success" as const
    },
  ]

  const financialCards = [
    {
      label: "Total Spent",
      value: `$${metrics.total_spent.toFixed(2)}`,
      change: "All time",
      icon: DollarSign,
      color: "primary" as const
    },
    {
      label: "Pending Payments",
      value: `$${metrics.pending_payments.toFixed(2)}`,
      change: "To receive",
      icon: Clock,
      color: "warning" as const
    },
    {
      label: "Received",
      value: `$${metrics.paid_amount.toFixed(2)}`,
      change: "Completed",
      icon: DollarSign,
      color: "success" as const
    },
  ]

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"]

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Inventory Metrics */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Inventory Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metricCards.map((metric, idx) => (
            <div key={idx} className="animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
              <MetricCard {...metric} />
            </div>
          ))}
        </div>
      </div>

      {/* Financial Metrics */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Financial Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {financialCards.map((metric, idx) => (
            <div key={idx} className="animate-slide-up" style={{ animationDelay: `${(idx + 4) * 100}ms` }}>
              <MetricCard {...metric} />
            </div>
          ))}
        </div>
      </div>

      {/* Payment Status by Location */}
      {financial.transactions_by_location && financial.transactions_by_location.length > 0 && (
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
          <h3 className="text-lg font-semibold text-white mb-4">Payment Status by School</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">School</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300">Total</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300">Pending</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300">Paid</th>
                </tr>
              </thead>
              <tbody>
                {financial.transactions_by_location.map((item: any, idx: number) => (
                  <tr key={idx} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                    <td className="px-4 py-3 text-sm text-white font-medium">{item.location}</td>
                    <td className="px-4 py-3 text-sm text-right text-white font-bold">
                      ${item.total?.toFixed(2) || "0.00"}
                    </td>
                    <td className="px-4 py-3 text-sm text-right">
                      <span className="text-yellow-400 font-semibold">
                        ${item.pending?.toFixed(2) || "0.00"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-right">
                      <span className="text-green-400 font-semibold">
                        ${item.paid?.toFixed(2) || "0.00"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Financial Bar Chart */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
          <h3 className="text-lg font-semibold text-white mb-4">Payments by Location</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={financial.transactions_by_location}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="location" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
              <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#fff"
                }}
              />
              <Legend />
              <Bar dataKey="pending" fill="#f59e0b" radius={[8, 8, 0, 0]} name="Pending" />
              <Bar dataKey="paid" fill="#10b981" radius={[8, 8, 0, 0]} name="Paid" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
          <h3 className="text-lg font-semibold text-white mb-4">Payment Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: "Pending", value: financial.total_pending },
                  { name: "Paid", value: financial.total_paid }
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(props) => {
  const { name, value } = props.payload as { name: string; value: number };
  return `${name}: $${value.toFixed(2)}`;
}}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {[0, 1].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? "#f59e0b" : "#10b981"} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#fff"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}