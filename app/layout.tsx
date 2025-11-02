import type React from "react"
import "./globals.css"

export const metadata = {
  title: "Inventory Management System",
  description: "Professional inventory tracking for printer supplies",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">{children}</body>
    </html>
  )
}
