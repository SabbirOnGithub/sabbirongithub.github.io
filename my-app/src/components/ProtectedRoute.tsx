import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<'loading' | 'auth' | 'unauth'>('loading')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setStatus(session ? 'auth' : 'unauth')
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setStatus(session ? 'auth' : 'unauth')
    })

    return () => subscription.unsubscribe()
  }, [])

  if (status === 'loading') return <div className="lab-loading"><span>Loading...</span></div>
  if (status === 'unauth') return <Navigate to="/lab/login" replace />
  return <>{children}</>
}
