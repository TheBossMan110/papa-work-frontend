"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { LucideIcon } from "lucide-react"

interface MetricCardProps {
  label: string
  value: string
  change: string
  icon: LucideIcon
  color: "primary" | "warning" | "accent" | "success"
}

export function MetricCard({ label, value, change, icon: Icon, color }: MetricCardProps) {
  const colorClasses = {
    primary: "bg-blue-500/20 text-blue-400 shadow-blue-500/50",
    warning: "bg-yellow-500/20 text-yellow-400 shadow-yellow-500/50",
    accent: "bg-purple-500/20 text-purple-400 shadow-purple-500/50",
    success: "bg-green-500/20 text-green-400 shadow-green-500/50",
  }

  const glowClasses = {
    primary: "group-hover:shadow-blue-500/60",
    warning: "group-hover:shadow-yellow-500/60",
    accent: "group-hover:shadow-purple-500/60",
    success: "group-hover:shadow-green-500/60",
  }

  const isPositive = change.startsWith("+")
  const isNumeric = /^[+-]/.test(change)

  return (
    <div className="group bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-500 hover:scale-105 hover:border-gray-600">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${colorClasses[color]} shadow-lg transition-all duration-300 ${glowClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        {isNumeric && (
          <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? "text-green-400" : "text-red-400"}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {change}
          </div>
        )}
        {!isNumeric && (
          <div className="text-sm font-medium text-gray-400">{change}</div>
        )}
      </div>
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  )
}