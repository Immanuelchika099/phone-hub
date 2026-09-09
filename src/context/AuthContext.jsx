import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, hasSupabaseConfig } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = async (currentUser) => {
    if (!currentUser || !supabase) {
      setProfile(null)
      return
    }
    const { data } = await supabase.from('profiles').select('*').eq('id', currentUser.id).maybeSingle()
    setProfile(data || null)
  }

  useEffect(() => {
    if (!hasSupabaseConfig) {
      setLoading(false)
      return
    }

    let mounted = true
    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) return
      setUser(data.session?.user ?? null)
      await loadProfile(data.session?.user ?? null)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
      await loadProfile(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const signUp = async ({ name, email, password }) => {
    if (!supabase) throw new Error('Authentication is not configured yet.')
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/`,
      },
    })
    if (error) throw error
    return data
  }

  const signIn = async (email, password) => {
    if (!supabase) throw new Error('Authentication is not configured yet.')
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }

  const signOut = async () => {
    if (supabase) await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signOut, isAdmin: profile?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) throw new Error('useAuth must be used inside AuthProvider')
  return value
}
