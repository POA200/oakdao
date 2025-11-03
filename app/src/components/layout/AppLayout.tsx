import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto p-6">{children}</main>
      <Footer />
    </div>
  )
}
