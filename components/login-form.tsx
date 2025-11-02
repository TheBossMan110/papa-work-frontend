"use client"

import type React from "react"
import { useState } from "react"
import { Lock, LogIn, UserPlus } from "lucide-react"

interface LoginFormProps {
  onLogin: (username: string, role: string) => void
  onToggle: () => void // Added to switch to Signup
}

export function LoginForm({ onLogin, onToggle }: LoginFormProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Demo credentials
  const DEMO_USERS = {
    admin: { password: "admin123", role: "Admin" },
    manager: { password: "manager123", role: "Manager" },
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const user = DEMO_USERS[username as keyof typeof DEMO_USERS]
    if (user && user.password === password) {
      onLogin(username, user.role)
    } else {
      setError("Invalid credentials. Try admin/admin123 or manager/manager123")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary rounded-lg">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">IMS</h1>
          </div>
          <p className="text-muted text-sm">Inventory Management System</p>
        </div>

        {/* Login Card */}
        <div className="bg-card border border-border rounded-xl p-8 shadow-2xl hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 ease-out">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin or manager"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ease-out"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ease-out"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-danger/10 border border-danger/30 rounded-lg text-danger text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-all duration-300 ease-out disabled:opacity-50 flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105"
            >
              <LogIn className="w-4 h-4" />
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Toggle to Signup */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted">
              Don't have an account?{" "}
              <button
                onClick={onToggle}
                className="text-primary hover:text-primary-dark font-medium underline-offset-4 hover:underline transition-all"
              >
                Sign up
              </button>
            </p>
          </div>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-background rounded-lg border border-border">
            <p className="text-xs text-muted mb-2 font-semibold">Demo Credentials:</p>
            <div className="space-y-1 text-xs text-muted">
              <p>Admin: admin / admin123</p>
              <p>Manager: manager / manager123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}