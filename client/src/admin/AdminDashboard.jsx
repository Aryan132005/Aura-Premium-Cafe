import React, { useState, useEffect } from 'react';
import { fetchAdminStatsApi } from '../services/api';
import {
  Calendar,
  Clock,
  DollarSign,
  UtensilsCrossed,
  MessageSquare,
  Sparkles,
  Users,
  CheckCircle2
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetchAdminStatsApi();
        if (res.data.success) {
          setStats(res.data);
        }
      } catch (err) {
        console.error('Failed to load admin stats', err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-10 w-48 bg-white/5 rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-white/5 rounded-2xl" />)}
        </div>
      </div>
    );
  }

  const COLORS = ['#c9a227', '#10b981', '#f59e0b', '#ef4444', '#3b82f6'];
  const overview = stats?.stats || {};
  const menuData = stats?.charts?.menuByCategory || [];
  const reservationData = stats?.charts?.reservationsByStatus || [];
  const recentBookings = stats?.recentReservations || [];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cafe-gold">
            Executive Control
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-cafe-cream">
            Admin Dashboard Overview
          </h1>
        </div>

        <a
          href="/admin/orders"
          className="flex items-center gap-2 px-5 py-3 bg-cafe-gold text-cafe-dark rounded-2xl text-xs font-extrabold uppercase tracking-wider hover:bg-cafe-goldHover transition-all shadow-xl"
        >
          <UtensilsCrossed className="w-4 h-4" /> View Live Table Orders
        </a>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-cafe-gold/20 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-cafe-cream/60">Total Reservations</span>
            <h3 className="font-serif text-3xl font-bold text-cafe-cream">{overview.totalReservations || 0}</h3>
            <span className="text-[11px] text-cafe-gold font-medium">{overview.pendingReservations || 0} Pending Approval</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-cafe-gold/15 border border-cafe-gold flex items-center justify-center text-cafe-gold">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-emerald-500/20 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-cafe-cream/60">Est. Revenue</span>
            <h3 className="font-serif text-3xl font-bold text-emerald-400">${overview.estimatedRevenue || 0}</h3>
            <span className="text-[11px] text-emerald-500 font-medium">Based on confirmed bookings</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500 flex items-center justify-center text-emerald-400">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-amber-500/20 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-cafe-cream/60">Unread Enquiries</span>
            <h3 className="font-serif text-3xl font-bold text-amber-400">{overview.unreadEnquiries || 0}</h3>
            <span className="text-[11px] text-amber-500 font-medium">Requires response</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500 flex items-center justify-center text-amber-400">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-blue-500/20 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-cafe-cream/60">Menu Items Active</span>
            <h3 className="font-serif text-3xl font-bold text-blue-400">{overview.totalMenuItems || 0}</h3>
            <span className="text-[11px] text-blue-400 font-medium">{overview.activeEvents || 0} Scheduled Events</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500 flex items-center justify-center text-blue-400">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recharts Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Menu Items by Category Chart */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="font-serif text-xl font-bold text-cafe-cream">Menu Items by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={menuData}>
                <XAxis dataKey="category" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#1c100b', borderColor: '#c9a227', color: '#faf7f2' }} />
                <Bar dataKey="count" fill="#c9a227" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Reservations Status Pie Chart */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl space-y-4">
          <h3 className="font-serif text-xl font-bold text-cafe-cream">Reservations by Status</h3>
          <div className="h-64 flex items-center justify-center">
            {reservationData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={reservationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="count"
                    nameKey="status"
                  >
                    {reservationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1c100b', borderColor: '#c9a227', color: '#faf7f2' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-xs text-cafe-cream/50">No reservation data recorded yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Reservations Table */}
      <div className="glass-panel p-6 rounded-3xl space-y-4">
        <h3 className="font-serif text-xl font-bold text-cafe-cream">Recent Table Bookings</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-cafe-gold/20 text-cafe-gold uppercase font-semibold">
                <th className="py-3 px-4">Guest Name</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Guests</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-cafe-cream/80">
              {recentBookings.map((b) => {
                const bookingId = b.id || b._id;
                return (
                  <tr key={bookingId} className="hover:bg-white/5">
                    <td className="py-3 px-4 font-semibold text-cafe-cream">{b.name}</td>
                    <td className="py-3 px-4">{b.date} at {b.time}</td>
                    <td className="py-3 px-4">{b.guests} Guests</td>
                    <td className="py-3 px-4">{b.phone}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        b.status === 'confirmed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' :
                        b.status === 'pending' ? 'bg-amber-950 text-amber-400 border border-amber-500/40' :
                        'bg-red-950 text-red-400 border border-red-500/40'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
