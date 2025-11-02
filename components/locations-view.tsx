"use client"

import { useState, useEffect } from "react"
import { MapPin, Plus, Edit2, Trash2, X } from "lucide-react"

interface Location {
  id: number
  name: string
  address: string
  items: number
  printers: number
}

interface LocationFormData {
  name: string
  address: string
}

export function LocationsView() {
  const [locations, setLocations] = useState<Location[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingLocation, setEditingLocation] = useState<Location | null>(null)
  const [formData, setFormData] = useState<LocationFormData>({ name: "", address: "" })
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLocations()
  }, [])

  const fetchLocations = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/locations")
      if (response.ok) {
        const data = await response.json()
        setLocations(data)
      }
    } catch (error) {
      console.error("Error fetching locations:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this location?")) return

    try {
      const response = await fetch(`http://localhost:8000/api/locations/${id}`, {
        method: "DELETE"
      })

      if (response.ok) {
        setLocations(locations.filter(loc => loc.id !== id))
      } else {
        alert("Failed to delete location. Check backend.")
      }
    } catch (error) {
      console.error("Error deleting location:", error)
      alert("Error deleting location.")
    }
  }

  const handleEdit = (location: Location) => {
    setFormData({ name: location.name, address: location.address })
    setEditingLocation(location)
    setIsModalOpen(true)
    setError("")
  }

  const handleOpenAdd = () => {
    setFormData({ name: "", address: "" })
    setEditingLocation(null)
    setIsModalOpen(true)
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    const url = editingLocation 
      ? `http://localhost:8000/api/locations/${editingLocation.id}`
      : "http://localhost:8000/api/locations"

    const method = editingLocation ? "PUT" : "POST"

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        // Refetch to get updated data (including computed items/printers)
        await fetchLocations()
        setIsModalOpen(false)
        setEditingLocation(null)
      } else {
        const errorData = await response.json().catch(() => ({ detail: "Unknown error" }))
        setError(errorData.detail || "Failed to save location.")
      }
    } catch (error) {
      console.error("Error saving location:", error)
      setError("Cannot connect to server. Ensure backend is running on port 8000.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading locations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Locations</h1>
          <p className="text-gray-400 text-sm mt-1">Manage inventory locations and branches</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/50"
        >
          <Plus className="w-4 h-4" />
          Add Location
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {locations.map((location) => (
          <div
            key={location.id}
            className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:scale-102 group"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-500/20 rounded-xl shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all">
                <MapPin className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">{location.name}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(location)}
                      className="p-2 hover:bg-gray-700 rounded-lg transition-all text-blue-400 hover:text-blue-300"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(location.id)}
                      className="p-2 hover:bg-gray-700 rounded-lg transition-all text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-4">{location.address}</p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-gray-700/50 rounded-xl p-3">
                    <p className="text-2xl font-bold text-white">{location.items}</p>
                    <p className="text-xs text-gray-400">Items</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-xl p-3">
                    <p className="text-2xl font-bold text-white">{location.printers}</p>
                    <p className="text-xs text-gray-400">Printers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <LocationModal
          location={editingLocation}
          formData={formData}
          onChange={setFormData}
          onClose={() => {
            setIsModalOpen(false)
            setEditingLocation(null)
            setError("")
          }}
          onSubmit={handleSubmit}
          error={error}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  )
}

// Updated Modal Component (now external for reusability)
interface LocationModalProps {
  location?: Location | null
  formData: LocationFormData
  onChange: (data: LocationFormData) => void
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
  error: string
  isSubmitting: boolean
}

function LocationModal({ 
  location, 
  formData, 
  onChange, 
  onClose, 
  onSubmit, 
  error, 
  isSubmitting 
}: LocationModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl max-w-md w-full p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {location ? "Edit Location" : "Add New Location"}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded-lg transition-all">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Location Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => onChange({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Main School"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Address</label>
            <textarea
              required
              value={formData.address}
              onChange={(e) => onChange({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 123 Education Street, District A"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-xl text-white font-medium hover:bg-gray-600 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all hover:scale-105 shadow-lg shadow-blue-500/50 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : (location ? "Update" : "Add")} Location
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}