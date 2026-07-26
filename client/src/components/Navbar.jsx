import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Coffee, Menu, X, User, Shield, LogOut, Calendar, ShoppingBag, Utensils } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();
  const { totalItems, setIsCartOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About Us', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Events & Offers', path: '/events' },
    { name: 'My Orders', path: '/my-orders' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cafe-dark/95 backdrop-blur-md shadow-2xl py-3 border-b border-cafe-gold/20'
          : 'bg-gradient-to-b from-cafe-darker/90 via-cafe-dark/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-cafe-gold/20 border border-cafe-gold flex items-center justify-center text-cafe-gold group-hover:scale-105 transition-transform">
            <Coffee className="w-5 h-5" />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-wider text-cafe-cream group-hover:text-cafe-gold transition-colors">
              AURA
            </span>
            <span className="block text-[10px] tracking-[0.25em] text-cafe-gold uppercase font-sans">
              Café & Lounge
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm tracking-wide font-medium transition-colors hover:text-cafe-gold relative py-1 ${
                  isActive ? 'text-cafe-gold' : 'text-cafe-cream/80'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cafe-gold rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {/* Cart Icon Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-full bg-cafe-card border border-cafe-gold/30 hover:border-cafe-gold text-cafe-gold hover:scale-105 transition-all shadow-lg"
            title="View Order Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-cafe-gold text-cafe-dark font-bold text-[11px] flex items-center justify-center animate-bounce shadow-md">
                {totalItems}
              </span>
            )}
          </button>

          <Link
            to="/reservation"
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-cafe-gold text-cafe-dark rounded-full hover:bg-cafe-goldHover transition-all shadow-lg hover:shadow-cafe-gold/20"
          >
            Book A Table
          </Link>

          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-2 rounded-full border border-cafe-gold/30 bg-cafe-card/80 hover:border-cafe-gold transition-all text-xs font-medium text-cafe-cream">
                <User className="w-4 h-4 text-cafe-gold" />
                <span>{user.name.split(' ')[0]}</span>
              </button>

              {/* Dropdown menu */}
              <div className="absolute right-0 mt-2 w-48 bg-cafe-card border border-cafe-gold/20 rounded-xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {isAdmin ? (
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 px-4 py-2 text-xs text-cafe-gold hover:bg-white/5 transition-colors"
                  >
                    <Shield className="w-4 h-4" /> Admin Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/my-orders"
                      className="flex items-center gap-2 px-4 py-2 text-xs text-cafe-cream/90 hover:bg-white/5 transition-colors"
                    >
                      <Utensils className="w-4 h-4 text-cafe-gold" /> My Orders
                    </Link>
                    <Link
                      to="/my-reservations"
                      className="flex items-center gap-2 px-4 py-2 text-xs text-cafe-cream/90 hover:bg-white/5 transition-colors"
                    >
                      <Calendar className="w-4 h-4 text-cafe-gold" /> My Reservations
                    </Link>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-red-400 hover:bg-white/5 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/auth"
              className="px-4 py-2 text-xs font-medium text-cafe-cream hover:text-cafe-gold border border-cafe-gold/30 rounded-full hover:border-cafe-gold transition-all"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-cafe-cream hover:text-cafe-gold p-2 focus:outline-none"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-cafe-darker/95 backdrop-blur-xl border-b border-cafe-gold/20 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`text-base font-medium py-1 transition-colors ${
                  location.pathname === link.path ? 'text-cafe-gold font-bold' : 'text-cafe-cream/80'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <hr className="border-cafe-gold/20 my-2" />

            <Link
              to="/reservation"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider bg-cafe-gold text-cafe-dark rounded-xl"
            >
              Book A Table
            </Link>

            {user ? (
              <div className="pt-2 space-y-2">
                {isAdmin ? (
                  <Link
                    to="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 text-sm text-cafe-gold font-medium"
                  >
                    <Shield className="w-4 h-4" /> Admin Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/my-reservations"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 text-sm text-cafe-cream"
                  >
                    <Calendar className="w-4 h-4 text-cafe-gold" /> My Reservations
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-2 text-sm text-red-400 font-medium pt-1"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center px-4 py-2.5 text-sm font-medium border border-cafe-gold/40 text-cafe-gold rounded-xl"
              >
                Sign In / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
