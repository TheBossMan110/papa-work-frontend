"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

interface InventoryModalProps {
  onClose: () => void
  onAdd: (item: any) => void
}

export function InventoryModal({ onClose, onAdd }: InventoryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    quantity: "",
    minStock: "",
    price: "",
    school: "",
    category: "",
  })

  const [totalPrice, setTotalPrice] = useState(0)

  const handleQuantityOrPriceChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value }
    setFormData(newData)

    if (newData.quantity && newData.price) {
      const total = Number.parseFloat(newData.quantity) * Number.parseFloat(newData.price)
      setTotalPrice(total)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({
      ...formData,
      quantity: Number.parseInt(formData.quantity),
      minStock: Number.parseInt(formData.minStock),
      price: Number.parseFloat(formData.price),
      totalPrice: totalPrice,
      status: "In Stock",
    })
    setFormData({
      name: "",
      sku: "",
      quantity: "",
      minStock: "",
      price: "",
      school: "",
      category: "",
    })
    setTotalPrice(0)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card border border-border rounded-xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Add New Item</h2>
          <button onClick={onClose} className="p-1 hover:bg-background rounded-lg transition-all duration-300 ease-out">
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Item Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ease-out"
              placeholder="e.g., Toner Cartridge"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">SKU</label>
            <input
              type="text"
              required
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ease-out"
              placeholder="e.g., TCB-001"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Category</label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ease-out"
            >
              <option value="">Select Category</option>
              <option value="Toner">Toner</option>
              <option value="Paper">Paper</option>
              <option value="Ink">Ink</option>
              <option value="Supplies">Supplies</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Quantity</label>
              <input
                type="number"
                required
                value={formData.quantity}
                onChange={(e) => handleQuantityOrPriceChange("quantity", e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ease-out"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Min Stock</label>
              <input
                type="number"
                required
                value={formData.minStock}
                onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ease-out"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Price per Unit ($)</label>
            <input
              type="number"
              required
              step="0.01"
              value={formData.price}
              onChange={(e) => handleQuantityOrPriceChange("price", e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ease-out"
              placeholder="0.00"
            />
          </div>

          {totalPrice > 0 && (
            <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-sm text-muted">Total Price</p>
              <p className="text-lg font-bold text-foreground">${totalPrice.toFixed(2)}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">School/Location</label>
            <select
              required
              value={formData.school}
              onChange={(e) => setFormData({ ...formData, school: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ease-out"
            >
              <option value="">Select School</option>
              <option value="Main School">Main School</option>
              <option value="Branch School A">Branch School A</option>
              <option value="Branch School B">Branch School B</option>
              <option value="Central Office">Central Office</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-foreground font-medium hover:bg-card transition-all duration-300 ease-out"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-all duration-300 ease-out hover:shadow-lg hover:scale-105"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
