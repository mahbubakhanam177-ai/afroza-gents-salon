import React, { useState } from 'react';
import { Lock, Key, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';

interface AdminLoginProps {
  onSuccess: () => void;
  onNavigatePublic: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onNavigatePublic }) => {
  const { loginAdmin, config } = useSalon();
  
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setErrorMsg('Please enter the admin password.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    const result = await loginAdmin(password);
    setIsSubmitting(false);

    if (result.success) {
      onSuccess();
    } else {
      setErrorMsg(result.error || 'Invalid admin password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex items-center justify-center p-4 selection:bg-amber-500 selection:text-stone-950 relative overflow-hidden">
      
      {/* Background Decorative Lighting */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-3xl p-8 shadow-2xl relative z-10">
        
        {/* Salon Logo & Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500 text-stone-950 font-black text-2xl flex items-center justify-center shadow-xl shadow-amber-500/20">
            A
          </div>
          
          <h1 className="font-heading font-black text-xl sm:text-2xl text-stone-100 tracking-tight uppercase pt-2">
            AFROZA GENTS SALON
          </h1>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-950 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Salon Admin</span>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={() => setForgotModalOpen(true)}
                className="text-xs text-amber-400 hover:underline font-medium"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full bg-stone-950 border border-stone-700 rounded-xl pl-10 pr-4 py-3 text-stone-100 text-sm focus:border-amber-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold py-3.5 rounded-xl text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-98 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Login</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Public site link */}
        <div className="mt-6 text-center border-t border-stone-800/80 pt-4">
          <button
            type="button"
            onClick={onNavigatePublic}
            className="text-xs text-stone-300 hover:text-amber-400 transition-colors font-medium"
          >
            ← Back to Public Website
          </button>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 max-w-sm w-full space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Key className="w-4 h-4" />
              <span>Password Reset Request</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Password reset requests for <strong>{config.salonName}</strong> are handled securely. Please check your admin inbox ({config.email}) or contact your website manager to reset your password.
            </p>
            <button
              onClick={() => setForgotModalOpen(false)}
              className="w-full bg-stone-800 hover:bg-stone-700 text-stone-100 font-bold py-2.5 rounded-xl text-xs uppercase"
            >
              Close Notice
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
