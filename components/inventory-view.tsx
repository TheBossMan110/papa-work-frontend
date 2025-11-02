// components/inventory-view.tsx
"use client"

import { useState, useEffect } from "react"
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  X,
  AlertCircle,
  DollarSign,
  Warehouse,
  Printer,
} from "lucide-react"

interface Category {
  id: number
  name: string
}
interface Location {
  id: number
  name: string
}
interface Printer {
  id: number
  model: string
  location_name: string
}
interface InventoryItem {
  id: number
  name: string
  sku: string
  category_id: number
  category_name: string
  quantity: number
  min_stock: number
  price: number
  total_price: number
  location_id: number
  location_name: string
  printer_id: number | null
  printer_name: string | null
  status: string
}

interface FormData {
  name: string
  sku: string
  category_id: string
  quantity: string
  min_stock: string
  price: string
  location_id: string
  printer_id: string
}

export function InventoryView() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [locations, setLocations] = useState<Location[]>([])
  const [printers, setPrinters] = useState<Printer[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    sku: "",
    category_id: "",
    quantity: "",
    min_stock: "",
    price: "",
    location_id: "",
    printer_id: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  /* ------------------------------------------------- */
  /* FETCH ALL REFERENCE DATA + INVENTORY LIST */
  /* ------------------------------------------------- */
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [invRes, catRes, locRes, priRes] = await Promise.all([
          fetch("http://localhost:8000/api/inventory"),
          fetch("http://localhost:8000/api/categories"),
          fetch("http://localhost:8000/api/locations"),
          fetch("http://localhost:8000/api/printers"),
        ])

        if (invRes.ok) setItems(await invRes.json())
        if (catRes.ok) setCategories(await catRes.json())
        if (locRes.ok) setLocations(await locRes.json())
        if (priRes.ok) setPrinters(await priRes.json())
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  /* ------------------------------------------------- */
  /* MODAL OPEN / CLOSE */
  /* ------------------------------------------------- */
  const openAdd = () => {
    setFormData({
      name: "",
      sku: "",
      category_id: "",
      quantity: "",
      min_stock: "",
      price: "",
      location_id: "",
      printer_id: "",
    })
    setEditingItem(null)
    setError("")
    setIsModalOpen(true)
  }

  const openEdit = (item: InventoryItem) => {
    setFormData({
      name: item.name,
      sku: item.sku,
      category_id: item.category_id.toString(),
      quantity: item.quantity.toString(),
      min_stock: item.min_stock.toString(),
      price: item.price.toString(),
      location_id: item.location_id.toString(),
      printer_id: item.printer_id?.toString() ?? "",
    })
    setEditingItem(item)
    setError("")
    setIsModalOpen(true)
  }

  /* ------------------------------------------------- */
  /* SUBMIT (ADD / UPDATE) */
  /* ------------------------------------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSubmitting(true)

    const payload = {
      name: formData.name,
      sku: formData.sku,
      category_id: Number(formData.category_id),
      quantity: Number(formData.quantity),
      min_stock: Number(formData.min_stock),
      price: Number(formData.price),
      location_id: Number(formData.location_id),
      printer_id: formData.printer_id ? Number(formData.printer_id) : null,
    }

    const url = editingItem
      ? `http://localhost:8000/api/inventory/${editingItem.id}`
      : "http://localhost:8000/api/inventory"

    const method = editingItem ? "PUT" : "POST"

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        // Refresh full list
        const invRes = await fetch("http://localhost:8000/api/inventory")
        if (invRes.ok) setItems(await invRes.json())
        setIsModalOpen(false)
      } else {
        const err = await res.json()
        setError(err.detail || "Failed to save item")
      }
    } catch (err) {
      setError("Cannot connect to backend (port 8000)")
    } finally {
      setSubmitting(false)
    }
  }

  /* ------------------------------------------------- */
  /* DELETE */
  /* ------------------------------------------------- */
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this item?")) return
    try {
      await fetch(`http://localhost:8000/api/inventory/${id}`, { method: "DELETE" })
      setItems(items.filter((i) => i.id !== id))
    } catch {
      alert("Failed to delete")
    }
  }

  /* ------------------------------------------------- */
  /* LOADING UI */
  /* ------------------------------------------------- */
  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading inventory...</p>
        </div>
      </div>
    )
  }

  /* ------------------------------------------------- */
  /* MAIN UI */
  /* ------------------------------------------------- */
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Inventory</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage items, stock levels and pricing
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/50"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      {/* Table */}
      <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700 bg-gray-900/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Item
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  SKU
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Qty / Min
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Printer
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-all"
                >
                  <td className="px-6 py-4 text-sm text-white font-medium">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{item.sku}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {item.category_name}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`font-bold ${
                        item.quantity < item.min_stock
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {item.quantity}
                    </span>{" "}
                    / {item.min_stock}
                  </td>
                  <td className="px-6 py-4 text-sm text-white">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {item.location_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {item.printer_name || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm flex gap-2">
                    <button
                      onClick={() => openEdit(item)}
                      className="p-2 hover:bg-gray-700 rounded-lg text-blue-400 hover:text-blue-300 transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 hover:bg-gray-700 rounded-lg text-red-400 hover:text-red-300 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ---------- MODAL ---------- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl max-w-lg w-full p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingItem ? "Edit Item" : "Add New Item"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gray-700 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Item Name
                </label>
                <input
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Toner Cartridge HP 305A"
                />
              </div>

              {/* SKU */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  SKU
                </label>
                <input
                  required
                  value={formData.sku}
                  onChange={(e) =>
                    setFormData({ ...formData, sku: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="TCB-001"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Category
                </label>
                <select
                  required
                  value={formData.category_id}
                  onChange={(e) =>
                    setFormData({ ...formData, category_id: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Quantity
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Min Stock
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={formData.min_stock}
                    onChange={(e) =>
                      setFormData({ ...formData, min_stock: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Price (per unit)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                  <input
                    required
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Location
                </label>
                <div className="relative">
                  <Warehouse className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                  <select
                    required
                    value={formData.location_id}
                    onChange={(e) =>
                      setFormData({ ...formData, location_id: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Location</option>
                    {locations.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Printer (optional) */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Printer (optional)
                </label>
                <div className="relative">
                  <Printer className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                  <select
                    value={formData.printer_id}
                    onChange={(e) =>
                      setFormData({ ...formData, printer_id: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">None</option>
                    {printers.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.model} ({p.location_name})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-xl text-white font-medium hover:bg-gray-600 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all hover:scale-105 shadow-lg shadow-blue-500/50 disabled:opacity-50"
                >
                  {submitting
                    ? "Saving..."
                    : editingItem
                    ? "Update Item"
                    : "Add Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}