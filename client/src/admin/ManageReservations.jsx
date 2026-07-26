import React, { useState, useEffect } from 'react';
import { getAllReservationsApi, updateReservationStatusApi, deleteReservationApi } from '../services/api';
import { Calendar, Check, X, Clock, Trash2, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  const loadReservations = async () => {
    setLoading(true);
    try {
      const params = {};
      if (statusFilter !== 'all') params.status = statusFilter;
      if (search.trim()) params.search = search;

      const res = await getAllReservationsApi(params);
      if (res.data.success) {
        setReservations(res.data.data);
      }
    } catch (err) {
      toast.error('Failed to fetch reservations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations();
  }, [statusFilter]);

  const handleStatusChange = async (id, newStatus) => {
    if (!id) {
      toast.error('Invalid reservation ID');
      return;
    }
    try {
      const res = await updateReservationStatusApi(id, newStatus);
      if (res.data.success) {
        toast.success(`Reservation marked as ${newStatus}`);
        loadReservations();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this reservation?')) return;
    try {
      const res = await deleteReservationApi(id);
      if (res.data.success) {
        toast.success('Reservation record deleted');
        loadReservations();
      }
    } catch (err) {
      toast.error('Failed to delete reservation');
    }
  };

  const statuses = ['all', 'pending', 'confirmed', 'completed', 'cancelled'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cafe-gold">
          Guest Bookings
        </span>
        <h1 className="font-serif text-3xl font-bold text-cafe-cream">
          Manage Reservations
        </h1>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                statusFilter === st
                  ? 'bg-cafe-gold text-cafe-dark shadow-md'
                  : 'bg-cafe-dark/60 text-cafe-cream/70 hover:text-cafe-cream'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && loadReservations()}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-cafe-dark border border-cafe-gold/20 text-cafe-cream text-xs focus:outline-none focus:border-cafe-gold"
          />
          <Search className="w-4 h-4 text-cafe-gold absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map(i => <div key={i} className="h-20 bg-white/5 rounded-2xl" />)}
        </div>
      ) : (
        <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-cafe-gold/20 text-cafe-gold uppercase font-semibold bg-cafe-dark/90">
                  <th className="py-4 px-6">Guest Info</th>
                  <th className="py-4 px-4">Date & Time</th>
                  <th className="py-4 px-4">Guests</th>
                  <th className="py-4 px-4">Special Request</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-cafe-cream/80">
                {reservations.map((item) => {
                  const itemId = item.id || item._id;
                  return (
                    <tr key={itemId} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-semibold text-cafe-cream">{item.name}</div>
                        <div className="text-[11px] text-cafe-cream/60">{item.email} | {item.phone}</div>
                      </td>
                      <td className="py-4 px-4 font-medium text-cafe-cream">
                        {item.date} at <strong className="text-cafe-gold">{item.time}</strong>
                      </td>
                      <td className="py-4 px-4 font-bold text-cafe-cream">{item.guests} Guests</td>
                      <td className="py-4 px-4 max-w-xs truncate text-cafe-cream/60">
                        {item.specialRequest || 'None'}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          item.status === 'confirmed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' :
                          item.status === 'pending' ? 'bg-amber-950 text-amber-400 border border-amber-500/40' :
                          item.status === 'completed' ? 'bg-blue-950 text-blue-400 border border-blue-500/40' :
                          'bg-red-950 text-red-400 border border-red-500/40'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-1.5">
                        {item.status === 'pending' && (
                          <button
                            onClick={() => handleStatusChange(itemId, 'confirmed')}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white text-[11px] font-semibold hover:bg-emerald-500 transition-colors"
                          >
                            Approve
                          </button>
                        )}
                        {item.status === 'confirmed' && (
                          <button
                            onClick={() => handleStatusChange(itemId, 'completed')}
                            className="px-2.5 py-1.5 rounded-lg bg-blue-600 text-white text-[11px] font-semibold hover:bg-blue-500 transition-colors"
                          >
                            Complete
                          </button>
                        )}
                        {item.status !== 'cancelled' && (
                          <button
                            onClick={() => handleStatusChange(itemId, 'cancelled')}
                            className="px-2.5 py-1.5 rounded-lg bg-amber-900 text-amber-300 text-[11px] font-semibold hover:bg-amber-800 transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(itemId)}
                          className="p-1.5 rounded-lg bg-red-950/80 text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageReservations;
