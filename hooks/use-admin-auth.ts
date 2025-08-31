import { useState, useEffect } from "react"

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminUsername, setAdminUsername] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing admin session on mount
    const adminSession = localStorage.getItem("trendbase-admin-session")
    const username = localStorage.getItem("trendbase-admin-username")
    
    if (adminSession === "true" && username) {
      setIsAdmin(true)
      setAdminUsername(username)
    }
    
    setIsLoading(false)
  }, [])

  const login = (username: string) => {
    localStorage.setItem("trendbase-admin-session", "true")
    localStorage.setItem("trendbase-admin-username", username)
    setIsAdmin(true)
    setAdminUsername(username)
  }

  const logout = () => {
    localStorage.removeItem("trendbase-admin-session")
    localStorage.removeItem("trendbase-admin-username")
    setIsAdmin(false)
    setAdminUsername("")
  }

  const checkAuth = () => {
    const adminSession = localStorage.getItem("trendbase-admin-session")
    const username = localStorage.getItem("trendbase-admin-username")
    
    if (adminSession === "true" && username) {
      setIsAdmin(true)
      setAdminUsername(username)
      return true
    } else {
      setIsAdmin(false)
      setAdminUsername("")
      return false
    }
  }

  return {
    isAdmin,
    adminUsername,
    isLoading,
    login,
    logout,
    checkAuth
  }
}
