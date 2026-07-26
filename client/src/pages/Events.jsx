import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import { fetchEventsApi } from '../services/api';
import { Sparkles, Calendar } from 'lucide-react';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetchEventsApi({ activeOnly: 'true' });
        if (res.data.success) {
          setEvents(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load events', err);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cafe-gold">
          Exclusive Gatherings
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cafe-cream">
          Events & Special Offers
        </h1>
        <p className="text-xs sm:text-sm text-cafe-cream/70 font-light">
          Join us for live acoustic jazz nights, barista cupping workshops, and seasonal tasting menus.
        </p>
      </div>

      {loading ? (
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="h-64 rounded-2xl bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-16 glass-panel rounded-3xl space-y-3">
          <Calendar className="w-12 h-12 text-cafe-gold mx-auto opacity-50" />
          <h3 className="font-serif text-2xl font-bold text-cafe-cream">No Upcoming Events</h3>
          <p className="text-xs text-cafe-cream/60">Check back soon for new announcements!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
