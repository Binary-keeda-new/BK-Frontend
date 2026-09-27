'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import { getCurrentUser } from '@/shared/services/auth.service'
import { CurrentUser } from '@/shared/types/auth.types'
import { useSession } from "@descope/nextjs-sdk/client";

type AuthContextType = {
  user: CurrentUser | null
  loading: boolean
  isAdmin: boolean
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  refreshUser: async () => {},
})

export function AppAuthProvider({ children }: { children: React.ReactNode }) {
  const { sessionToken, isSessionLoading } = useSession();
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = async () => {
    try {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    } catch {
      setUser(null)
    }
  }

  useEffect(() => {
    if (isSessionLoading) return;

    const token = sessionToken || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    const expiry = localStorage.getItem("sessionExpiry");

    if (expiry && Date.now() > Number(expiry)) {
      localStorage.removeItem("sessionExpiry");
      setUser(null);
      setLoading(false);
      return;
    }

    refreshUser().finally(() => setLoading(false));
  }, [sessionToken, isSessionLoading]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin: user?.role === 'admin',
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAppAuth = () => useContext(AuthContext)
