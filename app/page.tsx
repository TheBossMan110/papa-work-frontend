"use client"

import { useState } from "react"
import { LoginForm } from "@/components/login-form"
import { SignupForm } from "../components/signup-form"
import { Dashboard } from "@/components/dashboard"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [user, setUser] = useState<{ username: string; email: string; role: string } | null>(null)

  const handleLogin = (userData: any) => {
    setUser(userData)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  const toggleAuthMode = () => {
    setShowSignup(!showSignup)
  }

  if (!isAuthenticated) {
    return showSignup ? (
      <SignupForm onSignup={handleLogin} onToggle={toggleAuthMode} />
    ) : (
      <LoginForm onLogin={handleLogin} onToggle={toggleAuthMode} />
    )
  }

  return <Dashboard user={user} onLogout={handleLogout} />
}