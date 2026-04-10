import { useState } from 'react'
import { supabase } from '../supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) { setError('Email et mot de passe requis'); return }
    setLoading(true); setError(null)

    const { error: authError } = isSignup
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })

    if (authError) { setError(authError.message); setLoading(false); return }
    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #0d1117 100%)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center"><div className="w-3 h-3 rounded-sm bg-accent shadow-[0_0_10px_rgba(79,159,255,0.5)]" /></div>
            <span className="text-lg font-bold text-white">Nova OS</span>
          </a>
          <h1 className="text-2xl font-black text-white mb-1">{isSignup ? 'Créer un compte' : 'Connexion'}</h1>
          <p className="text-sm text-white/30">{isSignup ? 'Commencez à automatiser votre business' : 'Accédez à votre dashboard'}</p>
        </div>

        {error && <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="px-4 py-3 rounded-xl text-sm bg-white/[0.06] border border-white/[0.08] text-white placeholder:text-white/20 outline-none focus:border-accent/30 transition-all" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" className="px-4 py-3 rounded-xl text-sm bg-white/[0.06] border border-white/[0.08] text-white placeholder:text-white/20 outline-none focus:border-accent/30 transition-all" />
          <button type="submit" disabled={loading} className="btn-glow py-3.5 rounded-xl text-sm bg-accent text-black font-bold disabled:opacity-50 disabled:animate-none mt-1">
            {loading ? 'Chargement...' : isSignup ? 'Créer mon compte' : 'Se connecter'}
          </button>
        </form>

        <button onClick={() => { setIsSignup(!isSignup); setError(null) }} className="w-full text-center text-xs text-white/25 hover:text-white/50 transition-colors mt-4">
          {isSignup ? 'Déjà un compte ? Se connecter' : 'Pas de compte ? Créer un compte'}
        </button>
      </div>
    </div>
  )
}
