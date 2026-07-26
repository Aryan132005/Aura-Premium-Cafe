import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  UtensilsCrossed,
  CalendarCheck,
  Sparkles,
  MessageSquare,
  LogOut,
  Home,
  ShieldAlert,
  ShoppingBag
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Live Orders', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Manage Menu', path: '/admin/menu', icon: UtensilsCrossed },
    { name: 'Reservations', path: '/admin/reservations', icon: CalendarCheck },
    { name: 'Events & Offers', path: '/admin/events', icon: Sparkles },
    { name: 'Enquiries', path: '/admin/enquiries', icon: MessageSquare }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-cafe-darker text-cafe-cream flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-cafe-dark border-r border-cafe-gold/20 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          {/* Admin Header */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-cafe-gold">
              <ShieldAlert className="w-5 h-5" />
              <span className="font-serif text-xl font-bold tracking-wide">Aura Admin</span>
            </div>
            <p className="text-[10px] text-cafe-cream/50 uppercase tracking-widest">
              Management Portal
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-cafe-gold text-cafe-dark shadow-lg'
                      : 'text-cafe-cream/70 hover:text-cafe-cream hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-cafe-gold/15 space-y-3 mt-6">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-cafe-cream/70 hover:text-cafe-gold hover:bg-white/5 transition-colors"
          >
            <Home className="w-4 h-4" /> Customer Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-red-400 hover:bg-red-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Exit Admin
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-w-7xl">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
