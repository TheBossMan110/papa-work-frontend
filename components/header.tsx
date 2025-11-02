"use client"

import { LogOut, User, Sparkles } from "lucide-react"

interface HeaderProps {
  user: { username: string; email?: string; role: string } | null
  onLogout: () => void
}

export function Header({ user, onLogout }: HeaderProps) {
  return (
    <header className="bg-gray-800/50 backdrop-blur-xl border-b border-gray-700/50 px-6 py-4 flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">Welcome back, {user?.username}!</h2>
        </div>
        <p className="text-sm text-gray-400">Manage your inventory efficiently</p>
      </div>

      <div className="flex items-center gap-4">
        {/* User Info */}
        <div className="flex items-center gap-3 px-4 py-2 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-gray-600 transition-all">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <User className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">{user?.username}</p>
            <p className="text-xs text-gray-400">{user?.role}</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="p-3 hover:bg-gray-700 rounded-xl transition-all duration-300 text-gray-400 hover:text-red-400 group"
          title="Logout"
        >
          <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        </button>
      </div>
    </header>
  )
}