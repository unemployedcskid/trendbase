'use client'

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { UserProfile } from "@/components/user-profile"
import { usePathname } from "next/navigation"

export function MainNavigation() {
  const { isAuthenticated, loading } = useAuth()
  const pathname = usePathname()

  // Helper function to check if a link is active
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    if (path === '/blog') {
      return pathname === '/blog'
    }
    return pathname.startsWith(path)
  }

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yw0RAEywcB7yAXSSPje6lC1exs5O2g.png"
                alt="Trendbase logo"
                width={200}
                height={46}
                className="h-12 w-auto"
              />
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`font-medium transition-colors ${
                isActive('/') 
                  ? 'text-purple-600 hover:text-purple-700' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/blog" 
              className={`transition-colors ${
                isActive('/blog') 
                  ? 'text-purple-600 hover:text-purple-700 font-medium' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Blogs
            </Link>
            <Link 
              href="/contact" 
              className={`transition-colors ${
                isActive('/contact') 
                  ? 'text-purple-600 hover:text-purple-700 font-medium' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Contact
            </Link>
            {!loading && isAuthenticated && (
              <Link 
                href="/blog/manage" 
                className={`transition-colors ${
                  isActive('/blog/manage') 
                    ? 'text-purple-600 hover:text-purple-700 font-medium' 
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Dashboard
              </Link>
            )}
          </nav>
          
          <div className="flex items-center space-x-4">
            {!loading && isAuthenticated ? (
              <UserProfile />
            ) : (
              <Link href="/login">
                <Button variant="outline" className="border-gray-300">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
