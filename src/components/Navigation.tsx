'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Menu, X, Leaf } from 'lucide-react'
import { useState } from 'react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'Home' },
    { href: '/fruites', label: 'Gallery' },
    { href: '/contactUs', label: 'Contact Us' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-green-600 to-green-800 p-2 rounded-lg"
            >
              <Leaf className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-700 to-green-900 bg-clip-text text-transparent">
              AgriNova
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative group"
              >
                <span className={`text-lg font-medium transition-colors ${
                  pathname === link.href 
                    ? 'text-green-700' 
                    : 'text-gray-700 hover:text-green-600'
                }`}>
                  {link.label}
                </span>
                {pathname === link.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 h-0.5 bg-green-600 bottom-[-8px]"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-green-50 transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-green-700" />
            ) : (
              <Menu className="w-6 h-6 text-green-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden pb-4"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block py-3 px-4 rounded-lg mb-1 transition-colors ${
                  pathname === link.href
                    ? 'bg-green-100 text-green-700 font-medium'
                    : 'text-gray-700 hover:bg-green-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  )
}
