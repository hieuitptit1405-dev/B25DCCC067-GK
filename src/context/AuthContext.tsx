import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
const STORAGE_KEY = 'miniblog_user'
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = '123456'
interface AuthContextValue {
  user: string | null
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(() => localStorage.getItem(STORAGE_KEY))
  const login = useCallback((username: string, password: string) => {
    const isValid = username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD
    if (!isValid) return false
    localStorage.setItem(STORAGE_KEY, ADMIN_USERNAME)
    setUser(ADMIN_USERNAME)
    return true
  }, [])
  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }, [])
  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated: user !== null, login, logout }),
    [user, login, logout],
  )
  return <AuthContext value={value}>{children}</AuthContext>
}
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth phải được dùng bên trong <AuthProvider>.')
  }
  return context
}