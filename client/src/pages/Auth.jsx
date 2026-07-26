import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Coffee, Shield, User, Lock, Mail, Phone, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const res = await login({ email, password });
      if (res?.success) {
        if (res.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/my-reservations');
        }
      }
    } else {
      const res = await register({ name, email, password, phone });
      if (res?.success) {
        navigate('/my-reservations');
      }
    }
    setLoading(false);
  };

  const setAdminDemo = () => {
    setEmail('admin@premiumcafe.com');
    setPassword('adminpassword123');
    setIsLogin(true);
  };

  const setCustomerDemo = () => {
    setEmail('john@example.com');
    setPassword('customerpassword123');
    setIsLogin(true);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 flex items-center justify-center px-4">
      <div className="max-w-md w-full glass-panel p-8 sm:p-10 rounded-3xl space-y-6 shadow-2xl relative">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-cafe-gold/20 border border-cafe-gold flex items-center justify-center text-cafe-gold mx-auto">
            <Coffee className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-cafe-cream">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-xs text-cafe-cream/60">
            {isLogin ? 'Access your café reservations and account profile' : 'Join Aura to manage table bookings and access private events'}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-cafe-dark/80 rounded-xl p-1 border border-cafe-gold/20">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              isLogin ? 'bg-cafe-gold text-cafe-dark shadow-md' : 'text-cafe-cream/70 hover:text-cafe-cream'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              !isLogin ? 'bg-cafe-gold text-cafe-dark shadow-md' : 'text-cafe-cream/70 hover:text-cafe-cream'
            }`}
          >
            Register
          </button>
        </div>

        {/* Quick Demo Pre-fill helper buttons */}
        <div className="p-3 bg-cafe-gold/10 border border-cafe-gold/30 rounded-xl text-center space-y-2">
          <span className="text-[10px] uppercase tracking-wider text-cafe-gold font-bold block">
            ⚡ Quick Demo Credentials
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={setAdminDemo}
              className="flex-1 py-1.5 px-2 rounded-lg bg-cafe-card border border-cafe-gold/30 text-[11px] text-cafe-gold hover:bg-cafe-gold hover:text-cafe-dark transition-colors font-medium flex items-center justify-center gap-1"
            >
              <Shield className="w-3 h-3" /> Admin Login
            </button>
            <button
              type="button"
              onClick={setCustomerDemo}
              className="flex-1 py-1.5 px-2 rounded-lg bg-cafe-card border border-cafe-gold/30 text-[11px] text-cafe-cream hover:bg-cafe-gold hover:text-cafe-dark transition-colors font-medium flex items-center justify-center gap-1"
            >
              <User className="w-3 h-3" /> Customer Login
            </button>
          </div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs text-cafe-cream/80 font-medium mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-cafe-dark/70 border border-cafe-gold/20 text-cafe-cream text-xs focus:outline-none focus:border-cafe-gold"
                />
                <User className="w-4 h-4 text-cafe-gold absolute left-3 top-3.5" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs text-cafe-cream/80 font-medium mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-cafe-dark/70 border border-cafe-gold/20 text-cafe-cream text-xs focus:outline-none focus:border-cafe-gold"
              />
              <Mail className="w-4 h-4 text-cafe-gold absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs text-cafe-cream/80 font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-cafe-dark/70 border border-cafe-gold/20 text-cafe-cream text-xs focus:outline-none focus:border-cafe-gold"
              />
              <Lock className="w-4 h-4 text-cafe-gold absolute left-3 top-3.5" />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-xs text-cafe-cream/80 font-medium mb-1">Phone Number (Optional)</label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="+1 555-0192"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-cafe-dark/70 border border-cafe-gold/20 text-cafe-cream text-xs focus:outline-none focus:border-cafe-gold"
                />
                <Phone className="w-4 h-4 text-cafe-gold absolute left-3 top-3.5" />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-cafe-gold hover:bg-cafe-goldHover text-cafe-dark font-serif font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl disabled:opacity-50 mt-2"
          >
            {loading ? 'Authenticating...' : isLogin ? 'Sign In' : 'Create Account'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
