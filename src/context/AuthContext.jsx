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

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', currentUser.id)
      .maybeSingle()

    if (error) {
      console.error('Unable to load profile:', error)
      setProfile(null)
      return
    }

    setProfile(data || null)
  }

  useEffect(() => {
    if (!hasSupabaseConfig) {
      setLoading(false)
      return
    }

    let mounted = true

    const initialise = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (!mounted) return

      if (error) console.error('Unable to restore session:', error)
      const currentUser = data.session?.user ?? null
      setUser(currentUser)
      await loadProfile(currentUser)
      if (mounted) setLoading(false)
    }

    initialise()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      setLoading(true)

      // Avoid doing profile/database work inside Supabase's auth callback.
      setTimeout(async () => {
        if (!mounted) return
        await loadProfile(currentUser)
        if (mounted) setLoading(false)
      }, 0)
    })

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const signUp = async ({ name, email, password }) => {
    if (!supabase) throw new Error('Authentication is not configured yet.')

    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: { full_name: name.trim() },
        emailRedirectTo: `${window.location.origin}/`,
      },
    })

    if (error) throw error

    // If email confirmation is disabled, a session is returned immediately.
    // The database trigger creates the profile automatically.
    if (data.user && data.session) {
      await loadProfile(data.user)
    }

    return data
  }

  const signIn = async (email, password) => {
    if (!supabase) throw new Error('Authentication is not configured yet.')

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    })

    if (error) throw error

    if (data.user) await loadProfile(data.user)
    return data
  }

  const signOut = async () => {
    if (supabase) await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      signUp,
      signIn,
      signOut,
      isAdmin: profile?.role === 'admin',
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) throw new Error('useAuth must be used inside AuthProvider')
  return value
}
