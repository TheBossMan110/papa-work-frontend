"use client"

import { useState, useEffect } from "react"
import { FileText, AlertTriangle, DollarSign, Package } from "lucide-react"

interface LowStockItem {
  id: number
  name: string
  sku: string
  category_name: string
  location_name: string
  quantity: number
  min_stock: number
  price: number
  total_value: number
}

interface ValueByCategory {
  category: string
  total_value: number
  total_quantity: number
}

interface ValueByLocation {
  location: string
  total_value: number
  item_count: number
}

export function ReportsView() {
  const [lowStockItems, setLowStockItems] = useState<LowStockItem[]>([])
  const [valueByCategory, setValueByCategory] = useState<ValueByCategory[]>([])
  const [valueByLocation, setValueByLocation] = useState<ValueByLocation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      const [lowStockRes, inventoryValueRes] = await Promise.all([
        fetch("http://localhost:8000/api/reports/low-stock"),
        fetch("http://localhost:8000/api/reports/inventory-value")
      ])

      if (lowStockRes.ok) {
        setLowStockItems(await lowStockRes.json())
      }

      if (inventoryValueRes.ok) {
        const data = await inventoryValueRes.json()
        setValueByCategory(data.by_category || [])
        setValueByLocation(data.by_location || [])
      }
    } catch (error) {
      console.error("Error fetching reports:", error)
    } finally {
      setLoading(false)
    }
  }

  const totalInventoryValue = valueByCategory.reduce((sum, cat) => sum + (cat.total_value || 0), 0)
  const totalItems = valueByCategory.reduce((sum, cat) => sum + (cat.total_quantity || 0), 0)

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading reports...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white">Reports & Analytics</h1>
        <p className="text-gray-400 text-sm mt-1">Inventory insights and analysis</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-500/20 rounded-xl shadow-lg shadow-blue-500/30">
              <DollarSign className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Inventory Value</p>
              <p className="text-2xl font-bold text-white">${totalInventoryValue.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-yellow-500/20 rounded-xl shadow-lg shadow-yellow-500/30">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Low Stock Items</p>
              <p className="text-2xl font-bold text-white">{lowStockItems.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-500/20 rounded-xl shadow-lg shadow-purple-500/30">
              <Package className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Items</p>
              <p className="text-2xl font-bold text-white">{totalItems}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Low Stock Report */}
      <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-6 h-6 text-yellow-400" />
          <h2 className="text-xl font-bold text-white">Low Stock Alert</h2>
        </div>

        {lowStockItems.length === 0 ? (
          <p className="text-gray-400 text-center py-8">All items are adequately stocked! 🎉</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Item</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">SKU</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Location</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300">Current</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300">Min</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300">Value</th>
                </tr>
              </thead>
              <tbody>
                {lowStockItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                    <td className="px-4 py-3 text-sm text-white font-medium">{item.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{item.sku}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{item.category_name}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{item.location_name}</td>
                    <td className="px-4 py-3 text-sm text-right">
                      <span className="text-red-400 font-bold">{item.quantity}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-gray-300">{item.min_stock}</td>
                    <td className="px-4 py-3 text-sm text-right text-white font-semibold">
                      ${item.total_value?.toFixed(2) || "0.00"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inventory Value by Category */}
      <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-bold text-white">Inventory Value by Category</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Category</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300">Quantity</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300">Total Value</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300">% of Total</th>
              </tr>
            </thead>
            <tbody>
              {valueByCategory.map((cat, idx) => (
                <tr key={idx} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3 text-sm text-white font-medium">{cat.category}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-300">{cat.total_quantity || 0}</td>
                  <td className="px-4 py-3 text-sm text-right text-white font-semibold">
                    ${cat.total_value?.toFixed(2) || "0.00"}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-blue-400 font-medium">
                    {totalInventoryValue > 0 ? ((cat.total_value / totalInventoryValue) * 100).toFixed(1) : 0}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inventory Value by Location */}
      <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-6 h-6 text-green-400" />
          <h2 className="text-xl font-bold text-white">Inventory Value by Location</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Location</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300">Item Count</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300">Total Value</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300">% of Total</th>
              </tr>
            </thead>
            <tbody>
              {valueByLocation.map((loc, idx) => (
                <tr key={idx} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3 text-sm text-white font-medium">{loc.location}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-300">{loc.item_count || 0}</td>
                  <td className="px-4 py-3 text-sm text-right text-white font-semibold">
                    ${loc.total_value?.toFixed(2) || "0.00"}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-green-400 font-medium">
                    {totalInventoryValue > 0 ? ((loc.total_value / totalInventoryValue) * 100).toFixed(1) : 0}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}