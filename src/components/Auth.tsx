import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, UserPlus, LogIn, Terminal } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      <div className="absolute inset-0 matrix-bg opacity-10"></div>
      
      <div className="relative w-full max-w-md">
        {/* Decorative elements */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 bg-emerald-500 rounded-2xl rotate-45 animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Terminal className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-slate-700">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold gradient-text mb-2">
              {isLogin ? 'Access Dashboard' : 'Join GitOpsNow'}
            </h2>
            <p className="text-slate-400">
              {isLogin ? 'Enter your credentials to continue' : 'Create your account to get started'}
            </p>
          </div>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-6 animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="group">
                <label className="block text-sm font-medium mb-2 text-slate-300">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 transition-colors group-focus-within:text-emerald-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/50 rounded-lg border border-slate-700 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-medium mb-2 text-slate-300">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 transition-colors group-focus-within:text-emerald-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/50 rounded-lg border border-slate-700 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all hover:translate-y-[-1px] active:translate-y-[1px]"
            >
              {isLogin ? (
                <>
                  <LogIn className="h-5 w-5" />
                  <span>Sign In</span>
                </>
              ) : (
                <>
                  <UserPlus className="h-5 w-5" />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-emerald-400 hover:text-emerald-300 transition-colors hover:glow-text"
            >
              {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}