"use client"

import { useState, useEffect } from "react"
import { Printer, Plus, Edit2, Trash2, X, AlertCircle } from "lucide-react"

interface Location {
  id: number
  name: string
}

interface Printer {
  id: number
  model: string
  serial_number: string
  location_id: number
  location_name: string
  status: string
  supplies: string | null
}

interface PrinterFormData {
  model: string
  serial_number: string
  location_id: string
  status: string
  supplies: string
}

export function PrintersView() {
  const [printers, setPrinters] = useState<Printer[]>([])
  const [locations, setLocations] = useState<Location[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPrinter, setEditingPrinter] = useState<Printer | null>(null)
  const [formData, setFormData] = useState<PrinterFormData>({
    model: "",
    serial_number: "",
    location_id: "",
    status: "Active",
    supplies: ""
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [printersRes, locationsRes] = await Promise.all([
        fetch("http://localhost:8000/api/printers"),
        fetch("http://localhost:8000/api/locations")
      ])

      if (printersRes.ok) setPrinters(await printersRes.json())
      if (locationsRes.ok) setLocations(await locationsRes.json())
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenAdd = () => {
    setFormData({
      model: "",
      serial_number: "",
      location_id: "",
      status: "Active",
      supplies: ""
    })
    setEditingPrinter(null)
    setError("")
    setIsModalOpen(true)
  }

  const handleEdit = (printer: Printer) => {
    setFormData({
      model: printer.model,
      serial_number: printer.serial_number,
      location_id: printer.location_id.toString(),
      status: printer.status,
      supplies: printer.supplies || ""
    })
    setEditingPrinter(printer)
    setError("")
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSubmitting(true)

    const url = editingPrinter
      ? `http://localhost:8000/api/printers/${editingPrinter.id}`
      : "http://localhost:8000/api/printers"

    const method = editingPrinter ? "PUT" : "POST"

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: formData.model,
          serial_number: formData.serial_number,
          location_id: Number(formData.location_id),
          status: formData.status,
          supplies: formData.supplies || null
        })
      })

      if (response.ok) {
        await fetchData()
        setIsModalOpen(false)
      } else {
        const errorData = await response.json()
        setError(errorData.detail || "Failed to save printer")
      }
    } catch (error) {
      setError("Cannot connect to server. Ensure backend is running on port 8000.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this printer?")) return

    try {
      await fetch(`http://localhost:8000/api/printers/${id}`, { method: "DELETE" })
      setPrinters(printers.filter(p => p.id !== id))
    } catch (error) {
      alert("Failed to delete printer")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/20 text-green-400"
      case "Maintenance":
        return "bg-yellow-500/20 text-yellow-400"
      case "Inactive":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading printers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Printers</h1>
          <p className="text-gray-400 text-sm mt-1">Manage printer inventory and status</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/50"
        >
          <Plus className="w-4 h-4" />
          Add Printer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {printers.map((printer) => (
          <div
            key={printer.id}
            className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:scale-102 group"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-500/20 rounded-xl shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all">
                <Printer className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">{printer.model}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(printer)}
                      className="p-2 hover:bg-gray-700 rounded-lg transition-all text-blue-400 hover:text-blue-300"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(printer.id)}
                      className="p-2 hover:bg-gray-700 rounded-lg transition-all text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-2">SN: {printer.serial_number}</p>
                <p className="text-sm text-gray-400 mb-3">📍 {printer.location_name}</p>
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(printer.status)}`}>
                    {printer.status}
                  </span>
                  {printer.supplies && (
                    <span className="text-xs text-gray-500">{printer.supplies}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl max-w-md w-full p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingPrinter ? "Edit Printer" : "Add New Printer"}
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

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Printer Model</label>
                <input
                  required
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="HP LaserJet Pro M404n"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Serial Number</label>
                <input
                  required
                  value={formData.serial_number}
                  onChange={(e) => setFormData({ ...formData, serial_number: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="CNBWK12345"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Location</label>
                <select
                  required
                  value={formData.location_id}
                  onChange={(e) => setFormData({ ...formData, location_id: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Location</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Supplies (optional)</label>
                <input
                  value={formData.supplies}
                  onChange={(e) => setFormData({ ...formData, supplies: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Toner: 80%, Drum: Good"
                />
              </div>

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
                  {submitting ? "Saving..." : editingPrinter ? "Update Printer" : "Add Printer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}