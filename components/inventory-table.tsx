"use client"

import { Edit2, Trash2 } from "lucide-react"

interface InventoryItem {
  id: number
  name: string
  sku: string
  quantity: number
  minStock: number
  price: number
  school: string
  totalPrice: number
  status: string
}

interface InventoryTableProps {
  items: InventoryItem[]
}

export function InventoryTable({ items }: InventoryTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-success/10 text-success"
      case "Low Stock":
        return "bg-warning/10 text-warning"
      case "Out of Stock":
        return "bg-danger/10 text-danger"
      default:
        return "bg-muted/10 text-muted"
    }
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 ease-out">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-background">
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">SKU</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Quantity</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Min Stock</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Price</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Total Price</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">School</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-b border-border hover:bg-background transition-all duration-300 ease-out"
              >
                <td className="px-6 py-4 text-sm text-foreground font-medium">{item.name}</td>
                <td className="px-6 py-4 text-sm text-foreground">{item.sku}</td>
                <td className="px-6 py-4 text-sm text-foreground font-semibold">{item.quantity}</td>
                <td className="px-6 py-4 text-sm text-foreground">{item.minStock}</td>
                <td className="px-6 py-4 text-sm text-foreground font-medium">${item.price?.toFixed(2) || "0.00"}</td>
                <td className="px-6 py-4 text-sm text-foreground font-semibold">
                  ${item.totalPrice?.toFixed(2) || "0.00"}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">{item.school}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm flex gap-2">
                  <button className="p-2 hover:bg-background rounded-lg transition-all duration-300 ease-out text-foreground hover:text-primary">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-background rounded-lg transition-all duration-300 ease-out text-foreground hover:text-danger">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
