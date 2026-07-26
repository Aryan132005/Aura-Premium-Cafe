import React, { useState, useEffect } from 'react';
import { getMyReservationsApi } from '../services/api';
import { Calendar, Clock, Users, CheckCircle2, Clock3, XCircle, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMyReservations = async () => {
      try {
        const res = await getMyReservationsApi();
        if (res.data.success) {
          setReservations(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch personal reservations', err);
      } finally {
        setLoading(false);
      }
    };
    loadMyReservations();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 text-xs font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
          </span>
        );
      case 'pending':
        return (
          <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-400 text-xs font-semibold flex items-center gap-1">
            <Clock3 className="w-3.5 h-3.5" /> Pending Review
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-3 py-1 rounded-full bg-red-950/80 border border-red-500/50 text-red-400 text-xs font-semibold flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
      case 'completed':
        return (
          <span className="px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/50 text-blue-400 text-xs font-semibold flex items-center gap-1">
            Completed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cafe-gold/20 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cafe-gold">
            Customer Dashboard
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-cafe-cream">
            My Table Reservations
          </h1>
        </div>
        <Link
          to="/reservation"
          className="px-5 py-2.5 rounded-full bg-cafe-gold text-cafe-dark text-xs font-bold uppercase tracking-wider hover:bg-cafe-goldHover transition-all text-center"
        >
          + New Booking
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-32 rounded-2xl bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : reservations.length === 0 ? (
        <div className="text-center py-16 glass-panel rounded-3xl space-y-4">
          <Coffee className="w-12 h-12 text-cafe-gold mx-auto opacity-50" />
          <h3 className="font-serif text-2xl font-bold text-cafe-cream">No Reservations Found</h3>
          <p className="text-xs text-cafe-cream/60 max-w-sm mx-auto">
            You haven't booked any tables yet. Plan your next dining experience now!
          </p>
          <Link
            to="/reservation"
            className="inline-block px-6 py-2.5 rounded-full bg-cafe-gold text-cafe-dark text-xs font-bold uppercase tracking-wider"
          >
            Book a Table
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {reservations.map((item) => {
            const itemId = item.id || item._id;
            return (
              <div key={itemId} className="glass-card p-6 rounded-2xl space-y-4 border border-cafe-gold/20">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cafe-gold/15 border border-cafe-gold flex items-center justify-center text-cafe-gold">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-cafe-cream">{item.date}</h3>
                      <p className="text-xs text-cafe-cream/60">Booking Ref: #{String(itemId).slice(-6).toUpperCase()}</p>
                    </div>
                  </div>
                  <div>{getStatusBadge(item.status)}</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-cafe-cream/80">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cafe-gold" />
                    <span>Time: <strong>{item.time}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-cafe-gold" />
                    <span>Party Size: <strong>{item.guests} Guests</strong></span>
                  </div>
                  <div className="text-cafe-cream/60">
                    <span>Name: {item.name} ({item.phone})</span>
                  </div>
                </div>

                {item.specialRequest && (
                  <div className="p-3 rounded-xl bg-black/40 border border-cafe-gold/10 text-xs text-cafe-cream/70 italic">
                    <strong>Special Requests:</strong> "{item.specialRequest}"
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyReservations;
